'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Award, Clock, Users, Car, Home, Building, Shield } from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  }
}

// Service data
const services = [
  {
    title: 'Automotive Tinting',
    description: 'Professional car, truck, and SUV window tinting with premium films and expert installation.',
    startingPrice: '$150',
    icon: <Car className="h-8 w-8" />,
    href: '/services#automotive'
  },
  {
    title: 'Residential Tinting',
    description: 'Home window tinting for privacy, energy efficiency, and UV protection.',
    startingPrice: '$200',
    icon: <Home className="h-8 w-8" />,
    href: '/services#residential'
  },
  {
    title: 'Commercial Tinting',
    description: 'Business and office window tinting solutions for professional environments.',
    startingPrice: '$300',
    icon: <Building className="h-8 w-8" />,
    href: '/services#commercial'
  },
  {
    title: 'Security Film',
    description: 'Safety and security window film installation for enhanced protection.',
    startingPrice: '$400',
    icon: <Shield className="h-8 w-8" />,
    href: '/services#security'
  }
]

export function AnimatedServicesSection() {
  return (
    <section className="section-padding bg-gray-50">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Professional window tinting solutions for all your needs. Quality work, competitive pricing, and lifetime warranty.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative text-center">
                <motion.div 
                  className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300"
                  variants={iconVariants}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                >
                  <div className="text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                    {service.icon}
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {service.title}
                </motion.h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
                
                <motion.div 
                  className="text-2xl font-bold text-primary-600 mb-4 group-hover:text-primary-700 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  Starting at {service.startingPrice}
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={service.href}
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export function AnimatedWhyChooseUsSection() {
  return (
    <section className="section-padding bg-white">
      <motion.div 
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose JN Window Tint?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering exceptional results with every installation
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          <motion.div 
            className="flex items-start"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <motion.div 
              className="bg-primary-100 rounded-full p-4 flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Award className="h-8 w-8 text-primary-600" />
            </motion.div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors duration-300">Expert Installation</h3>
              <p className="text-gray-600">Certified technicians with years of experience in professional window tinting.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <motion.div 
              className="bg-primary-100 rounded-full p-4 flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle className="h-8 w-8 text-primary-600" />
            </motion.div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors duration-300">Premium Materials</h3>
              <p className="text-gray-600">High-quality films with lifetime warranty and superior performance.</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <motion.div 
              className="bg-primary-100 rounded-full p-4 flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Clock className="h-8 w-8 text-primary-600" />
            </motion.div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors duration-300">Efficient Service</h3>
              <p className="text-gray-600">Fast and reliable service to get you back on the road in no time.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export function AnimatedCTASection() {
  return (
    <section className="section-padding bg-primary-600">
      <motion.div 
        className="container-max text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-base sm:text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
          Contact us today for a free consultation and quote. Our team is ready to help you choose the perfect window tinting solution.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/quote"
            className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
          >
            Get Free Quote
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
} 