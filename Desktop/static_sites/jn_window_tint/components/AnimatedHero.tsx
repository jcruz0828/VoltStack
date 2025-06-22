'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, Shield, Clock, Users } from 'lucide-react'

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

const trustIndicatorVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  }
}

export default function AnimatedHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div 
        className="relative container-max section-padding"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Professional Window Tinting Services
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 text-primary-100 leading-relaxed"
            variants={itemVariants}
          >
            Transform your vehicle with premium tinting solutions. 
            Expert installation, quality materials, and lifetime warranty.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/quote" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-block">
                Get Free Quote
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/gallery" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-block">
                View Gallery
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            <motion.div 
              className="flex flex-col items-center"
              variants={trustIndicatorVariants}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="bg-white/20 rounded-full p-3 mb-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Clock className="h-6 w-6" />
              </motion.div>
              <span className="text-sm font-medium">10+ Years</span>
              <span className="text-xs text-primary-200">Experience</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center"
              variants={trustIndicatorVariants}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="bg-white/20 rounded-full p-3 mb-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Users className="h-6 w-6" />
              </motion.div>
              <span className="text-sm font-medium">1000+</span>
              <span className="text-xs text-primary-200">Happy Customers</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center"
              variants={trustIndicatorVariants}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="bg-white/20 rounded-full p-3 mb-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Shield className="h-6 w-6" />
              </motion.div>
              <span className="text-sm font-medium">Lifetime</span>
              <span className="text-xs text-primary-200">Warranty</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center"
              variants={trustIndicatorVariants}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="bg-white/20 rounded-full p-3 mb-2"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Star className="h-6 w-6" />
              </motion.div>
              <span className="text-sm font-medium">5.0</span>
              <span className="text-xs text-primary-200">Star Rating</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
} 