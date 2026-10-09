import React, { useState, useRef, useEffect } from 'react';
import { Card, Avatar, Typography, Tooltip, Input, Button, List, Space, Badge, Row, Col } from 'antd';
import { RobotOutlined, UserOutlined, SettingOutlined, LikeOutlined, DislikeOutlined, CopyOutlined, SendOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const { Text } = Typography;

export default function Chatbot({ problemData, userName, isFullPage = false }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const { theme } = useTheme();
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  useEffect(() => {
    if (problemData) {
      setMessages([
        {
          id: Date.now(),
          sender: 'bot',
          text: `Welcome, ${userName}! Ready to work with your **JARVIS** assistant? I see we are working on **${problemData.title}**. What part of the problem are you analyzing first?`
        }
      ]);
      setHintsRemaining(3);
    }
  }, [problemData, userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const callGroqAPI = async (userText, systemContext) => {
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
            ...messages.map(m => ({ role: m.sender === 'bot' ? 'assistant' : 'user', content: m.text })),
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
      return `API Error: ${data.error?.message || 'Unknown error from Groq'}`;
    } catch (error) {
      console.error(error);
      return `Network error: ${error.message}`;
    }
  };

  const handleSend = async (overrideText = null) => {
    let textToSend = overrideText || inputValue;
    if (!textToSend.trim()) return;

    if (overrideText === "Hint") {
      if (hintsRemaining > 0) {
        setHintsRemaining(prev => prev - 1);
        textToSend = `Please give me a hint for the problem. I have ${hintsRemaining - 1} hints left after this. Keep it short.`;
      } else {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: "Hint" }, { id: Date.now() + 1, sender: 'bot', text: "You have used all 3 hints! The 'Full Solution' button is now unlocked." }]);
        return;
      }
    }

    const displayUserText = overrideText === "Hint" ? "Hint" : textToSend;
    const newUserMsg = { id: Date.now(), sender: 'user', text: displayUserText };
    setMessages(prev => [...prev, newUserMsg]);
    if (!overrideText) setInputValue('');
    setIsTyping(true);

    const systemPrompt = `You are JARVIS, an expert AI coding assistant. The user is currently solving a coding problem titled "${problemData?.title}". 
    The problem description involves: ${problemData?.description?.substring(0, 300)}...
    The topics are: ${problemData?.topics?.join(', ') || 'General'}.
    If they ask for a step-by-step approach, provide a numbered list.
    If they ask for ways to code, list different approaches (e.g., brute force vs optimal).
    If they ask for the full solution, provide the complete optimal code.
    Keep responses encouraging, concise, and formatted in markdown.`;

    const botResponseText = await callGroqAPI(textToSend, systemPrompt);

    setIsTyping(false);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText
      }
    ]);
  };

  const MarkdownRenderer = ({ content }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div style={{ position: 'relative', marginTop: '10px', marginBottom: '10px', border: theme === 'dark' ? '1px solid #444' : 'none', borderRadius: '6px' }}>
              <div style={{ background: theme === 'dark' ? '#1a1a1a' : '#2d2d2d', color: '#ccc', padding: '4px 8px', fontSize: '12px', borderTopLeftRadius: '6px', borderTopRightRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{match[1]}</span>
                <CopyOutlined style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(String(children))} />
              </div>
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                customStyle={{ margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px' }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code style={{ background: theme === 'dark' ? '#1d39c4' : '#e6f4ff', color: theme === 'dark' ? '#adc6ff' : '#0958d9', padding: '2px 4px', borderRadius: '4px', fontFamily: 'monospace' }} {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );

  return (
    <Card
      style={{
        flex: 1,
        borderRadius: isFullPage ? '12px' : '8px',
        boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        border: theme === 'dark' ? '1px solid #333' : '1px solid #f0f0f0'
      }}
      bodyStyle={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}
    >
      {/* Chat Header */}
      <div style={{ padding: '12px 16px', background: theme === 'dark' ? '#1a1a1a' : '#fafafa', borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#f0f0f0'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Logo size={24} />
          <div>
            <Text strong style={{ display: 'block', lineHeight: '1.2', fontSize: '13px' }}>JARVIS</Text>
            <Badge status="success" text={<span style={{ fontSize: '11px' }}>Online</span>} />
          </div>
        </Space>
        <Tooltip title="Reset chat">
          <Button type="text" icon={<SettingOutlined />} size="small" onClick={() => {
            setMessages([{
              id: Date.now(),
              sender: 'bot',
              text: `Welcome back! Ready to work on **${problemData.title}**?`
            }]);
            setHintsRemaining(3);
          }} />
        </Tooltip>
      </div>

      {/* Chat Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: theme === 'dark' ? '#141414' : '#fff' }}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item style={{ borderBottom: 'none', padding: '8px 0', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', maxWidth: '95%' }}>
                <Avatar
                  icon={msg.sender === 'user' ? <UserOutlined /> : <Logo size={20} />}
                  style={{
                    backgroundColor: msg.sender === 'user' ? '#1677ff' : 'transparent',
                    marginLeft: msg.sender === 'user' ? '8px' : '0',
                    marginRight: msg.sender === 'user' ? '0' : '8px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  size="small"
                />
                <div>
                  <div style={{
                    background: msg.sender === 'user' ? '#1677ff' : (theme === 'dark' ? '#1f1f1f' : '#f0f0f0'),
                    color: msg.sender === 'user' ? '#fff' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)'),
                    padding: '8px 12px',
                    borderRadius: '8px',
                    borderTopRightRadius: msg.sender === 'user' ? '0' : '8px',
                    borderTopLeftRadius: msg.sender === 'bot' ? '0' : '8px',
                    border: msg.sender === 'bot' ? (theme === 'dark' ? '1px solid #333' : '1px solid #e8e8e8') : 'none',
                    fontSize: '14px'
                  }}>
                    {msg.sender === 'user' ? (
                      <Text style={{ color: '#fff' }}>{msg.text}</Text>
                    ) : (
                      <MarkdownRenderer content={msg.text} />
                    )}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '12px' }}>
            <Logo size={24} style={{ marginRight: '8px' }} />
            <div style={{ background: theme === 'dark' ? '#1f1f1f' : '#f0f0f0', padding: '8px 12px', borderRadius: '8px', borderTopLeftRadius: '0', border: theme === 'dark' ? '1px solid #333' : '1px solid #e8e8e8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div className="typing-dot" style={{ width: '4px', height: '4px', background: '#bfbfbf', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out both' }}></div>
              <div className="typing-dot" style={{ width: '4px', height: '4px', background: '#bfbfbf', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out both', animationDelay: '0.2s' }}></div>
              <div className="typing-dot" style={{ width: '4px', height: '4px', background: '#bfbfbf', borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out both', animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Options */}
      <div style={{ padding: '8px 12px', background: theme === 'dark' ? '#14141d' : '#f8f9fa', borderTop: `1px solid ${theme === 'dark' ? '#27273a' : '#e5e7eb'}` }}>
         <Row gutter={[6, 6]}>
            <Col><Button size="small" style={{ background: '#1f2937', color: '#f9fafb', borderColor: '#374151' }} onClick={() => handleSend("Step-by-step approach")}>Step-by-step approach</Button></Col>
            <Col><Button size="small" style={{ background: '#1f2937', color: '#f9fafb', borderColor: '#374151' }} onClick={() => handleSend("What are all algorithms that can be applied?")}>All algorithms</Button></Col>
            <Col><Button size="small" style={{ background: '#1f2937', color: '#f9fafb', borderColor: '#374151' }} onClick={() => handleSend("What are all the ways in which the code can be done?")}>Ways to code</Button></Col>
            <Col>
              <Button size="small" style={{ background: '#1e3a8a', color: '#93c5fd', borderColor: '#3b82f6' }} disabled={hintsRemaining <= 0} onClick={() => handleSend("Hint")}>
                Hint ({hintsRemaining})
              </Button>
            </Col>
            <Col>
              <Tooltip title={hintsRemaining > 0 ? `Use ${hintsRemaining} more hint(s) to unlock full solution` : "Show full solution"}>
                <Button size="small" type="primary" danger disabled={hintsRemaining > 0} onClick={() => handleSend("Show full solution")}>
                  Full Solution
                </Button>
              </Tooltip>
            </Col>
         </Row>
      </div>

      {/* Chat Input Box */}
      <div style={{ padding: '12px', borderTop: `1px solid ${theme === 'dark' ? '#333' : '#f0f0f0'}`, background: theme === 'dark' ? '#1a1a1a' : '#fff', flexShrink: 0 }}>
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 3 }}
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          style={{ borderRadius: '6px', marginBottom: '8px', background: theme === 'dark' ? '#0f0f0f' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}
        />
        <Row justify="space-between" align="middle">
          <Col>
            <Text type="secondary" style={{ fontSize: '11px' }}>Shift + Enter for new line</Text>
          </Col>
          <Col>
            <Button type="primary" icon={<SendOutlined />} onClick={() => handleSend()} disabled={!inputValue.trim()}>
              Send
            </Button>
          </Col>
        </Row>
      </div>
      <style>{`
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </Card>
  );
}
