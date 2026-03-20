'use client'

import { useEffect, useRef, useState } from 'react'
import { UtensilsCrossed, ShoppingBasket, Pill, Beef, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Category {
  name: string
  icon: LucideIcon
  description: string
  color: string
  bgColor: string
}

const categories: Category[] = [
  {
    name: 'Food',
    icon: UtensilsCrossed,
    description: 'Restaurants & local eateries',
    color: '#EA580C',
    bgColor: '#FFF7ED',
  },
  {
    name: 'Groceries',
    icon: ShoppingBasket,
    description: 'Daily essentials & more',
    color: '#16A34A',
    bgColor: '#F0FDF4',
  },
  {
    name: 'Medicines',
    icon: Pill,
    description: 'Pharmacy & health items',
    color: '#2563EB',
    bgColor: '#EFF6FF',
  },
  {
    name: 'Meat',
    icon: Beef,
    description: 'Fresh & quality cuts',
    color: '#DC2626',
    bgColor: '#FEF2F2',
  },
  {
    name: 'Essentials',
    icon: Package,
    description: 'Everything else you need',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
  },
]

export function Categories() {
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
      className="py-20 md:py-28 bg-[#FAFAFA]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div 
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-block text-[#FF6B00] font-semibold text-sm uppercase tracking-wider mb-3">
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Can You Order?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto">
            Anything available at nearby stores - we pick it up and deliver.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`group relative bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Hover background */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: category.bgColor }}
              />
              
              <div className="relative z-10 text-center">
                <div 
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ backgroundColor: category.bgColor }}
                >
                  <category.icon 
                    className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-300"
                    style={{ color: category.color }}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-base md:text-lg">
                  {category.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-snug">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <p 
          className={`text-center text-gray-500 mt-10 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Don&apos;t see what you need? Just ask! If it&apos;s available nearby, we&apos;ll deliver it.
        </p>
      </div>
    </section>
  )
}
