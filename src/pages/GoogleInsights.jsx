import React, { useState } from 'react';
import { Typography, Row, Col, Button, Modal } from 'antd';
import { 
  SearchOutlined,
  CodeOutlined,
  YoutubeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const { Title, Text } = Typography;

const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

const GOOGLE_QUESTIONS = {
  Easy: [
    'Logger Rate Limiter', 'Valid Anagram', 'Find All Numbers Disappeared in an Array', 'Intersection of Two Arrays', 'First Unique Character in a String'
  ],
  Medium: [
    'Longest Substring Without Repeating Characters', 'Evaluate Reverse Polish Notation', 'Decode String', 'Course Schedule', 'Lowest Common Ancestor of a Binary Tree'
  ],
  Hard: [
    'Trapping Rain Water', 'Alien Dictionary', 'Regular Expression Matching', 'Sliding Window Maximum', 'Word Search II'
  ]
};

export default function GoogleInsights() {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (q) => {
    setSelectedQuestion(q);
  };

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
      backgroundColor: '#202124',
      scrollBehavior: 'smooth',
      color: '#e8eaed',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'Google Sans', 'Roboto', 'Inter', sans-serif"
    }}>
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(66, 133, 244, 0.15) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(234, 67, 53, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(251, 188, 5, 0.15) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 60px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#e8eaed' }}>JARVIS</Title>
        </div>
        <Button style={{ background: 'transparent', border: '1px solid #5f6368', color: '#8ab4f8', fontWeight: '500', borderRadius: '4px' }} onClick={() => navigate('/company-patterns')}>Back</Button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={1} style={{ fontSize: '64px', fontWeight: '500', letterSpacing: '-2px', marginBottom: '20px' }}>
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
            <span style={{ color: '#e8eaed', marginLeft: '15px' }}>Insights</span>
          </Title>
          <div style={{ 
            background: '#303134', 
            border: '1px solid #5f6368',
            borderRadius: '24px',
            padding: '12px 24px',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 1px 6px rgba(0,0,0,.5)'
          }}>
            <SearchOutlined style={{ color: '#9aa0a6', fontSize: '20px', marginRight: '15px' }} />
            <Text style={{ color: '#e8eaed', fontSize: '16px', flex: 1, textAlign: 'left' }}>Past 5 years algorithmic patterns</Text>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          {['Easy', 'Medium', 'Hard'].map((diff, idx) => (
            <Col xs={24} md={8} key={diff}>
              <div style={{ 
                background: '#303134', 
                border: '1px solid #5f6368', 
                borderRadius: '8px', 
                padding: '30px',
                height: '100%',
                transition: 'box-shadow 0.2s',
              }} className="google-card">
                <Title level={3} style={{ color: GOOGLE_COLORS[idx], fontSize: '22px', fontWeight: '400', marginBottom: '20px' }}>
                  {diff} Results
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {GOOGLE_QUESTIONS[diff].map((q, i) => (
                    <div key={i} onClick={() => handleQuestionClick(q)}>
                      <Text 
                        style={{ color: '#8ab4f8', fontSize: '18px', cursor: 'pointer', display: 'block', lineHeight: '1.2' }} 
                        className="google-link"
                      >
                        {q}
                      </Text>
                      <Text style={{ color: '#81c995', fontSize: '13px' }}>Options Available &gt;</Text>
                      <Text style={{ color: '#bdc1c6', fontSize: '13px', display: 'block', marginTop: '4px' }}>
                        Frequently asked in {diff.toLowerCase()} technical interviews.
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ 
          marginTop: '60px', 
          background: '#303134', 
          border: '1px solid #5f6368', 
          borderRadius: '8px',
          padding: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ maxWidth: '800px' }}>
            <Title level={2} style={{ color: '#e8eaed', fontSize: '28px', fontWeight: '400' }}>Preparing for Google</Title>
            <Text style={{ color: '#bdc1c6', fontSize: '16px', lineHeight: '1.6', display: 'block', marginBottom: '15px' }}>
              Google values raw mathematical and algorithmic problem-solving ability, often referred to as "Googlyness". You must be extremely comfortable with Graph Traversal (DFS/BFS), Dynamic Programming, and understanding the absolute core space-time complexities. Code must be perfectly clean.
            </Text>
          </div>
          <Button 
            type="primary" 
            size="large"
            onClick={() => window.open('https://careers.google.com/how-we-hire/interview/', '_blank')}
            style={{ background: '#8ab4f8', color: '#202124', borderRadius: '4px', border: 'none', height: '48px', padding: '0 30px', fontWeight: 'bold' }}
          >
            Google Career Guide
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
        bodyStyle={{ background: '#303134', padding: '40px', borderRadius: '16px', border: '1px solid #5f6368' }}
        closeIcon={<span style={{ color: '#8ab4f8', fontSize: '20px' }}>×</span>}
      >
        <Title level={3} style={{ color: '#8ab4f8', marginBottom: '10px' }}>Search Query</Title>
        <Title level={4} style={{ color: '#e8eaed', marginBottom: '40px', fontWeight: '400' }}>
          Select action for: <span style={{ color: '#fff', fontWeight: 'bold' }}>{selectedQuestion}</span>
        </Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Button 
            size="large" 
            icon={<CodeOutlined />} 
            onClick={handleSolve}
            style={{ height: '60px', fontSize: '18px', background: '#4285F4', color: '#fff', border: 'none', fontWeight: 'bold' }}
          >
            Solve
          </Button>
          <Button 
            size="large" 
            icon={<SearchOutlined />} 
            onClick={handleExplain}
            style={{ height: '60px', fontSize: '18px', background: '#303134', color: '#8ab4f8', border: '2px solid #5f6368', fontWeight: 'bold' }}
          >
            Explanation
          </Button>
        </div>
      </Modal>

      <style>{`
        .google-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.5); border-color: #70757a !important; }
        .google-link:hover { text-decoration: underline; }
        .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
