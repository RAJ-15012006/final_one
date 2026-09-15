import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Space, Badge } from 'antd';
import { 
  ThunderboltOutlined, 
  ClockCircleOutlined,
  BlockOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  RadarChartOutlined,
  ApiOutlined,
  RocketOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Lobby({ onStart, settings, setSettings, onBack }) {
  const [logs, setLogs] = useState(['Initializing Core Systems...', 'Awaiting User Input...']);
  
  const topics = [
    "Array", "Backtracking", "Binary Search", "Bit Manipulation", "Divide and Conquer", 
    "Dynamic Programming", "Greedy", "Hash Table", "Heap (Priority Queue)", "Linked List", 
    "Math", "Matrix", "Merge Sort", "Monotonic Stack", "Recursion", "Simulation", 
    "Sliding Window", "Sorting", "Stack", "String", "String Matching", "Two Pointers"
  ];

  const timeOptions = [10, 15, 20];
  const difficultyOptions = ['Easy', 'Medium', 'Hard'];
  const playerOptions = [2, 3, 4];

  const updateLog = (msg) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  useEffect(() => {
    updateLog(`Selected Topic: ${settings.topic}`);
  }, [settings.topic]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', position: 'relative' }}>
      <Button 
        type="ghost" 
        icon={<ArrowLeftOutlined />} 
        onClick={onBack}
        style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          zIndex: 10,
          color: 'rgba(0, 210, 255, 0.7)',
          border: '1px solid rgba(0, 210, 255, 0.3)',
          borderRadius: '4px',
          background: 'rgba(0, 210, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}
        className="goback-pulse-btn"
      >
        GO BACK
      </Button>

      {/* Background HUD Frame */}
      <div className="hud-frame"></div>

      <div style={{ textAlign: 'left', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="status-orb"></div>
          <div>
            <Title level={4} style={{ color: '#00D2FF', margin: 0, letterSpacing: '2px', fontWeight: '900' }}>MISSION CONTROL v4.0</Title>
            <Text style={{ color: 'rgba(0, 210, 255, 0.5)', fontSize: '10px', textTransform: 'uppercase' }}>Secure encrypted connection... ACTIVE</Text>
          </div>
        </div>
      </div>

      <Row gutter={[40, 40]}>
        {/* Left Control Panel */}
        <Col span={24} lg={10}>
          <div className="command-panel left">
            <Title level={5} className="panel-header"><RadarChartOutlined /> ENGINE PARAMETERS</Title>
            
            <div className="module-group">
                <Text className="module-label">TEMPORAL DURATION (MINS)</Text>
                <div className="power-cells">
                    {timeOptions.map(t => (
                        <div 
                            key={t}
                            onClick={() => { setSettings({ ...settings, time: t }); updateLog(`Time adjusted to ${t}m`); }}
                            className={`power-cell ${settings.time === t ? 'active-cobalt' : ''}`}
                        >
                            <span className="cell-val">{t}</span>
                            <div className="cell-bar"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="module-group">
                <Text className="module-label">THREAT LEVEL (DIFFICULTY)</Text>
                <div className="difficulty-matrix">
                    {difficultyOptions.map(d => (
                        <div 
                            key={d}
                            onClick={() => { setSettings({ ...settings, difficulty: d }); updateLog(`Difficulty shifted to ${d}`); }}
                            className={`diff-node ${settings.difficulty === d ? 'selected' : ''}`}
                            style={{ 
                                borderColor: settings.difficulty === d ? '#FF6B00' : 'rgba(255, 107, 0, 0.2)',
                                color: settings.difficulty === d ? '#fff' : 'rgba(255, 107, 0, 0.5)',
                                background: settings.difficulty === d ? '#FF6B00' : 'transparent'
                            }}
                        >
                            {d.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>

            <div className="module-group">
                <Text className="module-label">PLAYER ALLOCATION</Text>
                <div className="player-slots-ui">
                    {playerOptions.map(p => (
                        <div 
                            key={p}
                            onClick={() => { setSettings({ ...settings, players: p }); updateLog(`Player slots: ${p}`); }}
                            className={`slot-hex ${settings.players === p ? 'active-orange' : ''}`}
                        >
                            <Title level={3} style={{ color: 'inherit', margin: 0 }}>{p}</Title>
                            <Text style={{ fontSize: '8px', color: 'inherit' }}>UNITS</Text>
                        </div>
                    ))}
                </div>
            </div>

            {/* Simulated System Logs */}
            <div className="system-logs" style={{ borderLeft: '2px solid #00D2FF' }}>
                <div className="log-header" style={{ color: '#00D2FF' }}>COMMAND LOGS</div>
                {logs.map((log, i) => (
                    <div key={i} className="log-entry" style={{ opacity: 1 - (i * 0.2) }}>
                        <span className="log-time" style={{ color: 'rgba(0, 210, 255, 0.5)' }}>[{new Date().toLocaleTimeString([], { hour12: false })}]</span> {log}
                    </div>
                ))}
            </div>
          </div>
        </Col>

        {/* Right Selection Matrix */}
        <Col span={24} lg={14}>
          <div className="command-panel right">
            <Title level={5} className="panel-header"><ApiOutlined /> MISSION OBJECTIVE MATRIX</Title>
            <div className="topic-matrix-container custom-scrollbar">
                <div className="matrix-grid">
                    {topics.map(t => (
                        <div 
                            key={t}
                            onClick={() => setSettings({ ...settings, topic: t })}
                            className={`matrix-item ${settings.topic === t ? 'targeted-cobalt' : ''}`}
                        >
                            <div className="corner-tl"></div>
                            <div className="matrix-text">{t.toUpperCase()}</div>
                            {settings.topic === t && <div className="scanning-bar"></div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="matrix-footer">
                <div style={{ flex: 1 }}>
                    <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>Current Target: <span style={{ color: '#FF6B00' }}>{settings.topic.toUpperCase()}</span></Text>
                    <div style={{ height: '2px', background: 'rgba(255, 107, 0, 0.2)', width: '100%', marginTop: '5px' }}>
                        <div style={{ height: '100%', width: '100%', background: '#FF6B00', animation: 'progress 2s linear infinite' }}></div>
                    </div>
                </div>
                <div style={{ marginLeft: '40px' }}>
                    <Button 
                        onClick={() => onStart(settings)}
                        className="launch-button"
                    >
                        INITIATE MISSION <RocketOutlined />
                    </Button>
                </div>
            </div>
          </div>
        </Col>
      </Row>

      <style>{`
        .hud-frame {
            position: absolute;
            top: -20px; left: -20px; right: -20px; bottom: -20px;
            border: 1px solid rgba(255, 176, 0, 0.1);
            pointer-events: none;
            background: 
                linear-gradient(to right, #FFB000 2px, transparent 2px) 0 0,
                linear-gradient(to bottom, #FFB000 2px, transparent 2px) 0 0,
                linear-gradient(to left, #FFB000 2px, transparent 2px) 100% 0,
                linear-gradient(to bottom, #FFB000 2px, transparent 2px) 100% 0,
                linear-gradient(to right, #FFB000 2px, transparent 2px) 0 100%,
                linear-gradient(to top, #FFB000 2px, transparent 2px) 0 100%,
                linear-gradient(to left, #FFB000 2px, transparent 2px) 100% 100%,
                linear-gradient(to top, #FFB000 2px, transparent 2px) 100% 100%;
            background-repeat: no-repeat;
            background-size: 20px 20px;
            opacity: 0.5;
        }

        .status-orb {
            width: 12px; height: 12px;
            background: #00D2FF;
            border-radius: 50%;
            box-shadow: 0 0 15px #00D2FF;
            animation: breathe 2s infinite alternate;
        }

        @keyframes breathe {
            from { opacity: 0.5; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1.1); }
        }

        .command-panel {
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.05);
            padding: 25px;
            border-radius: 4px;
            position: relative;
            overflow: hidden;
        }

        .panel-header {
            color: rgba(255,255,255,0.3) !important;
            font-size: 12px !important;
            letter-spacing: 2px;
            margin-bottom: 30px !important;
        }

        .module-group {
            margin-bottom: 35px;
        }

        .module-label {
            color: rgba(255,255,255,0.4);
            font-size: 10px;
            letter-spacing: 1px;
            display: block;
            margin-bottom: 15px;
        }

        /* Power Cells UI */
        .power-cells {
            display: flex; gap: 15px;
        }
        .power-cell {
            flex: 1; height: 80px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.02);
            cursor: pointer;
            display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .cell-val { font-size: 24px; font-weight: 900; color: #fff; }
        .cell-bar { width: 40%; height: 2px; background: rgba(255,255,255,0.1); margin-top: 5px; }
        .power-cell.active-cobalt {
            border-color: #00D2FF; background: rgba(0, 210, 255, 0.05);
            transform: translateY(-5px); box-shadow: 0 5px 20px rgba(0, 210, 255, 0.2);
        }
        .power-cell.active-cobalt .cell-bar { background: #00D2FF; box-shadow: 0 0 10px #00D2FF; width: 60%; }

        /* Difficulty Matrix */
        .difficulty-matrix {
            display: flex; gap: 10px;
        }
        .diff-node {
            flex: 1; padding: 12px; border: 1px solid rgba(188, 19, 254, 0.2);
            font-size: 11px; font-weight: bold; color: rgba(188, 19, 254, 0.5);
            text-align: center; cursor: pointer; transition: 0.3s;
        }
        .diff-node.selected {
            background: #bc13fe; color: #fff; border-color: #bc13fe;
            box-shadow: 0 0 20px rgba(188, 19, 254, 0.4);
        }

        /* Player Slots UI */
        .player-slots-ui {
            display: flex; gap: 20px;
        }
        .slot-hex {
            width: 70px; height: 70px; border: 2px solid rgba(255, 0, 255, 0.2);
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            cursor: pointer; transition: 0.3s; color: rgba(255, 0, 255, 0.3);
        }
        .slot-hex.active-orange {
            border-color: #FF6B00; color: #fff; background: rgba(255, 107, 0, 0.1);
            box-shadow: 0 0 20px rgba(255, 107, 0, 0.3);
        }

        /* Logs */
        .system-logs {
            margin-top: 40px; padding: 15px; background: rgba(0,0,0,0.4);
            border-left: 2px solid #00f2ff; font-family: 'monospace';
        }
        .log-header { font-size: 9px; color: #00f2ff; margin-bottom: 10px; opacity: 0.6; }
        .log-entry { font-size: 11px; color: rgba(255,255,255,0.7); margin-bottom: 5px; }
        .log-time { color: rgba(0, 242, 255, 0.5); margin-right: 8px; }

        /* Matrix Grid */
        .topic-matrix-container {
            height: 400px; overflow-y: auto; padding-right: 15px;
        }
        .matrix-grid {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
        }
        .matrix-item {
            padding: 20px; border: 1px solid rgba(255,255,255,0.05);
            background: rgba(255,255,255,0.02); cursor: pointer; position: relative;
            overflow: hidden; transition: 0.3s;
        }
        .matrix-text { font-size: 11px; font-weight: bold; color: rgba(255,255,255,0.4); position: relative; z-index: 2; }
        .corner-tl { position: absolute; top: 0; left: 0; width: 6px; height: 6px; border-top: 1px solid #fff; border-left: 1px solid #fff; opacity: 0; }
        
        .matrix-item:hover { background: rgba(255,255,255,0.05); }
        .matrix-item.targeted-cobalt { border-color: #00D2FF; background: rgba(0, 210, 255, 0.05); }
        .matrix-item.targeted-cobalt .matrix-text { color: #00D2FF; }
        .matrix-item.targeted-cobalt .corner-tl { opacity: 0.5; }

        .scanning-bar {
            position: absolute; top: 0; left: 0; right: 0; height: 2px;
            background: linear-gradient(90deg, transparent, #00D2FF, transparent);
            animation: matrix-scan 2s linear infinite;
        }

        @keyframes matrix-scan {
            0% { top: 0%; }
            100% { top: 100%; }
        }

        .matrix-footer {
            margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center;
        }

        .launch-button {
            height: 60px; padding: 0 40px; background: linear-gradient(45deg, #00D2FF, #FF6B00);
            border: none; color: #fff; font-weight: 900; letter-spacing: 2px;
            box-shadow: 0 5px 25px rgba(0, 210, 255, 0.3); transition: 0.3s;
        }
        .launch-button:hover {
            transform: scale(1.05); box-shadow: 0 10px 40px rgba(255, 107, 0, 0.5);
            color: #fff !important;
        }

        @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .goback-pulse-btn:hover {
            color: #00D2FF !important;
            border-color: #00D2FF !important;
            background: rgba(0, 210, 255, 0.1) !important;
            box-shadow: 0 0 15px rgba(0, 210, 255, 0.3);
            transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
