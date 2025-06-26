
import React, { useState } from 'react';
import { ArrowLeft, Smartphone, Wifi, Signal, Settings as SettingsIcon, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Devices = () => {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const devices = [
    {
      id: 'device-1',
      name: 'Sensor Array A1',
      zone: 'Zone 1 - Main Lab',
      status: 'active',
      signal: 95,
      lastUpdate: '2 minutes ago',
      battery: 85,
      sensors: ['CO2', 'CH4', 'N2O', 'SF6']
    },
    {
      id: 'device-2',
      name: 'Sensor Array B2',
      zone: 'Zone 2 - Storage Area',
      status: 'active',
      signal: 88,
      lastUpdate: '5 minutes ago',
      battery: 92,
      sensors: ['CO2', 'CH4', 'N2O']
    },
    {
      id: 'device-3',
      name: 'Sensor Array C3',
      zone: 'Zone 3 - Outdoor Station',
      status: 'maintenance',
      signal: 0,
      lastUpdate: '2 hours ago',
      battery: 12,
      sensors: ['CO2', 'CH4']
    },
    {
      id: 'device-4',
      name: 'Sensor Array D4',
      zone: 'Zone 4 - Backup Unit',
      status: 'inactive',
      signal: 72,
      lastUpdate: '1 day ago',
      battery: 67,
      sensors: ['CO2', 'N2O', 'SF6']
    }
  ];

  const handleConfigure = (deviceId: string) => {
    alert(`Configuration panel for ${devices.find(d => d.id === deviceId)?.name} would open here`);
  };

  const handleViewData = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    alert(`Detailed data view for ${device?.name} would open here`);
  };

  const handleAddDevice = () => {
    alert('Add new device wizard would open here');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-orange-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 border-green-200';
      case 'maintenance': return 'bg-orange-50 border-orange-200';
      case 'inactive': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-green-50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-green-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Device Management</h1>
          <p className="text-gray-600">Monitor and configure your sensor devices</p>
        </div>
        <button 
          onClick={handleAddDevice}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {devices.map((device) => (
          <div 
            key={device.id} 
            className={`${getStatusBgColor(device.status)} rounded-xl p-6 border-2 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Smartphone className="w-8 h-8 text-gray-600" />
                  <div className={`w-3 h-3 ${getStatusColor(device.status)} rounded-full absolute -top-1 -right-1 border-2 border-white`}></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
                  <p className="text-sm text-gray-600">{device.zone}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                device.status === 'active' ? 'bg-green-100 text-green-800' :
                device.status === 'maintenance' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Signal className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Signal Strength</span>
                </div>
                <span className="text-sm font-medium">{device.signal}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Last Update</span>
                </div>
                <span className="text-sm font-medium">{device.lastUpdate}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Battery</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        device.battery > 50 ? 'bg-green-500' : 
                        device.battery > 20 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${device.battery}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{device.battery}%</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Monitored Gases:</p>
              <div className="flex gap-2 flex-wrap">
                {device.sensors.map((sensor) => (
                  <span 
                    key={sensor} 
                    className="px-2 py-1 bg-white border border-green-200 rounded text-xs font-medium text-green-700"
                  >
                    {sensor}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleConfigure(device.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <SettingsIcon className="w-4 h-4" />
                Configure
              </button>
              <button 
                onClick={() => handleViewData(device.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Data
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
