import { useRouter } from 'next/navigation'
import React from 'react'

export default function Navbar() {
    const router = useRouter();
  return (
    <div className="py-2 bg-sky-900 flex">
        <button className="ml-4" onClick={() => router.push('/')}>Home</button>
        <h1 className="m-auto text-lg text-gray-300">Star Wars Characters Catalogue</h1>
    </div>
    
  )
}