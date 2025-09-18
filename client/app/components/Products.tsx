'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import ProductsLoader from '@/app/components/loaders/ProductsLoader';
import RatingStars from '@/app/components/miniComponents/RatingStars';
import { useQuery } from '@tanstack/react-query';
import { StatusAlert } from './miniComponents/statusAlert';

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  countInStock: number;
  rating: number;
  price: number;
}

async function fetchProducts() {
  const res = await fetch('http://localhost:5000/api/v1/');
  if (!res.ok) throw new Error('Network error');
  const json = await res.json();
  return json.data.products; // extract the products array
}

const Products = () => {
  const { data, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <ProductsLoader />;
  if (error) return <StatusAlert message={error.message} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {data?.map((product) => (
        <Card key={product._id} className="w-full max-w-xs mx-auto">
          <Link href={`/${product._id}`}>
            <CardHeader>
              <Image
                src={product.image || '/images/perfumes/perfume10.jpg'}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-56 object-cover rounded-md"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <CardDescription className="text-sm text-gray-600 mt-2 line-clamp-2">
                {product.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="flex items-center justify-between w-full">
                <RatingStars rating={product.rating} />
                <span className="text-sm text-gray-500">
                  {product.countInStock} in stock
                </span>
              </div>
              <div className="text-xl py-2 font-semibold">${product.price}</div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Products;
