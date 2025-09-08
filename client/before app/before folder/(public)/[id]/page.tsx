'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/types/globalTypes';
import ProductDetailsLoader from '@/app/components/loaders/ProductDetailsLoader';
import ProductDetails from '../_components/ProductDetails';
import axios from 'axios';

const ProductPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [isProduct, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        const message =
          axios.isAxiosError(err) && err.response?.data?.error
            ? err.response.data.error
            : 'An error occurred while fetching the product.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <ProductDetailsLoader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {isProduct && <ProductDetails productdetails={[isProduct]} />}
    </div>
  );
};

export default ProductPage;
