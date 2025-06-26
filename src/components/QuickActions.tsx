
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Settings, Bell, Download, Plus } from 'lucide-react';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: BarChart3, label: 'View History', path: '/dashboard/history', color: 'bg-green-500 hover:bg-green-600' },
    { icon: Bell, label: 'Alerts', path: '/dashboard/alerts', color: 'bg-orange-500 hover:bg-orange-600' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings', color: 'bg-gray-500 hover:bg-gray-600' },
    { icon: Download, label: 'Export Data', path: '/dashboard/export', color: 'bg-blue-500 hover:bg-blue-600' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button 
            key={index}
            onClick={() => navigate(action.path)}
            className={`w-full ${action.color} text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-sm flex items-center gap-3`}
          >
            <action.icon className="w-5 h-5" />
            {action.label}
          </button>
        ))}
        
        <button className="w-full bg-white border-2 border-green-500 text-green-600 px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-green-50 flex items-center gap-3">
          <Plus className="w-5 h-5" />
          Add Device
        </button>
      </div>
    </div>
  );
};
