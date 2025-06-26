
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Alerts } from './components/Alerts';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import { Devices } from './components/Devices';
import { GasDetail } from './components/GasDetail';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Onboarding } from './components/Onboarding';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'sonner';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (!user) {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    return hasSeenOnboarding ? <Navigate to="/login" /> : <Navigate to="/onboarding" />;
  }
  
  return <>{children}</>;
};

// Root redirect component
const RootRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
  if (!hasSeenOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <Navigate to="/login" replace />;
};

const AppContent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="devices" element={<Devices />} />
          <Route path="gas/:gasType" element={<GasDetail />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
