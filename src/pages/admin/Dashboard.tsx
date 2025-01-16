import React from 'react';
import { BarChart2, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Sales',
      value: '$12,345',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Orders Today',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: BarChart2,
    },
    {
      title: 'Active Tables',
      value: '24/30',
      change: '80%',
      trend: 'stable',
      icon: Users,
    },
    {
      title: 'Predicted Orders',
      value: '180',
      change: '+15.4%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex space-x-2">
          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm ${
                  stat.trend === 'up' 
                    ? 'text-green-600 dark:text-green-400' 
                    : stat.trend === 'down'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400"> vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          {/* Add order list component here */}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Popular Items</h2>
          {/* Add popular items component here */}
        </div>
      </div>
    </div>
  );
}