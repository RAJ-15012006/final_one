import React, { useState } from 'react';
import { Typography, Button, Modal, Avatar } from 'antd';
import { 
  GlobalOutlined,
  ShareAltOutlined,
  CommentOutlined,
  TeamOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const { Title, Text } = Typography;

const META_QUESTIONS = {
  Easy: [
    'Valid Palindrome II', 'Move Zeroes', 'Merge Sorted Array', 'Binary Tree Paths', 'First Bad Version'
  ],
  Medium: [
    'Kth Largest Element in an Array', 'Subarray Sum Equals K', 'Buildings With an Ocean View', 'Binary Tree Vertical Order Traversal', 'Minimum Remove to Make Valid Parentheses'
  ],
  Hard: [
    'Serialize and Deserialize Binary Tree', 'Alien Dictionary', 'Expression Add Operators', 'Remove Invalid Parentheses', 'Longest Valid Parentheses'
  ]
};

export default function MetaInsights() {
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
      backgroundColor: '#040b14',
      backgroundImage: `radial-gradient(#0668E1 2px, transparent 2px), radial-gradient(#0668E1 2px, transparent 2px)`,
      backgroundPosition: '0 0, 50px 50px',
      backgroundSize: '100px 100px',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: "'San Francisco', 'Inter', sans-serif"
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(4, 11, 20, 0.85)',
        zIndex: 0
      }} />

      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(6, 104, 225, 0.15) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto 40px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff' }}>JARVIS</Title>
        </div>
        <Button style={{ background: 'transparent', borderColor: '#0668E1', color: '#0668E1', borderRadius: '20px' }} onClick={() => navigate('/company-patterns')}>Return to Selection</Button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ 
            width: '120px', height: '120px', borderRadius: '40px', background: 'linear-gradient(135deg, #0668E1, #00c6ff)', 
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '25px', boxShadow: '0 20px 40px rgba(6, 104, 225, 0.4)'
          }}>
            <GlobalOutlined style={{ fontSize: '60px', color: '#fff' }} />
          </div>
          <Title level={1} style={{ fontSize: '50px', fontWeight: '800', margin: '0 0 10px 0', color: '#fff' }}>
            Meta Network Data
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '600px' }}>
            Analyzing the social graph of algorithmic interviews over the last half decade.
          </Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {['Easy', 'Medium', 'Hard'].map((diff) => (
            <div key={diff} style={{ 
              background: '#0d1521', 
              border: '1px solid rgba(6, 104, 225, 0.2)',
              borderRadius: '16px',
              padding: '35px',
            }} className="meta-post">
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                <Avatar style={{ backgroundColor: '#0668E1' }} icon={<TeamOutlined />} size={48} />
                <div>
                  <Title level={3} style={{ color: '#fff', fontSize: '20px', margin: 0 }}>{diff} Complexity Network</Title>
                  <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Updated recently across global nodes</Text>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                {META_QUESTIONS[diff].map((q, i) => (
                  <div 
                    key={i}
                    onClick={() => setSelectedQuestion(q)}
                    className="meta-q-card"
                    style={{ 
                    background: '#151e2b', 
                    padding: '20px', 
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    cursor: 'pointer',
                    border: '1px solid transparent'
                  }}>
                    <Text style={{ color: '#00c6ff', fontSize: '16px', fontWeight: '600' }}>{q}</Text>
                    <div style={{ display: 'flex', gap: '15px', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                      <span><CommentOutlined /> Practice Options</span>
                      <span><ShareAltOutlined /> Explanations</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: '50px',
          background: 'linear-gradient(135deg, rgba(6, 104, 225, 0.1), rgba(0, 198, 255, 0.1))',
          border: '1px solid rgba(6, 104, 225, 0.4)',
          borderRadius: '24px',
          padding: '50px',
          textAlign: 'center',
          backdropFilter: 'blur(20px)'
        }}>
          <Title level={2} style={{ color: '#fff', marginBottom: '20px' }}>Cracking Meta</Title>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', display: 'block', maxWidth: '800px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
            Meta (Facebook) interviewers are extremely strict on writing bug-free code quickly. You must be heavily practiced in Arrays, Strings, standard Tree traversal, and Graph questions (social network context). Perfection in 45 minutes is required, usually involving 2 medium/hard questions back-to-back.
          </Text>
          <Button 
            type="primary" 
            size="large"
            shape="round"
            onClick={() => window.open('https://www.metacareers.com/swe-prep/', '_blank')}
            style={{ background: '#0668E1', border: 'none', height: '50px', padding: '0 40px', fontSize: '16px', fontWeight: 'bold' }}
            icon={<ArrowRightOutlined />}
          >
            META CAREERS PORTAL
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
        bodyStyle={{ background: '#0d1521', padding: '40px', borderRadius: '16px', border: '1px solid #0668E1' }}
        closeIcon={<span style={{ color: '#0668E1', fontSize: '20px' }}>×</span>}
      >
        <Title level={3} style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>Execution Options</Title>
        <Title level={4} style={{ color: '#fff', marginBottom: '40px', fontWeight: '400' }}>
          Select method for: <span style={{ color: '#00c6ff', fontWeight: 'bold' }}>{selectedQuestion}</span>
        </Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Button 
            size="large" 
            icon={<CodeOutlined />} 
            onClick={handleSolve}
            style={{ height: '60px', fontSize: '18px', background: '#0668E1', color: '#fff', border: 'none', fontWeight: 'bold' }}
          >
            Solve
          </Button>
          <Button 
            size="large" 
            icon={<SearchOutlined />} 
            onClick={handleExplain}
            style={{ height: '60px', fontSize: '18px', background: '#151e2b', color: '#00c6ff', border: '1px solid #0668E1', fontWeight: 'bold' }}
          >
            Explanation
          </Button>
        </div>
      </Modal>

      <style>{`
        .meta-post { transition: transform 0.3s ease; }
        .meta-post:hover { border-color: rgba(6, 104, 225, 0.5); }
        .meta-q-card { transition: all 0.3s; }
        .meta-q-card:hover { transform: translateY(-3px); border-color: #0668E1 !important; background: #1a2536 !important; box-shadow: 0 5px 15px rgba(6, 104, 225, 0.2); }
        .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
