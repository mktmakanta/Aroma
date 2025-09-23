'use client';

import React from 'react';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';

const UpdateProduct = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    countInStock: '',
    rating: '',
    image: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        const product = response.data;
        setFormData({
          name: product.name || '',
          brand: product.name || '',
          category: product.category || '',
          description: product.description || '',
          price: product.price || '',
          countInStock: product.countInStock || '',
          rating: product.rating || '',
          image: product.image || '',
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(`/api/products/${productId}`, formData);
      alert('Product updated successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl m-16 space-y-10">
      <label>
        Name:
        <Input name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Brand:
        <Input name="brand" value={formData.brand} onChange={handleChange} />
      </label>
      <label>
        Category:
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Count In Stock:
        <Input
          type="number"
          name="countInStock"
          value={formData.countInStock}
          onChange={handleChange}
        />
      </label>
      <label>
        Rating:
        <Input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </label>

      <label>
        Image name:
        <Input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="image name"
        />
      </label>
      <Button type="submit" disabled={loading}>
        {loading ? 'Loading...' : '  Save Update'}
      </Button>
    </form>
  );
};

export default UpdateProduct;
