'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [produk, setProduk] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProduk(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <main className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <h1 className="text-5xl font-bold text-left mb-8 text-green-800">🛒RevoShop</h1>
        <p className="text-center py-20">Loading...</p>
      </main>
    )
  }

  if (error || produk.length === 0) {
    return (
      <main className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <h1 className="text-5xl font-bold text-left mb-8 text-green-800">🛒RevoShop</h1>
        <div className="text-center py-20">
          <p className="text-gray-600">Gagal memuat produk.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-bold text-left mb-8 text-green-800 hover:text-blue-600">
        🛒RevoShop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {produk.map((item) => (
          <Link href={`/products/${item.id}`} key={item.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 border-blue-500 hover:border-green-600">
              <div className="h-48 bg-white p-4 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-4 border-t">
                <span className="text-xs text-gray-500 uppercase">{item.category}</span>
                <h2 className="font-bold text-gray-800 text-sm mt-1 line-clamp-2 h-10">
                  {item.title}
                </h2>
                <p className="text-blue-600 font-bold text-lg mt-2">
                  Rp {(item.price * 16000).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </Link>
        ))}
        
      </div>
    </main>
  )
}