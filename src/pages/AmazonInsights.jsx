import React, { useState } from 'react';
import { Typography, Row, Col, Button, Modal } from 'antd';
import { 
  AmazonOutlined,
  CloudOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  YoutubeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const { Title, Text } = Typography;

const AMAZON_QUESTIONS = {
  Easy: [
    'Two Sum', 'Best Time to Buy and Sell Stock', 'Merge Two Sorted Lists', 'Valid Parentheses', 'Meeting Rooms'
  ],
  Medium: [
    'LRU Cache', 'Number of Islands', 'Merge Intervals', 'Search in Rotated Sorted Array', 'Word Break'
  ],
  Hard: [
    'Word Ladder', 'Merge k Sorted Lists', 'Median of Two Sorted Arrays', 'Serialize and Deserialize Binary Tree'
  ]
};

export default function AmazonInsights() {
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
      backgroundColor: '#232F3E',
      backgroundImage: 'radial-gradient(#FF9900 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      backgroundPosition: 'center',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, rgba(35,47,62,0.8) 0%, rgba(35,47,62,1) 100%)',
        zIndex: 0
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 40px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff' }}>JARVIS</Title>
        </div>
        <Button type="primary" style={{ background: '#FF9900', color: '#111', fontWeight: 'bold', border: 'none' }} onClick={() => navigate('/company-patterns')}>Back to Companies</Button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          background: '#131A22', 
          border: '2px solid #FF9900', 
          padding: '40px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 15px 30px rgba(0,0,0,0.5)'
        }}>
          <div>
            <Title level={1} style={{ color: '#fff', fontSize: '50px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
              Amazon <span style={{ color: '#FF9900' }}>Insights</span>
            </Title>
            <Text style={{ color: '#ccc', fontSize: '18px' }}>
              Top requested questions over the past 5 years and Leadership Principles guide.
            </Text>
          </div>
          <AmazonOutlined style={{ fontSize: '120px', color: '#FF9900' }} />
        </div>

        <Row gutter={[30, 30]} style={{ marginTop: '40px' }}>
          {['Easy', 'Medium', 'Hard'].map((difficulty) => (
            <Col xs={24} md={8} key={difficulty}>
              <div style={{
                background: '#fff',
                padding: '30px',
                minHeight: '400px',
                borderTop: `8px solid ${difficulty === 'Easy' ? '#00A36C' : difficulty === 'Medium' ? '#FF9900' : '#D92121'}`,
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                color: '#111'
              }}>
                <Title level={3} style={{ color: '#111', textTransform: 'uppercase', marginBottom: '25px', fontSize: '24px' }}>
                  {difficulty} Questions
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {AMAZON_QUESTIONS[difficulty].map((q, i) => (
                    <div 
                      key={i} 
                      className="amazon-q-hover" 
                      onClick={() => handleQuestionClick(q)}
                      style={{ 
                        padding: '15px', 
                        background: '#F2F2F2', 
                        borderLeft: '4px solid #131A22',
                        fontWeight: '700',
                        fontSize: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}>
                      <span style={{ color: '#007185' }}>{q}</span> 
                      <CloudOutlined style={{ color: '#FF9900' }} />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ 
          marginTop: '60px', 
          background: 'linear-gradient(90deg, #FF9900, #FFC04C)', 
          padding: '40px', 
          color: '#111',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(255, 153, 0, 0.4)'
        }}>
          <div style={{ maxWidth: '800px' }}>
            <Title level={2} style={{ color: '#111', margin: '0 0 15px 0' }}>Amazon Leadership Principles & Resources</Title>
            <Text style={{ color: '#333', fontSize: '16px', fontWeight: '500', display: 'block', marginBottom: '20px' }}>
              Amazon famously anchors their technical interviews on behavior and scale. To crack the Amazon loop, you MUST seamlessly integrate their 16 Leadership Principles (LPs) into your STAR method responses. Focus heavily on "Customer Obsession" and "Deliver Results".
            </Text>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button size="small" type="primary" style={{ background: '#111', color: '#fff', border: 'none' }}>STAR Method</Button>
              <Button size="small" type="primary" style={{ background: '#111', color: '#fff', border: 'none' }}>Scalable Systems</Button>
              <Button size="small" type="primary" style={{ background: '#111', color: '#fff', border: 'none' }}>Data Structures</Button>
            </div>
          </div>
          
          <Button 
            type="primary" 
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => window.open('https://www.amazon.jobs/content/en/how-we-hire/interviewing-at-amazon', '_blank')}
            style={{ 
              background: '#131A22', color: '#fff', height: '60px', padding: '0 40px', 
              fontSize: '18px', fontWeight: 'bolder', border: 'none'
            }}
          >
            OFFICIAL PREP PORTAL
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
        bodyStyle={{ background: '#131A22', padding: '40px', borderRadius: '16px', border: '2px solid #FF9900' }}
        closeIcon={<span style={{ color: '#FF9900', fontSize: '20px' }}>×</span>}
      >
        <Title level={3} style={{ color: '#FF9900', marginBottom: '10px' }}>Action Required</Title>
        <Title level={4} style={{ color: '#fff', marginBottom: '40px', fontWeight: '400' }}>
          Choose how you want to approach <span style={{ color: '#FF9900', fontWeight: 'bold' }}>{selectedQuestion}</span>
        </Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Button 
            size="large" 
            icon={<CodeOutlined />} 
            onClick={handleSolve}
            style={{ height: '60px', fontSize: '18px', background: '#FF9900', color: '#131A22', border: 'none', fontWeight: 'bold' }}
          >
            Solve
          </Button>
          <Button 
            size="large" 
            icon={<SearchOutlined />} 
            onClick={handleExplain}
            style={{ height: '60px', fontSize: '18px', background: 'transparent', color: '#FF9900', border: '2px solid #FF9900', fontWeight: 'bold' }}
          >
            Explanation
          </Button>
        </div>
      </Modal>

      <style>{`
        .amazon-q-hover:hover {
          background: #E6E6E6 !important;
          transform: translateX(5px);
          box-shadow: -2px 2px 5px rgba(0,0,0,0.1);
        }
        .amazon-q-hover:hover span {
          text-decoration: underline;
        }
        .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
