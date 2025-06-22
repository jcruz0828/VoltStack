import ContactForm from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto">
            Ready to transform your windows? Get in touch with us for a free consultation 
            and quote. We're here to help with all your window tinting needs.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Location
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Stop by our shop to see our work in person and discuss your project with our team.
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map will be embedded here</p>
              <p className="text-sm text-gray-500 mt-2">123 Main Street, Your City, State 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our window tinting services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How long does window tinting take?
              </h3>
              <p className="text-gray-600">
                Most automotive tinting jobs take 2-4 hours, while residential projects can take 1-2 days depending on the size.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do you offer mobile service?
              </h3>
              <p className="text-gray-600">
                Yes, we offer mobile tinting services for residential and commercial projects within our service area.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What warranty do you provide?
              </h3>
              <p className="text-gray-600">
                We provide a lifetime warranty on all our window tinting work, covering bubbling, peeling, and discoloration.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I care for my tinted windows?
              </h3>
              <p className="text-gray-600">
                Avoid cleaning for 7 days after installation, then use mild soap and water. Avoid ammonia-based cleaners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Our team is ready to help you 
            choose the perfect window tinting solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:(555)123-4567" 
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
            <a 
              href="mailto:info@jnwindowtint.com" 
              className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 