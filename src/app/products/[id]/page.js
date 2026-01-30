import Link from 'next/link'
import { notFound } from 'next/navigation'
import QuantitySelector from '@/components/QuantitySelector'
import NotFound from './not-found'


export const dynamic = 'force-dynamic'

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) return null
  return res.json()
}

export default async function ProductDetailPage(props) {
  const { id } = await props.params
  const product = await getProduct(id)
  
  if (!product) NotFound()
  
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
          <h1 className="text-2xl font-bold mt-2 mb-4 text-blue-600">{product.title}</h1>
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