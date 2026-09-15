import React, { useEffect } from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { 
  ThunderboltOutlined,
  BookOutlined,
  CodeOutlined,
  GlobalOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import HandpickedNotesBG from '../assets/handpicked_notes_bg.png'; // Reusing theme background

const { Title, Text } = Typography;

const CHEAT_SHEETS = [
  {
    title: 'Big-O Cheat Sheet',
    description: 'The definitive guide to time and space complexity for data structures and sorting algorithms.',
    icon: <ThunderboltOutlined style={{ fontSize: '32px', color: '#00f2ff' }} />,
    url: 'https://www.bigocheatsheet.com/',
    color: '#00f2ff'
  },
  {
    title: 'NeetCode Roadmap',
    description: 'Structured algorithms and data structures roadmap and cheat sheets by NeetCode.',
    icon: <CodeOutlined style={{ fontSize: '32px', color: '#bc13fe' }} />,
    url: 'https://neetcode.io/roadmap',
    color: '#bc13fe'
  },
  {
    title: 'Tech Interview Handbook',
    description: 'Comprehensive algorithm study cheat sheets for technical interviews.',
    icon: <BookOutlined style={{ fontSize: '32px', color: '#ffcc00' }} />,
    url: 'https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/',
    color: '#ffcc00'
  },
  {
    title: 'GeeksforGeeks DSA',
    description: 'In-depth reference for all data structures and algorithms, perfect for quick brush-ups.',
    icon: <GlobalOutlined style={{ fontSize: '32px', color: '#00ff88' }} />,
    url: 'https://www.geeksforgeeks.org/data-structures/',
    color: '#00ff88'
  },
  {
    title: 'JavaScript Algorithms',
    description: 'Popular GitHub repository containing examples of many popular algorithms and data structures.',
    icon: <StarOutlined style={{ fontSize: '32px', color: '#ff4d4f' }} />,
    url: 'https://github.com/trekhleb/javascript-algorithms',
    color: '#ff4d4f'
  },
  {
    title: 'Blind 75 LeetCode',
    description: 'The most famous curated list of 75 essential LeetCode questions.',
    icon: <BookOutlined style={{ fontSize: '32px', color: '#00A4EF' }} />,
    url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions',
    color: '#00A4EF'
  }
];

export default function DsaCheatSheets() {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.8)), url(${HandpickedNotesBG})`,
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
        background: 'radial-gradient(circle, rgba(188, 19, 254, 0.15) 0%, transparent 70%)',
        filter: 'blur(150px)',
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
        maxWidth: '1200px',
        margin: '0 auto 40px auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '2px', fontWeight: '900', fontFamily: "'JetBrains Mono', monospace" }}>JARVIS</Title>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
          <Button type="text" style={{ color: '#fff', padding: '0 15px' }} onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          <Button type="text" style={{ color: '#fff', fontSize: '13px', padding: '0 15px' }} onClick={() => navigate('/direct-resources')}>Go Back</Button>
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'transparent',
        padding: '20px 0',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1} style={{ 
            fontSize: '52px', 
            fontWeight: '950', 
            textTransform: 'uppercase', 
            letterSpacing: '2px',
            margin: '0 0 10px 0',
            background: 'linear-gradient(90deg, #fff, #bc13fe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(188, 19, 254, 0.5)'
          }}>
            DSA Cheat Sheets
          </Title>
          <Text style={{ 
            color: 'rgba(255,255,255,0.5)', 
            fontSize: '18px', 
            fontWeight: '500' 
          }}>
            Direct links to the best Data Structures and Algorithms cheat sheets online.
          </Text>
        </div>

        {/* Resource Grid */}
        <Row gutter={[32, 64]}>
          {CHEAT_SHEETS.map((item, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '24px',
                border: `1px solid ${item.color}33`,
                padding: '30px',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
              }} className="cheat-sheet-card">
                <div style={{ marginBottom: '20px' }}>
                  {item.icon}
                </div>
                <Title level={4} style={{ color: '#fff', margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700' }}>
                  {item.title}
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '24px', flex: 1 }}>
                  {item.description}
                </Text>
                <Button 
                  type="primary" 
                  shape="round"
                  onClick={() => window.open(item.url, '_blank')}
                  style={{
                    background: `linear-gradient(90deg, ${item.color}aa, ${item.color})`,
                    border: 'none',
                    height: '44px',
                    padding: '0 40px',
                    color: '#fff',
                    fontWeight: '900',
                    fontSize: '14px',
                    boxShadow: `0 0 10px ${item.color}44`
                  }}
                  className="open-resource-btn"
                >
                  Visit Website
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        .cheat-sheet-card:hover {
          transform: translateY(-12px) scale(1.02);
          background: rgba(255, 255, 255, 0.08) !important;
        }
        .open-resource-btn:hover {
          transform: scale(1.05);
          filter: brightness(1.2);
        }
      `}</style>
    </div>
  );
}
