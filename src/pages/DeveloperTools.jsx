import React, { useEffect } from 'react';
import { Typography, Row, Col, Button, Card } from 'antd';
import { 
  ToolOutlined,
  FileSearchOutlined,
  CodeSandboxOutlined,
  ApiOutlined,
  LinkOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import TechBG from '../assets/tech_bg.png';

const { Title, Text } = Typography;

const DEV_TOOLS = [
  {
    title: 'Regex101',
    description: 'Create, debug, test and have your regular expressions explained.',
    icon: <FileSearchOutlined style={{ fontSize: '32px' }} />,
    url: 'https://regex101.com/',
    color: '#8B5CF6' // Purple
  },
  {
    title: 'JSON Formatter',
    description: 'Format, validate, and navigate complex JSON data effortlessly.',
    icon: <CodeSandboxOutlined style={{ fontSize: '32px' }} />,
    url: 'https://jsonformatter.org/',
    color: '#A78BFA' // Light Purple
  },
  {
    title: 'Carbon',
    description: 'Create and share beautiful images of your source code snippets.',
    icon: <DesktopOutlined style={{ fontSize: '32px' }} />,
    url: 'https://carbon.now.sh/',
    color: '#C4B5FD' // Pale Purple
  },
  {
    title: 'Postman (Web)',
    description: 'Test, design, and manage APIs directly from your browser workspace.',
    icon: <ApiOutlined style={{ fontSize: '32px' }} />,
    url: 'https://www.postman.com/',
    color: '#F59E0B' // Gold
  },
  {
    title: 'Webhook.site',
    description: 'Instantly generate unique URLs to test and debug Webhooks and HTTP requests.',
    icon: <LinkOutlined style={{ fontSize: '32px' }} />,
    url: 'https://webhook.site/',
    color: '#FCD34D' // Pale Gold
  },
  {
    title: 'ExplainShell',
    description: 'Write down a command-line snippet to see the help text that matches each argument.',
    icon: <ToolOutlined style={{ fontSize: '32px' }} />,
    url: 'https://explainshell.com/',
    color: '#FBBF24' // Yellow Gold
  }
];

export default function DeveloperTools() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(rgba(10, 0, 20, 0.8), rgba(20, 10, 40, 0.9)), url(${TechBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Abstract Waves/Glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
        filter: 'blur(100px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 60%)',
        filter: 'blur(100px)',
        zIndex: 0
      }} />

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 50px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '2px', fontWeight: '900', fontFamily: "'JetBrains Mono', monospace" }}>JARVIS</Title>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Button type="text" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button type="primary" style={{ background: 'linear-gradient(90deg, #8B5CF6, #F59E0B)', border: 'none', fontWeight: 'bold' }} onClick={() => navigate('/direct-resources')}>Back to Tools</Button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <ToolOutlined style={{ fontSize: '48px', color: '#F59E0B', marginBottom: '20px', filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.6))' }} />
          <Title level={1} style={{ fontSize: '50px', fontWeight: '900', color: '#fff', margin: '0 0 10px 0', letterSpacing: '1px' }}>
            Developer Extras
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
            A collection of essential utility tools required for day-to-day software development.
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {DEV_TOOLS.map((item, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <Card 
                className="dev-tool-card"
                bordered={false}
                style={{
                  background: 'rgba(30, 20, 50, 0.5)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  minHeight: '260px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer'
                }}
                onClick={() => window.open(item.url, '_blank')}
              >
                <div style={{ 
                  display: 'inline-flex', padding: '16px', borderRadius: '16px', background: `${item.color}15`, 
                  color: item.color, marginBottom: '25px', boxShadow: `0 10px 20px ${item.color}22` 
                }}>
                  {item.icon}
                </div>
                
                <Title level={4} style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>
                  {item.title}
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: '1.6', display: 'block' }}>
                  {item.description}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        .dev-tool-card:hover { 
          transform: translateY(-10px) scale(1.02); 
          border-color: #F59E0B !important; 
          background: rgba(40, 20, 60, 0.8) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(139, 92, 246, 0.2); 
        }
      `}</style>
    </div>
  );
}
