'use client'

import { useState, useEffect } from 'react'

function QuantitySelector({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(product.price * 16000)
  const [showSuccess, setShowSuccess] = useState(false)
  
  useEffect(() => {
    const newTotal = product.price * quantity * 16000
    setTotalPrice(newTotal)
  }, [quantity])
  
  const increase = () => {
    if (quantity < 10) setQuantity(quantity + 1)
  }
  
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }
  
  const handleBuy = () => {
    setShowSuccess(true)
  }
  
  const closeSuccess = () => {
    setShowSuccess(false)
    window.location.href = '/'
  }
  
  if (showSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
        <div className="text-green-600 text-5xl mb-3">✓</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Pembelian Berhasil!</h3>
        <p className="text-gray-700 mb-1">{product.title}</p>
        <p className="text-gray-600 mb-3">Jumlah: {quantity} pcs</p>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          Total: Rp {totalPrice.toLocaleString('id-ID')}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Order ID: #{Math.floor(Math.random() * 10000)}
        </p>
        <button 
          onClick={closeSuccess}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Kembali ke Home
        </button>
      </div>
    )
  }
  
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
          
          <span className="text-xl font-bold w-8 text-center">
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
      
      <button 
        onClick={handleBuy}
        className="block w-full bg-blue-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-700 transition"
      >
        Beli Sekarang ({quantity} item)
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        Stok tersedia: 10 pcs
      </p>
    </div>
  )
}

export default QuantitySelector