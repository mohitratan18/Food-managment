import React from 'react';
import { Search, Filter, Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../../types';

export default function Menu() {
  const [items] = React.useState<MenuItem[]>([
    {
      id: '1',
      name: 'Classic Burger',
      category: 'Main Course',
      price: 12.99,
      isAvailable: true,
      description: 'Juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      name: 'Caesar Salad',
      category: 'Starters',
      price: 8.99,
      isAvailable: true,
      description: 'Crisp romaine lettuce, croutons, parmesan cheese with caesar dressing',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState<Record<string, number>>({});

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuantityChange = (itemId: string, delta: number) => {
    setSelectedItems(prev => {
      const current = prev[itemId] || 0;
      const newQuantity = Math.max(0, current + delta);
      
      if (newQuantity === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const totalAmount = Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
    const item = items.find(i => i.id === itemId);
    return total + (item?.price || 0) * quantity;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Menu</h1>
        {Object.keys(selectedItems).length > 0 && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Place Order (${totalAmount.toFixed(2)})
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  item.isAvailable 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {item.isAvailable ? 'Available' : 'Out of Stock'}
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold">${item.price.toFixed(2)}</p>
              
              {item.isAvailable && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      disabled={!selectedItems[item.id]}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-8 text-center">{selectedItems[item.id] || 0}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  {selectedItems[item.id] > 0 && (
                    <span className="font-medium">
                      ${(item.price * (selectedItems[item.id] || 0)).toFixed(2)}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}