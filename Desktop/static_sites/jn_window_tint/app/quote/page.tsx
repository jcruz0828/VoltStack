'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Home, Building, Shield, Calculator, Phone, Mail } from 'lucide-react'

const serviceTypes = [
  { id: 'automotive', name: 'Automotive', icon: Car, description: 'Cars, trucks, SUVs, motorcycles' },
  { id: 'residential', name: 'Residential', icon: Home, description: 'Homes, apartments, condos' },
  { id: 'commercial', name: 'Commercial', icon: Building, description: 'Offices, retail, industrial' },
  { id: 'security', name: 'Security Film', icon: Shield, description: 'Protection and safety film' }
]

const vehicleTypes = [
  'Sedan', 'SUV', 'Truck', 'Van', 'Motorcycle', 'RV', 'Boat', 'Other'
]

const tintLevels = [
  { value: '5', label: '5% - Limo Tint (Very Dark)' },
  { value: '15', label: '15% - Dark Tint' },
  { value: '20', label: '20% - Medium Dark' },
  { value: '35', label: '35% - Medium' },
  { value: '50', label: '50% - Light' },
  { value: '70', label: '70% - Very Light' }
]

export default function QuotePage() {
  const [formData, setFormData] = useState({
    serviceType: '',
    vehicleType: '',
    tintLevel: '',
    numberOfWindows: '',
    projectSize: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    message: '',
    urgency: 'normal',
    preferredContact: 'phone'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Quote request submitted:', formData)
    // Here you would typically send the data to your backend
  }

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
              Get Your Free Quote
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Professional window tinting estimates tailored to your specific needs. 
              No obligation, just honest pricing from experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Project Details
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Service Type *
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {serviceTypes.map((service) => (
                        <label
                          key={service.id}
                          className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.serviceType === service.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="serviceType"
                            value={service.id}
                            checked={formData.serviceType === service.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <service.icon className="w-6 h-6 text-primary-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Type (for automotive) */}
                  {formData.serviceType === 'automotive' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Type
                      </label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select vehicle type</option>
                        {vehicleTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Tint Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Tint Level
                    </label>
                    <select
                      name="tintLevel"
                      value={formData.tintLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select tint level</option>
                      {tintLevels.map((level) => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project Size */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Windows
                      </label>
                      <input
                        type="number"
                        name="numberOfWindows"
                        value={formData.numberOfWindows}
                        onChange={handleInputChange}
                        placeholder="e.g., 4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Size
                      </label>
                      <select
                        name="projectSize"
                        value={formData.projectSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select size</option>
                        <option value="small">Small (1-5 windows)</option>
                        <option value="medium">Medium (6-15 windows)</option>
                        <option value="large">Large (16+ windows)</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Project Location
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Additional Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Description
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us more about your project, special requirements, or any questions you have..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project Urgency
                          </label>
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="low">Low - No rush</option>
                            <option value="normal">Normal - Within 2 weeks</option>
                            <option value="high">High - Within 1 week</option>
                            <option value="urgent">Urgent - ASAP</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Contact Method
                          </label>
                          <select
                            name="preferredContact"
                            value={formData.preferredContact}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="phone">Phone</option>
                            <option value="email">Email</option>
                            <option value="text">Text Message</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    Get Free Quote
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Contact Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Get in Touch
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-primary-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">(555) 123-4567</div>
                        <div className="text-sm text-gray-500">Call us anytime</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-primary-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">info@jnwindowtint.com</div>
                        <div className="text-sm text-gray-500">Email us</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Why Choose Us?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calculator className="w-5 h-5 text-primary-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Free Estimates</div>
                        <div className="text-sm text-gray-500">No obligation quotes</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-primary-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Lifetime Warranty</div>
                        <div className="text-sm text-gray-500">Guaranteed quality</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Car className="w-5 h-5 text-primary-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Mobile Service</div>
                        <div className="text-sm text-gray-500">We come to you</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-primary-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">
                    Quick Tips
                  </h3>
                  <div className="space-y-3 text-sm text-primary-800">
                    <div>• Measure your windows for accurate estimates</div>
                    <div>• Consider your local tinting laws</div>
                    <div>• Think about privacy vs. visibility needs</div>
                    <div>• Ask about warranty coverage</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 