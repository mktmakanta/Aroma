'use client';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    price: 0,
    countInStock: 0,
    rating: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
    } = formData;

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          brand,
          category,
          description,
          price,
          countInStock,
          rating,
          image,
        }),
      });

      if (response.ok) {
        alert('Product added successfully');
      } else {
        throw new Error('Error adding product');
      }
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }

    setFormData({
      name: '',
      image: '',
      brand: '',
      category: '',
      description: '',
      price: 0,
      countInStock: 0,
      rating: 0,
    });
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
      <Button type="submit">Save</Button>
    </form>
  );
}
