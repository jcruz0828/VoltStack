import Link from 'next/link'
import { Car, Home, Building, Shield } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  startingPrice: string
  icon: React.ReactNode
  href: string
}

export default function ServiceCard({ title, description, startingPrice, icon, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="text-center">
        <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <div className="text-primary-600">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        <div className="text-2xl font-bold text-primary-600 mb-4">
          Starting at {startingPrice}
        </div>
        <Link 
          href={href}
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Learn More
        </Link>
      </div>
    </div>
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