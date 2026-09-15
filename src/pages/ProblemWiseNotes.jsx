import React, { useEffect } from 'react';
import { Typography, Row, Col, Button, Space, Avatar } from 'antd';
import {
  ArrowLeftOutlined,
  BookOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  CodeOutlined,
  PictureOutlined,
  LineChartOutlined,
  FileTextOutlined,
  ApiOutlined,
  NodeIndexOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import PremiumNotesBG from '../assets/premium_notes_bg.png';

const { Title, Text } = Typography;

const NOTE_CATEGORIES = [
  {
    title: 'TOPIC SUMMARIES',
    desc: 'Summaries, Arrays, Strings, LL...',
    icon: <BookOutlined />,
    color: '#ff6600',
    details: 'Comprehensive topic breakdowns'
  },
  {
    title: 'PATTERN NOTES',
    desc: 'Identify & apply problem patterns',
    icon: <ApiOutlined />,
    color: '#ff8c00',
    details: 'Pattern recognition logic'
  },
  {
    title: 'TRICKS',
    desc: 'Pro-tips for efficiency, edge cases',
    icon: <BulbOutlined />,
    color: '#ffa500',
    details: 'Hidden optimizations'
  },
  {
    title: '5-LINE SHORTCUTS',
    desc: 'Efficient, compact solutions',
    icon: <CodeOutlined />,
    color: '#ff4500',
    details: 'Minimalistic code patterns'
  },
  {
    title: 'VISUAL NOTES',
    desc: 'Visualize algorithms intuitively',
    icon: <PictureOutlined />,
    color: '#ff7f50',
    details: 'Diagrammatic explanations'
  },
  {
    title: 'DP SHORTCUTS',
    desc: 'Master Dynamic Programming, memoization',
    icon: <NodeIndexOutlined />,
    color: '#ff6347',
    details: 'Optimal substructure tips'
  },
  {
    title: 'TREES & GRAPHS SHORTCUTS',
    desc: 'Traversals, paths, connectivity',
    icon: <LineChartOutlined />,
    color: '#d2691e',
    details: 'Graph theory essentials'
  },
  {
    title: 'ONE-PAGE CHEAT SHEETS',
    desc: 'Consolidated, downloadable revision sheets',
    icon: <FileTextOutlined />,
    color: '#e67e22',
    details: 'Last minute revision'
  },
  {
    title: 'MEMORY MAPS & FLOW DIAGRAMS',
    desc: 'Visual algorithm flow & memory maps',
    icon: <ThunderboltOutlined />,
    color: '#f39c12',
    details: 'Complex logic mapping'
  }
];

export default function ProblemWiseNotes() {
  const navigate = useNavigate();
  
  useEffect(() => {
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url(${PremiumNotesBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '80px 40px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Background Decorative Glows & Interactive Orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '0%',
        width: '1000px',
        height: '1000px',
        background: 'radial-gradient(circle, rgba(255, 107, 0, 0.18) 0%, transparent 75%)',
        filter: 'blur(160px)',
        zIndex: 0,
        animation: 'float 25s infinite alternate'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '0%',
        left: '-10%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(255, 69, 0, 0.12) 0%, transparent 75%)',
        filter: 'blur(140px)',
        zIndex: 0,
        animation: 'float 30s infinite alternate-reverse'
      }} />

      {/* Floating Interactive Particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 250 + 150 + 'px',
          height: Math.random() * 250 + 150 + 'px',
          background: `radial-gradient(circle, rgba(255, 165, 0, ${Math.random() * 0.04 + 0.03}) 0%, transparent 70%)`,
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          filter: 'blur(50px)',
          zIndex: 0,
          animation: `pulse ${Math.random() * 4 + 4}s infinite alternate`,
          animationDelay: `${Math.random() * 3}s`
        }} />
      ))}

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
      <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'inline-block',
          padding: '10px 42px',
          background: 'linear-gradient(90deg, #ff6600, #ffcc00)',
          borderRadius: '14px',
          marginBottom: '15px',
          boxShadow: '0 0 50px rgba(255, 102, 0, 0.4)',
          position: 'relative'
        }}>
          <Title level={1} style={{
            fontSize: '32px',
            fontWeight: '950',
            margin: 0,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            textShadow: '0 2px 10px rgba(0,0,0,0.4)'
          }}>
            Problem-Wise Premium Notes
          </Title>
        </div>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Text style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.4)',
            display: 'block',
            marginBottom: '10px',
            fontWeight: '500',
            letterSpacing: '0.5px'
          }}>
            Master core algorithmic patterns and problem-solving techniques with our structured premium notes.
          </Text>
          <div className="glowing-underline-orange" style={{ width: '180px', margin: '0 auto' }}></div>
        </div>
      </div>

      {/* 3x3 Grid */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <Row gutter={[48, 48]}>
          {NOTE_CATEGORIES.map((cat, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <div
                className="glass-card note-category-card"
                onClick={() => navigate(`/premium-content/${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`)}
                style={{
                  background: 'rgba(15, 8, 4, 0.45)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 102, 0, 0.12)',
                  borderRadius: '20px',
                  padding: '18px 22px',
                  height: '100%',
                  minHeight: '130px',
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Dynamic Inner Glow */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 50% 120%, ${cat.color}15, transparent 75%)`,
                  zIndex: 0
                }} />

                {/* Left Section: Icon Box */}
                <div className="note-icon-container" style={{
                  width: '72px',
                  height: '72px',
                  minWidth: '72px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  border: `2px solid ${cat.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  color: cat.color,
                  boxShadow: `0 0 35px ${cat.color}33, inset 0 0 20px ${cat.color}22`,
                  filter: `drop-shadow(0 0 12px ${cat.color}88)`,
                  position: 'relative',
                  zIndex: 1,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: 'iconPulse 3s infinite ease-in-out'
                }}>
                  {cat.icon}
                  <div style={{
                    position: 'absolute',
                    inset: -2,
                    border: `2px solid ${cat.color}22`,
                    borderRadius: '20px',
                    animation: 'glowPulse 2s infinite alternate'
                  }} />
                </div>

                {/* Right Section: Content */}
                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'inline-block', padding: '2px 10px', background: `${cat.color}15`, borderRadius: '8px', border: `1px solid ${cat.color}25`, marginBottom: '8px' }}>
                    <Text style={{ color: cat.color, fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {cat.title}
                    </Text>
                  </div>
                  <Title level={4} style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '14px',
                    margin: 0,
                    lineHeight: '1.5',
                    fontWeight: '600',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {cat.desc}
                  </Title>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        @keyframes iconPulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        @keyframes glowPulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.15); opacity: 0.5; }
        }
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(40px, -20px) rotate(3deg); }
          100% { transform: translate(-20px, 30px) rotate(-3deg); }
        }
        .note-category-card {
          border: 1px solid rgba(255, 102, 0, 0.15) !important;
        }
        .note-category-card:hover {
          transform: translateY(-12px) scale(1.03);
          border-color: rgba(255, 102, 0, 0.6) !important;
          background: rgba(40, 20, 10, 0.75) !important;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 102, 0, 0.3);
        }
        .note-category-card:hover .note-icon-container {
          transform: scale(1.15) translateY(-5px);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 45px rgba(255, 102, 0, 0.5);
          filter: drop-shadow(0 0 30px #fff);
        }
        .glowing-underline-orange {
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff6600, #ffcc00, transparent);
          box-shadow: 0 0 15px rgba(255, 102, 0, 0.6);
        }
      `}</style>
    </div>
  );
}
