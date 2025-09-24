'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '@/app/providers/AuthContext';

import {
  Search,
  Package,
  Users,
  MessageSquare,
  BarChart3,
  Receipt,
  Percent,
  Settings,
  Shield,
  HelpCircle,
  Bell,
  Menu,
  X,
} from 'lucide-react';

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
  section: 'Menu' | 'Tools' | 'Settings';
  link: string;
}

interface AdminNavLayoutProps {
  children: React.ReactNode;
}

const AdminNavLayout: React.FC<AdminNavLayoutProps> = ({ children }) => {
  const { user, isLoading, setUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sidebarItems: SidebarItem[] = [
    // Menu
    {
      icon: BarChart3,
      label: 'Dashboard',
      section: 'Menu',
      link: '/admin',
    },
    {
      icon: Package,
      label: 'Order',
      badge: 16,
      section: 'Menu',
      link: '/admin/orders',
    },
    {
      icon: Users,
      label: 'Customers',
      section: 'Menu',
      link: '/admin/customers',
    },
    {
      icon: MessageSquare,
      label: 'Message',
      section: 'Menu',
      link: '/admin/messages',
    },
    // Tools
    {
      icon: Package,
      label: 'Product',
      section: 'Tools',
      link: '/admin/products',
    },
    {
      icon: BarChart3,
      label: 'Integrations',
      section: 'Tools',
      link: '/admin/integrations',
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      section: 'Tools',
      link: '/admin/analytics',
    },
    {
      icon: Receipt,
      label: 'Invoice',
      section: 'Tools',
      link: '/admin/invoices',
    },
    {
      icon: Percent,
      label: 'Discount',
      section: 'Tools',
      link: '/admin/discounts',
    },
    // Settings
    {
      icon: Settings,
      label: 'Settings',
      section: 'Settings',
      link: '/admin/settings',
    },
    {
      icon: Shield,
      label: 'Security',
      section: 'Settings',
      link: '/admin/security',
    },
    {
      icon: HelpCircle,
      label: 'Get Help',
      section: 'Settings',
      link: '/admin/help',
    },
  ];

  const handleSidebarToggle = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderSection = (section: SidebarItem['section']) => (
    <div>
      <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {section}
      </h3>
      <nav className="mt-4 space-y-1">
        {sidebarItems
          .map((item, idx) => ({ ...item, idx }))
          .filter((item) => item.section === section)
          .map((item) => (
            <Link
              key={item.idx}
              href={item.link}
              onClick={() => setActiveIndex(item.idx)}
              className={`flex items-center justify-between px-2 py-2 text-sm font-medium rounded-lg ${
                activeIndex === item.idx
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm -webkit-backdrop-filter z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Aroma De Royal
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              title="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {renderSection('Menu')}
            {renderSection('Tools')}
            {renderSection('Settings')}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSidebarToggle}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                title="Toggle sidebar"
              >
                <Menu className="w-5 h-5 text-gray-500" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="p-2 text-gray-400 hover:text-gray-600 relative"
                title="Notifications"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                  6
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.avatar ? (
                      <img
                        src={`http://localhost:5000/public/images/users/${user.avatar}`}
                        alt="Admin Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : user?.name ? (
                      user.name.charAt(0).toUpperCase()
                    ) : (
                      'A'
                    )}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">Aroma Store</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminNavLayout;
