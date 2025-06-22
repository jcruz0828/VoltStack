'use client'

import { motion } from 'framer-motion'
import { Shield, Car, Home, Building, Star, CheckCircle } from 'lucide-react'

const services = [
  {
    id: 'automotive',
    title: 'Automotive Window Tinting',
    icon: Car,
    description: 'Professional automotive window tinting services for all vehicle types',
    features: [
      'UV protection up to 99%',
      'Heat rejection technology',
      'Privacy enhancement',
      'Lifetime warranty',
      'Professional installation',
      'Legal compliance'
    ],
    benefits: [
      'Reduces interior heat by up to 60%',
      'Protects upholstery from fading',
      'Improves fuel efficiency',
      'Enhances vehicle aesthetics'
    ]
  },
  {
    id: 'residential',
    title: 'Residential Window Tinting',
    icon: Home,
    description: 'Transform your home with energy-efficient window tinting solutions',
    features: [
      'Energy savings up to 30%',
      'UV protection for furniture',
      'Glare reduction',
      'Privacy options',
      'Custom sizing',
      'Professional installation'
    ],
    benefits: [
      'Lower energy bills',
      'Protects furniture and flooring',
      'Reduces eye strain',
      'Increases home comfort'
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial Window Tinting',
    icon: Building,
    description: 'Professional window tinting for businesses and commercial properties',
    features: [
      'Large-scale installations',
      'Energy efficiency solutions',
      'Brand customization',
      'Minimal disruption',
      'After-hours service',
      'Maintenance programs'
    ],
    benefits: [
      'Reduces operating costs',
      'Improves employee comfort',
      'Enhances building aesthetics',
      'Increases property value'
    ]
  },
  {
    id: 'security',
    title: 'Security Film Installation',
    icon: Shield,
    description: 'Advanced security film solutions for enhanced protection',
    features: [
      'Impact resistance',
      'Break-in prevention',
      'Hurricane protection',
      'Blast mitigation',
      'Custom thickness options',
      'Professional certification'
    ],
    benefits: [
      'Protects against forced entry',
      'Reduces injury from glass shards',
      'Meets building codes',
      'Insurance premium reductions'
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Window Tinting Services
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              From automotive to commercial, we provide premium window tinting solutions 
              with unmatched quality and customer service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                id={service.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <service.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Features
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JN Window Tint?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering exceptional results with every installation
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Expert Installation',
                description: 'Our certified technicians have years of experience and use only the highest quality materials.',
                icon: '🏆'
              },
              {
                title: 'Lifetime Warranty',
                description: 'We stand behind our work with comprehensive warranties on all installations.',
                icon: '🛡️'
              },
              {
                title: 'Competitive Pricing',
                description: 'Get premium window tinting services at competitive prices with no hidden fees.',
                icon: '💰'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote on your window tinting project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-secondary text-lg px-8 py-3"
              >
                Get Free Quote
              </a>
              <a
                href="tel:5551234567"
                className="btn-outline text-lg px-8 py-3"
              >
                Call Now: (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 