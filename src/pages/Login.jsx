import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Space, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, CodeOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { findUser } from '../data/users';

import Logo from '../components/Logo';
import techBg from '../assets/tech_bg.png';

const { Title, Text } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Mock login using local data helper
      const user = findUser(values.username, values.password);

      if (user) {
        // Simulate JWT token
        const mockToken = "mock-jwt-token-" + Math.random().toString(36).substring(7);
        login(user, mockToken);
        messageApi.success('Login successful (Mock Mode)!');
        navigate('/dashboard');
      } else {
        messageApi.error('Invalid username or password');
      }
    } catch (error) {
      console.error("Login error:", error);
      messageApi.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundImage: `url(${techBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: 24, right: 24 }}>
        <Button
          type="text"
          icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          style={{ fontSize: '20px' }}
        />
      </div>
      {contextHolder}
      <Card
        style={{
          width: 400,
          borderRadius: '12px',
          boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.1)',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.2)',
          background: theme === 'dark' ? 'rgba(26, 26, 26, 0.6)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
        bordered={false}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size={80} style={{ marginBottom: '16px' }} />
          <Title level={3} style={{ margin: 0 }}>JARVIS</Title>
          <Text type="secondary">Sign in to your JARVIS portal</Text>
        </div>

        <Form
          name="login"
          initialValues={{ username: 'student1', password: 'password123' }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username (e.g. student1)" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: theme === 'dark' ? '#fff' : 'inherit' }}>Remember me</Checkbox>
              </Form.Item>
              <Button type="link" style={{ padding: 0 }}>
                Forgot password
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large" loading={loading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="link" onClick={() => navigate('/register')}>
              Don't have an account? Register now
            </Button>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Demo Accounts:<br />
              student1 / password123<br />
              admin / admin
            </Text>
          </Space>
        </div>
      </Card>
    </div>
  );
}
