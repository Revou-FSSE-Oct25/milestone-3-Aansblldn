// src/components/AddToCartButton.tsx
'use client';

import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/types';
import { useState } from 'react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    
    setTimeout(() => setIsAdded(false), 200);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-4 rounded-full font-medium transition-all ${
        isAdded
          ? 'bg-gray-700 text-white'
          : 'bg-gray-900 text-white hover:bg-gray-800'
      }`}
    >
      {isAdded ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}