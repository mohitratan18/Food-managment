import React from 'react';
import type { Table } from '../../types';

export default function Tables() {
  const [tables] = React.useState<Table[]>([
    { id: 'T1', number: 1, status: 'occupied', currentOrderId: '1' },
    { id: 'T2', number: 2, status: 'available' },
    { id: 'T3', number: 3, status: 'reserved' },
    { id: 'T4', number: 4, status: 'completed' },
    { id: 'T5', number: 5, status: 'available' },
    { id: 'T6', number: 6, status: 'occupied', currentOrderId: '2' },
    { id: 'T7', number: 7, status: 'available' },
    { id: 'T8', number: 8, status: 'reserved' },
    { id: 'T9', number: 9, status: 'available' },
    { id: 'T10', number: 10, status: 'occupied', currentOrderId: '3' },
    { id: 'T11', number: 11, status: 'available' },
    { id: 'T12', number: 12, status: 'completed' }
  ]);

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20';
      case 'occupied':
        return 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20';
      case 'reserved':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20';
      case 'completed':
        return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50';
    }
  };

  const getStatusTextColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'text-green-700 dark:text-green-300';
      case 'occupied':
        return 'text-blue-700 dark:text-blue-300';
      case 'reserved':
        return 'text-yellow-700 dark:text-yellow-300';
      case 'completed':
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Table Management</h1>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <option>All Tables</option>
            <option>Available</option>
            <option>Occupied</option>
            <option>Reserved</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`p-6 rounded-lg border cursor-pointer transition-all hover:shadow-md ${getStatusColor(table.status)}`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">Table {table.number}</h3>
                <span className={`text-sm font-medium ${getStatusTextColor(table.status)}`}>
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </span>
              </div>
              
              {table.currentOrderId && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Order #{table.currentOrderId}
                  </p>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                {table.status === 'available' && (
                  <button className="w-full px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Seat Guests
                  </button>
                )}
                {table.status === 'occupied' && (
                  <>
                    <button className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      View Order
                    </button>
                    <button className="flex-1 px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      Complete
                    </button>
                  </>
                )}
                {table.status === 'reserved' && (
                  <button className="w-full px-3 py-1.5 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                    Check In
                  </button>
                )}
                {table.status === 'completed' && (
                  <button className="w-full px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Reset Table
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}