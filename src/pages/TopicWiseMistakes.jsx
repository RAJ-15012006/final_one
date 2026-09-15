import React, { useEffect } from 'react';
import { Typography, Row, Col, Button } from 'antd';
import {
  ArrowLeftOutlined,
  LinkOutlined,
  DotChartOutlined,
  SearchOutlined,
  NodeIndexOutlined,
  ThunderboltOutlined,
  TableOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import BlueNetworkBG from '../assets/blue_network_bg.png';

const { Title, Text } = Typography;

const MISTAKE_CARDS = [
  {
    title: 'Common Mistakes in Linked Lists',
    desc: 'Pointer errors, null checks, and traversal bugs.',
    icon: <LinkOutlined />,
    color: '#00f2ff', // Cyan
    background: 'rgba(0, 40, 60, 0.4)',
    path: '/linked-list-mistakes'
  },
  {
    title: 'Why Your Dynamic Programming Code Fails',
    desc: 'Wrong state transitions, memoization mistakes, and overlapping subproblems.',
    icon: <DotChartOutlined />,
    color: '#bc13fe', // Purple
    background: 'rgba(40, 0, 60, 0.4)',
    path: '/dp-mistakes'
  },
  {
    title: 'Binary Search Bugs Developers Make',
    desc: 'Off-by-one errors, infinite loops, incorrect boundaries.',
    icon: <SearchOutlined />,
    color: '#00d2ff', // Blue
    background: 'rgba(0, 30, 80, 0.4)',
    path: '/bs-mistakes'
  },
  {
    title: 'Graph DFS Errors Beginners Make',
    desc: 'Missing visited sets, cycle detection issues, and stack management.',
    icon: <NodeIndexOutlined />,
    color: '#8a2be2', // Deep Purple
    background: 'rgba(30, 0, 80, 0.4)',
    path: '/dfs-mistakes'
  },
  {
    title: 'Recursive Thinking: Common Pitfalls',
    desc: 'Missing base cases, stack overflow, and incorrect recursive steps.',
    icon: <ThunderboltOutlined />,
    color: '#00ff88', // Green (Changed from Orange)
    background: 'rgba(0, 60, 40, 0.4)',
    path: '/recursive-mistakes'
  },
  {
    title: 'Array & String Manipulation Errors',
    desc: 'Out of bounds access, off-by-one index mistakes, and improper string copying.',
    icon: <TableOutlined />,
    color: '#ff00ff', // Pink/Magenta (Changed from Orange)
    background: 'rgba(60, 0, 60, 0.4)',
    path: '/array-string-mistakes'
  }
];

export default function TopicWiseMistakes() {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${BlueNetworkBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#fff',
      padding: '60px 40px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Decorative Glows - Lowered opacity to keep background "light" as requested */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0, 242, 255, 0.05) 0%, transparent 70%)',
        filter: 'blur(100px)',
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

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1} style={{
            fontSize: '56px',
            fontWeight: '900',
            color: '#fff',
            marginBottom: '10px',
            letterSpacing: '-1.5px',
            textShadow: '0 0 30px rgba(0, 242, 255, 0.2)'
          }}>
            Topic-Wise Coding Mistakes
          </Title>
          <Text style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '800px',
            display: 'block',
            margin: '0 auto'
          }}>
            Learn from the most common mistakes developers make while solving DSA problems.
          </Text>
        </div>

        {/* Grid of Mistake Cards - Increased gutter to prevent overlapping */}
        <Row gutter={[48, 48]} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {MISTAKE_CARDS.map((mistake, index) => (
            <Col xs={24} md={12} lg={8} key={index} style={{ display: 'flex' }}>
              <div
                className="mistake-card"
                onClick={() => mistake.path && navigate(mistake.path)}
                style={{
                  background: mistake.background,
                  backdropFilter: 'blur(30px)',
                  border: `1px solid ${mistake.color}44`,
                  borderRadius: '32px',
                  padding: '40px 30px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 20px 50px rgba(0,0,0,0.5)`
                }}
              >
                <div style={{
                  fontSize: '40px',
                  color: mistake.color,
                  marginBottom: '25px',
                  filter: `drop-shadow(0 0 10px ${mistake.color}88)`
                }}>
                  {mistake.icon}
                </div>

                <Title level={3} style={{
                  color: '#fff',
                  fontSize: '22px',
                  fontWeight: '700',
                  marginBottom: '15px',
                  lineHeight: '1.3'
                }}>
                  {mistake.title}
                </Title>

                <Text style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '15px',
                  marginBottom: '30px',
                  flex: 1
                }}>
                  {mistake.desc}
                </Text>

                <Button
                  type="primary"
                  shape="round"
                  style={{
                    background: 'transparent',
                    border: `1px solid ${mistake.color}`,
                    color: mistake.color,
                    fontWeight: '700',
                    fontSize: '12px',
                    padding: '0 25px',
                    height: '40px',
                    letterSpacing: '1px'
                  }}
                  className="read-mistakes-btn"
                >
                  READ MISTAKES
                </Button>
              </div>
            </Col>
          ))}
        </Row>

      <style>{`
        .mistake-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 255, 255, 0.4) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .mistake-card:hover .read-mistakes-btn {
          background: #fff !important;
          color: #000 !important;
          border-color: #fff !important;
        }
        h1 {
          font-family: 'Inter', sans-serif !important;
        }
      `}</style>
    </div>
  );
}
