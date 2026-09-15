import React, { useEffect, useState } from 'react';
import { Typography, Button, Space, Card, Avatar, Row, Col } from 'antd';
import { 
  TrophyOutlined, 
  ThunderboltOutlined, 
  CheckCircleOutlined,
  RocketOutlined,
  CloseOutlined
} from '@ant-design/icons';
import Confetti from 'react-confetti';

const { Title, Text } = Typography;

export default function LeaderboardOverlay({ results, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const winners = [
    { rank: 1, name: 'You', avatar: 'Y', xp: results?.xp || 500, accuracy: results?.accuracy || 100, time: '2:45' },
    { rank: 2, name: 'CyberCoder', avatar: 'C', xp: 350, accuracy: 92, time: '3:10' },
    { rank: 3, name: 'NeoByte', avatar: 'N', xp: 200, accuracy: 75, time: '5:20' },
  ];

  return (
    <div className={`leaderboard-overlay ${show ? 'active' : ''}`}>
      <Confetti 
        width={window.innerWidth} 
        height={window.innerHeight} 
        recycle={false} 
        numberOfPieces={400}
        colors={['#00D2FF', '#FF6B00', '#FFFFFF']}
      />
      
      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', animation: 'slideUp 0.5s ease-out' }}>
        <div className="neon-card" style={{ padding: '40px', background: 'rgba(10, 10, 20, 0.95)', border: '2px solid #00D2FF', boxShadow: '0 0 50px rgba(0, 210, 255, 0.3)' }}>
            <Button 
                type="text" 
                icon={<CloseOutlined />} 
                onClick={onClose}
                style={{ position: 'absolute', right: '20px', top: '20px', color: '#fff', fontSize: '20px' }}
            />

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <TrophyOutlined style={{ fontSize: '80px', color: '#ffcc00', filter: 'drop-shadow(0 0 20px #ffcc00)' }} />
                <Title level={1} style={{ fontSize: '48px', margin: '20px 0 0 0', fontWeight: 900, color: '#00D2FF' }}>CHALLENGE COMPLETE</Title>
                <Text style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '2px' }}>RANKING UPDATED ON NEURAL NETWORK</Text>
            </div>

            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {winners.map((winner, i) => (
                    <div key={i} style={{ 
                        background: i === 0 ? 'rgba(0, 210, 255, 0.1)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${i === 0 ? '#00D2FF' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '16px',
                        padding: '15px 25px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Space size={20}>
                            <Title level={3} style={{ margin: 0, color: i === 0 ? '#00D2FF' : '#888', width: '30px' }}>{winner.rank}</Title>
                            <Avatar size={48} style={{ background: i === 0 ? '#00D2FF' : '#FF6B00', color: '#000', fontWeight: 'bold' }}>{winner.avatar}</Avatar>
                            <div>
                                <Title level={4} style={{ margin: 0, color: '#fff' }}>{winner.name}</Title>
                                <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>TIME: {winner.time} | ACCURACY: {winner.accuracy}%</Text>
                            </div>
                        </Space>
                        <div style={{ textAlign: 'right' }}>
                            <Title level={3} style={{ margin: 0, color: '#FF6B00' }}>+{winner.xp}</Title>
                            <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', textTransform: 'uppercase' }}>Credits Awarded</Text>
                        </div>
                    </div>
                ))}
            </Space>

            <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
                <Button 
                    className="neon-button" 
                    style={{ flex: 1, height: '50px', borderColor: '#00D2FF', color: '#00D2FF' }}
                    onClick={onClose}
                >
                    RETURN TO ROOM
                </Button>
                <Button 
                    style={{ flex: 1, height: '50px', background: '#FF6B00', borderColor: '#FF6B00', color: '#000', fontWeight: 900 }}
                    onClick={() => window.location.href = '/dashboard'}
                >
                    BACK TO DASHBOARD
                </Button>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .leaderboard-overlay.active {
            animation: fadeIn 0.3s forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
