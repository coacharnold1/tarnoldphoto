'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categoryLabels, type PhotoCategory, getFeaturedPhotos, portfolioItems } from '@/lib/portfolio';

const categories: PhotoCategory[] = ['concert', 'landscape', 'art', 'professional', 'family', 'other'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | 'all'>('all');
  const featured = getFeaturedPhotos();
  
  const filtered = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-b from-charcoal-bg via-white to-charcoal-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-teal-light/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-teal-light">T</span>
            <span className="text-emerald-light">A</span>
            <span className="text-orange">Photo</span>
          </Link>
          <div className="flex gap-8">
            <Link href="#portfolio" className="hover:text-teal-light transition">Portfolio</Link>
            <Link href="#about" className="hover:text-teal-light transition">About</Link>
            <Link href="#contact" className="hover:text-teal-light transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-light opacity-20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-light opacity-20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-orange-light opacity-20 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="text-center z-10 px-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-teal-light">Moments</span>
            <br />
            <span className="text-emerald-light">That</span>
            <br />
            <span className="text-orange">Matter</span>
          </h1>
          <p className="text-xl md:text-2xl text-charcoal-light mb-8 max-w-2xl mx-auto">
            Photography across concert halls, landscapes, studios, and life itself
          </p>
          <Link 
            href="#portfolio"
            className="inline-block px-8 py-4 bg-gradient-to-r from-teal-light to-emerald-light text-white font-bold rounded-lg hover:shadow-lg hover:shadow-teal-light/50 transition-all transform hover:scale-105"
          >
            Explore Portfolio
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Featured <span className="text-teal-light">Work</span>
          </h2>
          <p className="text-center text-charcoal-light mb-16">Hand-picked photos that showcase versatility and passion</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-teal-light to-emerald-light overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-white text-center p-6 group-hover:scale-110 transition-transform duration-300">
                    <div>
                      <p className="text-sm opacity-75">{photo.category}</p>
                      <p className="text-xl font-bold">{photo.title}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="font-bold">{photo.title}</p>
                    <p className="text-sm text-gray-200">{photo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-charcoal-bg">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Complete <span className="text-emerald-light">Portfolio</span>
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-teal-light text-white shadow-lg'
                  : 'bg-white text-charcoal hover:bg-teal-light/10'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-light text-white shadow-lg'
                    : 'bg-white text-charcoal hover:bg-emerald-light/10'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((photo) => (
                <Link 
                  key={photo.id}
                  href={`/photo/${photo.slug}`}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 aspect-square"
                >
                  <div className="w-full h-full bg-gradient-to-br from-teal-light via-emerald-light to-orange-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-white z-10">
                      <p className="text-sm opacity-75 font-semibold">{categoryLabels[photo.category]}</p>
                      <p className="text-2xl font-bold mt-2">{photo.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-sm">{photo.date}</p>
                      <p className="text-lg font-bold mt-2">{photo.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-charcoal-light text-lg">No photos in this category yet</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-center">
            About <span className="text-orange">tarnoldphoto</span>
          </h2>
          <div className="space-y-6 text-charcoal-light leading-relaxed">
            <p className="text-lg">
              Welcome to my personal photography portfolio. These are the moments, places, and people that inspire me.
            </p>
            <p className="text-lg">
              From the raw energy of live concerts to the serenity of landscapes, from experimental art to professional work &mdash; art to professional work — this collection represents my journey as a photographer.
            </p>
            <p className="text-lg">
              Whether I&apos;m capturing raw emotion in a crowded venue, finding beauty in nature, or creating something abstract, each photo tells a story worth remembering.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-r from-teal-light/10 to-emerald-light/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Let&apos;s Connect</h2>
          <p className="text-charcoal-light text-lg mb-8">
            Interested in prints, collaborations, or just want to chat about photography?
          </p>
          <a 
            href="mailto:contact@tarnoldphoto.com"
            className="inline-block px-8 py-4 bg-orange text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange/50 transition-all transform hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-charcoal-light">© 2026 tarnoldphoto. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
