
import React, { useEffect, useState } from 'react';
import { Leaf, Shield, Zap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center text-white">
        <div className="relative mb-8">
          <img 
            src="/lovable-uploads/ed9d40fe-3c91-4866-bbc7-eff12084417f.png" 
            alt="Green Guard Logo" 
            className="w-32 h-32 mx-auto object-contain animate-pulse bg-transparent"
            style={{ backgroundColor: 'transparent' }}
          />
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          Green Guard
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
          Environmental Protection & Monitoring
        </p>
        
        <div className="flex justify-center space-x-8 mb-8">
          <div className="animate-bounce" style={{ animationDelay: '0s' }}>
            <Shield className="w-8 h-8" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Leaf className="w-8 h-8" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '1s' }}>
            <Zap className="w-8 h-8" />
          </div>
        </div>
        
        <div className="w-16 h-1 bg-white/50 rounded-full mx-auto">
          <div className="h-full bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
