
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Leaf, BarChart3, Bell, ArrowRight, ArrowLeft } from 'lucide-react';

export const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Shield,
      title: "Environmental Protection",
      description: "Monitor air quality, gas levels, and environmental conditions in real-time with our advanced sensor technology.",
      color: "bg-green-500"
    },
    {
      icon: Leaf,
      title: "Sustainable Monitoring",
      description: "Get insights into your environmental impact with comprehensive data analytics and intelligent recommendations.",
      color: "bg-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "View detailed historical data, trends, and patterns to make informed decisions about your environment.",
      color: "bg-teal-500"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Receive instant notifications when environmental conditions require your attention or action.",
      color: "bg-green-600"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <img 
            src="/lovable-uploads/ed9d40fe-3c91-4866-bbc7-eff12084417f.png" 
            alt="Green Guard Logo" 
            className="w-24 h-24 mx-auto mb-6 object-contain animate-fade-in bg-transparent"
            style={{ backgroundColor: 'transparent' }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            Welcome to Green Guard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your comprehensive environmental monitoring and protection platform
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 ${steps[currentStep].color} rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in`}>
              <CurrentIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {steps[currentStep].title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep ? 'bg-green-500 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                currentStep === steps.length - 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="w-full bg-white hover:bg-gray-50 text-green-600 py-4 rounded-xl font-semibold text-lg transition-colors border-2 border-green-500"
            >
              Create Account
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/login')}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Skip for now →
          </button>
        </div>
      </div>
    </div>
  );
};
