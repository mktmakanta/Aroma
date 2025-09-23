'use client';

import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RatingStars from '@/app/components/miniComponents/RatingStars';
import Router from 'next/router';

type Product = {
  id: string;
  name: string;
  image: string;
  slug: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  countInStock: number;
  numberOfReviews: number;
};

type ProductDetailsProps = {
  productdetails: Product[];
};

const ProductDetails = ({ productdetails }: ProductDetailsProps) => {
  // const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto space-y-10 md:mt-8">
      <Link href="/">
        <Button
          className="group rounded-none text-black bg-orange-100/75 mb-10 hover:bg-orange-200 transition-all duration-200 ring-1 ring-black"
          onClick={() => Router.back()}
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-all duration-200" />
          Go Back
        </Button>
      </Link>
      {/* Product Details */}
      {productdetails.length > 0 ? (
        productdetails.map((product) => (
          <div key={product.id} className="flex flex-col md:flex-row gap-5">
            <div className="border">
              <Image
                src={product.image || '/images/perfumes/perfume10.jpg'}
                alt={product.name}
                width={300}
                height={300}
                className=" shadow-lg h-[25rem] lg:h-[30rem] lg:w-[26rem]"
              />
            </div>

            {/* Product Information */}
            <div className="flex-1 md:flex-row md:flex gap-5 space-y-5">
              {/* Main Details */}
              <div className="flex-1 flex flex-col space-y-3 divide-y divide-slate-300">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {product.name}
                </h1>
                <div className="flex items-center justify-between pt-3">
                  <span>{<RatingStars rating={product.rating} />}</span>
                  <span>{product.numberOfReviews || '000'} Reviews</span>
                </div>
                <p className="text-lg font-semibold pt-3">
                  Price: ${product.price}
                </p>
                <p className="pt-3">{product.description}</p>
              </div>

              <div className="md:w-[300px] space-y-3 p-4 ring-1 ring-black shadow-sm  divide-y divide-black gap-2 max-h-min">
                <p className="flex items-center justify-between">
                  <span className="font-semibold">Category:</span>
                  {product.category}
                </p>
                <div className="text-sm flex justify-between items-center pt-3">
                  <span className="font-semibold">Status:</span>
                  <span>
                    {product.countInStock > 0
                      ? product.countInStock < 5
                        ? 'Low Stock'
                        : 'In Stock'
                      : 'Out of Stock'}
                  </span>
                </div>
                <Button className="mt-6 bg-orange-100 border hover:bg-orange-200 rounded-none transition">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          No product details available.
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
