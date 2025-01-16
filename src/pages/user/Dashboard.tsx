import React from 'react';
import { Utensils, Clock, Users, AlertCircle } from 'lucide-react';
import type { Order, Table } from '../../types';

export default function Dashboard() {
  const [activeOrders] = React.useState<Order[]>([
    {
      id: '1',
      tableId: 'T1',
      items: [
        { menuItemId: '1', quantity: 2, notes: 'No onions' },
        { menuItemId: '2', quantity: 1 }
      ],
      status: 'preparing',
      totalAmount: 34.97,
      createdAt: new Date()
    }
  ]);

  const [tables] = React.useState<Table[]>([
    { id: 'T1', number: 1, status: 'occupied', currentOrderId: '1' },
    { id: 'T2', number: 2, status: 'available' },
    { id: 'T3', number: 3, status: 'reserved' },
    { id: 'T4', number: 4, status: 'completed' }
  ]);

  const stats = [
    {
      title: 'Active Orders',
      value: '8',
      icon: Utensils,
      color: 'blue'
    },
    {
      title: 'Average Wait Time',
      value: '15 min',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Tables Occupied',
      value: '12/20',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Attention Needed',
      value: '2',
      icon: AlertCircle,
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Staff Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-300`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Active Orders</h2>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Table {order.tableId}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    {order.status}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                  </p>
                  <p className="text-sm font-medium mt-1">${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Table Status</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-lg border ${
                  table.status === 'available'
                    ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20'
                    : table.status === 'occupied'
                    ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20'
                    : table.status === 'reserved'
                    ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20'
                    : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                }`}
              >
                <p className="font-medium">Table {table.number}</p>
                <p className={`text-sm mt-1 ${
                  table.status === 'available'
                    ? 'text-green-700 dark:text-green-300'
                    : table.status === 'occupied'
                    ? 'text-blue-700 dark:text-blue-300'
                    : table.status === 'reserved'
                    ? 'text-yellow-700 dark:text-yellow-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}