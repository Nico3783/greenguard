
import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Settings, Download, Bell } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const GasDetail = () => {
  const navigate = useNavigate();
  const { gasType } = useParams();
  const [threshold, setThreshold] = useState(450);
  const [showThresholdModal, setShowThresholdModal] = useState(false);
  
  const gasData = {
    co2: {
      name: 'Carbon Dioxide (CO₂)',
      current: '415 ppm',
      trend: '410 ppm',
      change: '+2.3%',
      threshold: 450,
      status: 'warning',
      color: 'orange'
    },
    ch4: {
      name: 'Methane (CH₄)',
      current: '1.9 ppm',
      trend: '2.1 ppm',
      change: '-1.2%',
      threshold: 3.0,
      status: 'good',
      color: 'green'
    },
    n2o: {
      name: 'Nitrous Oxide (N₂O)',
      current: '0.3 ppm',
      trend: '0.3 ppm',
      change: '0.0%',
      threshold: 0.5,
      status: 'good',
      color: 'blue'
    },
    sf6: {
      name: 'Sulfur Hexafluoride (SF₆)',
      current: '0.008 ppm',
      trend: '0.009 ppm',
      change: '-0.5%',
      threshold: 0.02,
      status: 'good',
      color: 'purple'
    }
  };

  const data = gasData[gasType as keyof typeof gasData] || gasData.co2;

  const hourlyData = [
    { time: '00:00', value: 410 },
    { time: '04:00', value: 405 },
    { time: '08:00', value: 420 },
    { time: '12:00', value: 415 },
    { time: '16:00', value: 425 },
    { time: '20:00', value: 415 },
    { time: '24:00', value: 415 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-green-600 bg-green-100';
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
          <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
          <p className="text-gray-600">Real-time monitoring and analysis</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white border-2 border-green-200 hover:bg-green-50 transition-colors">
            <Bell className="w-5 h-5 text-green-600" />
          </button>
          <button className="p-2 rounded-lg bg-white border-2 border-green-200 hover:bg-green-50 transition-colors">
            <Download className="w-5 h-5 text-green-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Reading */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Current Reading</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data.status)}`}>
              {data.status}
            </span>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">{data.current}</div>
          <div className="flex items-center gap-2">
            {data.change.startsWith('+') ? (
              <TrendingUp className="w-5 h-5 text-red-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-green-500" />
            )}
            <span className={`font-semibold ${data.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
              {data.change}
            </span>
            <span className="text-gray-500">from last reading</span>
          </div>
        </div>

        {/* 24-Hour Average */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">24-Hour Average</h2>
          <div className="text-3xl font-bold text-gray-900 mb-2">{data.trend}</div>
          <p className="text-gray-600">Based on hourly measurements</p>
        </div>

        {/* Threshold Settings */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alert Threshold</h2>
          <div className="text-3xl font-bold text-gray-900 mb-2">{data.threshold} ppm</div>
          <button 
            onClick={() => setShowThresholdModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Update Threshold
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6 bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">24-Hour Trend</h2>
        
        <div className="h-64 flex items-end justify-between gap-2 mb-4">
          {hourlyData.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600"
                style={{ height: `${(point.value / 450) * 200}px` }}
                title={`${point.time}: ${point.value} ppm`}
              ></div>
              <span className="text-xs text-gray-500 mt-2">{point.time}</span>
            </div>
          ))}
        </div>

        {/* Threshold Line Indicator */}
        <div className="relative mb-4">
          <div className="absolute top-0 left-0 right-0 border-t-2 border-dashed border-red-400"></div>
          <span className="absolute -top-3 right-0 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
            Threshold: {data.threshold} ppm
          </span>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/dashboard/history')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            View Full History
          </button>
          <button className="bg-white border-2 border-green-500 text-green-600 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-green-50">
            Export Data
          </button>
        </div>
      </div>

      {/* Threshold Modal */}
      {showThresholdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Set Alert Threshold</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Threshold Value (ppm)
              </label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowThresholdModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would typically save the threshold
                  setShowThresholdModal(false);
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
