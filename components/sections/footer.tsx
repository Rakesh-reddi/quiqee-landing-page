import Image from 'next/image'
import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react'

const WHATSAPP_LINK = 'https://wa.me/919398086639?text=Hi'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Brand - Official Logo */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image 
                src="/images/quiqee-logo.jpeg"
                alt="Quiqee - Fast Delivery"
                width={200}
                height={200}
                className="h-20 w-auto object-contain rounded-xl"
                priority
              />
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm mb-8">
              WhatsApp-based hyperlocal delivery service. Order anything from nearby stores and get it delivered fast.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/30"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with us on WhatsApp
            </a>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
            <ul className="space-y-5">
              <li>
                <a 
                  href={WHATSAPP_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <Phone className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>+91 93980 86639</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <span>Serving Mokila & nearby areas</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Clock className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <span>Open 8 AM - 10 PM daily</span>
              </li>
            </ul>
          </div>

          {/* We Deliver */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">We Deliver</h3>
            <div className="flex flex-wrap gap-2.5">
              {['Food', 'Groceries', 'Medicines', 'Meat', 'Essentials'].map((item) => (
                <span 
                  key={item}
                  className="bg-gray-800 hover:bg-[#FF6B00] px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-200 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
            
            {/* Additional info */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-500 leading-relaxed">
                No app needed. Just WhatsApp us your order and we will handle the rest.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {currentYear} Quiqee. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Made with <span className="text-[#FF6B00] text-base">&#9829;</span> for Mokila
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
