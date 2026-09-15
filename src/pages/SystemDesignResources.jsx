import React, { useEffect } from 'react';
import { Typography, Row, Col, Button, Space } from 'antd';
import { 
  DatabaseOutlined,
  CloudServerOutlined,
  ApiOutlined,
  PartitionOutlined,
  HddOutlined,
  MergeCellsOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import BlueNetworkBG from '../assets/blue_network_bg.png';

const { Title, Text } = Typography;

const SYS_DESIGN = [
  {
    title: 'System Design Primer',
    description: 'The famous GitHub repository teaching you how to design large-scale systems.',
    icon: <DatabaseOutlined style={{ fontSize: '36px' }} />,
    url: 'https://github.com/donnemartin/system-design-primer',
    color: '#FF6B00'
  },
  {
    title: 'High Scalability',
    description: 'Real-world architecture breakdowns from top companies like Netflix and Uber.',
    icon: <CloudServerOutlined style={{ fontSize: '36px' }} />,
    url: 'http://highscalability.com/',
    color: '#FF9500'
  },
  {
    title: 'InfoQ Architecture',
    description: 'Articles, videos, and news about enterprise-level system architectures.',
    icon: <HddOutlined style={{ fontSize: '36px' }} />,
    url: 'https://www.infoq.com/architecture-design/',
    color: '#FFB800'
  },
  {
    title: 'AWS Architecture Center',
    description: 'Best practice reference architectures directly from the Amazon Web Services team.',
    icon: <MergeCellsOutlined style={{ fontSize: '36px' }} />,
    url: 'https://aws.amazon.com/architecture/',
    color: '#FFD600'
  },
  {
    title: 'ByteByteGo System Design',
    description: 'Visual system design explanations covering everything from CDNs to chatting apps.',
    icon: <PartitionOutlined style={{ fontSize: '36px' }} />,
    url: 'https://bytebytego.com/',
    color: '#FF3D00'
  },
  {
    title: 'Gaurav Sen Channel',
    description: 'Excellent YouTube resource breaking down complex distributed systems visually.',
    icon: <ApiOutlined style={{ fontSize: '36px' }} />,
    url: 'https://www.youtube.com/c/GauravSensei',
    color: '#FF1100'
  }
];

export default function SystemDesignResources() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 10, 30, 0.9), rgba(0, 5, 15, 0.95)), url(${BlueNetworkBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Deep Blue & Orange Glows */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0
      }} />

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 50px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '2px', fontWeight: '900', fontFamily: "'JetBrains Mono', monospace" }}>JARVIS</Title>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="text" style={{ color: 'rgba(255,255,255,0.5)' }} onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button type="primary" shape="round" style={{ background: '#FF6B00', border: 'none', fontWeight: 'bold' }} onClick={() => navigate('/direct-resources')}>Back to Selection</Button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', borderBottom: '1px solid rgba(255, 107, 0, 0.3)', paddingBottom: '20px' }}>
          <div>
            <Title level={1} style={{ fontSize: '48px', fontWeight: '900', color: '#fff', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              System Design <span style={{ color: '#FF6B00' }}>Resources</span>
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
              High-scale architectural patterns and distributed system masterclasses.
            </Text>
          </div>
          <DatabaseOutlined style={{ fontSize: '100px', color: 'rgba(255, 107, 0, 0.1)', position: 'absolute', right: '0', top: '0', zIndex: -1 }} />
        </div>

        <Row gutter={[30, 40]}>
          {SYS_DESIGN.map((item, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderLeft: `4px solid ${item.color}`,
                padding: '30px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
              }} className="sys-card">
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ color: item.color, filter: `drop-shadow(0 0 10px ${item.color}66)` }} className="sys-icon">
                    {item.icon}
                  </div>
                  <div style={{ background: `${item.color}22`, padding: '4px 10px', borderRadius: '4px', fontSize: '10px', color: item.color, fontWeight: 'bold' }}>
                    HIGH SCALE
                  </div>
                </div>
                
                <Title level={3} style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>
                  {item.title}
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '30px', flex: 1, lineHeight: '1.6' }}>
                  {item.description}
                </Text>
                
                <Button 
                  shape="round" 
                  onClick={() => window.open(item.url, '_blank')}
                  style={{ background: 'transparent', border: `1px solid ${item.color}`, color: item.color, fontWeight: 'bold' }}
                  className="sys-btn"
                >
                  Access Resource
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        .sys-card:hover { transform: translateX(10px); background: rgba(255, 107, 0, 0.05) !important; border-color: rgba(255, 107, 0, 0.3) !important; box-shadow: -10px 10px 30px rgba(0,0,0,0.5); }
        .sys-btn { transition: all 0.3s ease; }
        .sys-card:hover .sys-btn { background: ${SYS_DESIGN[0].color} !important; color: #fff !important; }
      `}</style>
    </div>
  );
}
