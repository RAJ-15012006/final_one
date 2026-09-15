import React from 'react';
import { Row, Col, Typography, Button, Progress, Card, Space } from 'antd';
import { 
  BarChartOutlined, 
  FireOutlined, 
  ClockCircleOutlined, 
  SafetyCertificateOutlined,
  RadarChartOutlined,
  RightOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function CodingStats({ onContinue }) {
  const stats = [
    { label: 'ACCURACY', value: 92, suffix: '%', icon: <SafetyCertificateOutlined />, color: '#00D2FF' },
    { label: 'ERRORS / MISSION', value: 2.4, suffix: '', icon: <FireOutlined />, color: '#FF6B00' },
    { label: 'AVG. COMPLETION', value: 18, suffix: 'm', icon: <ClockCircleOutlined />, color: '#E0E0E0' },
    { label: 'GLOBAL RANK', value: 124, suffix: '', icon: <BarChartOutlined />, color: '#00D2FF' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 0' }}>
      <div style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: '900', letterSpacing: '2px' }}>OPERATOR PERFORMANCE</Title>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase' }}>Professional Coder Dashboard // v.2026</Text>
        </div>
        <div style={{ textAlign: 'right' }}>
           <Text style={{ color: '#00D2FF', fontWeight: 'bold' }}>SKILL LEVEL: <span style={{ textShadow: '0 0 10px #00D2FF' }}>ELITE</span></Text>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {stats.map((s, i) => (
          <Col span={6} key={i}>
            <div className="stats-card" style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '24px',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ color: s.color, fontSize: '24px', marginBottom: '16px' }}>{s.icon}</div>
              <Title level={2} style={{ color: '#fff', margin: 0, fontSize: '32px' }}>{s.value}{s.suffix}</Title>
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 'bold' }}>{s.label}</Text>
              <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', background: s.color, width: '100%' }}></div>
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={24} style={{ marginTop: '24px' }}>
        <Col span={16}>
          <div className="stats-card" style={{ height: '360px', padding: '24px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
            <Title level={5} style={{ color: '#00D2FF', marginBottom: '30px' }}><RadarChartOutlined /> COMPETENCY ANALYSIS</Title>
            <Space direction="vertical" size={20} style={{ width: '100%' }}>
                {['ALGORITHMS', 'DATA STRUCTURES', 'SYSTEM DESIGN', 'PERFORMANCE'].map((skill, j) => (
                    <div key={j}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <Text style={{ color: '#fff', fontSize: '12px' }}>{skill}</Text>
                            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{85 + (j * 3)}%</Text>
                        </div>
                        <Progress percent={85 + (j * 3)} showInfo={false} strokeColor={j % 2 === 0 ? '#00D2FF' : '#FF6B00'} size="small" />
                    </div>
                ))}
            </Space>
          </div>
        </Col>
        <Col span={8}>
          <div className="stats-card" style={{ height: '360px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255, 107, 0, 0.2)' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={4} style={{ color: '#fff' }}>READY FOR NEXT MISSION?</Title>
                <Text style={{ display: 'block', marginBottom: '40px', color: 'rgba(255,255,255,0.4)' }}>Initiate mission control to enter the coding arena.</Text>
                <Button 
                    type="primary" 
                    icon={<RightOutlined />} 
                    size="large"
                    onClick={onContinue}
                    className="pulse-button"
                    style={{
                        height: '60px',
                        padding: '0 40px',
                        background: 'linear-gradient(45deg, #00D2FF, #FF6B00)',
                        border: 'none',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}
                >
                    INITIATE MISSION
                </Button>
            </div>
          </div>
        </Col>
      </Row>

      <style>{`
        .stats-card:hover { transform: translateY(-5px); transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1); border-color: rgba(255,255,255,0.2) !important; }
        .pulse-button { animation: pulse-neon 2s infinite; }
        @keyframes pulse-neon {
          0% { box-shadow: 0 0 20px rgba(0, 210, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 107, 0, 0.5); }
          100% { box-shadow: 0 0 20px rgba(0, 210, 255, 0.3); }
        }
      `}</style>
    </div>
  );
}
