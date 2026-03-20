'use client'

import Image from "next/image";

export function AnimatedScooter({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full flex justify-center ${className}`}>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shadow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(0.9); opacity: 0.1; }
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        .shadow {
          animation: shadow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Container controls responsive size */}
      <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[700px]">
        
        {/* Shadow */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-4 sm:h-5 md:h-6 bg-black/20 blur-xl rounded-full shadow"></div>

        {/* Scooter Image */}
        <div className="float">
          <Image
            src="/images/scooter.png"
            alt="Quiqee Delivery Scooter"
            width={700}
            height={400}
            priority
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

      </div>
    </div>
  )
}