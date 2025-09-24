'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import ProductsLoader from '@/app/components/loaders/ProductsLoader';
import RatingStars from '@/app/components/miniComponents/RatingStars';
import { StatusAlert } from './miniComponents/statusAlert';

interface Product {
  _id: string;
  name: string;
  imageCover: string;
  slug: string;
  description: string;
  price: number;
  rating: number;
  countInStock: number;
}

async function fetchProducts(query: string) {
  const res = await fetch(`http://localhost:5000/api/v1/products?${query}`);
  if (!res.ok) throw new Error('Failed to fetch');
  const json = await res.json();
  return json.data.products;
}

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (maxPrice) params.append('price[lte]', maxPrice);
  if (sort) params.append('sort', sort);
  params.append('page', page.toString());
  params.append('limit', '4');

  const { data, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['products', search, maxPrice, sort, page],
    queryFn: () => fetchProducts(params.toString()),
  });

  if (isLoading) return <ProductsLoader />;
  if (error) return <StatusAlert message={error.message} />;

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2  w-32"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 "
        >
          <option value="">Sort by</option>
          <option value="price">Price: Lowest</option>
          <option value="-price">Price: Highest</option>
          <option value="-createdAt">Newest</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product) => (
          <Card
            key={product._id}
            className="w-full border group rounded-none bg-orange-100"
          >
            <Link href={`/products/${product.slug}`}>
              <CardHeader className="">
                <Image
                  src={
                    product?.imageCover
                      ? `http://localhost:5000/public/images/products/${product.imageCover}`
                      : '/images/perfumes/default-perfume.jpeg'
                  }
                  alt={product?.name || 'Perfume'}
                  width={100}
                  height={100}
                  className="w-full h-56 object-cover"
                />
              </CardHeader>
              <CardContent className="py-4 ">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <CardDescription className="text-sm h-10 text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <div className="flex items-center justify-between w-full">
                  <RatingStars rating={product.rating || 4} />
                  <span className="text-sm text-gray-500">
                    {product.countInStock} in stock
                  </span>
                </div>
                <div className="text-xl py-2 font-semibold">
                  ${product.price}
                </div>
                <div className="border w-full p-3 text-center hover:bg-orange-200 group-hover:bg-orange-200">
                  Add to Cart
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border  disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
