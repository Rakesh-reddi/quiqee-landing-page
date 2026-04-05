'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronLeft } from 'lucide-react'

gsap.registerPlugin(useGSAP)

export function WhatsAppSimulator({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Entrance & Default Float
    gsap.fromTo('.phone-3d-wrapper', 
      { y: 80, z: -600, rotationX: 70, rotationY: -735, rotationZ: -20, scale: 0.3, opacity: 0 },
      { y: 0, z: 0, rotationX: 10, rotationY: -15, rotationZ: 0, scale: 1, opacity: 1, duration: 2.5, ease: 'expo.out' }
    );
    gsap.to('.phone-3d-wrapper', { y: -15, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.5 });

    // Interactive Mouse/Touch Tracking
    const container = containerRef.current;
    const handleMovement = (clientX: number, clientY: number) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      
      gsap.to('.phone-3d-wrapper', { rotationY: x * 35, rotationX: -y * 35, duration: 0.6, ease: 'power2.out' });
      gsap.to('.chat-parallax-layer', { x: -x * 20, y: y * 20, duration: 0.6, ease: 'power2.out' });
      gsap.to('.phone-glare', { x: x * 250 + '%', opacity: Math.abs(x) + 0.1, duration: 0.6, ease: 'power2.out' });
      gsap.to('.phone-hardware', { 
        boxShadow: `${-x * 30}px ${-y * 30}px 50px rgba(0,0,0,0.4), inset ${x * 10}px ${y * 10}px 20px rgba(255,255,255,0.4), inset 0px 0px 5px rgba(0,0,0,0.2)`,
        duration: 0.6, ease: 'power2.out'
      });
      gsap.to('.phone-shadow', { x: -x * 50, y: -y * 20, scale: 1 - Math.abs(x) * 0.2, opacity: 0.3 + Math.abs(y) * 0.2, duration: 0.6, ease: 'power2.out' });
    };

    const onMouseMove = (e: MouseEvent) => handleMovement(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => handleMovement(e.touches[0].clientX, e.touches[0].clientY);
    const onLeaveOrEnd = () => {
      gsap.to('.phone-3d-wrapper', { rotationY: -15, rotationX: 10, duration: 1, ease: 'elastic.out(1, 0.5)' });
      gsap.to('.chat-parallax-layer', { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' });
      gsap.to('.phone-glare', { x: '-100%', opacity: 0, duration: 1 });
      gsap.to('.phone-hardware', { boxShadow: '20px 20px 50px rgba(0,0,0,0.5), inset 0px 0px 10px rgba(255,255,255,0.2)', duration: 1 });
      gsap.to('.phone-shadow', { x: 0, y: 0, scale: 1, opacity: 0.3, duration: 1 });
    };

    container?.addEventListener('mousemove', onMouseMove);
    container?.addEventListener('mouseleave', onLeaveOrEnd);
    container?.addEventListener('touchmove', onTouchMove, { passive: true });
    container?.addEventListener('touchend', onLeaveOrEnd);
    container?.addEventListener('touchcancel', onLeaveOrEnd);

    // --------------------------------------------------------
    //  HOLOGRAPHIC TIMELINE
    // --------------------------------------------------------
    const chatTl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, delay: 2.5 }) 

    gsap.set('.msg-user', { autoAlpha: 0, y: 15, z: 40, scale: 0.9, transformOrigin: 'bottom right' })
    gsap.set('.msg-typing', { autoAlpha: 0, y: 15, z: 40, scale: 0.9, transformOrigin: 'bottom left' })
    gsap.set('.msg-quiqee', { autoAlpha: 0, y: 15, z: 40, scale: 0.9, transformOrigin: 'bottom left' })
    gsap.set('.pop-item', { autoAlpha: 0, scale: 0, z: 0, x: 0, y: 0 })

    chatTl.to('.msg-user', { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' })
      .to('.msg-typing', { autoAlpha: 1, y: 0, scale: 1, duration: 0.2, ease: 'back.out(1.5)' }, '+=0.6') 
      .to('.msg-typing', { autoAlpha: 0, y: -10, scale: 0.9, duration: 0.1, ease: 'power2.in' }, '+=1.5') 
      .to('.msg-quiqee', { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.1') 
      .to('.pop-item', {
        autoAlpha: 1,
        scale: 1,
        z: 140, 
        x: (i) => [-140, 120, -110, 130][i], 
        y: (i) => [-100, -40, 80, 160][i],    
        duration: 0.8,
        stagger: 0.1, 
        ease: 'back.out(1.5)'
      }, '+=0.6') 
      .to(['.msg-user', '.msg-quiqee', '.pop-item'], { 
        autoAlpha: 0, scale: 0, z: 0, duration: 0.5, ease: 'power2.in' 
      }, '+=2.5') 

    return () => {
      container?.removeEventListener('mousemove', onMouseMove);
      container?.removeEventListener('mouseleave', onLeaveOrEnd);
      container?.removeEventListener('touchmove', onTouchMove);
      container?.removeEventListener('touchend', onLeaveOrEnd);
      container?.removeEventListener('touchcancel', onLeaveOrEnd);
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`relative flex justify-center items-center py-16 px-12 ${className}`} style={{ perspective: '1200px' }}>
      
      <div className="phone-shadow absolute bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-black blur-xl rounded-[100%] pointer-events-none opacity-30"></div>

      <div className="phone-3d-wrapper relative cursor-grab active:cursor-grabbing touch-none" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Holographic Items */}
        <div className="pop-item absolute top-[40%] left-[40%] text-6xl z-[100] drop-shadow-2xl pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-[2rem] shadow-xl border border-white/60">🍗</div>
        </div>
        <div className="pop-item absolute top-[40%] left-[40%] text-6xl z-[100] drop-shadow-2xl pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-[2rem] shadow-xl border border-white/60">🥛</div>
        </div>
        <div className="pop-item absolute top-[40%] left-[40%] text-6xl z-[100] drop-shadow-2xl pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-[2rem] shadow-xl border border-white/60">💊</div>
        </div>
        <div className="pop-item absolute top-[40%] left-[40%] text-6xl z-[100] drop-shadow-2xl pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-[2rem] shadow-xl border border-white/60">🛍️</div>
        </div>

        {/* Hardware Frame */}
        <div className="phone-hardware w-[300px] h-[580px] sm:w-[320px] sm:h-[620px] bg-gray-900 rounded-[3rem] border-[4px] border-gray-800 relative" style={{ transformStyle: 'preserve-3d' }}>
          <div 
            className="absolute inset-[-4px] bg-gray-950 rounded-[3rem] border-[4px] border-gray-800 overflow-hidden pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" 
            style={{ transform: 'translateZ(-1px) rotateY(180deg)' }}
          >
            {/* The Camera Bump */}
            <div className="absolute top-8 right-8 w-16 h-32 bg-gray-900 rounded-[2rem] border border-gray-700 shadow-xl flex flex-col items-center justify-center gap-3 py-3">
              <div className="w-10 h-10 rounded-full bg-black border-[2px] border-gray-700 shadow-inner flex items-center justify-center"><div className="w-4 h-4 rounded-full bg-gray-800/50 blur-[1px]"></div></div>
              <div className="w-10 h-10 rounded-full bg-black border-[2px] border-gray-700 shadow-inner flex items-center justify-center"><div className="w-4 h-4 rounded-full bg-gray-800/50 blur-[1px]"></div></div>
            </div>
            
            {/* Brand Logo on the back */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-20">
              <span className="text-white font-bold text-4xl italic tracking-tighter border-2 border-white/50 p-2 rounded-xl">QQ</span>
            </div>
          </div>


          {/* The Front Screen */}
          <div className="absolute inset-[10px] bg-[#efeae2] rounded-[2.2rem] overflow-hidden pointer-events-none">
            <div className="phone-glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 z-50 pointer-events-none -translate-x-[100%] skew-x-12 opacity-0 mix-blend-overlay"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-40"></div>

            <div className="bg-[#008069] text-white px-3 py-4 pt-8 flex items-center justify-between shadow-sm z-30 relative">
              <div className="flex items-center gap-1.5">
                <ChevronLeft className="w-6 h-6 -ml-1" />
                <div className="w-9 h-9 bg-white rounded-full p-1 shrink-0 flex items-center justify-center">
                  <span className="text-[#FF6B00] font-bold text-xs italic tracking-tighter">QQ</span>
                </div>
                <div className="ml-1 leading-tight">
                  <div className="font-semibold text-[15px]">Quiqee Delivery</div>
                  <div className="text-[11px] text-white/80">Online</div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
          </div>

          {/* Chat Parallax Layer */}
          <div className="chat-parallax-layer absolute inset-[10px] p-4 flex flex-col gap-3 z-50 pt-24 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            
            <div className="text-[11px] text-gray-500 text-center uppercase tracking-wider mb-2 font-medium bg-white/60 backdrop-blur-md rounded-lg w-fit mx-auto px-3 py-1 shadow-sm">
              Today
            </div>

            <div className="msg-user self-end bg-[#d9fdd3] text-[#111b21] rounded-2xl rounded-tr-sm px-3 pt-2 pb-3 max-w-[85%] shadow-xl relative text-[15px] leading-[1.3] border border-black/5">
              Hi, I need 1kg chicken, 2 liters of milk, and french fries.
              <div className="text-[10px] text-gray-500 text-right mt-1 -mb-1 flex justify-end items-center gap-1">
                10:42 AM
                <svg viewBox="0 0 16 15" width="16" height="15" className="fill-blue-500"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
              </div>
            </div>

            <div className="h-2"></div>

            <div className="msg-typing absolute bottom-[100px] left-4 self-start bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-xl flex items-center gap-1.5 border border-black/5">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>

            <div className="msg-quiqee self-start bg-white text-[#111b21] rounded-2xl rounded-tl-sm px-3 pt-2 pb-3 max-w-[85%] shadow-xl relative text-[15px] leading-[1.3] absolute bottom-[20px] border border-black/5">
              Got it! Total is <span className="font-semibold">₹450</span>. Delivering to your address in 22 minutes.
              <div className="text-[10px] text-gray-400 text-right mt-1 -mb-1">
                10:43 AM
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}