'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { QuiqeeLogo } from '@/components/quiqee-logo'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { AnimatedScooter } from '@/components/animated-scooter'
import { Clock, Store, Smartphone, ChevronDown, Zap } from 'lucide-react'

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    // Master Timeline: Control micro-animations
    const tl=gsap.timeline({ repeat: -1});

    //Push scooter off-screen right, hide tags
    gsap.set('.scooter-drive-wrapper', { x: '100vw' });
    gsap.set('.gsap-tag', { autoAlpha: 0, scale: 0.5 });

    // Drive in scooter
    tl.to('.scooter-drive-wrapper', {
      x: '0',
      duration: 1.6,
      ease: 'power2.out'
    })
    
    // Float tags in 
    .to('.gsap-tag', {
      autoAlpha: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    })

    // Pause in center for a moment
    .to({}, { duration: 3 })
  
    // Shrink and fade out tags
    .to('.gsap-tag', {
      autoAlpha: 0,
      scale: 0.5,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.in'
    })

    // Drive scooter off-screen left
    .to('.scooter-drive-wrapper', {
      x: '-100vw',
      duration: 1.6,
      ease: 'power2.in'
    });
  },{scope: containerRef}
  );


  return (
    <section ref={containerRef} className="relative min-h-[100dvh] bg-gradient-to-b from-[#FFFCFA] via-white to-[#FFF8F3] overflow-hidden">
      {/* Minimal background - soft radial glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#FF6B00]/8 via-[#FF6B00]/3 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-4 py-4 md:px-8 lg:px-16">
        <QuiqeeLogo size="md" />
        <WhatsAppButton 
          text="Order Now" 
          size="default"
          className="hidden sm:flex"
        />
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 px-4 pt-2 pb-16 md:px-8 lg:px-16 lg:pt-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-5 md:space-y-6">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-2 rounded-full text-sm font-semibold border border-[#FF6B00]/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]"></span>
                </span>
                Now Live in Mokila
              </div>
              
              {/* Headline */}
              <h1 className="text-[2.75rem] leading-[1.05] md:text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 tracking-tight">
                <span className="text-balance">Order Anything.</span>
                <br />
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] bg-clip-text text-transparent">Get It Delivered Fast.</span>
              </h1>
              
              {/* Subtext */}
              <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Just send a message on WhatsApp. We deliver from nearby stores to your doorstep.
              </p>
              
              {/* Delivery time highlight */}
              <div className="inline-flex items-center gap-2.5 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
                <Zap className="w-5 h-5 text-[#FF6B00]" fill="#FF6B00" />
                <span className="font-semibold text-gray-800">Avg delivery: 20-30 mins</span>
              </div>
              
              {/* CTA Button */}
              <div className="pt-3 space-y-3">
                <WhatsAppButton 
                  text="Order on WhatsApp" 
                  size="xl"
                  className="w-full sm:w-auto"
                />
                <p className="text-sm text-gray-500">Free to use. No app download needed.</p>
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
                <TrustBadge icon={<Smartphone className="w-4 h-4" />} text="No App" />
                <TrustBadge icon={<Clock className="w-4 h-4" />} text="Fast Delivery" />
                <TrustBadge icon={<Store className="w-4 h-4" />} text="Local Stores" />
              </div>
            </div>
            
            {/* Right Content - Animated Scooter */}
            <div className="relative flex items-center justify-center lg:justify-end order-first lg:order-last mt-4 lg:mt-0">
              <div className="relative w-full max-w-sm md:max-w-md lg:max-w-xl">
                
                {/* Scooter */}
                <div className='scooter-drive-wrapper relative z-10 w-full h-auto drop-shadow-2xl'>
                  <AnimatedScooter />
                </div>
                
                
                {/* floating UI tags*/}
                <div className="gsap-tag absolute -top-1 right-8 md:right-12 z-20">
                  <FloatingTag delay={0} color="orange">Food</FloatingTag>
                </div>
                
                <div className="gsap-tag absolute top-1/4 -left-2 md:left-0 z-20">
                  <FloatingTag delay={0.2} color="green">Groceries</FloatingTag>
                </div>
                
                <div className="gsap-tag absolute top-1/2 -right-1 md:right-4 z-20">
                  <FloatingTag delay={0.4} color="blue">Medicines</FloatingTag>
                </div>
                
                <div className="gsap-tag absolute bottom-16 left-6 md:left-12 z-20">
                  <FloatingTag delay={0.6} color="red">Essentials</FloatingTag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400 z-10">
        <span className="text-xs font-medium uppercase tracking-wider">Explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  )
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <span className="text-[#FF6B00]">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  )
}

interface FloatingTagProps {
  children: React.ReactNode
  className?: string
  delay: number
  color: 'orange' | 'green' | 'blue' | 'red'
}

function FloatingTag({ children, className, delay, color }: FloatingTagProps) {
  const colorStyles = {
    orange: 'bg-[#FF6B00] text-white shadow-[#FF6B00]/25',
    green: 'bg-emerald-500 text-white shadow-emerald-500/25',
    blue: 'bg-blue-500 text-white shadow-blue-500/25',
    red: 'bg-rose-500 text-white shadow-rose-500/25',
  }
  
  return (
    <div 
      className={`
        ${colorStyles[color]} 
        rounded-full px-4 py-1.5 text-sm font-semibold 
        shadow-lg animate-float
        ${className}
      `}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
