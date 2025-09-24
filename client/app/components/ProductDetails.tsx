'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RatingStars from '@/app/components/miniComponents/RatingStars';
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  imageCover: string;
  images: string[];
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
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!productdetails.length) {
    return (
      <div className="text-center text-gray-500">
        No product details available.
      </div>
    );
  }

  const product = productdetails[0];

  // Combine all images (cover image + additional images)
  const allImages = [product.imageCover, ...(product.images || [])].filter(
    Boolean
  ); // Remove any null/undefined images

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex((prev) =>
        prev === 0 ? allImages.length - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === allImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const getImageUrl = (imageName: string) => {
    if (!imageName) return '/images/perfumes/default-perfume.jpeg';
    return `http://localhost:5000/public/images/products/${imageName}`;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-10 md:mt-8 p-4">
        <Link href="/">
          <Button
            className="group rounded-none text-black bg-orange-100/75 mb-10 hover:bg-orange-200 transition-all duration-200 ring-1 ring-black"
            onClick={() => router.back()}
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-all duration-200" />
            Go Back
          </Button>
        </Link>

        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="border cursor-pointer"
              onClick={() => openModal(selectedImageIndex)}
            >
              <Image
                src={getImageUrl(allImages[selectedImageIndex])}
                alt={product?.name || 'Perfume'}
                width={300}
                height={300}
                quality={100}
                className="shadow-lg h-[25rem] lg:h-[30rem] lg:w-[26rem] object-cover hover:opacity-90 transition-opacity"
              />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 max-w-[300px] lg:max-w-[416px] overflow-x-auto">
                {allImages.map((image, index) => (
                  <div
                    key={index}
                    className={`border-2 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                      selectedImageIndex === index
                        ? 'border-orange-400 shadow-md'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={getImageUrl(image)}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={80}
                      height={80}
                      quality={100}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex-1 md:flex-row md:flex gap-5 space-y-5">
            {/* Main Details */}
            <div className="flex-1 flex flex-col space-y-3 divide-y divide-slate-300">
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center justify-between pt-3">
                <span>{<RatingStars rating={product.rating} />}</span>
                <span>({product.numberOfReviews || '000'}) Reviews</span>
              </div>
              <div className="text-lg font-semibold pt-3">
                Price: ${product.price}
              </div>
              <div className="pt-3 mb-6">{product.description}</div>
            </div>

            {/* Right side */}
            <div className="md:w-[300px] space-y-3 p-4 ring-1 ring-black shadow-sm divide-y divide-black gap-2 max-h-min">
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
              <div className="flex justify-between">
                <Button className="mt-6 bg-orange-100 border hover:bg-orange-200 rounded-none transition">
                  Buy Now
                </Button>
                <Button className="mt-6 bg-orange-100 border hover:bg-orange-200 rounded-none transition">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            {allImages.length > 1 && (
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={getImageUrl(allImages[selectedImageIndex])}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                width={800}
                height={800}
                quality={100}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Next Button */}
            {allImages.length > 1 && (
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
