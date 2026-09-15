import React, { useEffect } from 'react';
import { Typography, Row, Col, Button, Space } from 'antd';
import { 
  PlayCircleOutlined,
  ReadOutlined,
  RobotOutlined,
  VideoCameraOutlined,
  CommentOutlined,
  FileDoneOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import PremiumNotesBG from '../assets/premium_notes_bg.png';

const { Title, Text } = Typography;

const GUIDES = [
  {
    title: 'Pramp',
    description: 'Free peer-to-peer mock interview platform for practicing real interview environments.',
    icon: <CommentOutlined style={{ fontSize: '32px' }} />,
    url: 'https://www.pramp.com/',
    color: '#ff2a5f'
  },
  {
    title: 'ByteByteGo',
    description: 'Incredible system design and interview prep resources by Alex Xu.',
    icon: <ReadOutlined style={{ fontSize: '32px' }} />,
    url: 'https://bytebytego.com/',
    color: '#E03C31'
  },
  {
    title: 'Interviewing.io',
    description: 'Anonymous mock interviews with engineers from FAANG companies.',
    icon: <RobotOutlined style={{ fontSize: '32px' }} />,
    url: 'https://interviewing.io/',
    color: '#FF0055'
  },
  {
    title: 'Exponent',
    description: 'Prep courses and mock interview platform for SWE, PM, and System Design.',
    icon: <VideoCameraOutlined style={{ fontSize: '32px' }} />,
    url: 'https://www.tryexponent.com/',
    color: '#DF2935'
  },
  {
    title: 'Tech Interview Handbook',
    description: 'Free, curated interview prep materials including resume tips, algorithms, and behavioral questions.',
    icon: <FileDoneOutlined style={{ fontSize: '32px' }} />,
    url: 'https://www.techinterviewhandbook.org/',
    color: '#FF4D4F'
  },
  {
    title: 'Grokking the Interview',
    description: 'Popular interactive courses on Design-Gurus covering system design and coding patterns.',
    icon: <PlayCircleOutlined style={{ fontSize: '32px' }} />,
    url: 'https://www.designgurus.io/',
    color: '#ff5c8a'
  }
];

export default function InterviewGuides() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(rgba(18, 0, 5, 0.88), rgba(28, 0, 10, 0.95)), url(${PremiumNotesBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Crimson Pink Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(255, 0, 85, 0.12) 0%, transparent 60%)',
        filter: 'blur(120px)',
        zIndex: 0
      }} />

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 50px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '2px', fontWeight: '900', fontFamily: "'JetBrains Mono', monospace" }}>JARVIS</Title>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button type="text" style={{ color: 'rgba(255,255,255,0.6)' }} onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button type="text" style={{ color: '#ff2a5f', fontWeight: 'bold' }} onClick={() => navigate('/direct-resources')}>Back to Resources</Button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ display: 'inline-block', padding: '6px 20px', background: 'rgba(255, 0, 85, 0.15)', borderRadius: '20px', border: '1px solid rgba(255, 0, 85, 0.3)', marginBottom: '15px' }}>
            <Text style={{ color: '#ff2a5f', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '11px' }}>Premium Interview Prep</Text>
          </div>
          <Title level={1} style={{ 
            fontSize: '60px', fontWeight: '900', margin: '0 0 16px 0',
            color: '#fff', textShadow: '0 5px 20px rgba(255, 0, 85, 0.4)'
          }}>
            Interview Prep Guides
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '17px', maxWidth: '600px' }}>
            A curated list of mock interview platforms and deep-dive preparation courses to ace your dream job.
          </Text>
        </div>

        <Row gutter={[32, 32]}>
          {GUIDES.map((item, idx) => (
            <Col xs={24} md={12} key={idx}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '30px',
                padding: '40px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '30px'
              }} className="guide-card">
                <div style={{
                  width: '80px', height: '80px', minWidth: '80px', borderRadius: '24px',
                  background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, border: `1px solid ${item.color}66`
                }} className="guide-icon">
                  {item.icon}
                </div>
                
                <div style={{ flex: 1 }}>
                  <Title level={3} style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800' }}>
                    {item.title}
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', display: 'block', marginBottom: '20px' }}>
                    {item.description}
                  </Text>
                  <Button 
                    type="primary" shape="round"
                    onClick={() => window.open(item.url, '_blank')}
                    style={{ background: item.color, border: 'none', fontWeight: 'bold' }}
                    className="guide-btn"
                  >
                    Explore Guide
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        .guide-card:hover { transform: scale(1.02); background: rgba(255, 0, 85, 0.04) !important; border-color: rgba(255, 0, 85, 0.2) !important; }
        .guide-card:hover .guide-icon { transform: rotate(10deg) scale(1.1); transition: all 0.3s; }
        .guide-btn:hover { filter: brightness(1.2); box-shadow: 0 5px 15px rgba(255, 0, 85, 0.4); }
      `}</style>
    </div>
  );
}
