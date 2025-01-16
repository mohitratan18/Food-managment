import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';
import type { PredictiveData } from '../../types';

export default function Predictions() {
  const predictiveData: PredictiveData[] = [
    { itemId: '1', predictedDemand: 45, confidence: 0.85, trend: 'up' },
    { itemId: '2', predictedDemand: 30, confidence: 0.75, trend: 'down' },
    { itemId: '3', predictedDemand: 25, confidence: 0.90, trend: 'stable' }
  ];

  const timeSeriesData = [
    { time: '8:00', actual: 20, predicted: 22 },
    { time: '10:00', actual: 35, predicted: 32 },
    { time: '12:00', actual: 50, predicted: 48 },
    { time: '14:00', actual: 45, predicted: 43 },
    { time: '16:00', actual: 30, predicted: 35 },
    { time: '18:00', actual: 40, predicted: 38 },
    { time: '20:00', actual: 35, predicted: 33 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Predictive Analytics</h1>
        <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <option>Next 24 Hours</option>
          <option>Next Week</option>
          <option>Next Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {predictiveData.map((data) => (
          <div key={data.itemId} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Item #{data.itemId}</p>
                <p className="text-2xl font-semibold mt-1">{data.predictedDemand} units</p>
              </div>
              <div className={`p-3 rounded-lg ${
                data.trend === 'up' 
                  ? 'bg-green-100 dark:bg-green-900' 
                  : data.trend === 'down'
                  ? 'bg-red-100 dark:bg-red-900'
                  : 'bg-blue-100 dark:bg-blue-900'
              }`}>
                <TrendingUp className={`w-6 h-6 ${
                  data.trend === 'up'
                    ? 'text-green-600 dark:text-green-300'
                    : data.trend === 'down'
                    ? 'text-red-600 dark:text-red-300'
                    : 'text-blue-600 dark:text-blue-300'
                }`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <AlertCircle className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {(data.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Demand Forecast vs Actual</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual Orders" />
              <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} name="Predicted Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Increase Inventory</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Consider stocking 20% more of Item #1 based on upward trend
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Alerts</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-300" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Potential Stock Issue</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Item #2 may run out of stock within the next 48 hours
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}