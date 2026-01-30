'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import QuantitySelector from '@/components/QuantitySelector'

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!params.id) return

    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (!data || !data.id) {
          setError(true)
        } else {
          setProduct(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return (
      <main className="container mx-auto p-4">
        <Link href="/" className="text-blue-600">← Kembali</Link>
        <p className="text-center py-20">Loading...</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="container mx-auto p-4">
        <Link href="/" className="text-blue-600">← Kembali</Link>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600">ID produk tidak valid atau sudah tidak tersedia.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Kembali
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg p-6 grid md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center bg-gray-50 p-4 rounded">
          <img 
            src={product.image} 
            alt={product.title}
            className="max-h-80 object-contain"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <span className="text-gray-500 text-sm uppercase">{product.category}</span>
          <h1 className="text-2xl font-bold mt-2 mb-4 text-black">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <p className="text-lg text-gray-500 mb-6">
            Harga Satuan: Rp {(product.price * 16000).toLocaleString('id-ID')}
          </p>
          
          <QuantitySelector product={product} />
        </div>
      </div>
    </main>
  )
}