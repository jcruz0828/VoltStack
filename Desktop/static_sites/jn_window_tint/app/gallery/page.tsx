'use client'

import { motion } from 'framer-motion'
import { Filter, Car, Home, Building, Shield } from 'lucide-react'

const galleryItems = [
  {
    id: 1,
    title: 'Luxury Sedan Tinting',
    category: 'automotive',
    image: '/api/placeholder/400/300',
    description: 'Professional tinting on a luxury sedan with premium film'
  },
  {
    id: 2,
    title: 'SUV Window Tinting',
    category: 'automotive',
    image: '/api/placeholder/400/300',
    description: 'Complete SUV tinting with heat rejection technology'
  },
  {
    id: 3,
    title: 'Residential Living Room',
    category: 'residential',
    image: '/api/placeholder/400/300',
    description: 'Energy-efficient residential tinting for maximum comfort'
  },
  {
    id: 4,
    title: 'Kitchen Window Treatment',
    category: 'residential',
    image: '/api/placeholder/400/300',
    description: 'Custom kitchen window tinting with privacy features'
  },
  {
    id: 5,
    title: 'Office Building',
    category: 'commercial',
    image: '/api/placeholder/400/300',
    description: 'Large-scale commercial installation for energy savings'
  },
  {
    id: 6,
    title: 'Retail Store Front',
    category: 'commercial',
    image: '/api/placeholder/400/300',
    description: 'Professional retail store window tinting'
  },
  {
    id: 7,
    title: 'Security Film Installation',
    category: 'security',
    image: '/api/placeholder/400/300',
    description: 'High-security film for maximum protection'
  },
  {
    id: 8,
    title: 'Truck Window Tinting',
    category: 'automotive',
    image: '/api/placeholder/400/300',
    description: 'Heavy-duty truck with professional tinting'
  },
  {
    id: 9,
    title: 'Master Bedroom',
    category: 'residential',
    image: '/api/placeholder/400/300',
    description: 'Privacy-focused bedroom window treatment'
  }
]

const categories = [
  { id: 'all', name: 'All Work', icon: Filter },
  { id: 'automotive', name: 'Automotive', icon: Car },
  { id: 'residential', name: 'Residential', icon: Home },
  { id: 'commercial', name: 'Commercial', icon: Building },
  { id: 'security', name: 'Security', icon: Shield }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export default function GalleryPage() {
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
              Our Work Gallery
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Browse through our portfolio of professional window tinting installations 
              across automotive, residential, and commercial projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-lg transition-colors duration-200"
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                    <div className="w-full h-64 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Image Placeholder</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-opacity duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      Learn More →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
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
              Our Track Record
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Years of experience and thousands of satisfied customers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { number: '500+', label: 'Vehicles Tinted' },
              { number: '200+', label: 'Homes Completed' },
              { number: '50+', label: 'Commercial Projects' },
              { number: '100%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
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
              Ready to Transform Your Windows?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join our satisfied customers and experience the difference professional 
              window tinting can make.
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