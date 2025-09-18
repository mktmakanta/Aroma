'use client';

import React, { useEffect, useState } from 'react';

const images = [
  '/images/hero/hero-1.jpg', // replace with your actual image paths
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src}
            alt={`Hero- ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Overlay content (optional) */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl md:text-5xl font-bold">
        Welcome to Our Store
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex
                ? 'bg-white outline-1 outline-black outline-offset-2'
                : 'bg-white'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
