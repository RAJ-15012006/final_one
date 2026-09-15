import React, { useState } from 'react';
import { Typography, Button, Modal } from 'antd';
import { 
  PlayCircleOutlined,
  InfoCircleOutlined,
  CodeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const { Title, Text } = Typography;

const NETFLIX_QUESTIONS = {
  Easy: [
    'Valid Anagram', 'Two Sum', 'Reverse String', 'Best Time to Buy and Sell Stock', 'Contains Duplicate'
  ],
  Medium: [
    'Implement Trie (Prefix Tree)', 'Letter Combinations of a Phone Number', 'Course Schedule II', 'Word Break', 'Find Median from Data Stream'
  ],
  Hard: [
    'LFU Cache', 'Word Ladder', 'Serialize and Deserialize Binary Tree', 'Trapping Rain Water', 'Minimum Window Substring'
  ]
};

const IMAGE_MAP = {
  'Valid Anagram': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=400&q=80',
  'Two Sum': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
  'Reverse String': 'https://images.unsplash.com/photo-1528650777595-65485ea42171?auto=format&fit=crop&w=400&q=80',
  'Best Time to Buy and Sell Stock': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80',
  'Contains Duplicate': 'https://images.unsplash.com/photo-1549646542-a8db61bc9991?auto=format&fit=crop&w=400&q=80',
  // Updated exact keys below:
  'Implement Trie (Prefix Tree)': 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
  'Letter Combinations of a Phone Number': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png',
  'Course Schedule II': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png',
  'Word Break': 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=400&q=80',
  'Find Median from Data Stream': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
  
  'LFU Cache': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
  'Word Ladder': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png',
  'Serialize and Deserialize Binary Tree': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
  'Trapping Rain Water': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80',
  'Minimum Window Substring': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80'
};

export default function NetflixInsights() {
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
      backgroundColor: '#141414',
      scrollBehavior: 'smooth',
      color: '#fff',
      padding: '20px 20px 60px 20px',
      position: 'relative',
      fontFamily: "'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto 40px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#E50914', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>JARVIS</Title>
        </div>
        <Button style={{ background: 'transparent', color: '#fff', border: 'none', fontWeight: 'bold' }} onClick={() => navigate('/company-patterns')}>Exit</Button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Netflix Hero Billboard - Netflix Opening Logo N */}
        <div style={{ 
          height: '500px', 
          background: 'linear-gradient(to right, #141414 20%, transparent 100%), linear-gradient(to top, #141414 0%, transparent 40%), url("https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png")',
          backgroundSize: 'cover', // Full background
          backgroundPosition: 'center', // Centered
          backgroundRepeat: 'no-repeat',
          borderRadius: '8px',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          marginBottom: '50px',
          boxShadow: 'inset 0 -150px 100px #141414',
          position: 'relative'
        }}>
          {/* Faint Red Glow for Atmosphere */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(ellipse at center, rgba(229, 9, 20, 0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

          <div style={{ zIndex: 2 }}>
            <Title level={1} style={{ fontSize: '70px', fontWeight: '900', color: '#fff', margin: '0 0 10px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Netflix Core
            </Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', color: '#fff', fontSize: '18px', fontWeight: '500', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              <span style={{ color: '#46d369' }}>98% Match</span>
              <span>2024</span>
              <span style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '0 5px' }}>SYSTEMS</span>
              <span>High Scale</span>
            </div>
            <Text style={{ color: '#fff', fontSize: '18px', maxWidth: '600px', display: 'block', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Explore the intense algorithms and system design patterns tested by Netflix to ensure impeccable streaming architecture for millions of concurrent users.
            </Text>
            <div style={{ display: 'flex', gap: '15px' }}>
              <Button type="primary" size="large" icon={<PlayCircleOutlined />} onClick={() => window.open('https://jobs.netflix.com/', '_blank')} style={{ background: '#fff', color: '#000', border: 'none', padding: '0 30px', fontSize: '18px', fontWeight: 'bold' }}>
                Culture Memo
              </Button>
              <Button size="large" icon={<InfoCircleOutlined />} onClick={() => window.open('https://netflixtechblog.com/', '_blank')} style={{ background: 'rgba(109, 109, 110, 0.7)', color: '#fff', border: 'none', padding: '0 30px', fontSize: '18px', fontWeight: 'bold', backdropFilter: 'blur(5px)' }}>
                Tech Blog
              </Button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {['Easy', 'Medium', 'Hard'].map((diff) => (
            <div key={diff}>
              <Title level={3} style={{ color: '#e5e5e5', fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
                Trending in {diff}
              </Title>
              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                overflowX: 'auto', 
                paddingBottom: '20px',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch'
              }} className="netflix-row">
                {NETFLIX_QUESTIONS[diff].map((q, i) => (
                  <div 
                    key={i}
                    onClick={() => setSelectedQuestion(q)}
                    style={{ 
                      minWidth: '280px', 
                      height: '160px', 
                      background: `linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.2) 100%), url('${IMAGE_MAP[q] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80'}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '4px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      cursor: 'pointer',
                      position: 'relative'
                    }} className="netflix-card">
                    <Title level={4} style={{ color: '#fff', zIndex: 2, margin: 0, fontSize: '18px', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,1)' }}>
                      {q}
                    </Title>
                    <div style={{ color: '#E50914', fontSize: '12px', fontWeight: '900', zIndex: 2, display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }} className="nf-play">
                      <CodeOutlined /> PLAY OPTIONS
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <Modal
        title={null}
        open={!!selectedQuestion}
        onCancel={() => setSelectedQuestion(null)}
        footer={null}
        centered
        style={{ padding: 0 }}
        bodyStyle={{ background: '#141414', padding: '40px', borderRadius: '4px', border: '1px solid #333' }}
        closeIcon={<span style={{ color: '#fff', fontSize: '20px' }}>×</span>}
      >
        <Title level={3} style={{ color: '#fff', marginBottom: '10px' }}>Title Selected</Title>
        <Title level={4} style={{ color: '#e5e5e5', marginBottom: '40px', fontWeight: '400' }}>
          <span style={{ color: '#E50914', fontWeight: 'bold' }}>{selectedQuestion}</span>
        </Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Button 
            size="large" 
            icon={<CodeOutlined />} 
            onClick={handleSolve}
            style={{ height: '60px', fontSize: '18px', background: '#E50914', color: '#fff', border: 'none', fontWeight: 'bold', borderRadius: '4px' }}
          >
            Solve
          </Button>
          <Button 
            size="large" 
            icon={<SearchOutlined />} 
            onClick={handleExplain}
            style={{ height: '60px', fontSize: '18px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 'bold', borderRadius: '4px' }}
          >
            Explanation
          </Button>
        </div>
      </Modal>

      <style>{`
        .netflix-row::-webkit-scrollbar { display: none; }
        .netflix-card { transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
        .netflix-card:hover { transform: scale(1.05); z-index: 100; box-shadow: 0 10px 20px rgba(0,0,0,0.6); outline: 2px solid #fff; }
        .nf-play { opacity: 0; transition: opacity 0.3s ease; }
        .netflix-card:hover .nf-play { opacity: 1; }
        .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
