'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  Download,
  ArrowUp,
  ArrowDown,
  Clock,
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface SaleData {
  month: string;
  sales: number;
  orders: number;
}

interface TopProduct {
  id: string;
  name: string;
  image: string;
  sales: number;
  revenue: string;
  growth: string;
  status: 'trending' | 'stable' | 'declining';
}

interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: 'completed' | 'pending' | 'processing';
  date: string;
}

const AdminDashboard: React.FC = () => {
  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+15.3%',
      changeType: 'increase',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Customers',
      value: '892',
      change: '+8.2%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Products Sold',
      value: '2,345',
      change: '-2.4%',
      changeType: 'decrease',
      icon: Package,
      color: 'bg-orange-500',
    },
  ];

  const salesData: SaleData[] = [
    { month: 'Jan', sales: 45000, orders: 120 },
    { month: 'Feb', sales: 52000, orders: 145 },
    { month: 'Mar', sales: 48000, orders: 132 },
    { month: 'Apr', sales: 61000, orders: 168 },
    { month: 'May', sales: 55000, orders: 152 },
    { month: 'Jun', sales: 67000, orders: 185 },
    { month: 'Jul', sales: 71000, orders: 198 },
    { month: 'Aug', sales: 69000, orders: 191 },
    { month: 'Sep', sales: 78000, orders: 215 },
    { month: 'Oct', sales: 82000, orders: 228 },
    { month: 'Nov', sales: 89000, orders: 245 },
    { month: 'Dec', sales: 95000, orders: 262 },
  ];

  const topProducts: TopProduct[] = [
    {
      id: 'PF001',
      name: 'Chanel No. 5 Eau de Parfum',
      image: '🌸',
      sales: 234,
      revenue: '$28,080',
      growth: '+12%',
      status: 'trending',
    },
    {
      id: 'PF002',
      name: 'Tom Ford Black Orchid',
      image: '🖤',
      sales: 189,
      revenue: '$35,039',
      growth: '+8%',
      status: 'trending',
    },
    {
      id: 'PF003',
      name: 'Dior Sauvage Eau de Toilette',
      image: '🌿',
      sales: 156,
      revenue: '$14,820',
      growth: '+5%',
      status: 'stable',
    },
    {
      id: 'PF004',
      name: 'Versace Bright Crystal',
      image: '💎',
      sales: 143,
      revenue: '$10,758',
      growth: '-2%',
      status: 'declining',
    },
    {
      id: 'PF005',
      name: 'Creed Aventus',
      image: '👑',
      sales: 98,
      revenue: '$41,650',
      growth: '+15%',
      status: 'trending',
    },
  ];

  const recentOrders: RecentOrder[] = [
    {
      id: '#ORD-001',
      customer: 'Emma Wilson',
      product: 'Chanel No. 5',
      amount: '$120.00',
      status: 'completed',
      date: '2 hours ago',
    },
    {
      id: '#ORD-002',
      customer: 'James Miller',
      product: 'Tom Ford Black Orchid',
      amount: '$185.50',
      status: 'processing',
      date: '4 hours ago',
    },
    {
      id: '#ORD-003',
      customer: 'Sarah Johnson',
      product: 'Dior Sauvage',
      amount: '$95.00',
      status: 'pending',
      date: '6 hours ago',
    },
    {
      id: '#ORD-004',
      customer: 'Michael Brown',
      product: 'Versace Bright Crystal',
      amount: '$75.25',
      status: 'completed',
      date: '8 hours ago',
    },
    {
      id: '#ORD-005',
      customer: 'Lisa Davis',
      product: 'Creed Aventus',
      amount: '$425.00',
      status: 'completed',
      date: '10 hours ago',
    },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'trending':
        return 'text-green-600';
      case 'stable':
        return 'text-blue-600';
      case 'declining':
        return 'text-red-600';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (
    status: 'trending' | 'stable' | 'declining'
  ): React.ReactNode => {
    switch (status) {
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'stable':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
  };

  const renderMetricCard = (metric: MetricCard, index: number) => (
    <div key={index} className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{metric.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {metric.value}
          </p>
          <div className="flex items-center mt-2">
            {metric.changeType === 'increase' ? (
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                metric.changeType === 'increase'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {metric.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        <div
          className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}
        >
          <metric.icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6 space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map(renderMetricCard)}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sales Overview
                  </h3>
                  <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {salesData.slice(-6).map((data, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-orange-500 rounded-t-sm mb-2 relative group cursor-pointer hover:bg-orange-600 transition-colors"
                        style={{ height: `${(data.sales / 100000) * 200}px` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          ${data.sales.toLocaleString()}
                        </div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {data.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Top Products
                  </h3>
                  <button className="text-sm text-orange-600 hover:text-orange-700">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg">
                          {product.image}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.sales} sales
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {product.revenue}
                        </p>
                        <div className="flex items-center justify-end space-x-1">
                          {getStatusIcon(product.status)}
                          <span
                            className={`text-xs ${getStatusColor(
                              product.status
                            )}`}
                          >
                            {product.growth}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Recent Orders
                    </h3>
                    <button className="text-sm text-orange-600 hover:text-orange-700">
                      View All
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Order
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.product}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                {/* Customer Insights */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Customer Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        New Customers
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        156
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Returning Customers
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        736
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Customer Retention
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        82.5%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top Locations */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Top Locations
                  </h3>
                  <div className="space-y-3">
                    {[
                      { country: 'United States', percentage: 45, flag: '🇺🇸' },
                      { country: 'United Kingdom', percentage: 23, flag: '🇬🇧' },
                      { country: 'France', percentage: 18, flag: '🇫🇷' },
                      { country: 'Germany', percentage: 14, flag: '🇩🇪' },
                    ].map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{location.flag}</span>
                          <span className="text-sm text-gray-900">
                            {location.country}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${location.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600 w-8 text-right">
                            {location.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
