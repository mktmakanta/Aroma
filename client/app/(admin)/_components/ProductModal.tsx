'use client';

import React from 'react';
import { X } from 'lucide-react';
import ProductFormComponent from './ProductForm';

interface ProductModalProps {
  productId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Glassy Background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white/90 backdrop-blur-md shadow-xl  max-h-[90vh] w-full max-w-5xl overflow-y-auto p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Add Product Form */}
        <ProductFormComponent
          productId={productId}
          onSuccess={() => onClose()}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default ProductModal;
