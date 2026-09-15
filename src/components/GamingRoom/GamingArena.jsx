import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Tag, Space } from 'antd';
import { 
  ClockCircleOutlined, 
  SendOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { problems } from '../../data/problems';
import { useAuth } from '../../context/AuthContext';

const { Text, Title } = Typography;

export default function GamingArena({ settings, onFinish }) {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(settings.time * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [errorFeedback, setErrorFeedback] = useState(null);
  const [showErrorLine, setShowErrorLine] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // Select random question based on settings
  const [question] = useState(() => {
    const filtered = problems.filter(p => p.difficulty === settings.difficulty && p.topics.includes(settings.topic));
    if (filtered.length > 0) {
      const q = filtered[Math.floor(Math.random() * filtered.length)];
      setUserCode(q.boilerplate);
      return q;
    }
    setUserCode(problems[0].boilerplate);
    return problems[0];
  });

  const [players] = useState(() => {
    const p = [{ id: 1, name: user?.name || 'Player 1', isUser: true, code: question.boilerplate }];
    const names = ['CyberCoder', 'NeoByte', 'BitMaster', 'ByteKnight'];
    for (let i = 1; i < settings.players; i++) {
      p.push({ id: i + 1, name: names[i - 1], isUser: false, code: question.boilerplate });
    }
    return p;
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRun = () => {
    if (isFinished) return;
    setIsRunning(true);
    setErrorFeedback(null);
    setShowErrorLine(false);
    
    setTimeout(() => {
      const isBoilerplate = userCode.trim() === question.boilerplate.trim();
      const hasLogic = userCode.length > question.boilerplate.length + 20;

      if (isBoilerplate || !hasLogic) {
        setErrorFeedback("COMPILATION ERROR: Unexpected token or missing logic in main execution thread.");
        setShowErrorLine(true);
      } else {
        setErrorFeedback(null); // Success
      }
      setIsRunning(false);
    }, 1000);
  };

  const handleValidation = (codeToValidate) => {
    if (isFinished) return;
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const code = codeToValidate || userCode;
      const isBoilerplate = code.trim() === question.boilerplate.trim();
      const hasLogic = code.length > question.boilerplate.length + 20;

      if (isBoilerplate || !hasLogic) {
        setErrorFeedback("SYNTAX ERROR: No logic implementation detected in core module.");
        setIsSubmitting(false);
        // If it was an auto-submit from timer, we still finish but with 0 points
        if (!codeToValidate) {
            setIsFinished(true);
            onFinish({ rank: 4, xp: 0, solved: false });
        }
      } else {
        setIsFinished(true);
        onFinish({ rank: 1, xp: 500, solved: true });
      }
    }, 1500);
  };

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleValidation(); // Auto-submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, userCode]); // Re-subscribe if needed, but isFinished is the key guard

  const getColSpan = () => {
    if (settings.players === 2) return 12;
    if (settings.players === 3) return 8;
    return 6;
  };

  return (
    <div style={{ 
      height: 'calc(100vh - 120px)', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      background: '#05050a',
      padding: '20px',
      borderRadius: '20px',
      overflow: 'hidden'
    }}>
      {/* Background Grid Effect */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(0, 210, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 210, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: 0
      }}></div>

      {/* Top Right Controls (Timer & Room Code) */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '15px'
      }}>
        {/* Timer */}
        <div style={{
          background: 'rgba(0,0,0,0.8)',
          border: '2px solid #00D2FF',
          padding: '8px 25px',
          borderRadius: '10px',
          boxShadow: '0 0 30px rgba(0, 210, 255, 0.4)',
          textAlign: 'center',
          minWidth: '160px'
        }}>
          <Text style={{ 
            color: '#00D2FF', 
            fontSize: '32px', 
            fontWeight: '900', 
            fontFamily: "'JetBrains Mono', monospace",
            display: 'block',
            lineHeight: '1',
            textShadow: '0 0 10px #00D2FF'
          }}>
            {formatTime(timeLeft)}
          </Text>
          <Text style={{ color: 'rgba(0, 210, 255, 0.5)', fontSize: '9px', fontWeight: 'bold', letterSpacing: '2px' }}>SYSTEM TIME</Text>
        </div>

        {/* Room Code */}
        <div style={{
          background: 'rgba(0,0,0,0.9)',
          border: '1px solid #FF6B00',
          padding: '8px 20px',
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(255, 107, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '160px'
        }}>
          <Text style={{ color: 'rgba(255, 107, 0, 0.5)', fontSize: '8px', fontWeight: 'bold', letterSpacing: '2px' }}>SECURE ROOM CODE</Text>
          <Text style={{ color: '#FF6B00', fontSize: '18px', fontWeight: '900', letterSpacing: '3px' }}>{settings.roomCode}</Text>
        </div>
      </div>

      {/* Question Info Overlay */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: '20px', maxWidth: 'calc(100% - 400px)' }}>
         <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px 25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <Space size={20}>
                    <Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>{settings.topic}</Tag>
                    <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '1px' }}>MISSION: {question.title}</Title>
                </Space>
                <div 
                    className="custom-scrollbar"
                    style={{ 
                        color: 'rgba(255,255,255,0.85)', 
                        fontSize: '13px', 
                        lineHeight: '1.6',
                        maxHeight: '100px',
                        overflowY: 'auto',
                        paddingRight: '10px'
                    }}
                    dangerouslySetInnerHTML={{ __html: question.description }}
                />
            </Space>
         </div>
      </div>

      {/* Arena Split Screen */}
      <Row gutter={10} style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {players.map((player) => (
          <Col key={player.id} span={getColSpan()} style={{ height: '100%' }}>
            <div style={{
              height: '100%',
              background: 'rgba(0,0,0,0.8)',
              border: `2px solid ${player.isUser ? '#00D2FF' : 'rgba(255, 107, 0, 0.3)'}`,
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}>
              {/* Player Header */}
              <div style={{ 
                padding: '12px 20px', 
                background: player.isUser ? 'rgba(0, 210, 255, 0.1)' : 'rgba(255, 107, 0, 0.05)',
                borderBottom: `1px solid ${player.isUser ? '#00D2FF' : 'rgba(255, 107, 0, 0.3)'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Space>
                  <UserOutlined style={{ color: player.isUser ? '#00D2FF' : '#FF6B00' }} />
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>{player.name}</Text>
                  {player.isUser && <Tag color="orange" size="small">YOU</Tag>}
                </Space>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: player.isUser ? '#FF6B00' : '#333', boxShadow: player.isUser ? '0 0 10px #FF6B00' : 'none' }}></div>
              </div>

              {/* Editor Area */}
              <div style={{ flex: 1, overflow: 'hidden', padding: '10px', background: '#0a0a0f', position: 'relative' }}>
                {player.isUser ? (
                  <textarea
                    value={userCode}
                    onChange={(e) => {
                        setUserCode(e.target.value);
                        setErrorFeedback(null);
                    }}
                    placeholder="Implement logic here..."
                    spellCheck="false"
                    className={`custom-scrollbar ${showErrorLine ? 'error-line-active' : ''}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: '#00D2FF',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      lineHeight: '20px',
                      resize: 'none',
                      outline: 'none',
                      padding: '5px',
                      zIndex: 1,
                      position: 'relative',
                    }}
                  />
                ) : (
                  <SyntaxHighlighter
                    language="java"
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, background: 'transparent', height: '100%', fontSize: '12px' }}
                  >
                    {player.code}
                  </SyntaxHighlighter>
                )}
                
                {player.isUser && errorFeedback && (
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    right: '10px',
                    background: 'rgba(255, 77, 79, 0.1)',
                    border: '1px solid #ff4d4f',
                    padding: '8px 15px',
                    borderRadius: '4px',
                    color: '#ff4d4f',
                    fontSize: '11px',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    animation: 'shake 0.5s ease-in-out'
                  }}>
                    <span style={{ fontWeight: 'bold' }}>[FAILED]</span> {errorFeedback}
                  </div>
                )}
              </div>

              {/* Submission Footer */}
              <div style={{ 
                padding: '15px', 
                background: 'rgba(255,255,255,0.02)', 
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                gap: '10px'
              }}>
                <Button 
                    type="default"
                    loading={player.isUser && isRunning}
                    disabled={!player.isUser || isFinished}
                    onClick={handleRun}
                    style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.05)',
                        borderColor: 'rgba(0, 210, 255, 0.3)',
                        color: '#00D2FF',
                        fontWeight: 'bold',
                        height: '40px'
                    }}
                >
                    {isRunning ? 'RUNNING...' : 'RUN CODE'}
                </Button>
                <Button 
                  type="primary" 
                  loading={player.isUser && isSubmitting}
                  disabled={!player.isUser || isFinished}
                  icon={!isSubmitting && <SendOutlined />}
                  onClick={() => handleValidation(userCode)}
                  style={{
                    flex: 2,
                    background: player.isUser ? '#FF6B00' : 'transparent',
                    borderColor: player.isUser ? '#FF6B00' : 'rgba(255,255,255,0.1)',
                    color: player.isUser ? '#fff' : 'rgba(255,255,255,0.2)',
                    fontWeight: '900',
                    height: '40px'
                  }}
                >
                  {player.isUser ? (isSubmitting ? 'VALIDATING...' : 'SUBMIT CODE') : 'IN PROGRESS...'}
                </Button>
              </div>

              {/* Scanline Effect for simulated players */}
              {!player.isUser && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, height: '2px',
                  background: 'rgba(255, 107, 0, 0.2)',
                  animation: 'scan 4s linear infinite',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}></div>
              )}
            </div>
          </Col>
        ))}
      </Row>



      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .gaming-font {
          font-family: 'JetBrains Mono', monospace;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 210, 255, 0.2); border-radius: 10px; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .error-line-active {
            background-image: linear-gradient(transparent 58px, rgba(255, 77, 79, 0.4) 58px, rgba(255, 77, 79, 0.4) 60px, transparent 60px) !important;
            background-size: 100% 20px;
        }
      `}</style>
    </div>
  );
}
