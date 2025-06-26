
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const GasIndicators = () => {
  const navigate = useNavigate();
  
  const gasData = [
    { 
      name: 'CO2', 
      value: '415 ppm', 
      status: 'warning', 
      trend: 'up',
      change: '+2.3%',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    { 
      name: 'CH4', 
      value: '1.9 ppm', 
      status: 'good', 
      trend: 'down',
      change: '-1.2%',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      name: 'N2O', 
      value: '0.3 ppm', 
      status: 'good', 
      trend: 'stable',
      change: '0.0%',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      name: 'SF6', 
      value: '0.008 ppm', 
      status: 'good', 
      trend: 'down',
      change: '-0.5%',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Gas Indicators</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gasData.map((gas, index) => (
          <div
            key={index}
            onClick={() => navigate(`/gas-detail/${gas.name.toLowerCase()}`)}
            className={`${gas.bgColor} rounded-xl p-6 border-2 ${gas.borderColor} transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gas.color} flex items-center justify-center shadow-md`}>
                <span className="text-white text-lg font-bold">{gas.name}</span>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                gas.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {getTrendIcon(gas.trend)}
                <span>{gas.change}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-1">{gas.name}</h3>
            <p className="text-gray-600 text-lg font-semibold">{gas.value}</p>
            <p className="text-xs text-gray-500 mt-2">Click for details</p>
          </div>
        ))}
      </div>
    </div>
  );
};
