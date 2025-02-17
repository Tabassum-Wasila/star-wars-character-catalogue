import { useRouter } from 'next/navigation'
import React from 'react'

export default function Navbar() {
    const router = useRouter();
  return (
    <div className="py-2 bg-sky-900 flex text-gray-300">
        <button className="ml-4" onClick={() => router.replace('/')}>
            <img src="/home.svg" alt="home"/>
          </button>
        <h1 className="m-auto md:text-lg text-sm">Star Wars Characters</h1>
    </div>
    
  )
}