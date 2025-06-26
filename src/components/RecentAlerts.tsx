
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

export const RecentAlerts = () => {
  const navigate = useNavigate();
  
  const recentAlerts = [
    {
      type: 'warning',
      title: 'High CO2',
      description: 'Zone 1 levels elevated',
      time: '2 min ago'
    },
    {
      type: 'info',
      title: 'Device Update',
      description: 'Sensor calibrated',
      time: '1 hour ago'
    },
    {
      type: 'critical',
      title: 'Threshold Breach',
      description: 'Methane spike detected',
      time: '3 hours ago'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
        <button 
          onClick={() => navigate('/dashboard/alerts')}
          className="text-green-600 text-sm font-medium hover:text-green-700"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {recentAlerts.map((alert, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            {getAlertIcon(alert.type)}
            <div className="flex-1">
              <p className="font-medium text-gray-900">{alert.title}</p>
              <p className="text-sm text-gray-600">{alert.description}</p>
            </div>
            <span className="text-xs text-gray-500">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
