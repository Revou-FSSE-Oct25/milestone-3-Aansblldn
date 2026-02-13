// src/components/ProductCard.tsx
'use client';

import { Product } from '@/types';
import AddToCartButton from './AddToCartButton';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  showDetails?: boolean;
}

export default function ProductCard({ product, showDetails = true }: ProductCardProps) {
  // Safe checking
  const imageUrl = product.images?.[0] || 'https://placehold.co/600x400';
  const categoryName = product.category?.name || 'Uncategorized';

  return (
    <div className="bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.title || 'Product'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1 text-lg">
            {product.title || 'Untitled'}
          </h3>
          <span className="font-bold text-gray-900 whitespace-nowrap text-lg">
            ${product.price || 0}
          </span>
        </div>
        
        {/* Description */}
        {showDetails && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[40px]">
            {product.description || 'No description'}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <AddToCartButton product={product} />
          
          <Link
            href={`/products/${product.id}`}
            className="px-4 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}