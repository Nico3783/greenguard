
import React, { useState, useEffect } from 'react';
import { SplashScreen } from './SplashScreen';
import App from '../App';

export const AppWrapper = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const isLoggedIn = localStorage.getItem('currentUser');
    const currentPath = window.location.pathname;
    
    // Only show splash screen for first-time users going to onboarding page
    if (!hasSeenOnboarding && !isLoggedIn && currentPath === '/onboarding') {
      setShowSplash(true);
      
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('hasSeenOnboarding', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <App />;
};
