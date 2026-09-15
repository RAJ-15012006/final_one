import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { ArrowLeftOutlined, CodeOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Logo from '../components/Logo';
import PremiumNotesBG from '../assets/premium_notes_bg.png';
import { PREMIUM_CONTENT } from '../data/PremiumNotesData';

const { Title, Text, Paragraph } = Typography;

export default function PremiumViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const data = PREMIUM_CONTENT[id];

  if (!data) {
    return (
      <div style={{ padding: '100px', textAlign: 'center', color: '#fff', background: '#000', minHeight: '100vh' }}>
        <Title level={2} style={{ color: '#fff' }}>Content Not Found</Title>
        <Button onClick={() => navigate('/problem-wise-notes')}>Go Back</Button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95)), url(${PremiumNotesBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#fff',
      padding: '60px 40px',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Background Decorative Glows */}
      <div style={{ position: 'absolute', top: 0, left: '20%', width: '600px', height: '600px', background: `radial-gradient(circle, ${data.color}15 0%, transparent 60%)`, filter: 'blur(100px)', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto' }}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          style={{ color: '#fff', marginBottom: '40px', display: 'flex', alignItems: 'center' }} 
          onClick={() => navigate('/problem-wise-notes')}
        >
          Back to Notes Menu
        </Button>

        {/* Header Area */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100px',
            height: '100px',
            background: 'rgba(255,255,255,0.03)',
            border: `2px solid ${data.color}55`,
            borderRadius: '24px',
            fontSize: '48px',
            color: data.color,
            marginBottom: '20px',
            boxShadow: `0 0 40px ${data.color}33, inset 0 0 20px ${data.color}22`
          }}>
            {data.icon}
          </div>
          
          <Title level={1} style={{ color: '#fff', fontSize: '42px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px' }}>
            {data.title}
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', letterSpacing: '1px' }}>
            {data.desc}
          </Text>
        </div>

        {/* Markdown Content Area */}
        <div className="premium-markdown-content" style={{
          background: 'rgba(15, 8, 4, 0.65)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '50px',
          border: `1px solid ${data.color}22`,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
        }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <Title level={2} style={{ color: '#fff', borderBottom: `2px solid ${data.color}55`, paddingBottom: '10px', marginTop: '40px' }} {...props} />,
              h2: ({node, ...props}) => (
                <div style={{ padding: '15px 20px', background: `${data.color}15`, borderLeft: `6px solid ${data.color}`, borderRadius: '0 12px 12px 0', marginTop: '40px', marginBottom: '20px' }}>
                  <Title level={3} style={{ color: '#fff', margin: 0, fontWeight: '600' }} {...props} />
                </div>
              ),
              h3: ({node, ...props}) => <Title level={4} style={{ color: data.color, marginTop: '30px' }} {...props} />,
              p: ({node, ...props}) => <Paragraph style={{ fontSize: '17px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)', marginBottom: '20px' }} {...props} />,
              ul: ({node, ...props}) => <ul style={{ paddingLeft: '25px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }} {...props} />,
              li: ({node, ...props}) => <li style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7' }} {...props} />,
              strong: ({node, ...props}) => <strong style={{ color: data.color }} {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote style={{ borderLeft: `4px solid ${data.color}88`, paddingLeft: '20px', margin: '20px 0', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }} {...props} />
              ),
              table: ({node, ...props}) => (
                <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(255,255,255,0.1)' }} {...props} />
                </div>
              ),
              th: ({node, ...props}) => <th style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: data.color }} {...props} />,
              td: ({node, ...props}) => <td style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)' }} {...props} />,
              code: ({node, inline, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <div style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', position: 'relative', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)', marginTop: '20px', marginBottom: '30px' }}>
                    <CodeOutlined style={{ position: 'absolute', top: '15px', right: '20px', color: 'rgba(255,255,255,0.2)', fontSize: '20px' }} />
                    <span style={{ position: 'absolute', top: '15px', left: '20px', color: data.color, fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>
                      {match ? match[1] : 'TEXT'}
                    </span>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match ? match[1] : 'text'}
                      PreTag="div"
                      customStyle={{ margin: 0, marginTop: '25px', background: 'transparent', padding: 0 }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '6px', color: '#ffcc00', fontFamily: "'JetBrains Mono', monospace", fontSize: '15px' }} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {data.markdown}
          </ReactMarkdown>
        </div>
        
        {/* Footer actions */}
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          <Button 
            type="primary" 
            size="large"
            style={{ 
              background: 'transparent', 
              borderColor: data.color, 
              color: data.color, 
              borderRadius: '12px',
              padding: '0 40px',
              height: '50px'
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top
          </Button>
        </div>
      </div>
    </div>
  );
}
