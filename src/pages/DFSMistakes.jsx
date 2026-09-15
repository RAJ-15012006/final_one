import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import Logo from '../components/Logo';
import BlueNetworkBG from '../assets/blue_network_bg.png';
import { dfsMistakesMarkdown } from '../data/dfsMistakesData';

const { Title } = Typography;

export default function DFSMistakes() {
  const navigate = useNavigate();

  const markdownContent = dfsMistakesMarkdown;
  const THEME_COLOR = '#8a2be2';

  const toc = React.useMemo(() => {
    const lines = markdownContent.split('\n');
    const headings = lines.filter(line => line.startsWith('# ') || line.startsWith('## '));
    return headings.map(h => {
        const level = h.startsWith('##') ? 2 : 1;
        // Clean markdown characters
        let text = h.replace(/^#+\s/, '');
        text = text.replace(/[*_~`]/g, ''); 
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { level, text, id };
    });
  }, [markdownContent]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if(el) {
        // Account for some sticky margins
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  const generateId = (children) => {
    const text = Array.isArray(children) ? children.join('') : String(children);
    return text.replace(/[*_~`]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${BlueNetworkBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#fff',
      padding: '60px 40px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Decorative Glows (Using Purple tone for DFS theme) */}
      <div style={{
        position: 'fixed',
        top: '10%',
        right: '10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(138, 43, 226, 0.05) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Header / Nav */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '60px',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto 40px auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Logo size={40} />
          <Title level={4} style={{ margin: 0, color: '#fff', letterSpacing: '2px', fontWeight: '900', fontFamily: "'JetBrains Mono', monospace" }}>JARVIS</Title>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
          <Button type="text" style={{ color: '#fff', padding: '0 15px' }} onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          <Button 
            type="primary" 
            icon={<ArrowLeftOutlined />} 
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              color: '#fff', 
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '20px'
            }} 
            onClick={() => navigate('/topic-wise-mistakes')}
          >
            Back to Topics
          </Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '40px', maxWidth: '1400px', margin: '0 auto', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        
        {/* LEFT SIDEBAR - TABLE OF CONTENTS */}
        <div style={{
            position: 'sticky',
            top: '40px',
            width: '320px',
            minWidth: '320px',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${THEME_COLOR}44`,
            borderRadius: '24px',
            padding: '30px',
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            <Title level={4} style={{ color: THEME_COLOR, borderBottom: `1px solid ${THEME_COLOR}44`, paddingBottom: '15px', marginBottom: '20px', fontWeight: 'bold' }}>Table of Contents</Title>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {toc.map((item, idx) => (
                    <li key={idx} style={{ 
                        paddingLeft: item.level === 2 ? '20px' : '0',
                        marginBottom: item.level === 1 ? '16px' : '10px',
                        cursor: 'pointer',
                        color: item.level === 1 ? '#fff' : 'rgba(255,255,255,0.6)',
                        fontSize: item.level === 2 ? '14px' : '15px',
                        fontWeight: item.level === 1 ? '600' : '400',
                        transition: 'all 0.2s ease',
                        lineHeight: '1.4'
                    }}
                    onClick={() => scrollToHeading(item.id)}
                    onMouseEnter={e => {
                        e.currentTarget.style.color = THEME_COLOR;
                        e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.color = item.level === 1 ? '#fff' : 'rgba(255,255,255,0.6)';
                        e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>

        {/* RIGHT CONTENT CONTAINER */}
        <div style={{
            flex: 1,
            background: 'rgba(15, 10, 30, 0.7)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${THEME_COLOR}33`,
            borderRadius: '24px',
            padding: '50px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            minWidth: 0
        }}>
          <div className="markdown-container">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, children, ...props}) => <h1 id={generateId(children)} style={{ color: '#8a2be2', fontSize: '2.5rem', fontWeight: '900', marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid rgba(138, 43, 226, 0.2)', paddingBottom: '10px' }} {...props}>{children}</h1>,
                h2: ({node, children, ...props}) => <h2 id={generateId(children)} style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem' }} {...props}>{children}</h2>,
                h3: ({node, ...props}) => <h3 style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.4rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.8rem' }} {...props} />,
                p: ({node, ...props}) => <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: '1.8', marginBottom: '1rem' }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: '1.8', paddingLeft: '20px', marginBottom: '1rem' }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                strong: ({node, ...props}) => <strong style={{ color: '#fff', fontWeight: 'bold' }} {...props} />,
                hr: ({node, ...props}) => <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '2rem 0' }} {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote style={{ 
                    borderLeft: '4px solid #8a2be2', 
                    background: 'rgba(138, 43, 226, 0.05)', 
                    margin: '1rem 0', 
                    padding: '10px 20px', 
                    color: 'rgba(255,255,255,0.9)', 
                    fontStyle: 'italic',
                    borderRadius: '0 8px 8px 0'
                  }} {...props} />
                ),
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline ? (
                    <div style={{ marginBottom: '1.5rem', marginTop: '0.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={atomDark}
                        language={match ? match[1] : 'text'}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '20px', background: 'rgba(0,0,0,0.4)' }}
                      />
                    </div>
                  ) : (
                    <code {...props} className={className} style={{ 
                      background: 'rgba(255,255,255,0.1)', 
                      padding: '2px 6px', 
                      borderRadius: '4px', 
                      color: '#e066ff',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.9em'
                    }}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {dfsMistakesMarkdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
