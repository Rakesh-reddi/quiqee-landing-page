'use client'

import { useEffect, useRef, useState } from 'react'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Check, Banknote, UserX, ShieldCheck } from 'lucide-react'

const frictionReducers = [
  {
    icon: UserX,
    text: 'No signup required',
  },
  {
    icon: Banknote,
    text: 'Cash on delivery',
  },
  {
    icon: Check,
    text: 'No minimum order',
  },
  {
    icon: ShieldCheck,
    text: '100% secure',
  },
]

export function FinalCTA() {
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
      className="py-20 md:py-28 bg-gradient-to-b from-[#FFF9F5] via-[#FFFBF8] to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#25D366]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FF6B00]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative">
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* WhatsApp icon */}
          <div className="relative inline-block mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#25D366] rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-[#25D366]/30 rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 text-white fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            {/* Decorative dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#FF6B00] rounded-full" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#25D366]/50 rounded-full" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Need something?<br />
            <span className="text-[#FF6B00]">Just WhatsApp us.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
            No apps to download. No accounts to create. Just message us and we&apos;ll handle the rest.
          </p>

          {/* CTA Button */}
          <div className="mb-10">
            <WhatsAppButton 
              text="Send Your Order Now" 
              size="xl"
              className="w-full sm:w-auto"
            />
            <p className="text-sm text-gray-500 mt-4">
              Average response time: under 2 minutes
            </p>
          </div>

          {/* Friction reducers */}
          <div 
            className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {frictionReducers.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#25D366]" />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
