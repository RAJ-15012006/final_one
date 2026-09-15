import React, { useState } from 'react';
import { Typography, Row, Col, Button, Modal } from 'antd';
import { 
  CodeOutlined,
  DatabaseOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const { Title, Text } = Typography;

const MS_QUESTIONS = {
  Easy: [
    'Reverse Words in a String III', 'Valid Palindrome', 'Two Sum', 'Roman to Integer', 'Merge Two Sorted Lists'
  ],
  Medium: [
    'Spiral Matrix', 'Copy List with Random Pointer', 'Populating Next Right Pointers in Each Node', 'String to Integer (atoi)', 'Search in Rotated Sorted Array'
  ],
  Hard: [
    'Wildcard Matching', 'Regular Expression Matching', 'Median of Two Sorted Arrays', 'Trapping Rain Water', 'First Missing Positive'
  ]
};

export default function MicrosoftInsights() {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleSolve = () => {
    if (!selectedQuestion) return;
    const slug = selectedQuestion.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    window.open(`https://leetcode.com/problems/${slug}/`, '_blank');
    setSelectedQuestion(null);
  };

  const handleExplain = () => {
    if (!selectedQuestion) return;
    const query = encodeURIComponent(`${selectedQuestion} leetcode solution explanation java python cpp c`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    setSelectedQuestion(null);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#111111', 
      background: 'linear-gradient(135deg, #1c1c1c 0%, #0d0d0d 100%)',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'Segoe UI', 'Roboto', sans-serif"
    }}>
      
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 164, 239, 0.2) 0%, transparent 70%)', filter: 'blur(90px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(127, 186, 0, 0.15) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 40px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff' }}>JARVIS</Title>
        </div>
        <Button size="large" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '4px' }} onClick={() => navigate('/company-patterns')}>Back to Brands</Button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '60px', 
          background: 'rgba(30, 30, 32, 0.5)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '80px', height: '80px' }}>
            <div style={{ background: '#F25022', borderRadius: '4px' }}></div>
            <div style={{ background: '#7FBA00', borderRadius: '4px' }}></div>
            <div style={{ background: '#00A4EF', borderRadius: '4px' }}></div>
            <div style={{ background: '#FFB900', borderRadius: '4px' }}></div>
          </div>
          <div>
            <Title level={1} style={{ fontSize: '48px', fontWeight: '300', margin: '0 0 5px 0', color: '#fff' }}>
              Microsoft OS Patterns
            </Title>
            <Text style={{ color: '#ccc', fontSize: '18px' }}>
              Unlocking the algorithms behind Windows, Azure, and Office365 engineering interviews.
            </Text>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '60px' }}>
          {['Easy', 'Medium', 'Hard'].map((diff) => (
            <div key={diff} style={{
              background: 'rgba(40, 40, 42, 0.6)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '40px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }} className="ms-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <div style={{ width: '6px', height: '30px', background: diff === 'Easy' ? '#7FBA00' : diff === 'Medium' ? '#FFB900' : '#F25022', borderRadius: '3px' }} />
                <Title level={3} style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#fff' }}>
                  {diff} Level
                </Title>
              </div>
              <Row gutter={[20, 20]}>
                {MS_QUESTIONS[diff].map((q, i) => (
                  <Col xs={24} sm={12} md={8} key={i}>
                    <div 
                      className="ms-q-card"
                      onClick={() => setSelectedQuestion(q)}
                      style={{ 
                        padding: '20px', 
                        background: 'rgba(0,0,0,0.4)', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(255,255,255,0.05)',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        cursor: 'pointer'
                    }}>
                      <CodeOutlined style={{ color: '#00A4EF', fontSize: '20px' }} />
                      <Text style={{ fontSize: '15px', fontWeight: '500', color: '#ddd' }}>{q}</Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </div>

        <div style={{ 
          background: '#00A4EF', 
          borderRadius: '12px', 
          padding: '50px', 
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 15px 35px rgba(0, 164, 239, 0.3)'
        }}>
          <div style={{ maxWidth: '700px' }}>
            <Title level={2} style={{ color: '#fff', margin: '0 0 15px 0', fontWeight: '300' }}>Preparing for Microsoft</Title>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', display: 'block' }}>
              Unlike other FAANGs, Microsoft heavily tests Object-Oriented Design (OOD) alongside standard algorithms. Be prepared for String Manipulation, Linked Lists, and explaining architectural tradeoffs for Azure-scale services. Be familiar with C# or Java paradigms, though any language is accepted.
            </Text>
          </div>
          <Button 
            size="large"
            icon={<DatabaseOutlined />}
            onClick={() => window.open('https://careers.microsoft.com/us/en/interviewtips', '_blank')}
            style={{ 
              background: '#fff', color: '#00A4EF', height: '56px', padding: '0 35px', 
              fontSize: '16px', fontWeight: '600', border: 'none', borderRadius: '4px'
            }}
          >
            Microsoft Careers
          </Button>
        </div>

      </div>

      <Modal
        title={null}
        open={!!selectedQuestion}
        onCancel={() => setSelectedQuestion(null)}
        footer={null}
        centered
        style={{ padding: 0 }}
        bodyStyle={{ background: 'rgba(40, 40, 42, 0.95)', backdropFilter: 'blur(30px)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}
        closeIcon={<span style={{ color: '#fff', fontSize: '20px' }}>×</span>}
      >
        <Title level={3} style={{ color: '#00A4EF', marginBottom: '10px' }}>Algorithm Selected</Title>
        <Title level={4} style={{ color: '#fff', marginBottom: '40px', fontWeight: '400' }}>
          Action for: <span style={{ color: '#fff', fontWeight: 'bold' }}>{selectedQuestion}</span>
        </Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Button 
            size="large" 
            icon={<CodeOutlined />} 
            onClick={handleSolve}
            style={{ height: '60px', fontSize: '18px', background: '#00A4EF', color: '#fff', border: 'none', fontWeight: 'bold' }}
          >
            Solve
          </Button>
          <Button 
            size="large" 
            icon={<SearchOutlined />} 
            onClick={handleExplain}
            style={{ height: '60px', fontSize: '18px', background: 'transparent', color: '#00A4EF', border: '2px solid #00A4EF', fontWeight: 'bold' }}
          >
            Explanation
          </Button>
        </div>
      </Modal>

      <style>{`
        .ms-q-card { transition: all 0.2s ease; }
        .ms-q-card:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 8px 20px rgba(0,0,0,0.4); 
          background: rgba(255,255,255,0.1) !important; 
          border-color: #00A4EF !important;
        }
        .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
