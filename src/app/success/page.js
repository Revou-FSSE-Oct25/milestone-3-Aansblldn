'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  
  const productName = searchParams.get('name') || 'Produk'
  const quantity = searchParams.get('qty') || '1'
  const total = searchParams.get('total') || '0'
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Pembelian Berhasil!</h1>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <p className="mb-2 text-black"><strong>Produk:</strong> {productName}</p>
          <p className="mb-2 text-black"><strong>Jumlah:</strong> {quantity} pcs</p>
          <p className="text-lg border-t pt-2 mt-2">
            <strong className='text-black'>Total:</strong>{' '}
            <span className="text-black font-bold text-xl">
              Rp {parseInt(total).toLocaleString('id-ID')}
            </span>
          </p>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">
          Order ID: #{Math.floor(Math.random() * 10000)}
        </p>
        
        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          Beli Lagi
        </Link>
      </div>
    </div>
  )
}