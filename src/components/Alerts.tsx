
import React, { useState } from 'react';
import { ArrowLeft, Filter, Search, AlertTriangle, Info, AlertCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Alerts = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const alerts = [
    {
      id: 1,
      title: 'High CO2 Levels',
      description: 'CO2 levels are high in Zone 1 - requires immediate attention',
      type: 'critical',
      zone: 'Zone 1',
      timestamp: '2024-06-02T10:30:00Z',
      status: 'active',
      gasType: 'co2'
    },
    {
      id: 2,
      title: 'Temperature Alert',
      description: 'Temperature is below optimal range in Zone 2',
      type: 'warning',
      zone: 'Zone 2',
      timestamp: '2024-06-02T09:15:00Z',
      status: 'active'
    },
    {
      id: 3,
      title: 'Humidity Warning',
      description: 'Humidity levels are elevated in Zone 3',
      type: 'warning',
      zone: 'Zone 3',
      timestamp: '2024-06-02T08:45:00Z',
      status: 'resolved'
    },
    {
      id: 4,
      title: 'Methane Spike',
      description: 'Sudden increase in methane levels detected in Zone 4',
      type: 'critical',
      zone: 'Zone 4',
      timestamp: '2024-06-02T07:20:00Z',
      status: 'active'
    },
    {
      id: 5,
      title: 'System Update',
      description: 'Device firmware updated successfully',
      type: 'info',
      zone: 'All Zones',
      timestamp: '2024-06-02T06:00:00Z',
      status: 'resolved'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-6 h-6 text-orange-500" />;
      default: return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getAlertBg = (type: string, status: string) => {
    const opacity = status === 'resolved' ? 'opacity-60' : '';
    switch (type) {
      case 'critical': return `bg-red-50 border-red-200 ${opacity}`;
      case 'warning': return `bg-orange-50 border-orange-200 ${opacity}`;
      default: return `bg-blue-50 border-blue-200 ${opacity}`;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.type === filter || alert.status === filter;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-lg hover:bg-green-50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-green-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="text-gray-600">Monitor and manage system alerts</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-4 border-2 border-green-100 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Alerts</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => alert.gasType && navigate(`/gas-detail/${alert.gasType}`)}
            className={`${getAlertBg(alert.type, alert.status)} rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-md ${
              alert.gasType ? 'cursor-pointer hover:scale-[1.02]' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {getAlertIcon(alert.type)}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📍 {alert.zone}</span>
                    <span>🕒 {new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {alert.gasType && (
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
