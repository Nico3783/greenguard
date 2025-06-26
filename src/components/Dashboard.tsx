
import React from 'react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GasIndicators } from './GasIndicators';
import { OverallStatus } from './OverallStatus';
import { QuickActions } from './QuickActions';
import { RecentAlerts } from './RecentAlerts';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Environmental monitoring overview - (Federal University of Technology Akure. FUTA)</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/settings')}
          className="p-3 rounded-xl bg-white hover:bg-green-50 border border-green-200 transition-colors shadow-sm"
        >
          <Settings className="w-6 h-6 text-green-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OverallStatus />
          <GasIndicators />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <RecentAlerts />
        </div>
      </div>
    </div>
  );
};
