import Image from 'next/image'

interface QuiqeeLogoProps {
  className?: string
  variant?: 'default' | 'white'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function QuiqeeLogo({ className = '', variant = 'default', size = 'md' }: QuiqeeLogoProps) {
  const sizeClasses = {
    sm: 'h-16',
    md: 'h-18',
    lg: 'h-18',
    xl: 'h-20'
  }
  
  // For white variant (footer, dark backgrounds), use SVG recreation
  if (variant === 'white') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <QuiqeeLogoSVG className={sizeClasses[size]} />
      </div>
    )
  }
  
  // Default: use the official logo image
  return (
    <div className={`flex items-center ${className}`}>
      <Image 
        src="/images/quiqee-logo-style1.png"
        alt="Quiqee - Fast Delivery"
        width={180}
        height={180}
        className={`${sizeClasses[size]} w-auto object-contain rounded-lg`}
        priority
      />
    </div>
  )
}

// White SVG version matching the official logo style for dark backgrounds
function QuiqeeLogoSVG({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 220 110" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Quiqee logo"
    >
      {/* Delivery box with house shape */}
      <g>
        {/* House body */}
        <rect x="30" y="20" width="32" height="26" rx="2" fill="white" />
        {/* Roof */}
        <polygon points="26,20 46,4 66,20" fill="white" />
        {/* Window */}
        <rect x="38" y="26" width="8" height="8" fill="#FF6B00" opacity="0.8" />
        <line x1="42" y1="26" x2="42" y2="34" stroke="white" strokeWidth="1.5" />
        <line x1="38" y1="30" x2="46" y2="30" stroke="white" strokeWidth="1.5" />
      </g>
      
      {/* Speed lines */}
      <line x1="2" y1="32" x2="20" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <line x1="6" y1="40" x2="22" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <line x1="10" y1="48" x2="24" y2="48" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      
      {/* Scooty body - Activa style */}
      <path 
        d="M48 46 C52 43 70 40 95 40 L120 40 C132 40 140 44 145 52 L148 60 C150 64 147 68 143 68 L52 68 C46 68 43 63 46 56 Z" 
        fill="white"
      />
      
      {/* Front panel */}
      <path 
        d="M120 40 C138 40 148 48 154 60 L154 68 L143 68 L142 55 C138 46 130 40 120 40"
        fill="white"
      />
      
      {/* Seat */}
      <ellipse cx="82" cy="38" rx="20" ry="5" fill="white" />
      
      {/* Handlebar */}
      <path d="M135 40 L152 22" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="156" cy="18" rx="10" ry="5" fill="white" />
      
      {/* Mirror */}
      <circle cx="166" cy="12" r="5" fill="white" />
      
      {/* Headlight with rays */}
      <ellipse cx="162" cy="48" rx="8" ry="10" fill="white" />
      <line x1="174" y1="38" x2="192" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <line x1="174" y1="48" x2="198" y2="48" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="174" y1="58" x2="192" y2="64" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      
      {/* Back wheel */}
      <circle cx="58" cy="72" r="16" fill="white" />
      <circle cx="58" cy="72" r="10" fill="#FF6B00" />
      <circle cx="58" cy="72" r="4" fill="white" />
      
      {/* Front wheel */}
      <circle cx="158" cy="72" r="16" fill="white" />
      <circle cx="158" cy="72" r="10" fill="#FF6B00" />
      <circle cx="158" cy="72" r="4" fill="white" />
      
      {/* QUIQEE text - matching official logo style */}
      <text 
        x="110" 
        y="102" 
        textAnchor="middle" 
        fill="white" 
        fontSize="26" 
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="2"
        style={{ fontStyle: 'italic' }}
      >
        QUIQEE
      </text>
    </svg>
  )
}
