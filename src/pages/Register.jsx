import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, CodeOutlined, IdcardOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { registerUser } from '../data/users';

import Logo from '../components/Logo';
import techBg from '../assets/tech_bg.png';

const { Title, Text } = Typography;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Mock registration using local data helper
      const result = registerUser({
        id: values.username,
        name: values.fullName,
        email: values.email,
        password: values.password
      });

      if (result.success) {
        // Auto-login after successful registration
        const mockToken = "mock-jwt-token-" + Math.random().toString(36).substring(7);
        login(result.user, mockToken);
        
        messageApi.success('Registration successful (Mock Mode)!');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        messageApi.error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error("Registration error:", error);
      messageApi.error('An error occurred during registration');
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
      padding: '24px',
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
          width: 450, 
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
          <Title level={3} style={{ margin: 0 }}>Create an Account</Title>
          <Text type="secondary">Join the JARVIS platform</Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="Full Name" size="large" />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input a unique Username!' },
              { min: 4, message: 'Username must be at least 4 characters long' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Unique Username / ID" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email Address" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters long' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '8px' }} size="large" loading={loading}>
              Create Account
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Button type="link" onClick={() => navigate('/login')}>
            Already have an account? Log in
          </Button>
        </div>
      </Card>
    </div>
  );
}
