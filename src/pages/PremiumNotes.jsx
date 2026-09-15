import React, { useEffect } from 'react';
import { Typography, Button, Space, Card, Row, Col } from 'antd';
import { 
  ArrowLeftOutlined, 
  BookOutlined, 
  LinkOutlined, 
  CrownOutlined,
  CalendarOutlined,
  BellOutlined,
  DoubleRightOutlined
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import BlueNetworkBG from '../assets/blue_network_bg.png';

const { Title, Text } = Typography;

export default function PremiumNotes() {
  const navigate = useNavigate();
  
  useEffect(() => {
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85)), url(${BlueNetworkBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '40px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Background Decorative Glows & Interactive Orbs */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '15%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(188, 19, 254, 0.2) 0%, transparent 70%)',
        filter: 'blur(120px)',
        zIndex: 0,
        animation: 'pulse 10s infinite alternate'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '5%',
        width: '900px',
        height: '900px',
        background: 'radial-gradient(circle, rgba(0, 242, 255, 0.12) 0%, transparent 70%)',
        filter: 'blur(150px)',
        zIndex: 0,
        animation: 'pulse 15s infinite alternate-reverse'
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 0, 255, 0.08) 0%, transparent 70%)',
        filter: 'blur(90px)',
        zIndex: 0,
        animation: 'pulse 12s infinite alternate'
      }} />

      {/* Header / Nav */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '80px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '2px', fontWeight: '900', fontFamily: "'JetBrains Mono', monospace" }}>JARVIS</Title>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Button type="text" style={{ color: '#fff' }} onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'rgba(255,255,255,0.05)', 
          padding: '6px 16px', 
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '10px'
        }}>
          <CrownOutlined style={{ color: '#ffcc00' }} />
          <Text style={{ color: '#fff', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Premium Access</Text>
        </div>

        <h1 style={{ 
          fontSize: '80px', 
          fontWeight: '900', 
          margin: '0 0 10px 0',
          lineHeight: '1.0',
          background: 'linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.5) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: "'Inter', sans-serif"
        }}>
          Links and Notes
        </h1>
        
        <Text style={{ 
          fontSize: '18px', 
          color: 'rgba(255,255,255,0.45)', 
          maxWidth: '650px', 
          display: 'block', 
          margin: '0 auto 20px auto',
          fontWeight: '500',
          lineHeight: '1.6'
        }}>
          Master company-specific interview strategies and premium coding patterns designed for top-tier tech performance.
        </Text>
        <div className="glowing-underline" style={{ width: '250px', margin: '0 auto', opacity: 0.5 }}></div>
      </div>

      {/* Feature Section - Responsive Grid Layout */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 60px' }}>
        <Row gutter={[64, 64]}>
          {/* Option 1: Problemwise Premium Notes */}
          <Col xs={24} lg={12}>
            <div 
              className="premium-feature-card" 
              onClick={() => navigate('/problem-wise-notes')}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 102, 0, 0.1) 0%, rgba(0,0,0,0.6) 100%)',
                border: '1px solid rgba(255, 102, 0, 0.2)',
                borderRadius: '32px',
                padding: '60px 40px',
                minHeight: '240px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Title level={2} style={{ 
                color: '#fff', 
                fontSize: '32px', 
                fontWeight: '900', 
                fontFamily: "'Inter', sans-serif",
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textShadow: '0 0 20px rgba(255, 102, 0, 0.3)'
              }}>
                Problemwise Premium Notes
              </Title>
              <Button 
                type="primary" 
                size="large" 
                shape="round" 
                style={{ 
                  height: '52px',
                  padding: '0 50px',
                  background: 'linear-gradient(90deg, #ff6600, #ffcc00)', 
                  border: 'none',
                  fontWeight: '900',
                  fontSize: '16px',
                  boxShadow: '0 0 20px rgba(255, 102, 0, 0.3)'
                }}
              >
                START READING
              </Button>
            </div>
          </Col>

          {/* Option 2: Direct links to resources */}
          <Col xs={24} lg={12}>
            <div 
              className="premium-feature-card" 
              onClick={() => navigate('/direct-resources')}
              style={{
                background: 'linear-gradient(135deg, rgba(188, 19, 254, 0.1) 0%, rgba(0,0,0,0.6) 100%)',
                border: '1px solid rgba(188, 19, 254, 0.2)',
                borderRadius: '32px',
                padding: '60px 40px',
                minHeight: '240px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Title level={2} style={{ 
                color: '#fff', 
                fontSize: '32px', 
                fontWeight: '900', 
                fontFamily: "'Inter', sans-serif",
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textShadow: '0 0 20px rgba(188, 19, 254, 0.3)'
              }}>
                Direct links on handpicked notes
              </Title>
              <Button 
                type="primary" 
                size="large" 
                shape="round" 
                style={{ 
                  height: '52px',
                  padding: '0 50px',
                  background: 'linear-gradient(90deg, #bc13fe, #ff00ff)', 
                  border: 'none',
                  fontWeight: '900',
                  fontSize: '16px',
                  boxShadow: '0 0 20px rgba(188, 19, 254, 0.3)'
                }}
              >
                START READING
              </Button>
            </div>
          </Col>

          {/* Option 3: Company coding patterns */}
          <Col xs={24} lg={12}>
            <div 
              className="premium-feature-card"
              onClick={() => navigate('/company-patterns')}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0,0,0,0.6) 100%)',
                border: '1px solid rgba(0, 255, 136, 0.2)',
                borderRadius: '32px',
                padding: '60px 40px',
                minHeight: '240px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Title level={2} style={{ 
                color: '#fff',
                fontSize: '32px', 
                fontWeight: '900', 
                fontFamily: "'Inter', sans-serif",
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
              }}>
                Company coding patterns
              </Title>
              <Button 
                type="primary" 
                size="large" 
                shape="round" 
                style={{ 
                  height: '52px',
                  padding: '0 50px',
                  background: 'linear-gradient(90deg, #ccff00, #00ff88)', 
                  border: 'none',
                  fontWeight: '900',
                  fontSize: '16px',
                  boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                  pointerEvents: 'none'
                }}
              >
                START READING
              </Button>
            </div>
          </Col>

          {/* Option 4: Topic wise mistake section */}
          <Col xs={24} lg={12}>
            <div 
              className="premium-feature-card" 
              onClick={() => navigate('/topic-wise-mistakes')}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 242, 255, 0.1) 0%, rgba(0,0,0,0.6) 100%)',
                border: '1px solid rgba(0, 242, 255, 0.2)',
                borderRadius: '32px',
                padding: '60px 40px',
                minHeight: '240px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Title level={2} style={{ 
                color: '#fff', 
                fontSize: '32px', 
                fontWeight: '900', 
                fontFamily: "'Inter', sans-serif",
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textShadow: '0 0 20px rgba(0, 242, 255, 0.3)'
              }}>
                Topic wise mistake section
              </Title>
              <Button 
                type="primary" 
                size="large" 
                shape="round" 
                style={{ 
                  height: '52px',
                  padding: '0 50px',
                  background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', 
                  border: 'none',
                  fontWeight: '900',
                  fontSize: '16px',
                  boxShadow: '0 0 20px rgba(0, 242, 255, 0.3)'
                }}
              >
                START READING
              </Button>
            </div>
          </Col>

        </Row>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.1); opacity: 0.7; }
        }
        .premium-feature-card:hover {
          transform: translateY(-16px) scale(1.03);
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.4) !important;
          box-shadow: 0 50px 100px rgba(0,0,0,0.7);
        }
        h1 {
            letter-spacing: -4px;
        }
        .glowing-underline {
          height: 2px;
          background: linear-gradient(90deg, transparent, #00f2ff, #bc13fe, transparent);
          box-shadow: 0 0 20px rgba(0, 242, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
