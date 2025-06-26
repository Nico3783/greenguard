import React, { useState } from 'react';
import { ArrowLeft, Bell, Smartphone, User, Shield, Database, Wifi, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    criticalOnly: false
  });

  const [thresholds, setThresholds] = useState({
    co2: 450,
    ch4: 3.0,
    n2o: 0.5,
    sf6: 0.02
  });

  const [profile, setProfile] = useState({
    name: 'Nico Oluwanimilo',
    email: 'nico.research@enviromonitor.com',
    organization: 'FUTA Research Institute'
  });

  const handleUpdateProfile = () => {
    alert('Profile updated successfully!');
  };

  const handleSaveThresholds = () => {
    alert('Alert thresholds saved successfully!');
  };

  const handleAddDevice = () => {
    alert('Device setup wizard would open here');
  };

  const handleExportData = (format: 'pdf' | 'doc') => {
    // Sample environmental data
    const data = {
      profile,
      thresholds,
      historicalData: [
        { date: '2024-05-29', co2: 405, ch4: 1.6, n2o: 0.2, sf6: 0.007 },
        { date: '2024-05-30', co2: 412, ch4: 1.8, n2o: 0.3, sf6: 0.008 },
        { date: '2024-05-31', co2: 408, ch4: 1.7, n2o: 0.2, sf6: 0.007 },
        { date: '2024-06-01', co2: 410, ch4: 1.8, n2o: 0.3, sf6: 0.008 },
        { date: '2024-06-02', co2: 415, ch4: 1.9, n2o: 0.3, sf6: 0.008 },
        { date: '2024-06-03', co2: 420, ch4: 2.1, n2o: 0.4, sf6: 0.009 }
      ]
    };

    if (format === 'pdf') {
      // Create PDF content
      const pdfContent = `
GREEN GUARD ENVIRONMENTAL DATA EXPORT
Generated on: ${new Date().toLocaleDateString()}

PROFILE INFORMATION:
Name: ${data.profile.name}
Email: ${data.profile.email}
Organization: ${data.profile.organization}

ALERT THRESHOLDS:
CO2: ${data.thresholds.co2} ppm
CH4: ${data.thresholds.ch4} ppm
N2O: ${data.thresholds.n2o} ppm
SF6: ${data.thresholds.sf6} ppm

HISTORICAL DATA:
${data.historicalData.map(row => 
  `${row.date}: CO2=${row.co2}ppm, CH4=${row.ch4}ppm, N2O=${row.n2o}ppm, SF6=${row.sf6}ppm`
).join('\n')}
      `;
      
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `green_guard_data_${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      // Create DOC content (RTF format for broader compatibility)
      const docContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs24 GREEN GUARD ENVIRONMENTAL DATA EXPORT\\par
Generated on: ${new Date().toLocaleDateString()}\\par\\par

PROFILE INFORMATION:\\par
Name: ${data.profile.name}\\par
Email: ${data.profile.email}\\par
Organization: ${data.profile.organization}\\par\\par

ALERT THRESHOLDS:\\par
CO2: ${data.thresholds.co2} ppm\\par
CH4: ${data.thresholds.ch4} ppm\\par
N2O: ${data.thresholds.n2o} ppm\\par
SF6: ${data.thresholds.sf6} ppm\\par\\par

HISTORICAL DATA:\\par
${data.historicalData.map(row => 
  `${row.date}: CO2=${row.co2}ppm, CH4=${row.ch4}ppm, N2O=${row.n2o}ppm, SF6=${row.sf6}ppm\\par`
).join('')}
}`;
      
      const blob = new Blob([docContent], { type: 'application/rtf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `green_guard_data_${new Date().toISOString().split('T')[0]}.rtf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleBackupSettings = () => {
    const settingsBackup = {
      profile,
      notifications,
      thresholds,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const jsonString = JSON.stringify(settingsBackup, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `green_guard_settings_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Show success notification
    alert('Settings backup created successfully! Downloaded to your device.');
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      // Reset all settings to default values
      setProfile({
        name: 'Nico Oluwanimilo',
        email: 'nico.research@enviromonitor.com',
        organization: 'Environmental Research Institute'
      });
      
      setNotifications({
        email: true,
        push: true,
        sms: false,
        criticalOnly: false
      });
      
      setThresholds({
        co2: 450,
        ch4: 3.0,
        n2o: 0.5,
        sf6: 0.02
      });
      
      alert('All settings have been reset to defaults successfully!');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('currentUser');
      navigate('/login');
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
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your monitoring preferences</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
              <input
                type="text"
                value={profile.organization}
                onChange={(e) => setProfile({...profile, organization: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button 
              onClick={handleUpdateProfile}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">SMS Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Critical Alerts Only</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.criticalOnly}
                  onChange={(e) => setNotifications({...notifications, criticalOnly: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Device Management */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Connected Devices</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Sensor Array A1</p>
                  <p className="text-sm text-gray-600">Zone 1 - Active</p>
                </div>
              </div>
              <Wifi className="w-5 h-5 text-green-500" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Sensor Array B2</p>
                  <p className="text-sm text-gray-600">Zone 2 - Active</p>
                </div>
              </div>
              <Wifi className="w-5 h-5 text-green-500" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Sensor Array C3</p>
                  <p className="text-sm text-gray-600">Zone 3 - Maintenance</p>
                </div>
              </div>
              <Wifi className="w-5 h-5 text-orange-500" />
            </div>
            
            <button 
              onClick={handleAddDevice}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add New Device
            </button>
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Alert Thresholds</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CO2 Threshold (ppm)</label>
              <input
                type="number"
                value={thresholds.co2}
                onChange={(e) => setThresholds({...thresholds, co2: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CH4 Threshold (ppm)</label>
              <input
                type="number"
                value={thresholds.ch4}
                onChange={(e) => setThresholds({...thresholds, ch4: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">N2O Threshold (ppm)</label>
              <input
                type="number"
                value={thresholds.n2o}
                onChange={(e) => setThresholds({...thresholds, n2o: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SF6 Threshold (ppm)</label>
              <input
                type="number"
                value={thresholds.sf6}
                onChange={(e) => setThresholds({...thresholds, sf6: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button 
              onClick={handleSaveThresholds}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Save Thresholds
            </button>
          </div>
        </div>
      </div>

      {/* Data Export Section */}
      <div className="mt-6 bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Data Management</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => handleExportData('pdf')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Export as PDF
            </button>
            <button 
              onClick={() => handleExportData('doc')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Export as DOC
            </button>
          </div>
          <button 
            onClick={handleBackupSettings}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Backup Settings
          </button>
          <button 
            onClick={handleResetDefaults}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
