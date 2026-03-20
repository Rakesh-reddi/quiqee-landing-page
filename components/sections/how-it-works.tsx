'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, CheckCircle2, Package, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    title: 'Send Your Order',
    description: 'Just WhatsApp us what you need - groceries, food, medicines, anything!',
    color: '#25D366',
    bgColor: '#25D366',
  },
  {
    icon: CheckCircle2,
    title: 'We Confirm & Pick',
    description: 'We find the best nearby store, confirm price, and pick up your order.',
    color: '#FF6B00',
    bgColor: '#FF6B00',
  },
  {
    icon: Package,
    title: 'Fast Delivery',
    description: 'Get it delivered to your doorstep in 20-30 minutes. Pay on delivery!',
    color: '#FF6B00',
    bgColor: '#FF6B00',
  },
]

export function HowItWorks() {
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
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div 
          className={`text-center mb-14 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-block text-[#FF6B00] font-semibold text-sm uppercase tracking-wider mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
            Three easy steps. No app downloads required.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#25D366] via-[#FF6B00] to-[#FF6B00]" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-gray-300 rotate-90" />
                  </div>
                )}
                
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group">
                  {/* Step number + icon */}
                  <div className="relative mb-6">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${step.bgColor}12` }}
                    >
                      <step.icon 
                        className="w-10 h-10" 
                        style={{ color: step.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span 
                      className="absolute -top-2 -right-2 md:right-auto md:left-1/2 md:ml-8 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      style={{ backgroundColor: step.bgColor }}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
