// src/app/page.tsx
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

// ISR: Revalidate setiap 60 detik
export const revalidate = 60;

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/products', {
    next: { revalidate: 60 },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to RevoShop</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing products at great prices. Add to cart and checkout securely.
          </p>
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          
          {/* Products Grid - 4 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* All Products */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <a 
              href="/products"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              View all →
            </a>
          </div>
          
          {/* Products Grid - 8 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 12).map((product) => (
              <ProductCard key={product.id} product={product} showDetails={false} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}