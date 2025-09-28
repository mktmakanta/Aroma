'use client';
import Image from 'next/image';
import ProductModal from '../../_components/ProductModal';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/products';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Grid3X3,
  List,
  MoreHorizontal,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  DollarSign,
} from 'lucide-react';

interface PerfumeProduct {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  priceDiscount?: number;
  countInStock: number;
  status: 'draft' | 'published';
  categories: string[];
  tags: string[];
  imageCover: string;
  images: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

type ViewMode = 'list' | 'grid';
type StatusType = 'draft' | 'published';

const AdminProductsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCategory, setSelectedCategory] =
    useState<string>('All Collection');
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<string>('$25 - $500');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
  const [selectedStore, setSelectedStore] = useState<string>('All Collection');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // FOR MODAL (ADD AND EDIT OF PRODUCT)
  const handleAdd = () => {
    setEditingProductId(null);
    setIsModalOpen(true);
  };
  const handleEdit = (id: string) => {
    setEditingProductId(id);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-50';
      case 'draft':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getProgressColor = (status: StatusType): string => {
    switch (status) {
      // case 'Active':
      //   return 'bg-green-500';
      // case 'Low Stock':
      //   return 'bg-orange-500';
      // case 'No Active':
      //   return 'bg-gray-300';
      // default:
      //   return 'bg-blue-500';
      case 'published':
        return 'bg-green-500';
      case 'draft':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  const handleViewModeChange = (mode: ViewMode): void => {
    setViewMode(mode);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedPriceRange(event.target.value);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedStatus(event.target.value);
  };

  const handleStoreChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedStore(event.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const renderProductRow = (data: PerfumeProduct) => (
    <tr key={data._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Image
            src={
              data?.imageCover
                ? `http://localhost:5000/public/images/products/${data.imageCover}`
                : '/images/perfumes/default-perfume.jpeg'
            }
            alt={data.name}
            width={48}
            height={48}
            className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mr-4"
          />

          <div>
            <div className="text-sm font-medium text-gray-900">{data.name}</div>
            <div className="text-sm text-gray-500">ID: {data._id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap space-x-1 flex items-center text-sm text-gray-900">
        <DollarSign className="size-3" /> <span>{data.price}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {data.countInStock}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            data.status
          )}`}
        >
          {data.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-32">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>{data.sales || 'sales'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getProgressColor(data.status)}`}
              style={{ width: `${data.progress}% ` }}
            ></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            defaultChecked={data.status === 'published'}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
        </label>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(data._id)}
            className="p-1 hover:bg-gray-100 rounded"
            title="Edit"
          >
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
    <div>
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Top Controls */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 rounded-md ${
                    viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  title="List view"
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 rounded-md ${
                    viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
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
                <button
                  onClick={handleAdd}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  <Plus className="w-4 h-4" />

                  <span>Add new product</span>
                </button>
              </div>
            </div>

            {/* Filter Row */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="All Collection">All Collection</option>
                  <option value="Men's Perfume">{`Men's Perfume`}</option>
                  <option value="Women's Perfume">{`Women's Perfume`}</option>
                  <option value="Unisex Perfume">Unisex Perfume</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store
                </label>
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

          <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            productId={editingProductId}
          />

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Active
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.map(renderProductRow)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProductsPage;
