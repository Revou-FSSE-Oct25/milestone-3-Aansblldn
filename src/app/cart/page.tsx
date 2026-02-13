// src/app/cart/page.tsx
'use client';

import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CartPage() {
  const router = useRouter();
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice,
    clearCart 
  } = useCartStore();

  const totalPrice = getTotalPrice();

if (items.length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white rounded-3xl shadow-soft p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <button
          onClick={() => router.push('/')}
          className="px-8 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-purple-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-3xl shadow-soft p-6 mb-6">
          {items.map((item) => (
            <div 
              key={item.product.id}
              className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0"
            >
              {/* Product Image */}
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={item.product.images[0] || '/placeholder.png'}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {item.product.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  ${item.product.price}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right min-w-[80px]">
                <p className="font-semibold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-400 hover:text-red-600 ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-3xl shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          
          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-4 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Proceed to Checkout
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 mt-3 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}