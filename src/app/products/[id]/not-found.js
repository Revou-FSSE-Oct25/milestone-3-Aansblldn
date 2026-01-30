import Link from 'next/link'

function NotFound() {
  return (
    <div className="container mx-auto p-4 text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Produk Tidak Ditemukan</h2>
      <Link href="/" className="text-blue-600 hover:underline">
        Kembali ke Home
      </Link>
    </div>
  )
}

export default NotFound