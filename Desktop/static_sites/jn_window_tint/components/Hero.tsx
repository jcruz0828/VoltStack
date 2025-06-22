import Link from 'next/link'
import { Star, Shield, Clock, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative container-max section-padding">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Window Tinting Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 leading-relaxed">
            Transform your vehicle with premium tinting solutions. 
            Expert installation, quality materials, and lifetime warranty.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/quote" className="btn-primary text-lg px-8 py-4">
              Get Free Quote
            </Link>
            <Link href="/gallery" className="btn-secondary text-lg px-8 py-4">
              View Gallery
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">10+ Years</span>
              <span className="text-xs text-primary-200">Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 mb-2">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">1000+</span>
              <span className="text-xs text-primary-200">Happy Customers</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 mb-2">
                <Shield className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Lifetime</span>
              <span className="text-xs text-primary-200">Warranty</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 mb-2">
                <Star className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">5.0</span>
              <span className="text-xs text-primary-200">Star Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 