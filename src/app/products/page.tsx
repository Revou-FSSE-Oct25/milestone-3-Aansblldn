// src/app/products/page.tsx
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

// ISR
export const revalidate = 60;

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products', {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-600 mt-1">{products.length} products available</p>
          </div>
          <Link 
            href="/"
            className="px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available.</p>
          </div>
        )}

      </div>
    </div>
  );
}