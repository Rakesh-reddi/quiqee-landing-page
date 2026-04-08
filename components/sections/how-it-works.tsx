'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, CheckCircle2, Package } from 'lucide-react'
import { WhatsAppSimulator } from '@/components/whatsapp-simulator' // Import the simulator!

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
      className="py-20 md:py-28 bg-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section header */}
        <div 
          className={`text-center md:text-left mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-block text-[#FF6B00] font-semibold text-sm uppercase tracking-wider mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Three easy steps. No app downloads required. Just pure convenience.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: The Steps */}
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  
                  {/* Step number + icon */}
                  <div className="relative shrink-0">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.bgColor}15` }}
                    >
                      <step.icon 
                        className="w-8 h-8" 
                        style={{ color: step.color }}
                        strokeWidth={2}
                      />
                    </div>
                    <span 
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md"
                      style={{ backgroundColor: step.bgColor }}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
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

          {/* RIGHT COLUMN: The WhatsApp Simulator */}
          <div 
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="relative">
              {/* Decorative blob behind the phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] bg-gradient-to-tr from-[#25D366]/20 to-[#FF6B00]/20 rounded-full blur-3xl -z-10"></div>
              
              <WhatsAppSimulator />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}