import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Space, Card, Tag, Modal } from 'antd';
import { 
  RocketOutlined, 
  TeamOutlined, 
  FieldTimeOutlined, 
  ThunderboltOutlined,
  CodeOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import MainLayout from '../components/MainLayout';
import Lobby from '../components/GamingRoom/Lobby';
import GamingArena from '../components/GamingRoom/GamingArena';
import LeaderboardOverlay from '../components/GamingRoom/LeaderboardOverlay';
import CodingStats from '../components/GamingRoom/CodingStats';
import WaitingRoom from '../components/GamingRoom/WaitingRoom';

import codingBg from '../assets/coding_room_bg.png';

export default function GamingRoom() {
  const [gameState, setGameState] = useState('STATS'); // STATS, SETUP, WAITING, ARENA, RESULTS
  const [gameSettings, setGameSettings] = useState(() => ({
    time: 15,
    difficulty: 'Easy',
    topic: 'Array',
    players: 2,
    roomCode: Math.random().toString(36).substring(2, 8).toUpperCase()
  }));
  const [results, setResults] = useState(null);

  const handleStartSetup = () => {
    setGameState('SETUP');
  };

  const handleInitiateMission = (settings) => {
    setGameSettings(settings);
    setGameState('WAITING');
  };

  const handleStartArena = () => {
    setGameState('ARENA');
  };

  const handleFinishGame = (gameResults) => {
    setResults(gameResults);
    setGameState('RESULTS');
  };

  return (
    <MainLayout forceCollapse={gameState === 'ARENA'}>
      <div className="gaming-hub-container" style={{ 
        padding: '0 20px 40px 20px', 
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${codingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}>
        {gameState === 'STATS' && (
          <CodingStats onContinue={handleStartSetup} />
        )}

        {gameState === 'SETUP' && (
          <Lobby 
            onStart={handleInitiateMission} 
            settings={gameSettings}
            setSettings={setGameSettings}
            onBack={() => setGameState('STATS')}
          />
        )}

        {gameState === 'WAITING' && (
          <WaitingRoom 
            settings={gameSettings} 
            onStart={handleStartArena}
            onCancel={() => setGameState('SETUP')}
          />
        )}
        
        {gameState === 'ARENA' && (
          <GamingArena 
            settings={gameSettings} 
            onFinish={handleFinishGame}
          />
        )}

        {gameState === 'RESULTS' && (
          <LeaderboardOverlay 
            results={results} 
            onClose={() => setGameState('STATS')}
          />
        )}
      </div>
    </MainLayout>
  );
}
