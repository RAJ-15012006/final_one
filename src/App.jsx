import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Problems from './pages/Problems';
import ProblemArea from './pages/ProblemArea';
import GamingRoom from './pages/GamingRoom';
import PremiumNotes from './pages/PremiumNotes';
import CompanyPatterns from './pages/CompanyPatterns';
import ProblemWiseNotes from './pages/ProblemWiseNotes';
import PremiumViewer from './pages/PremiumViewer';
import DirectResources from './pages/DirectResources';
import DsaCheatSheets from './pages/DsaCheatSheets';
import PracticePlatforms from './pages/PracticePlatforms';
import InterviewGuides from './pages/InterviewGuides';
import AlgorithmVisualizers from './pages/AlgorithmVisualizers';
import SystemDesignResources from './pages/SystemDesignResources';
import DeveloperTools from './pages/DeveloperTools';
import AmazonInsights from './pages/AmazonInsights';
import GoogleInsights from './pages/GoogleInsights';
import MetaInsights from './pages/MetaInsights';
import MicrosoftInsights from './pages/MicrosoftInsights';
import AppleInsights from './pages/AppleInsights';
import NetflixInsights from './pages/NetflixInsights';
import TopicWiseMistakes from './pages/TopicWiseMistakes';
import LinkedListMistakes from './pages/LinkedListMistakes';
import DPMistakes from './pages/DPMistakes';
import BSMistakes from './pages/BSMistakes';
import DFSMistakes from './pages/DFSMistakes';
import RecursiveMistakes from './pages/RecursiveMistakes';
import ArrayStringMistakes from './pages/ArrayStringMistakes';
import InterviewSimulator from './pages/InterviewSimulator';
import MainLayout from './components/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import { ConfigProvider, theme as antdTheme } from 'antd';
import './App.css';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Main App routing component
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MainLayout><Dashboard /></MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/problems" 
        element={
          <ProtectedRoute>
            <MainLayout><Problems /></MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/gaming-room" 
        element={
          <ProtectedRoute>
            <GamingRoom />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/coding-room" 
        element={
          <ProtectedRoute>
            <GamingRoom />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/company-patterns" 
        element={
          <ProtectedRoute>
            <CompanyPatterns />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/problem-wise-notes" 
        element={
          <ProtectedRoute>
            <ProblemWiseNotes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/premium-notes" 
        element={
          <ProtectedRoute>
            <PremiumNotes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/premium-content/:id" 
        element={
          <ProtectedRoute>
            <MainLayout><PremiumViewer /></MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/direct-resources" 
        element={
          <ProtectedRoute>
            <DirectResources />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dsa-cheat-sheets" 
        element={
          <ProtectedRoute>
            <DsaCheatSheets />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/practice-platforms" 
        element={
          <ProtectedRoute>
            <PracticePlatforms />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/interview-guides" 
        element={
          <ProtectedRoute>
            <InterviewGuides />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/algorithm-visualizers" 
        element={
          <ProtectedRoute>
            <AlgorithmVisualizers />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/system-design-resources" 
        element={
          <ProtectedRoute>
            <SystemDesignResources />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/developer-tools" 
        element={
          <ProtectedRoute>
            <DeveloperTools />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/topic-wise-mistakes" 
        element={
          <ProtectedRoute>
            <TopicWiseMistakes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/linked-list-mistakes" 
        element={
          <ProtectedRoute>
            <LinkedListMistakes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dp-mistakes" 
        element={
          <ProtectedRoute>
            <DPMistakes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/bs-mistakes" 
        element={
          <ProtectedRoute>
            <BSMistakes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dfs-mistakes" 
        element={
          <ProtectedRoute>
            <DFSMistakes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recursive-mistakes" 
        element={
          <ProtectedRoute>
            <RecursiveMistakes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/array-string-mistakes" 
        element={
          <ProtectedRoute>
            <ArrayStringMistakes />
          </ProtectedRoute>
        } 
      />
      <Route path="/company/amazon" element={<ProtectedRoute><AmazonInsights /></ProtectedRoute>} />
      <Route path="/company/google" element={<ProtectedRoute><GoogleInsights /></ProtectedRoute>} />
      <Route path="/company/meta" element={<ProtectedRoute><MetaInsights /></ProtectedRoute>} />
      <Route path="/company/microsoft" element={<ProtectedRoute><MicrosoftInsights /></ProtectedRoute>} />
      <Route path="/company/apple" element={<ProtectedRoute><AppleInsights /></ProtectedRoute>} />
      <Route path="/company/netflix" element={<ProtectedRoute><NetflixInsights /></ProtectedRoute>} />
      <Route 
        path="/interview-simulator" 
        element={
          <ProtectedRoute>
            <InterviewSimulator />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/problem/:id" 
        element={
          <ProtectedRoute>
            <ProblemArea />
          </ProtectedRoute>
        } 
      />
      {/* Redirect root based on auth status */}
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// App wrapper with Providers
export default function App() {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  );
}

function AppWrapper() {
  const { theme } = useTheme();
  
  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#00f2ff',
          colorBgBase: '#000000',
          colorTextBase: '#ffffff',
          borderRadius: 12,
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          wireframe: false,
        },
        components: {
          Button: {
            colorPrimary: '#00f2ff',
            colorLink: '#00f2ff',
            colorLinkHover: '#bc13fe',
          },
          Table: {
            colorBgContainer: 'transparent',
            colorHeaderBg: 'rgba(0, 242, 255, 0.05)',
          }
        }
      }}
    >
      <AuthProvider>
        <ProgressProvider>
          <LayoutProvider>
            <Router>
              <ScrollToTop />
              <AppContent />
            </Router>
          </LayoutProvider>
        </ProgressProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}