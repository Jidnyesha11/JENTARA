import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Jentara Apparel - Premium Streetwear',
  description:
    'Modern streetwear with perfect oversized fit, high quality fabric, and authentic style. Star of the new generation.',
  keywords: [
    'streetwear',
    'oversized tee',
    'fashion',
    'apparel',
    'modern clothing',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jentara.in',
    title: 'Jentara Apparel',
    description: 'Star of the new generation',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col bg-white text-neutral-900">
        <Footer />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}