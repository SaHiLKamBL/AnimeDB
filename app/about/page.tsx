'use client'

import React from 'react'
import Navbar from '@/components/ui/Navbar'

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen bg-[url('/about2.jpg')] bg-center bg-cover flex items-center">
        {/* Optional: overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-10 md:px-20">
          <h1 className="text-6xl md:text-7xl font-extrabold text-red-500 mb-8">
            KaizokuDex
          </h1>
          <p className="text-4xl w-[70vw] text-white leading-relaxed italic font-[cursive]">
           KaizokuDex is your ultimate anime database and discovery hub.
Chat with our built-in AI to get personal anime recommendations anytime.
Use the powerful search to find detailed info on any show, old or new.
Get curated picks on our Recommendation page so you never run out of what to watch.
<br />
<br />
Whether you’re a casual fan or a true otaku, KaizokuDex is here to level up your anime journey.
          </p>
        </div>
      </div>
    </>
  )
}

export default Page
