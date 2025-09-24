import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Grid3X3, 
  List, 
  MoreHorizontal, 
  Package, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Receipt, 
  Percent, 
  Settings, 
  Shield, 
  HelpCircle,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Bell,
  Menu,
  X
} from 'lucide-react';

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
  active: boolean;
}

interface PerfumeProduct {
  id: string;
  name: string;
  image: string;
  price: string;
  stock: number;
  status: 'Active' | 'Low Stock' | 'No Active';
  progress: number;
  sales: string;
}

type ViewMode = 'list' | 'grid';
type StatusType = 'Active' | 'Low Stock' | 'No Active';

const PerfumeAdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Collection');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('$25 - $500');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
  const [selectedStore, setSelectedStore] = useState<string>('All Collection');

  const perfumeProducts: PerfumeProduct[] = [
    {
      id: 'PF001',
      name: 'Chanel No. 5 Eau de Parfum',
      image: '🌸',
      price: '$120.00',
      stock: 245,
      status: 'Active',
      progress: 85,
      sales: '1200/1400'
    },
    {
      id: 'PF002', 
      name: 'Tom Ford Black Orchid',
      image: '🖤',
      price: '$185.50',
      stock: 156,
      status: 'Active',
      progress: 72,
      sales: '890/1200'
    },
    {
      id: 'PF003',
      name: 'Dior Sauvage Eau de Toilette',
      image: '🌿',
      price: '$95.00',
      stock: 89,
      status: 'Low Stock',
      progress: 45,
      sales: '450/1000'
    },
    {
      id: 'PF004',
      name: 'Versace Bright Crystal',
      image: '💎',
      price: '$75.25',
      stock: 312,
      status: 'Active',
      progress: 95,
      sales: '1520/1600'
    },
    {
      id: 'PF005',
      name: 'Creed Aventus',
      image: '👑',
      price: '$425.00',
      stock: 67,
      status: 'Active',
      progress: 78,
      sales: '340/435'
    },
    {
      id: 'PF006',
      name: 'Marc Jacobs Daisy',
      image: '🌼',
      price: '$68.00',
      stock: 198,
      status: 'No Active',
      progress: 0,
      sales: '0/800'
    }
  ];

  const sidebarItems: SidebarItem[] = [
    { icon: BarChart3, label: 'Dashboard', active: false },
    { icon: Package, label: 'Order', badge: 16, active: false },
    { icon: Users, label: 'Customers', active: false },
    { icon: MessageSquare, label: 'Message', active: false }
  ];

  const toolsItems: SidebarItem[] = [
    { icon: Package, label: 'Product', active: true },
    { icon: BarChart3, label: 'Integrations', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Receipt, label: 'Invoice', active: false },
    { icon: Percent, label: 'Discount', active: false }
  ];

  const settingsItems: SidebarItem[] = [
    { icon: Settings, label: 'Settings', active: false },
    { icon: Shield, label: 'Security', active: false },
    { icon: HelpCircle, label: 'Get Help', active: false }
  ];

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'Active': 
        return 'text-green-600 bg-green-50';
      case 'Low Stock': 
        return 'text-orange-600 bg-orange-50';
      case 'No Active': 
        return 'text-gray-600 bg-gray-50';
      default: 
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getProgressColor = (status: StatusType): string => {
    switch (status) {
      case 'Active': 
        return 'bg-green-500';
      case 'Low Stock': 
        return 'bg-orange-500';
      case 'No Active': 
        return 'bg-gray-300';
      default: 
        return 'bg-blue-500';
    }
  };

  const handleSidebarToggle = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewModeChange = (mode: ViewMode): void => {
    setViewMode(mode);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedPriceRange(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedStatus(event.target.value);
  };

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedStore(event.target.value);
  };

  const renderSidebarItem = (item: SidebarItem, index: number): JSX.Element => (
    <a
      key={index}
      href="#"
      className={`flex items-center justify-between px-2 py-2 text-sm font-medium rounded-lg ${
        item.active 
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
    </a>
  );

  const renderProductRow = (product: PerfumeProduct, index: number): JSX.Element => (
    <tr key={index} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mr-4">
            {product.image}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">ID: {product.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
          {product.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-32">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>{product.sales}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(product.status)}`}
              style={{ width: `${product.progress}%` }}
            ></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            defaultChecked={product.status === 'Active'}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
        </label>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded" title="View">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded" title="Delete">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded" title="More">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">PerfumeAI</span>
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
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Menu</h3>
              <nav className="mt-4 space-y-1">
                {sidebarItems.map(renderSidebarItem)}
              </nav>
            </div>

            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</h3>
              <nav className="mt-4 space-y-1">
                {toolsItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
                      item.active 
                        ? 'bg-orange-50 text-orange-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</h3>
              <nav className="mt-4 space-y-1">
                {settingsItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
                      item.active 
                        ? 'bg-orange-50 text-orange-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
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
              <button className="p-2 text-gray-400 hover:text-gray-600 relative" title="Notifications">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JS</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Jimmy Sullivan</p>
                  <p className="text-xs text-gray-500">Odana Store</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Top Controls */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleViewModeChange('list')}
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    title="List view"
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleViewModeChange('grid')}
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    title="Grid view"
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Show: All Products</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Sort by: Default</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    <Plus className="w-4 h-4" />
                    <span>Add new product</span>
                  </button>
                </div>
              </div>

              {/* Filter Row */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="All Collection">All Collection</option>
                    <option value="Men's Perfume">Men's Perfume</option>
                    <option value="Women's Perfume">Women's Perfume</option>
                    <option value="Unisex Perfume">Unisex Perfume</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    value={selectedPriceRange}
                    onChange={handlePriceRangeChange}
                  >
                    <option value="$25 - $500">$25 - $500</option>
                    <option value="$25 - $100">$25 - $100</option>
                    <option value="$100 - $200">$100 - $200</option>
                    <option value="$200 - $500">$200 - $500</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="No Active">No Active</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    value={selectedStore}
                    onChange={handleStoreChange}
                  >
                    <option value="All Collection">All Collection</option>
                    <option value="Main Store">Main Store</option>
                    <option value="Online Store">Online Store</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {perfumeProducts.map(renderProductRow)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfumeAdminDashboard; 