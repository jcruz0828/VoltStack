'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  return (
    <motion.div 
      className={`flex items-center space-x-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Custom Logo Icon */}
      <div className="relative">
        <motion.div
          className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center shadow-lg"
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      {/* Text Logo */}
      <div className="flex flex-col">
        <span className={`font-bold text-gray-900 ${sizeClasses[size]} leading-none`}>
          JN
        </span>
        <span className={`font-semibold text-primary-600 ${size === 'sm' ? 'text-xs' : 'text-sm'} leading-none`}>
          WINDOW TINT
        </span>
      </div>
    </motion.div>
  )
} 