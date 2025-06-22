'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Car, Home, Building, Shield } from 'lucide-react'

interface AnimatedServiceCardProps {
  title: string
  description: string
  startingPrice: string
  icon: React.ReactNode
  href: string
  index: number
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

export default function AnimatedServiceCard({ 
  title, 
  description, 
  startingPrice, 
  icon, 
  href, 
  index 
}: AnimatedServiceCardProps) {
  return (
    <motion.div
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
            {icon}
          </div>
        </motion.div>
        
        <motion.h3 
          className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-700 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {title}
        </motion.h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
        
        <motion.div 
          className="text-2xl font-bold text-primary-600 mb-4 group-hover:text-primary-700 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Starting at {startingPrice}
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href={href}
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Service data
export const services = [
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