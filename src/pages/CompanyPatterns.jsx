import React, { useEffect } from 'react';
import { Typography, Row, Col, Button, Space, Avatar } from 'antd';
import { 
  ArrowLeftOutlined, 
  ThunderboltOutlined,
  UnlockOutlined,
  AmazonOutlined,
  AppleOutlined,
  WindowsOutlined,
  GlobalOutlined,
  CodeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import PremiumNotesBG from '../assets/premium_notes_bg.png';

const { Title, Text } = Typography;

const COMPANY_DATA = [
  {
    name: 'Amazon',
    logo: <AmazonOutlined />,
    color: '#ff9900',
    patterns: ['Dynamic Programming', 'Trees', 'Graph Algorithms', 'Linked Lists'],
    difficulty: 'Medium-Hard',
    difficultyColor: '#ffcc00',
    path: '/company/amazon'
  },
  {
    name: 'Google',
    logo: <SearchOutlined />, // Google substitute
    color: '#4285F4',
    patterns: ['Array & String', 'Graph Traversal', 'Binary Search', 'Trees & Heaps'],
    difficulty: 'Hard',
    difficultyColor: '#ff4d4f',
    path: '/company/google'
  },
  {
    name: 'Meta',
    logo: <GlobalOutlined />, // Meta substitute
    color: '#0668E1',
    patterns: ['Matrix', 'Backtracking', 'Trees', 'Dynamic Programming'],
    difficulty: 'Medium-Hard',
    difficultyColor: '#ffcc00',
    path: '/company/meta'
  },
  {
    name: 'Microsoft',
    logo: <WindowsOutlined />,
    color: '#00A4EF',
    patterns: ['Linked Lists', 'Tries', 'Sorting & Searching', 'Greedy Algorithms'],
    difficulty: 'Medium',
    difficultyColor: '#00ff88',
    path: '/company/microsoft'
  },
  {
    name: 'Apple',
    logo: <AppleOutlined />,
    color: '#A2AAAD',
    patterns: ['Sliding Window', 'Two Pointers', 'Stacks & Queues', 'Trees'],
    difficulty: 'Medium-Hard',
    difficultyColor: '#ffcc00',
    path: '/company/apple'
  },
  {
    name: 'Netflix',
    logo: <CodeOutlined />, // Netflix substitute
    color: '#E50914',
    patterns: ['Dynamic Programming', 'Graph Traversal', 'Trees', 'Arrays & Hashing'],
    difficulty: 'Hard',
    difficultyColor: '#ff4d4f',
    path: '/company/netflix'
  }
];

export default function CompanyPatterns() {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)), url(${PremiumNotesBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '60px 20px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Background Decorative Glows */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '0%',
        width: '900px',
        height: '900px',
        background: 'radial-gradient(circle, rgba(0, 242, 255, 0.1) 0%, transparent 70%)',
        filter: 'blur(150px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%)',
        filter: 'blur(120px)',
        zIndex: 0
      }} />

      {/* Header / Nav */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '60px',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto 40px auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '2px', fontWeight: '900', fontFamily: "'JetBrains Mono', monospace" }}>JARVIS</Title>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
          <Button type="text" style={{ color: '#fff', padding: '0 15px' }} onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          <Button type="text" style={{ color: '#fff', fontSize: '13px', padding: '0 15px' }} onClick={() => navigate('/premium-notes')}>Go Back</Button>
        </div>
      </div>

      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 10 }}>
        <Title level={1} style={{ 
          fontSize: '72px', 
          fontWeight: '950', 
          margin: '0 0 16px 0',
          letterSpacing: '-3px',
          background: 'linear-gradient(90deg, #ccff00, #00ff88)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 60px rgba(0, 255, 136, 0.3)'
        }}>
          Company Patterns
        </Title>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Text style={{ 
            fontSize: '18px', 
            color: 'rgba(255,255,255,0.4)', 
            display: 'block', 
            marginBottom: '20px',
            fontWeight: '500'
          }}>
            Master company-specific coding strategies asked in top-tier tech interviews.
          </Text>
          <div className="glowing-underline" style={{ width: '200px', margin: '0 auto' }}></div>
        </div>
      </div>

      {/* Company Grid */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          {COMPANY_DATA.map((company) => (
            <Col xs={24} sm={12} lg={8} key={company.name}>
              <div 
                className="glass-card company-pattern-card"
                style={{
                  padding: '24px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: '16px'
                }}
              >
                {/* Decorative Light Node */}
                <div style={{
                  position: 'absolute',
                  top: '-60px',
                  right: '-60px',
                  width: '180px',
                  height: '180px',
                  background: `radial-gradient(circle, ${company.color}15 0%, transparent 70%)`,
                  zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ 
                        width: '56px', 
                        height: '56px', 
                        borderRadius: '16px',
                        background: `${company.color}10`,
                        border: `1px solid ${company.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: company.color,
                        fontSize: '28px',
                        boxShadow: `0 0 20px ${company.color}15`
                      }}>
                        {company.logo}
                      </div>
                      <Title level={3} style={{ color: '#fff', margin: 0, fontWeight: '800', fontSize: '26px', letterSpacing: '-0.5px' }}>
                        {company.name}
                      </Title>
                    </div>
                    <div style={{
                      background: 'rgba(188, 19, 254, 0.12)',
                      padding: '5px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(188, 19, 254, 0.25)',
                      boxShadow: '0 0 15px rgba(188, 19, 254, 0.1)'
                    }}>
                      <Text style={{ color: '#bc13fe', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Premium
                      </Text>
                    </div>
                  </div>

                  {/* Patterns List */}
                  <div style={{ flex: 1, marginBottom: '20px' }}>
                    <Text style={{ 
                      color: 'rgba(255,255,255,0.3)', 
                      fontSize: '11px', 
                      display: 'block', 
                      marginBottom: '16px', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1.5px', 
                      fontWeight: '800' 
                    }}>
                      Core Patterns
                    </Text>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {company.patterns.map((pattern, idx) => (
                        <li key={idx} style={{ 
                          color: 'rgba(255,255,255,0.85)', 
                          fontSize: '16px', 
                          marginBottom: '12px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px',
                          fontWeight: '500' 
                        }}>
                          <span style={{ 
                            width: '6px', 
                            height: '6px', 
                            borderRadius: '50%', 
                            background: company.color,
                            boxShadow: `0 0 10px ${company.color}`
                          }}></span>
                          {pattern}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Stats & Button */}
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <div>
                        <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Difficulty</Text>
                        <Text style={{ color: company.difficultyColor, fontSize: '16px', fontWeight: '900', textShadow: `0 0 10px ${company.difficultyColor}44` }}>{company.difficulty}</Text>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <ThunderboltOutlined style={{ color: company.difficultyColor, fontSize: '20px', filter: 'drop-shadow(0 0 8px rgba(255, 77, 79, 0.2))' }} />
                        <ThunderboltOutlined style={{ color: company.difficulty === 'Medium' ? 'rgba(255,255,255,0.05)' : company.difficultyColor, fontSize: '20px' }} />
                        <ThunderboltOutlined style={{ color: company.difficulty === 'Hard' ? company.difficultyColor : 'rgba(255,255,255,0.05)', fontSize: '20px' }} />
                      </div>
                    </div>

                    <Button 
                      type="primary" 
                      block 
                      icon={<UnlockOutlined />}
                      className="unlock-btn"
                      onClick={() => navigate(company.path)}
                      style={{ 
                        height: '52px',
                        borderRadius: '18px',
                        background: 'linear-gradient(90deg, #0072ff, #00c6ff)',
                        border: 'none',
                        fontWeight: '900',
                        fontSize: '16px',
                        letterSpacing: '1px',
                        boxShadow: '0 0 20px rgba(0, 198, 255, 0.3)',
                        color: '#fff',
                        textTransform: 'uppercase'
                      }}
                    >
                      Unlock Insights
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        .company-pattern-card:hover {
          transform: translateY(-12px) scale(1.01);
          border-color: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.7);
          background: rgba(255, 255, 255, 0.06) !important;
        }
        .unlock-btn {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .unlock-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 35px rgba(188, 19, 254, 0.4) !important;
          filter: brightness(1.1);
        }
      `}</style>
    </div>
  );
}
