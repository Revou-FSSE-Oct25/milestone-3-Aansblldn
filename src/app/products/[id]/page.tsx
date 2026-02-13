// src/app/products/[id]/page.tsx
import { Product } from '@/types';
import AddToCartButton from '@/components/AddToCartButton';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// FIX: params adalah Promise, harus await
export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;  // ← await params dulu
  
  const product = await getProduct(id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        <Link 
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Back
        </Link>

        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
          <div className="grid md:grid-cols-2">
            
            <div className="relative aspect-square bg-gray-100">
              <Image
                src={product.images?.[0] || 'https://placehold.co/600x400'}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <p className="text-4xl font-bold text-gray-900 mb-6">${product.price}</p>
              <p className="text-gray-600 mb-8">{product.description}</p>
              
              <AddToCartButton product={product} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}