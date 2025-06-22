import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import EnhancedHeader from '@/components/EnhancedHeader'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JN Window Tint - Professional Window Tinting Services',
  description: 'Professional window tinting services for automotive, residential, and commercial applications. Quality work, competitive pricing, and lifetime warranty.',
  keywords: 'window tinting, automotive tinting, residential tinting, commercial tinting, security film, UV protection',
  authors: [{ name: 'JN Window Tint' }],
  openGraph: {
    title: 'JN Window Tint - Professional Window Tinting Services',
    description: 'Professional window tinting services for automotive, residential, and commercial applications.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JN Window Tint - Professional Tinting Services',
    description: 'Transform your vehicle or home with our premium window tinting services',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EnhancedHeader />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 