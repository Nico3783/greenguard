
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

export const OverallStatus = () => {
  // Simulate sensor data - in real app this would come from API/props
  const sensorData = {
    co2: 399, // Current CO2 level 415
    ch4: 1.9, // Current CH4 level 1.9
    n2o: 0.3, // Current N2O level 0.3
    sf6: 0.001, // Current SF6 level 0.008
  };

  // Define thresholds
  const thresholds = {
    co2: { safe: 400, caution: 450 },
    ch4: { safe: 2.0, caution: 3.0 },
    n2o: { safe: 0.4, caution: 0.6 },
    sf6: { safe: 0.01, caution: 0.02 }
  };

  // Calculate overall status
  const getOverallStatus = () => {
    let dangerCount = 0;
    let cautionCount = 0;

    Object.keys(sensorData).forEach(gas => {
      const value = sensorData[gas as keyof typeof sensorData];
      const threshold = thresholds[gas as keyof typeof thresholds];
      
      if (value > threshold.caution) {
        dangerCount++;
      } else if (value > threshold.safe) {
        cautionCount++;
      }
    });

    if (dangerCount > 0) return 'danger';
    if (cautionCount > 0) return 'caution';
    return 'excellent';
  };

  const status = getOverallStatus();

  const statusConfig = {
    excellent: {
      color: 'from-green-400 to-green-600',
      icon: CheckCircle,
      title: 'Excellent',
      description: 'All environmental parameters are within optimal ranges',
      trend: TrendingUp,
      trendLabel: 'Improving',
      efficiency: '98%'
    },
    caution: {
      color: 'from-yellow-400 to-yellow-600',
      icon: AlertTriangle,
      title: 'Caution',
      description: 'Some parameters are approaching warning thresholds',
      trend: TrendingUp,
      trendLabel: 'Monitoring',
      efficiency: '85%'
    },
    danger: {
      color: 'from-red-400 to-red-600',
      icon: XCircle,
      title: 'Danger',
      description: 'Critical levels detected - immediate attention required',
      trend: TrendingDown,
      trendLabel: 'Critical',
      efficiency: '45%'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const TrendIcon = config.trend;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Overall Status</h2>
      
      <div className={`bg-gradient-to-br ${config.color} rounded-2xl p-6 relative overflow-hidden shadow-lg`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
        <div className="relative z-10">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
            <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <StatusIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">{config.title}</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              {config.description}
            </p>
            
            <div className="flex justify-center gap-4 mt-4">
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <TrendIcon className="w-4 h-4 text-white mx-auto mb-1" />
                <p className="text-xs text-white">{config.trendLabel}</p>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <span className="text-lg font-bold text-white block">{config.efficiency}</span>
                <p className="text-xs text-white">Efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
