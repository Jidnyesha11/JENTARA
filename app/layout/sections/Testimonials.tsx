import React from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Aarav Kumar',
    role: 'Customer',
    content:
      'The oversized fit is perfect! Great quality and the printing is so crisp. Highly recommend Jentara.',
    rating: 5,
    image: '👨‍💼',
  },
  {
    name: 'Priya Sharma',
    role: 'Fashion Enthusiast',
    content:
      'Love the minimalist design and premium fabric. This is my go-to brand for everyday wear.',
    rating: 5,
    image: '👩‍🦰',
  },
  {
    name: 'Rohan Singh',
    role: 'Streetwear Fan',
    content:
      'Amazing collection with authentic style. The customer service is top-notch too!',
    rating: 5,
    image: '👨‍🎨',
  },
  {
    name: 'Neha Patel',
    role: 'Lifestyle Blogger',
    content:
      'Jentara has become my favorite brand. Perfect for modern streetwear aesthetics.',
    rating: 5,
    image: '👩‍💼',
  },
]

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition"
        >
          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          {/* Content */}
          <p className="text-neutral-700 mb-4 line-clamp-4">
            "{testimonial.content}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">{testimonial.image}</div>
            <div>
              <p className="font-semibold text-neutral-900">{testimonial.name}</p>
              <p className="text-sm text-neutral-600">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}