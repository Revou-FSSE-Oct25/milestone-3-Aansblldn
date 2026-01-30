'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function QuantitySelector({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(product.price * 16000)
  
  useEffect(() => {
    const newTotal = product.price * quantity * 16000
    setTotalPrice(newTotal)
  }, [quantity])
  
  const increase = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1)
    }
  }
  
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  const successUrl = `/success?name=${encodeURIComponent(product.title)}&qty=${quantity}&total=${totalPrice}`
  
  return (
    <div className="space-y-6">
      <div>
        <label className="text-gray-600 text-sm mb-2 block">Jumlah:</label>
        <div className="flex items-center gap-4">
          <button 
            onClick={decrease}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition"
          >
            -
          </button>
          
          <span className="text-xl font-bold w-8 text-center text-black">
            {quantity}
          </span>
          
          <button 
            onClick={increase}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 hover:text-blue-600 transition"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-600 text-sm">Total Harga:</p>
        <p className="text-2xl font-bold text-blue-600">
          Rp {totalPrice.toLocaleString('id-ID')}
        </p>
      </div>
      
      <Link 
        href={successUrl}
        className="block w-full bg-blue-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-700 transition"
      >
        Beli Sekarang ({quantity} item)
      </Link>
      
      <p className="text-xs text-gray-500 text-center">
        Stok tersedia: 10 pcs
      </p>
    </div>
  )
}

export default QuantitySelector