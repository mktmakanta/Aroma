'use client';

import { useParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProductDetailsLoader from '@/app/components/loaders/ProductDetailsLoader';
import ProductDetails from '@/app/components/ProductDetails';
import { Product } from '@/Types/globalTypes';

const fetchProduct = async (slug: string): Promise<Product> => {
  const res = await fetch(`http://localhost:5000/api/v1/products/${slug}`, {
    credentials: 'include',
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  const data = await res.json();

  if (!data?.data?.product) {
    notFound();
  }

  return data?.data?.product;
};

const ProductPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug as string;
  const router = useRouter();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product, Error>({
    queryKey: ['product', slug],
    queryFn: () => fetchProduct(slug),
    enabled: !!slug,
  });

  if (isLoading) return <ProductDetailsLoader />;

  if (isError) {
    if (error.message === 'Unauthorized') {
      router.push('/login');
      return null;
    }
    return (
      <div className="text-center text-red-500">
        {error.message || 'Something went wrong'}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {product && <ProductDetails productdetails={[product]} />}
    </div>
  );
};

export default ProductPage;
