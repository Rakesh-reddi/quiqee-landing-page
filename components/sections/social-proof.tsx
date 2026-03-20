'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Star, Package, Users, Clock, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mokila',
    text: 'Ordered groceries at 8pm, delivered by 8:25pm! The delivery person was so polite. This is exactly what Mokila needed.',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Rahul Kumar',
    location: 'Mokila',
    text: 'Finally a service that just works. No app drama, no complicated process - just WhatsApp and done. Love it!',
    rating: 5,
    avatar: 'RK',
  },
  {
    name: 'Sneha Mehta',
    location: 'Mokila',
    text: 'Got medicines delivered when I was sick and couldn\'t go out. Absolute lifesaver! Will recommend to everyone.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'Arun Reddy',
    location: 'Mokila',
    text: 'Ordered chicken for dinner, got it fresh within 25 minutes. Quality was excellent. Very impressed!',
    rating: 5,
    avatar: 'AR',
  },
]

const stats = [
  {
    icon: Package,
    value: '500+',
    label: 'Orders Delivered',
    color: '#FF6B00',
  },
  {
    icon: Users,
    value: '100+',
    label: 'Happy Customers',
    color: '#16A34A',
  },
  {
    icon: Clock,
    value: '25',
    suffix: 'min',
    label: 'Avg Delivery Time',
    color: '#2563EB',
  },
]

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

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

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false)
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goToPrev = useCallback(() => {
    setIsAutoPlaying(false)
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div 
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-block text-[#FF6B00] font-semibold text-sm uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Your Neighbors
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Real reviews from real customers in Mokila
          </p>
        </div>

        {/* Stats */}
        <div 
          className={`grid grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-5 md:p-8 bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}12` }}
              >
                <stat.icon 
                  className="w-6 h-6 md:w-7 md:h-7" 
                  style={{ color: stat.color }}
                  strokeWidth={1.5}
                />
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1">
                {stat.value}
                {stat.suffix && <span className="text-xl md:text-2xl text-gray-500 ml-1">{stat.suffix}</span>}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div 
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Testimonial card */}
          <div className="relative max-w-3xl mx-auto">
            {/* Quote icon */}
            <Quote className="absolute -top-6 left-4 md:left-0 w-12 h-12 text-[#FF6B00]/10" />
            
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm">
              {/* Navigation buttons */}
              <button 
                onClick={goToPrev}
                className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#FF6B00] hover:shadow-xl transition-all duration-200 z-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={goToNext}
                className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#FF6B00] hover:shadow-xl transition-all duration-200 z-10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Testimonial content */}
              <div className="overflow-hidden">
                <div 
                  className="transition-all duration-500 ease-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  <div className="flex">
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="w-full flex-shrink-0 px-2 md:px-8"
                      >
                        {/* Stars */}
                        <div className="flex items-center justify-center gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        
                        {/* Quote */}
                        <p className="text-gray-700 text-lg md:text-xl lg:text-2xl text-center mb-8 leading-relaxed font-medium">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>
                        
                        {/* Author */}
                        <div className="flex items-center justify-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: '#FF6B00' }}
                          >
                            {testimonial.avatar}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {testimonial.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setActiveTestimonial(index)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'w-8 bg-[#FF6B00]' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
