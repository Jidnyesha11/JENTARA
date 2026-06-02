import React from 'react'
import Link from 'next/link'
import { APP_CONFIG, NAVIGATION } from '@/lib/constants'
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-secondary-500 mb-3">
              {APP_CONFIG.name}
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
              {APP_CONFIG.tagline}
            </p>
            <p className="text-neutral-400 text-sm mb-6">
              Modern streetwear with perfect oversized fit and authentic style.
            </p>
            <div className="flex gap-4">
              
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-secondary-500 transition"
              >
                <Instagram size={20} />
              </a>
              
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-secondary-500 transition"
              >
                <Facebook size={20} />
              </a>
              
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-secondary-500 transition"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {NAVIGATION.footer.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 text-sm hover:text-secondary-500 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="border-t border-neutral-800 pt-8 mb-8">
          <h4 className="font-semibold text-white mb-4">Contact Us</h4>
          <div className="space-y-2 text-neutral-400 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              
                href={`mailto:${APP_CONFIG.email}`}
                className="hover:text-secondary-500 transition"
              >
                {APP_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              
                href={`tel:${APP_CONFIG.phone}`}
                className="hover:text-secondary-500 transition"
              >
                {APP_CONFIG.phone}
              </a>
            </div>
            <div className="mt-4">
              
                href={APP_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-500 hover:text-secondary-600 font-medium transition"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              &copy; {currentYear} {APP_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-neutral-400 text-sm">
              <span>100% Secure Payment</span>
              <span>Easy Returns</span>
              <span>Free Shipping on ₹999+</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}