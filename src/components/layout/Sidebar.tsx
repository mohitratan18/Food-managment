import React from 'react';
import { 
  Home, 
  Menu as MenuIcon, 
  History, 
  BarChart2, 
  Table as TableIcon,
  TrendingUp,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  role: 'admin' | 'user';
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  
  const adminLinks = [
    { name: 'Dashboard', icon: Home, path: '/admin' },
    { name: 'Menu Management', icon: MenuIcon, path: '/admin/menu' },
    { name: 'Sales Analytics', icon: BarChart2, path: '/admin/sales' },
    { name: 'Order History', icon: History, path: '/admin/orders' },
    { name: 'Predictions', icon: TrendingUp, path: '/admin/predictions' },
  ];

  const userLinks = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Menu', icon: MenuIcon, path: '/menu' },
    { name: 'Tables', icon: TableIcon, path: '/tables' },
    { name: 'Orders', icon: History, path: '/orders' },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <>
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <button
            onClick={onClose}
            className="lg:hidden absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <ul className="space-y-2 font-medium">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      location.pathname === link.path ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="ml-3">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}