'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Zap, Navigation } from 'lucide-react'
import Image from 'next/image'

export function LocalTrust() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-br from-[#FF6B00] via-[#FF7A1A] to-[#FF8533] text-white relative overflow-hidden"
    >
      {/* Background dots */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <MapPin className="absolute top-16 left-[8%] w-6 h-6 text-white/15 animate-pulse" />
        <Navigation className="absolute bottom-1/3 left-[15%] w-4 h-4 text-white/10 animate-pulse rotate-45" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full mb-6 border border-white/20">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Hyperlocal Delivery
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              Serving Mokila,<br />Right Now.
            </h2>

            <p className="text-lg text-white/90 mb-8 max-w-md">
              Built for your neighborhood. Fast, local, reliable delivery.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold">20-30</div>
                <div className="text-white/70 text-sm">min delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold">5km</div>
                <div className="text-white/70 text-sm">coverage</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-white/70 text-sm">stores</div>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white text-[#FF6B00] px-5 py-2 rounded-full font-semibold shadow-lg text-sm">
              <Zap className="w-4 h-4" />
              Expanding to more areas soon
            </div>
          </div>

          {/* RIGHT MAP (REAL IMAGE INSIDE BOX) */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative aspect-square max-w-sm mx-auto">
              
              {/* Map Container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">

                {/* REAL MAP IMAGE */}
                <Image
                  src="/images/mokila-map.png"
                  alt="Mokila Coverage Map"
                  fill
                  className="object-cover scale-110 hover:scale-125 transition duration-700"
                />

                {/* Light overlay for brand feel */}
                <div className="absolute inset-0 bg-orange-500/10 backdrop-blur-[1px]" />

                {/* Center Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <MapPin className="w-7 h-7 text-[#FF6B00]" />
                    </div>

                    {/* Pulse animation */}
                    <div className="absolute inset-0 rounded-full border-4 border-white/60 animate-ping" />
                    <div className="absolute -inset-4 rounded-full border-2 border-white/40 animate-ping" />
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Mokila Coverage Area
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}