import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Space, Button, Input, List, Avatar, Tooltip } from 'antd';
import { ThunderboltOutlined, MessageOutlined, BulbOutlined, LineChartOutlined, StarOutlined, RobotOutlined, ArrowRightOutlined, UserOutlined, SendOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MainLayout from '../components/MainLayout';

const { Title, Text } = Typography;

export default function InterviewSimulator() {
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRAGMode, setIsRAGMode] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleStart = () => {
    setIsStarted(true);
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Welcome to the Premium AI Interviewer.\n\nPlease select your interview domain. You can type **AIML** to start a mock interview based on the uploaded **RAJ PDF** knowledge base.`
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
          model: 'llama3-8b-8192',
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
      return "Sorry, I couldn't process that response.";
    } catch (error) {
      console.error(error);
      return "Network error occurred while calling the AI API.";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const textToSend = inputValue.trim();
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSend }]);
    setInputValue('');
    setIsTyping(true);

    let responseText = "";
    const lowerInput = textToSend.toLowerCase();

    if (!isRAGMode && (lowerInput === "aiml" || lowerInput === "aiiml")) {
      setIsRAGMode(true);
      responseText = `*Loading context from RAJ.pdf...*\n\nKnowledge base loaded! I will now conduct your AI/ML interview based on RAJ.pdf. Let's begin!\n\n**Question 1:** What is the fundamental difference between supervised and unsupervised learning according to the text?`;
    } else if (isRAGMode) {
      const systemPrompt = `You are an expert AI/ML technical interviewer conducting a mock interview. 
      You are strictly asking questions based on the uploaded document "RAJ.pdf", which contains introductory AI/ML concepts (Supervised vs Unsupervised, Deep Learning, CNNs, Transformers, Overfitting, Evaluation Metrics). 
      The user just answered your previous question. 
      Critique their answer briefly but constructively, then ask the NEXT technical question from a different topic within AI/ML. 
      Do not break character. Use markdown formatting for readability.`;
      
      responseText = await callGroqAPI(textToSend, systemPrompt, messages.filter(m => m.id !== messages[0].id)); // Exclude the first welcome message to save tokens/context if needed, but we can pass it all.
    } else {
      responseText = `I am currently programmed to run specific modules. Please type **AIML** to load the RAJ PDF interview module.`;
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
          <Title level={4} style={{ margin: 0, color: '#fff' }}>RAG Interview Simulator</Title>
        </Space>
        {isRAGMode && (
          <div style={{ background: 'rgba(0, 242, 255, 0.1)', padding: '4px 12px', borderRadius: '4px', border: '1px solid rgba(0,242,255,0.3)' }}>
            <Text style={{ color: '#00f2ff', fontSize: '12px' }}>Knowledge Base: RAJ.pdf</Text>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
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
          placeholder="Type your response... (Type 'AIML' to start RAG module)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSend}
          suffix={<Button type="text" icon={<SendOutlined style={{ color: '#00f2ff' }} />} onClick={handleSend} />}
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
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Game-Changing Feature</Text>
                </div>
                <Title style={{ color: '#fff', fontSize: '48px', fontWeight: '900', margin: '0 0 16px 0', lineHeight: '1.1' }}>
                  Interviewer Simulator
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '20px', display: 'block', marginBottom: '48px' }}>
                  Real Chat-Based Mock Interviews powered by AI
                </Text>

                <Button 
                  type="primary" 
                  size="large"
                  icon={<ArrowRightOutlined />}
                  onClick={handleStart}
                  style={{
                    height: '64px',
                    padding: '0 48px',
                    borderRadius: '32px',
                    background: 'linear-gradient(90deg, #00f2ff, #bc13fe)',
                    border: 'none',
                    fontSize: '20px',
                    fontWeight: '900',
                    display: 'inline-flex',
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                    gap: '12px',
                    boxShadow: '0 15px 30px rgba(188, 19, 254, 0.3)',
                    transition: 'all 0.3s'
                  }}
                >
                  Start Mock Interview
                </Button>
              </Col>
              
              <Col xs={24} lg={11}>
                {/* Visual placeholder for original design */}
                <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '24px', border: '1px solid rgba(0,242,255,0.2)', padding: '30px', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
                    <RobotOutlined style={{ fontSize: '48px', color: '#00f2ff' }} />
                    <Text style={{ color: '#fff', fontSize: '18px' }}>AI Mock Interview Simulator</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Powered by RAJ.pdf RAG Integration</Text>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
