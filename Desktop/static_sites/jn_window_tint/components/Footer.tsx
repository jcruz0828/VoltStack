import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">JN Window Tint</h3>
            <p className="text-gray-300 mb-4">
              Professional window tinting services for automotive, residential, and commercial applications.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Automotive Tinting
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Residential Tinting
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Commercial Tinting
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Security Film
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="h-4 w-4 mr-3 text-primary-400" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="h-4 w-4 mr-3 text-primary-400" />
                <span>info@jnwindowtint.com</span>
              </div>
              <div className="flex items-start justify-center md:justify-start">
                <MapPin className="h-4 w-4 mr-3 mt-1 text-primary-400 flex-shrink-0" />
                <span>123 Main Street<br />Your City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center justify-center md:justify-start">
                <Clock className="h-4 w-4 mr-3 text-primary-400" />
                <div>
                  <div>Monday - Friday</div>
                  <div className="text-sm">8:00 AM - 6:00 PM</div>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Clock className="h-4 w-4 mr-3 text-primary-400" />
                <div>
                  <div>Saturday</div>
                  <div className="text-sm">9:00 AM - 4:00 PM</div>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Clock className="h-4 w-4 mr-3 text-primary-400" />
                <div>
                  <div>Sunday</div>
                  <div className="text-sm">Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 JN Window Tint. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 