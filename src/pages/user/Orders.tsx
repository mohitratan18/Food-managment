import React from 'react';
import { Search, Clock } from 'lucide-react';
import type { Order } from '../../types';

export default function Orders() {
  const [orders] = React.useState<Order[]>([
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
    },
    {
      id: '2',
      tableId: 'T6',
      items: [
        { menuItemId: '3', quantity: 1 },
        { menuItemId: '4', quantity: 2 }
      ],
      status: 'pending',
      totalAmount: 45.98,
      createdAt: new Date()
    },
    {
      id: '3',
      tableId: 'T10',
      items: [
        { menuItemId: '2', quantity: 2 },
        { menuItemId: '1', quantity: 1 }
      ],
      status: 'served',
      totalAmount: 31.97,
      createdAt: new Date()
    }
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'served':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Active Orders</h1>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Served</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search orders..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">Order #{order.id}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Table {order.tableId}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Items:</h4>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    {item.quantity}x Item #{item.menuItemId}
                    {item.notes && (
                      <span className="block text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                        Note: {item.notes}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
              </div>
              <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {order.status === 'pending' && (
                <button className="col-span-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Start Preparing
                </button>
              )}
              {order.status === 'preparing' && (
                <button className="col-span-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Mark as Served
                </button>
              )}
              {order.status === 'served' && (
                <button className="col-span-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  Complete Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}