import React, { useState } from 'react';
import { ArrowLeft, Calendar, Download, Filter, TrendingUp, BarChart, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart as RechartsBarChart, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Line } from 'recharts';

export const History = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('7days');
  const [selectedGas, setSelectedGas] = useState('all');
  const [chartType, setChartType] = useState<'bar' | 'line'>('line');

  // Generate real dates for the last 7 days
  const generateRecentDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const recentDates = generateRecentDates();

  const historicalData = recentDates.map((date, index) => {
    const baseValues = [405, 412, 408, 410, 415, 420, 418];
    return {
      date: date.toISOString().split('T')[0],
      co2: baseValues[index] || 410,
      ch4: 1.6 + (index * 0.1),
      n2o: 0.2 + (index * 0.05),
      sf6: 0.007 + (index * 0.0003),
      day: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    };
  });

  const trends = [
    { gas: 'CO2', current: '418 ppm', change: '+3.2%', trend: 'increasing', color: '#10B981' },
    { gas: 'CH4', current: '2.0 ppm', change: '+25%', trend: 'increasing', color: '#3B82F6' },
    { gas: 'N2O', current: '0.35 ppm', change: '+75%', trend: 'increasing', color: '#F59E0B' },
    { gas: 'SF6', current: '0.0085 ppm', change: '+21%', trend: 'stable', color: '#EF4444' },
  ];

  const handleExportData = () => {
    // Create CSV content
    const headers = ['Date', 'CO2 (ppm)', 'CH4 (ppm)', 'N2O (ppm)', 'SF6 (ppm)'];
    const csvContent = [
      headers.join(','),
      ...historicalData.map(row => [
        row.date,
        row.co2,
        row.ch4,
        row.n2o,
        row.sf6
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `environmental_data_${dateRange}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} ppm
            </p>
          ))}
        </div>
      );
    }
    return null;
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
          <h1 className="text-3xl font-bold text-gray-900">Historical Data</h1>
          <p className="text-gray-600">Analyze trends and patterns over time</p>
        </div>
        <button 
          onClick={handleExportData}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Download className="w-5 h-5" />
          Export Data
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border-2 border-green-100 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedGas}
              onChange={(e) => setSelectedGas(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Gases</option>
              <option value="co2">CO2</option>
              <option value="ch4">CH4</option>
              <option value="n2o">N2O</option>
              <option value="sf6">SF6</option>
            </select>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'line' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <LineChart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-lg transition-colors ${
                chartType === 'bar' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BarChart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trends Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Trend Summary</h2>
            <div className="space-y-4">
              {trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{trend.gas}</h3>
                    <p className="text-sm text-gray-600">{trend.current}</p>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${
                      trend.change.startsWith('+') ? 'text-red-500' : 'text-green-500'
                    }`}>
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{trend.change}</span>
                    </div>
                    <p className="text-xs text-gray-500">{trend.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Historical Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Historical Readings - {chartType === 'line' ? 'Line Chart' : 'Bar Chart'}
            </h2>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <RechartsLineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="co2" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="ch4" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="n2o" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="sf6" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }} />
                  </RechartsLineChart>
                ) : (
                  <RechartsBarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="co2" fill="#10B981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="ch4" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="n2o" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="sf6" fill="#EF4444" radius={[2, 2, 0, 0]} />
                  </RechartsBarChart>
                )}
              </ResponsiveContainer>
            </div>
            
            {/* Chart Legend */}
            <div className="flex justify-center gap-6 mt-4 flex-wrap">
              {trends.map((trend) => (
                <div key={trend.gas} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: trend.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{trend.gas}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-6 bg-white rounded-xl border-2 border-green-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-green-100">
          <h2 className="text-lg font-semibold text-gray-900">Raw Data</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO2 (ppm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CH4 (ppm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N2O (ppm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SF6 (ppm)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historicalData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(row.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.co2}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.ch4.toFixed(1)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.n2o.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.sf6.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
