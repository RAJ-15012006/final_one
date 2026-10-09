import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Space, Button, Input, List, Avatar, Tooltip, notification, Modal } from 'antd';
import { ThunderboltOutlined, MessageOutlined, BulbOutlined, LineChartOutlined, StarOutlined, RobotOutlined, ArrowRightOutlined, UserOutlined, SendOutlined, WarningOutlined, LockOutlined, CreditCardOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const MAX_FREE_INTERVIEWS = 2;

export default function InterviewSimulator() {
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeDomain, setActiveDomain] = useState(null);
  const [warnings, setWarnings] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [interviewCount, setInterviewCount] = useState(0);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const DOMAINS = [
    "Cybersecurity", "AIML", "Edge software development", 
    "ML engineer", "Data scientist", "SQL", "DSA"
  ];

  // Load interview count from localStorage on mount
  useEffect(() => {
    const key = `interview_count_${user?.id || 'guest'}`;
    const count = parseInt(localStorage.getItem(key) || '0');
    setInterviewCount(count);
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isStarted) {
      // Anti-cheat: Tab switching detection
      const handleVisibilityChange = () => {
        if (document.hidden) {
          setWarnings(prev => {
            const newWarnings = prev + 1;
            if (newWarnings >= 3) {
              Modal.error({
                title: 'Interview Terminated',
                content: 'You have violated the proctoring rules by switching tabs multiple times. Your session is terminated.',
                onOk: () => navigate('/dashboard')
              });
            } else {
              notification.warning({
                message: 'Proctoring Warning',
                description: `Warning ${newWarnings}/2: Please do not switch tabs during the interview.`,
                icon: <WarningOutlined style={{ color: '#faad14' }} />,
                duration: 5,
              });
            }
            return newWarnings;
          });
        }
      };

      const handleCopy = (e) => {
        e.preventDefault();
        notification.error({
          message: 'Action Blocked',
          description: 'Copying text is disabled during the mock interview.',
        });
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('copy', handleCopy);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.removeEventListener('copy', handleCopy);
      };
    }
  }, [isStarted, navigate]);

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      notification.success({ message: 'Proctoring Active', description: 'Camera and microphone access granted.' });
      return true;
    } catch (err) {
      notification.error({ message: 'Permission Denied', description: 'You must allow camera and microphone access to start the interview.' });
      return false;
    }
  };

  const handleStart = async () => {
    // Check interview limit
    if (interviewCount >= MAX_FREE_INTERVIEWS) {
      setShowPaywall(true);
      return;
    }

    const granted = await requestPermissions();
    if (!granted) return;

    // Increment interview count in localStorage
    const key = `interview_count_${user?.id || 'guest'}`;
    const newCount = interviewCount + 1;
    localStorage.setItem(key, newCount.toString());
    setInterviewCount(newCount);

    setIsStarted(true);
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Welcome to the Premium AI Interviewer.\n\nPlease select your interview domain below to start a mock interview based on the RAG knowledge base.`
      }
    ]);
  };

  const callGroqAPI = async (userText, systemContext, history) => {
    if (!API_KEY) {
      return "API Key is missing. Please check your .env file.";
    }
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [
            { role: 'system', content: systemContext },
            ...history.map(m => ({ role: m.sender === 'bot' ? 'assistant' : 'user', content: m.text })),
            { role: 'user', content: userText }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      }
      return `API Error: ${data.error?.message || 'Unknown error'}`;
    } catch (error) {
      console.error(error);
      return `Network error: ${error.message}`;
    }
  };

  const startDomainInterview = async (domain) => {
    setActiveDomain(domain);
    const startMsg = `I want to start the interview for ${domain}.`;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: startMsg }]);
    setIsTyping(true);

    const systemPrompt = `You are an expert technical interviewer for the domain: ${domain}. 
    Ask a challenging, entry-to-mid level interview question (coding or theory). 
    Wait for the user's response.`;
    
    const responseText = await callGroqAPI(startMsg, systemPrompt, []);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: responseText }]);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const textToSend = inputValue.trim();
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setInputValue('');
    setIsTyping(true);

    let responseText = "";

    if (activeDomain) {
      const systemPrompt = `You are an expert technical interviewer conducting a mock interview for the domain: ${activeDomain}. 
      The user just answered your previous question. 
      Critique their answer briefly but constructively, then ask the NEXT technical question (could be theory or coding). 
      Do not break character. Use markdown formatting for readability.`;
      
      responseText = await callGroqAPI(textToSend, systemPrompt, messages.filter(m => m.id !== messages[0].id));
    } else {
      responseText = `Please select an interview domain first.`;
    }
    
    setIsTyping(false);
    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: responseText }]);
  };

  const renderSimulator = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', background: '#0a0a0f', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0, 242, 255, 0.2)' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <RobotOutlined style={{ color: '#00f2ff', fontSize: '24px' }} />
          <Title level={4} style={{ margin: 0, color: '#fff' }}>Proctored Interview Simulator</Title>
        </Space>
        {activeDomain && (
          <div style={{ background: 'rgba(0, 242, 255, 0.1)', padding: '4px 12px', borderRadius: '4px', border: '1px solid rgba(0,242,255,0.3)' }}>
            <Text style={{ color: '#00f2ff', fontSize: '12px' }}>Domain: {activeDomain}</Text>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', userSelect: 'none' }}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(msg) => (
            <div style={{ display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', marginBottom: '24px', alignItems: 'flex-start' }}>
              <Avatar
                icon={msg.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                style={{ backgroundColor: msg.sender === 'user' ? '#bc13fe' : 'rgba(0, 242, 255, 0.2)', color: msg.sender === 'user' ? '#fff' : '#00f2ff', marginLeft: msg.sender === 'user' ? '16px' : '0', marginRight: msg.sender === 'user' ? '0' : '16px' }}
              />
              <div style={{
                background: msg.sender === 'user' ? 'linear-gradient(135deg, rgba(188, 19, 254, 0.2), rgba(188, 19, 254, 0.4))' : 'rgba(255, 255, 255, 0.05)',
                padding: '16px 20px',
                borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                maxWidth: '75%',
                border: msg.sender === 'user' ? '1px solid rgba(188, 19, 254, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '15px',
                lineHeight: '1.6'
              }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                
                {/* Show domain choices if bot is asking for domain and no domain selected */}
                {!activeDomain && msg.id === messages[0]?.id && (
                  <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {DOMAINS.map(d => (
                      <Button key={d} type="primary" ghost size="small" onClick={() => startDomainInterview(d)}>
                        {d}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        />
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '24px' }}>
            <Avatar icon={<RobotOutlined />} style={{ backgroundColor: 'rgba(0, 242, 255, 0.2)', color: '#00f2ff', marginRight: '16px' }} />
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px 20px', borderRadius: '16px 16px 16px 4px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
               <Text style={{ color: 'rgba(255,255,255,0.5)' }}>Thinking...</Text>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)' }}>
        <Input
          size="large"
          placeholder="Type your response..."
          value={inputValue}
          disabled={!activeDomain}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSend}
          suffix={<Button type="text" icon={<SendOutlined style={{ color: '#00f2ff' }} />} onClick={handleSend} disabled={!activeDomain} />}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px' }}
        />
      </div>
    </div>
  );

  return (
    <MainLayout>
      {isStarted ? renderSimulator() : (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 15, 0.95))',
            borderRadius: '24px',
            padding: '60px 40px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={13}>
                <div style={{ display: 'inline-block', background: 'linear-gradient(90deg, #00f2ff, #bc13fe)', padding: '4px 16px', borderRadius: '20px', marginBottom: '24px' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Proctored Environment</Text>
                </div>
                <Title style={{ color: '#fff', fontSize: '48px', fontWeight: '900', margin: '0 0 16px 0', lineHeight: '1.1' }}>
                  Interviewer Simulator
                </Title>

                <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '20px', display: 'block', marginBottom: '16px' }}>
                  Real Chat-Based Mock Interviews powered by AI. <br/>
                  <small style={{ color: '#faad14' }}>Requires Camera &amp; Mic permissions for proctoring.</small>
                </Text>

                {/* Free attempts counter badge */}
                <div style={{ marginBottom: '32px', padding: '12px 20px', background: interviewCount >= MAX_FREE_INTERVIEWS ? 'rgba(255, 77, 79, 0.1)' : 'rgba(0, 242, 255, 0.05)', borderRadius: '12px', border: `1px solid ${interviewCount >= MAX_FREE_INTERVIEWS ? 'rgba(255,77,79,0.4)' : 'rgba(0,242,255,0.2)'}`, display: 'inline-block' }}>
                  {interviewCount >= MAX_FREE_INTERVIEWS ? (
                    <Space>
                      <LockOutlined style={{ color: '#ff4d4f' }} />
                      <Text style={{ color: '#ff4d4f' }}>Free interviews used ({interviewCount}/{MAX_FREE_INTERVIEWS}). Unlock more for <strong>$10</strong>.</Text>
                    </Space>
                  ) : (
                    <Space>
                      <Text style={{ color: '#00f2ff' }}>Free interviews remaining: <strong style={{ color: '#fff' }}>{MAX_FREE_INTERVIEWS - interviewCount}</strong> / {MAX_FREE_INTERVIEWS}</Text>
                    </Space>
                  )}
                </div>
                <br />

                <Button
                  type="primary"
                  size="large"
                  icon={interviewCount >= MAX_FREE_INTERVIEWS ? <LockOutlined /> : <ArrowRightOutlined />}
                  onClick={handleStart}
                  style={{
                    height: '64px',
                    padding: '0 48px',
                    borderRadius: '32px',
                    background: interviewCount >= MAX_FREE_INTERVIEWS
                      ? 'rgba(80, 80, 80, 0.5)'
                      : 'linear-gradient(90deg, #00f2ff, #bc13fe)',
                    border: interviewCount >= MAX_FREE_INTERVIEWS ? '1px solid rgba(255,77,79,0.5)' : 'none',
                    fontSize: '20px',
                    fontWeight: '900',
                    display: 'inline-flex',
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                    gap: '12px',
                    boxShadow: interviewCount >= MAX_FREE_INTERVIEWS ? 'none' : '0 15px 30px rgba(188, 19, 254, 0.3)',
                    transition: 'all 0.3s'
                  }}
                >
                  {interviewCount >= MAX_FREE_INTERVIEWS ? 'Locked — Pay $10 to Unlock' : 'Start Mock Interview'}
                </Button>
              </Col>
              
              <Col xs={24} lg={11}>
                <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '24px', border: '1px solid rgba(0,242,255,0.2)', padding: '30px', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
                    <RobotOutlined style={{ fontSize: '48px', color: '#00f2ff' }} />
                    <Text style={{ color: '#fff', fontSize: '18px' }}>AI Mock Interview Simulator</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Supports Cybersecurity, AIML, Data Science &amp; More</Text>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}

      {/* Paywall Modal */}
      <Modal
        open={showPaywall}
        onCancel={() => setShowPaywall(false)}
        footer={null}
        centered
      >
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <LockOutlined style={{ fontSize: '52px', color: '#ff4d4f', marginBottom: '16px' }} />
          <Title level={3}>Free Limit Reached</Title>
          <Text style={{ display: 'block', marginBottom: '8px', fontSize: '16px' }}>
            You have used all <strong>{MAX_FREE_INTERVIEWS}</strong> free mock interviews.
          </Text>
          <Text type="secondary" style={{ display: 'block', marginBottom: '32px' }}>
            Unlock unlimited access with a one-time payment of <strong style={{ color: '#bc13fe' }}>$10</strong>.
          </Text>
          <Button
            type="primary"
            size="large"
            icon={<CreditCardOutlined />}
            onClick={() => {
              notification.info({
                message: 'Payment Gateway',
                description: 'Payment integration coming soon! Contact the admin to upgrade your account.',
              });
              setShowPaywall(false);
            }}
            style={{
              background: 'linear-gradient(90deg, #00f2ff, #bc13fe)',
              border: 'none',
              height: '48px',
              padding: '0 32px',
              borderRadius: '24px',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Pay $10 — Unlock Unlimited Interviews
          </Button>
        </div>
      </Modal>
    </MainLayout>
  );
}
