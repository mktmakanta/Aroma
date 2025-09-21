'use client';

import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalSpent: 0,
    deliveredOrders: 0,
  });

  // Mock user data matching your User model
  useEffect(() => {
    setTimeout(() => {
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Fragrance enthusiast and collector of luxury perfumes',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        role: 'user',
        createdAt: '2024-01-01T00:00:00.000Z',
      };

      // Mock orders matching your Order model structure - PERFUME FOCUSED
      const mockOrders = [
        {
          _id: '65f1a2b3c4d5e6f7a8b9c0d1',
          totalPrice: 459.97,
          status: 'delivered',
          user: mockUser._id,
          createdAt: '2024-01-15T10:30:00.000Z',
          orderItems: [
            {
              _id: '65f1a2b3c4d5e6f7a8b9c0d2',
              quantity: 1,
              price: 299.99,
              product: {
                _id: '65f1a2b3c4d5e6f7a8b9c0d3',
                name: 'Midnight Elegance',
                slug: 'midnight-elegance',
                brand: 'Aroma Luxe',
                image:
                  'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300&h=300&fit=crop',
                price: 299.99,
                description:
                  'A sophisticated evening fragrance with notes of bergamot, rose, and sandalwood',
              },
            },
            {
              _id: '65f1a2b3c4d5e6f7a8b9c0d4',
              quantity: 2,
              price: 79.99,
              product: {
                _id: '65f1a2b3c4d5e6f7a8b9c0d5',
                name: 'Fresh Morning Dew',
                slug: 'fresh-morning-dew',
                brand: 'Pure Essence',
                image:
                  'https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=300&h=300&fit=crop',
                price: 79.99,
                description: 'Light, refreshing scent perfect for daytime wear',
              },
            },
          ],
        },
        {
          _id: '65f1a2b3c4d5e6f7a8b9c0e1',
          totalPrice: 899.98,
          status: 'shipped',
          user: mockUser._id,
          createdAt: '2024-01-12T14:20:00.000Z',
          orderItems: [
            {
              _id: '65f1a2b3c4d5e6f7a8b9c0e2',
              quantity: 2,
              price: 449.99,
              product: {
                _id: '65f1a2b3c4d5e6f7a8b9c0e3',
                name: 'Golden Oud Royale',
                slug: 'golden-oud-royale',
                brand: 'Majestic Scents',
                image:
                  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop',
                price: 449.99,
                description:
                  'Premium oud fragrance with gold accents - limited edition',
              },
            },
          ],
        },
        {
          _id: '65f1a2b3c4d5e6f7a8b9c0f1',
          totalPrice: 189.5,
          status: 'pending',
          user: mockUser._id,
          createdAt: '2024-01-10T09:15:00.000Z',
          orderItems: [
            {
              _id: '65f1a2b3c4d5e6f7a8b9c0f2',
              quantity: 1,
              price: 189.5,
              product: {
                _id: '65f1a2b3c4d5e6f7a8b9c0f3',
                name: 'Citrus Bloom',
                slug: 'citrus-bloom',
                brand: 'Garden Whispers',
                image:
                  'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&h=300&fit=crop',
                price: 189.5,
                description: 'Vibrant citrus blend with floral undertones',
              },
            },
          ],
        },
      ];

      // Calculate stats
      const totalOrders = mockOrders.length;
      const pendingOrders = mockOrders.filter(
        (order) => order.status === 'pending'
      ).length;
      const deliveredOrders = mockOrders.filter(
        (order) => order.status === 'delivered'
      ).length;
      const totalSpent = mockOrders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
      );

      setUser(mockUser);
      setOrders(mockOrders);
      setStats({ totalOrders, pendingOrders, totalSpent, deliveredOrders });
      setIsLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'paid':
        return 'text-purple-600 bg-purple-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">
                {user.bio || "Here's what's happening with your account today."}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders}
                </p>
              </div>
              <div className="p-3 bg-rose-100 rounded-full">
                <svg
                  className="w-6 h-6 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingOrders}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(stats.totalSpent)}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Collection Size
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.deliveredOrders}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Orders
                  </h2>
                  <a
                    href="/orders"
                    className="text-rose-600 hover:text-rose-700 text-sm font-medium cursor-pointer"
                  >
                    View all orders
                  </a>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order._id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">
                              #{order._id.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {order.orderItems.slice(0, 2).map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center space-x-3"
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {item.product.brand} • {item.quantity}ml
                                </p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                          {order.orderItems.length > 2 && (
                            <p className="text-xs text-gray-500 ml-15">
                              +{order.orderItems.length - 2} more items
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-lg text-gray-900">
                          {formatPrice(order.totalPrice)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.orderItems.length} items
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Account Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account type</span>
                  <span className="font-medium capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <a
                  href="/orders"
                  className="flex items-center p-3 rounded-lg hover:bg-rose-50 transition-colors group cursor-pointer"
                >
                  <div className="p-2 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                    <svg
                      className="w-4 h-4 text-rose-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                    View All Orders
                  </span>
                </a>
                <a
                  href="/collection"
                  className="flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors group cursor-pointer"
                >
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                    My Collection
                  </span>
                </a>
                <a
                  href="/settings"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                >
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                    Account Settings
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
