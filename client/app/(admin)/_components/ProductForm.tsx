'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  X,
  Plus,
  Image,
  Save,
  Eye,
  AlertCircle,
  Tag,
  Package,
  DollarSign,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/services/products';

interface ProductForm {
  name: string;
  description: string;
  brand: string;
  price: number | '';
  priceDiscount: number | '';
  countInStock: number | '';
  status: 'draft' | 'published';
  categories: string[];
  tags: string[];
}

interface ImageFile {
  file?: File;
  preview: string;
  id: string;
  isExisting?: boolean;
  url?: string;
}

interface ExistingProduct {
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

interface UpdateProductProps {
  productId?: string | null;
  onCancel?: () => void;
  onSuccess?: (product: ExistingProduct) => void;
}

const UpdateProductComponent: React.FC<UpdateProductProps> = ({
  productId,
  onCancel,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    brand: '',
    price: '',
    priceDiscount: '',
    countInStock: '',
    status: 'draft',
    categories: [],
    tags: [],
  });

  const [originalData, setOriginalData] = useState<ProductForm | null>(null);
  const [imageCover, setImageCover] = useState<ImageFile | null>(null);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [errors, setErrors] = useState<Partial<ProductForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const imageCoverRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  // Sample existing product data (in real app, this would come from API)
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId, // don't fetch if productId is not provided
  });
  const availableCategories = [
    "Men's Perfume",
    "Women's Perfume",
    'Unisex',
    'Luxury',
    'Budget',
  ];
  const availableTags = [
    'Floral',
    'Woody',
    'Fresh',
    'Oriental',
    'Citrus',
    'Spicy',
    'Classic',
    'Modern',
  ];

  console.log(product);
  // Load existing product data once it’s fetched by React Query
  useEffect(() => {
    if (product) {
      // 📝 Basic fields
      const productData: ProductForm = {
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
        priceDiscount: product.priceDiscount || '',
        countInStock: product.countInStock,
        status: product.status,
        categories: product.categories.map((c: any) => c.name), // ✅ get names
        tags: product.tags.map((t: any) => t.name),
      };

      setFormData(productData);
      setOriginalData(productData);

      const SERVER_URL = 'http://localhost:5000/public/products';

      // 🖼️ Cover Image
      if (product.imageCover) {
        setImageCover({
          id: 'cover',
          preview: `${SERVER_URL}/${product.imageCover}`,
          url: product.imageCover,
          isExisting: true,
        });
      }

      // 🖼️ Gallery Images
      if (Array.isArray(product.images) && product.images.length > 0) {
        const existingImages = product.images.map(
          (filename: string, index: number) => ({
            id: `existing-${index}`,
            preview: `${SERVER_URL}/${filename}`, // full URL here
            url: filename, // keep filename
            isExisting: true,
          })
        );
        setImages(existingImages);
      }
    }
  }, [product]);

  // Check for changes
  useEffect(() => {
    if (!originalData) return;

    const currentData = JSON.stringify(formData);
    const originalDataStr = JSON.stringify(originalData);
    const imagesChanged =
      images.some((img) => !img.isExisting) ||
      (imageCover && !imageCover.isExisting);

    setHasChanges(currentData !== (originalDataStr || imagesChanged));
  }, [formData, originalData, images, imageCover]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;

    if (
      name === 'price' ||
      name === 'priceDiscount' ||
      name === 'countInStock'
    ) {
      const numValue = value === '' ? '' : Number(value);
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof ProductForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const createImageFile = (file: File): ImageFile => ({
    file,
    preview: URL.createObjectURL(file),
    id: Math.random().toString(36).substr(2, 9),
  });

  const handleImageCoverChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (imageCover && !imageCover.isExisting) {
        URL.revokeObjectURL(imageCover.preview);
      }
      setImageCover(createImageFile(file));
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 4 - images.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newImages = filesToAdd.map(createImageFile);
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string): void => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove && !imageToRemove.isExisting) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const removeImageCover = (): void => {
    if (imageCover && !imageCover.isExisting) {
      URL.revokeObjectURL(imageCover.preview);
    }
    setImageCover(null);
    if (imageCoverRef.current) {
      imageCoverRef.current.value = '';
    }
  };

  const addCategory = (): void => {
    if (
      newCategory.trim() &&
      !formData.categories.includes(newCategory.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (category: string): void => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const addTag = (): void => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string): void => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Product name must not exceed 50 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 2000) {
      newErrors.description = 'Description must not exceed 2000 characters';
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    } else if (formData.brand.length > 50) {
      newErrors.brand = 'Brand name must not exceed 50 characters';
    }

    if (formData.price === '' || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (formData.countInStock === '' || Number(formData.countInStock) < 0) {
      newErrors.countInStock = 'Stock count must be 0 or greater';
    }

    if (
      formData.priceDiscount !== '' &&
      Number(formData.priceDiscount) >= Number(formData.price)
    ) {
      newErrors.priceDiscount =
        'Discount price must be less than regular price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!hasChanges) {
      alert('No changes detected');
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = new FormData();

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => productData.append(key, item));
        } else {
          productData.append(key, String(value));
        }
      });

      // Add product ID
      // productData.append('id', productId);

      // Add new images
      if (imageCover && !imageCover.isExisting) {
        productData.append('imageCover', imageCover.file!);
      }

      images.forEach((image) => {
        if (!image.isExisting && image.file) {
          productData.append('images', image.file);
        }
      });

      // Add existing image URLs to preserve
      const existingImages = images
        .filter((img) => img.isExisting)
        .map((img) => img.url);
      existingImages.forEach((url) =>
        productData.append('existingImages', url!)
      );

      if (imageCover?.isExisting) {
        productData.append('existingImageCover', imageCover.url!);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const updatedProduct: ExistingProduct = {
        ...product!,
        ...formData,
        price: Number(formData.price),
        priceDiscount: formData.priceDiscount
          ? Number(formData.priceDiscount)
          : undefined,
        countInStock: Number(formData.countInStock),
        updatedAt: new Date().toISOString(),
      };

      console.log('Product updated successfully:', updatedProduct);

      if (onSuccess) {
        onSuccess(updatedProduct);
      } else {
        alert('Product updated successfully!');
      }

      // Update original data to reflect saved state
      setOriginalData({ ...formData });
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = (): void => {
    console.log('Preview product:', formData);
    alert('Preview functionality would open a modal or new page');
  };

  const handleReset = (): void => {
    if (originalData) {
      setFormData({ ...originalData });
      setErrors({});

      // Reset images to original state
      if (product.imageCover) {
        setImageCover({
          id: 'cover',
          preview: product.imageCover,
          url: product.imageCover,
          isExisting: true,
        });
      } else {
        setImageCover(null);
      }

      const existingImages = product.images.map((url, index) => ({
        id: `existing-${index}`,
        preview: url,
        url: url,
        isExisting: true,
      }));
      setImages(existingImages);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg text-gray-600">Loading product...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {onCancel && (
              <button
                onClick={onCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Update Product
              </h1>
              <p className="text-gray-600 mt-1">
                Product ID: {product?._id} • Last updated:{' '}
                {product?.updatedAt
                  ? new Date(product.updatedAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>

          {hasChanges && (
            <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Unsaved changes</span>
            </div>
          )}
        </div>
      </div>

      <div onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Chanel No. 5 Eau de Parfum"
                maxLength={50}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.name.length}/50 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.brand ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Chanel"
                maxLength={50}
              />
              {errors.brand && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.brand}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe the perfume, its scent profile, and unique features..."
              maxLength={2000}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/2000 characters
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="priceDiscount"
                  value={formData.priceDiscount}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.priceDiscount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.priceDiscount && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.priceDiscount}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Count *
              </label>
              <input
                type="number"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.countInStock ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.countInStock && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.countInStock}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Images */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Image className="w-5 h-5 mr-2" />
            Product Images
          </h2>

          {/* Cover Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  ref={imageCoverRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageCoverChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => imageCoverRef.current?.click()}
                  className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">
                    Click to upload new cover image
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG up to 10MB
                  </p>
                </button>
              </div>

              {imageCover && (
                <div className="flex-shrink-0 relative">
                  <img
                    src={imageCover.url}
                    alt="Cover preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeImageCover}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {imageCover.isExisting && (
                    <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                      Current
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images ({images.length}/4)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {images.map((image) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.isExisting ? image.url : image.preview}
                    alt="Product preview"
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {image.isExisting && (
                    <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                      Current
                    </div>
                  )}
                </div>
              ))}

              {images.length < 4 && (
                <div>
                  <input
                    ref={imagesRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => imagesRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories & Tags */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            Categories & Tags
          </h2>

          {/* Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add category"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                onKeyPress={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), addCategory())
                }
              />
              <button
                type="button"
                onClick={addCategory}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    !formData.categories.includes(category) &&
                    setFormData((prev) => ({
                      ...prev,
                      categories: [...prev.categories, category],
                    }))
                  }
                  className={`px-2 py-1 text-xs rounded ${
                    formData.categories.includes(category)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  disabled={formData.categories.includes(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-green-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                onKeyPress={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), addTag())
                }
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    !formData.tags.includes(tag) &&
                    setFormData((prev) => ({
                      ...prev,
                      tags: [...prev.tags, tag],
                    }))
                  }
                  className={`px-2 py-1 text-xs rounded ${
                    formData.tags.includes(tag)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  disabled={formData.tags.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            onClick={handleReset}
            disabled={!hasChanges}
            className={`flex items-center justify-center px-6 py-3 border rounded-lg transition-colors ${
              hasChanges
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Reset Changes
          </button>

          <button
            type="button"
            onClick={handlePreview}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-5 h-5 mr-2" />
            Preview
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !hasChanges}
            className={`flex items-center justify-center px-8 py-3 rounded-lg transition-colors ${
              isSubmitting || !hasChanges
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700'
            } text-white`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating Product...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Update Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductComponent;
