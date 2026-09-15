import React, { useEffect } from 'react';
import { Typography, Row, Col, Button, Space } from 'antd';
import { 
  ExperimentOutlined,
  NodeIndexOutlined,
  VideoCameraOutlined,
  BranchesOutlined,
  DesktopOutlined,
  RadarChartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import TechBG from '../assets/tech_bg.png';

const { Title, Text } = Typography;

const VISUALIZERS = [
  {
    title: 'VisuAlgo',
    description: 'Visualising data structures and algorithms through animation.',
    icon: <NodeIndexOutlined style={{ fontSize: '40px' }} />,
    url: 'https://visualgo.net/',
    color: '#00f2ff'
  },
  {
    title: 'Algorithm Visualizer',
    description: 'Interactive online platform that visualizes algorithms from code.',
    icon: <ExperimentOutlined style={{ fontSize: '40px' }} />,
    url: 'https://algorithm-visualizer.org/',
    color: '#33ccff'
  },
  {
    title: 'PathFinding.js',
    description: 'Comprehensive visual platform demonstrating famous pathfinding algorithms.',
    icon: <BranchesOutlined style={{ fontSize: '40px' }} />,
    url: 'https://qiao.github.io/PathFinding.js/visual/',
    color: '#00e5ff'
  },
  {
    title: 'USFCA Data Structures',
    description: 'Classic step-by-step animations for trees, heaps, and graph algorithms.',
    icon: <RadarChartOutlined style={{ fontSize: '40px' }} />,
    url: 'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html',
    color: '#00bfff'
  },
  {
    title: 'Sorting.at',
    description: 'Beautiful, clean color-based visualizer for multiple sorting algorithms.',
    icon: <DesktopOutlined style={{ fontSize: '40px' }} />,
    url: 'https://sorting.at/',
    color: '#00ffff'
  },
  {
    title: 'CS50 IDE Visualizer',
    description: 'Harvard CS50\'s excellent graphical tools for learning base algorithms.',
    icon: <VideoCameraOutlined style={{ fontSize: '40px' }} />,
    url: 'https://cs50.harvard.edu/x/2023/',
    color: '#4db8ff'
  }
];

export default function AlgorithmVisualizers() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 15, 25, 0.9), rgba(0, 5, 20, 0.95)), url(${TechBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Cyan Cyber Glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60% ',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 60%)',
        filter: 'blur(100px)',
        zIndex: 0
      }} />

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 40px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '2px', fontWeight: '900', fontFamily: "'JetBrains Mono', monospace" }}>JARVIS</Title>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Button type="text" style={{ color: '#fff' }} onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button type="text" style={{ color: '#00f2ff' }} onClick={() => navigate('/direct-resources')}>Back</Button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'left', marginBottom: '60px', borderLeft: '4px solid #00f2ff', paddingLeft: '24px' }}>
          <Title level={1} style={{ 
            fontSize: '52px', fontWeight: '300', margin: '0 0 10px 0',
            color: '#fff', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-1px'
          }}>
            ALGORITHM <span style={{ fontWeight: '900', color: '#00f2ff' }}>VISUALIZERS</span>
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', fontFamily: "'JetBrains Mono', monospace" }}>
            &gt; Interactive tools to build intuition behind complex algorithms._
          </Text>
        </div>

        <Row gutter={[30, 30]}>
          {VISUALIZERS.map((item, idx) => (
            <Col xs={24} sm={12} lg={8} key={idx}>
              <div style={{
                background: 'transparent',
                borderRadius: '0',
                border: '1px solid rgba(0, 242, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }} className="vis-card">
                <div style={{ background: 'rgba(0, 242, 255, 0.05)', padding: '40px 20px', textAlign: 'center', borderBottom: '1px solid rgba(0, 242, 255, 0.1)' }}>
                  <div style={{ color: item.color, filter: `drop-shadow(0 0 15px ${item.color}88)`, transform: 'scale(1)', transition: 'transform 0.4s ease' }} className="vis-icon">
                    {item.icon}
                  </div>
                </div>
                
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Title level={4} style={{ color: '#fff', margin: '0 0 10px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: '18px' }}>
                    {item.title}
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '24px', flex: 1, fontFamily: "'Inter', sans-serif" }}>
                    {item.description}
                  </Text>
                  
                  <Button 
                    type="primary" 
                    onClick={() => window.open(item.url, '_blank')}
                    style={{ 
                      borderRadius: 0, background: 'transparent', border: `1px solid ${item.color}`, 
                      color: item.color, fontWeight: 'bold' 
                    }}
                    className="vis-btn"
                  >
                    LAUNCH TOOL
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        .vis-card:hover { border-color: #00f2ff !important; box-shadow: 0 0 30px rgba(0, 242, 255, 0.15); }
        .vis-card:hover .vis-icon { transform: scale(1.15) !important; }
        .vis-btn { transition: all 0.3s ease; }
        .vis-card:hover .vis-btn { background: #00f2ff !important; color: #000 !important; }
      `}</style>
    </div>
  );
}
