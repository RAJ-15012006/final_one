import React, { useEffect } from 'react';
import { Typography, Row, Col, Button, Space } from 'antd';
import { 
  CodeOutlined,
  TrophyOutlined,
  RocketOutlined,
  BulbOutlined,
  ConsoleSqlOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import CodingRoomBG from '../assets/coding_room_bg.png'; // Using coding background for practice

const { Title, Text } = Typography;

const PLATFORMS = [
  {
    title: 'LeetCode',
    description: 'The golden standard platform for coding interviews and daily challenges.',
    icon: <CodeOutlined style={{ fontSize: '32px', color: '#ffaa00' }} />,
    url: 'https://leetcode.com/',
    color: '#ffaa00'
  },
  {
    title: 'HackerRank',
    description: 'Great for learning specific domains and language-specific challenges.',
    icon: <ConsoleSqlOutlined style={{ fontSize: '32px', color: '#00EA64' }} />,
    url: 'https://www.hackerrank.com/',
    color: '#00EA64'
  },
  {
    title: 'Codeforces',
    description: 'Competitive programming platform hosting frequent intense math/algorithmic contests.',
    icon: <TrophyOutlined style={{ fontSize: '32px', color: '#1F8ACB' }} />,
    url: 'https://codeforces.com/',
    color: '#1F8ACB'
  },
  {
    title: 'CodeSignal',
    description: 'Used by many companies for OA (Online Assessments) with an arcade practice mode.',
    icon: <RocketOutlined style={{ fontSize: '32px', color: '#FF4D4D' }} />,
    url: 'https://codesignal.com/',
    color: '#FF4D4D'
  },
  {
    title: 'AtCoder',
    description: 'High-quality Japanese competitive programming platform known for DP and Math problems.',
    icon: <BulbOutlined style={{ fontSize: '32px', color: '#000000', filter: 'drop-shadow(0 0 5px #fff)' }} />,
    url: 'https://atcoder.jp/',
    color: '#ffffff'
  },
  {
    title: 'Spoj',
    description: 'Classic competitive programming site with a massive archive of algorithmic puzzles.',
    icon: <ThunderboltOutlined style={{ fontSize: '32px', color: '#005CE6' }} />,
    url: 'https://www.spoj.com/',
    color: '#005CE6'
  }
];

export default function PracticePlatforms() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 10, 5, 0.85), rgba(0, 20, 10, 0.95)), url(${CodingRoomBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Matrix Green Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '20%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0
      }} />

      {/* Header / Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 40px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '2px', fontWeight: '900', fontFamily: "'JetBrains Mono', monospace" }}>JARVIS</Title>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Button type="text" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button type="primary" ghost style={{ borderColor: '#00ff88', color: '#00ff88' }} onClick={() => navigate('/direct-resources')}>Go Back</Button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <Title level={1} style={{ 
            fontSize: '56px', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 10px 0',
            background: 'linear-gradient(90deg, #ccff00, #00ff88)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(0, 255, 136, 0.4)'
          }}>
            Practice Platforms
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', fontWeight: '500' }}>
            Top destinations for honing your competitive coding and interview skills.
          </Text>
        </div>

        <Row gutter={[40, 40]}>
          {PLATFORMS.map((item, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <div style={{
                background: 'rgba(0, 255, 136, 0.02)',
                borderRadius: '16px',
                border: `1px solid rgba(0, 255, 136, 0.1)`,
                borderTop: `3px solid ${item.color}`,
                padding: '40px 30px',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }} className="practice-card">
                <Space style={{ marginBottom: '20px' }}>
                  <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex' }}>
                    {item.icon}
                  </div>
                  <Title level={3} style={{ color: '#fff', margin: 0, fontSize: '22px', fontWeight: '800' }}>
                    {item.title}
                  </Title>
                </Space>
                <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', marginBottom: '30px', flex: 1, lineHeight: '1.6' }}>
                  {item.description}
                </Text>
                
                <Button 
                  shape="square"
                  onClick={() => window.open(item.url, '_blank')}
                  style={{
                    background: 'transparent', border: `1px solid ${item.color}`, color: item.color, height: '48px',
                    fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px'
                  }}
                  className="practice-btn"
                >
                  START CODING
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        .practice-card:hover {
          transform: translateY(-8px);
          background: rgba(0, 255, 136, 0.05) !important;
          border-color: rgba(0, 255, 136, 0.3) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 255, 136, 0.1);
        }
        .practice-btn { transition: all 0.3s ease; }
        .practice-card:hover .practice-btn { background: rgba(255, 255, 255, 0.1) !important; color: #fff !important; }
      `}</style>
    </div>
  );
}
