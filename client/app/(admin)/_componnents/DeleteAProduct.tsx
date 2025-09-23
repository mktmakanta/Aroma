'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/app/components/ui/button';

const DeleteProductButton = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.delete(`/api/products/${productId}`);
      setSuccess('Product deleted successfully');
    } catch (error) {
      setError('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success && <p className="text-green-500">{success}</p>}{' '}
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleDelete} variant={'destructive'} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  );
};

export default DeleteProductButton;
