import React, { useState } from 'react';
import { Typography, Button, Modal } from 'antd';
import { 
  AppleOutlined,
  CompassOutlined,
  CodeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const { Title, Text } = Typography;

const APPLE_QUESTIONS = {
  Easy: [
    'Longest Common Prefix', 'Reverse Linked List', 'Palindrome Number', 'Climbing Stairs', 'Merge Two Sorted Lists'
  ],
  Medium: [
    '3Sum', 'Product of Array Except Self', 'Group Anagrams', 'Spiral Matrix', 'Word Break'
  ],
  Hard: [
    'Word Break II', 'LRU Cache', 'Integer to English Words', 'Merge k Sorted Lists', 'Trapping Rain Water'
  ]
};

export default function AppleInsights() {
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
      backgroundColor: '#000000',
      backgroundImage: 'radial-gradient(ellipse at 50% -20%, #2c2c2e 0%, #000000 60%)',
      scrollBehavior: 'smooth',
      color: '#f5f5f7',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
    }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '80px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 60px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
        </div>
        <Button type="text" style={{ color: '#2997ff', fontSize: '16px' }} onClick={() => navigate('/company-patterns')}>Explore Companies</Button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <AppleOutlined style={{ fontSize: '70px', color: '#f5f5f7', marginBottom: '30px' }} />
          <Title level={1} style={{ 
            fontSize: '76px', 
            fontWeight: '600', 
            letterSpacing: '-1.5px', 
            color: '#f5f5f7', 
            margin: '0 0 20px 0',
            lineHeight: '1.1'
          }}>
            Code differently.
          </Title>
          <Text style={{ color: '#86868b', fontSize: '24px', fontWeight: '500', maxWidth: '600px', margin: '0 auto', display: 'block' }}>
            The algorithmic blueprint behind the world's most seamlessly engineered products.
          </Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', marginBottom: '100px' }}>
          {['Easy', 'Medium', 'Hard'].map((diff) => (
            <div key={diff}>
              <Title level={3} style={{ 
                color: diff === 'Easy' ? '#32d74b' : diff === 'Medium' ? '#ffd60a' : '#ff453a', 
                fontSize: '28px', 
                fontWeight: '600', 
                letterSpacing: '-0.5px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '15px',
                marginBottom: '30px'
              }}>
                {diff} Tier
              </Title>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {APPLE_QUESTIONS[diff].map((q, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedQuestion(q)}
                    className="apple-card" 
                    style={{ 
                      background: 'rgba(44, 44, 46, 0.4)', 
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '18px',
                      padding: '24px 30px',
                      border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <Text style={{ fontSize: '18px', fontWeight: '500', color: '#2997ff', display: 'block' }}>{q}</Text>
                    <Text style={{ fontSize: '14px', color: '#86868b' }}>Frequency: High</Text>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', 
          padding: '60px 0',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <CompassOutlined style={{ fontSize: '40px', color: '#86868b', marginBottom: '25px' }} />
          <Title level={2} style={{ color: '#f5f5f7', fontSize: '36px', fontWeight: '600', letterSpacing: '-0.5px' }}>
            Join the mothership.
          </Title>
          <Text style={{ color: '#86868b', fontSize: '20px', maxWidth: '600px', display: 'block', margin: '0 auto 30px auto' }}>
            Apple teams often operate independently ("startups within a startup"). Expect deep dives into your specific domain expertise (iOS, Systems, Hardware), paired with rigorous Array, String, and Math challenges.
          </Text>
          <Button 
            type="primary" 
            shape="round"
            onClick={() => window.open('https://jobs.apple.com/en-us/details/interview-preparation', '_blank')}
            style={{ 
              background: '#f5f5f7', color: '#000', height: '48px', padding: '0 35px', 
              fontSize: '17px', fontWeight: '600', border: 'none'
            }}
          >
            Learn about Apple Interviews
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
        bodyStyle={{ background: '#1c1c1e', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
        closeIcon={<span style={{ color: '#86868b', fontSize: '20px' }}>×</span>}
      >
        <Title level={3} style={{ color: '#86868b', marginBottom: '10px' }}>Select Route</Title>
        <Title level={4} style={{ color: '#f5f5f7', marginBottom: '40px', fontWeight: '500' }}>
          Action for <span style={{ color: '#2997ff' }}>{selectedQuestion}</span>
        </Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Button 
            size="large" 
            icon={<CodeOutlined />} 
            onClick={handleSolve}
            style={{ height: '60px', fontSize: '18px', background: '#2997ff', color: '#fff', border: 'none', fontWeight: '600' }}
          >
            Solve
          </Button>
          <Button 
            size="large" 
            icon={<SearchOutlined />} 
            onClick={handleExplain}
            style={{ height: '60px', fontSize: '18px', background: '#1c1c1e', color: '#2997ff', border: '1px solid #2997ff', fontWeight: '600' }}
          >
            Explanation
          </Button>
        </div>
      </Modal>

      <style>{`
        .apple-card { transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1); cursor: pointer; }
        .apple-card:hover { transform: scale(1.03); background: rgba(80, 80, 84, 0.6) !important; border-color: #2997ff !important; }
        .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
