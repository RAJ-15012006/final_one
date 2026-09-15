import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Space, Avatar, Badge, Spin } from 'antd';
import { 
  CopyOutlined, 
  LoadingOutlined, 
  RocketOutlined, 
  LeftOutlined,
  UserOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function WaitingRoom({ settings, onStart, onCancel }) {
  const [players, setPlayers] = useState([
    { id: 1, name: 'You (Host)', avatar: 'Y', ready: true, isUser: true }
  ]);
  const [notifs, setNotifs] = useState(['Opening secure uplink...', 'Room protocol initialized.']);
  const [loading, setLoading] = useState(true);

  // Simulated player joining
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPlayers(prev => [...prev, { id: 2, name: 'CyberCoder', avatar: 'C', ready: true }]);
      setNotifs(prev => ['Operator [CyberCoder] has joined the uplink.', ...prev]);
    }, 2000);

    if (settings.players > 2) {
      const timer2 = setTimeout(() => {
        setPlayers(prev => [...prev, { id: 3, name: 'NeoByte', avatar: 'N', ready: true }]);
        setNotifs(prev => ['Operator [NeoByte] has joined the uplink.', ...prev]);
      }, 4500);

      if (settings.players > 3) {
        const timer3 = setTimeout(() => {
          setPlayers(prev => [...prev, { id: 4, name: 'BitMaster', avatar: 'B', ready: true }]);
          setNotifs(prev => ['Operator [BitMaster] has joined the uplink.', ...prev]);
        }, 7000);
        return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
      }
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
    return () => clearTimeout(timer1);
  }, [settings.players]);

  // Handle auto-ready after a while
  useEffect(() => {
     if (players.length >= settings.players) {
        setLoading(false);
        setNotifs(prev => ['SYSTEM READY. AWAITING DEPLOYMENT COMMAND.', ...prev]);
     }
  }, [players, settings.players]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(settings.roomCode);
    setNotifs(prev => ['Room code copied to clipboard.', ...prev]);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 0' }}>
      <Row gutter={40}>
        {/* Left: Room Status */}
        <Col span={14}>
          <div className="waiting-card" style={{
            background: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(0, 210, 255, 0.2)',
            padding: '30px',
            borderRadius: '16px',
            minHeight: '450px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Title level={4} style={{ color: '#00D2FF', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LoadingOutlined /> CONNECTING TO ARENA SERVER
            </Title>

            <div style={{ flex: 1 }}>
                <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', display: 'block', marginBottom: '20px' }}>ACTIVE OPERATORS IN UPLINK:</Text>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {Array.from({ length: settings.players }).map((_, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <Badge dot={players[i]?.ready} color="#FF6B00" offset={[-5, 5]}>
                                <Avatar 
                                    size={64} 
                                    icon={!players[i] ? <UserOutlined /> : null}
                                    style={{ 
                                        background: players[i] ? (players[i].isUser ? '#FF6B00' : '#00D2FF') : 'rgba(255,255,255,0.05)',
                                        border: players[i] ? '2px solid rgba(255,255,255,0.2)' : '2px dashed rgba(255,255,255,0.1)',
                                        color: (players[i]?.isUser || players[i]) ? '#000' : '#fff',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {players[i]?.avatar}
                                </Avatar>
                            </Badge>
                            <div style={{ marginTop: '8px' }}>
                                <Text style={{ fontSize: '11px', color: players[i] ? '#fff' : 'rgba(255,255,255,0.2)' }}>
                                    {players[i]?.name || 'EMPTY...'}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="notif-feed" style={{ marginTop: '40px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid #00D2FF', minHeight: '120px' }}>
                {notifs.map((n, i) => (
                    <div key={i} style={{ color: i === 0 ? '#00D2FF' : 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '6px' }}>
                        &gt; {n}
                    </div>
                ))}
            </div>
          </div>
        </Col>

        {/* Right: Room Actions */}
        <Col span={10}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="waiting-card" style={{ padding: '24px', background: 'rgba(0, 210, 255, 0.05)', border: '1px solid rgba(0, 210, 255, 0.2)', borderRadius: '12px' }}>
                <Text style={{ color: 'rgba(0, 210, 255, 0.6)', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>ROOM IDENTIFIER</Text>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Title level={2} style={{ color: '#fff', margin: 0, letterSpacing: '4px' }}>{settings.roomCode}</Title>
                    <Button icon={<CopyOutlined />} onClick={copyRoomCode} style={{ color: '#00D2FF', background: 'transparent', border: 'none' }} />
                </div>
                <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '10px', display: 'block' }}>
                    <InfoCircleOutlined style={{ marginRight: '6px' }} /> Share this code with friends to let them join your mission.
                </Text>
            </div>

            <Button 
                onClick={onStart}
                disabled={loading}
                className={!loading ? 'deployment-btn' : ''}
                style={{
                    height: '80px',
                    width: '100%',
                    background: loading ? 'rgba(255,255,255,0.05)' : 'linear-gradient(45deg, #00D2FF, #FF6B00)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '20px',
                    fontWeight: '900',
                    letterSpacing: '2px',
                    transition: '0.3s'
                }}
            >
                {loading ? 'WAITING FOR SQUAD...' : 'DEPLOY SQUAD'} <RocketOutlined />
            </Button>

            <Button 
                onClick={onCancel}
                icon={<LeftOutlined />}
                style={{
                    height: '50px',
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                    borderRadius: '8px'
                }}
            >
                ABORT MISSION
            </Button>
          </div>
        </Col>
      </Row>

      <style>{`
        .notif-feed { overflow-y: hidden; }
        .deployment-btn { animation: launch-pulse 1.5s infinite; }
        @keyframes launch-pulse {
            0% { box-shadow: 0 0 10px rgba(0, 210, 255, 0.4); }
            50% { box-shadow: 0 0 30px rgba(255, 107, 0, 0.6); transform: scale(1.02); }
            100% { box-shadow: 0 0 10px rgba(0, 210, 255, 0.4); }
        }
      `}</style>
    </div>
  );
}
