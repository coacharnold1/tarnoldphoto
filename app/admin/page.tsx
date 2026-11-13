'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { portfolioItems, type PhotoCategory } from '@/lib/portfolio';

type PhotoWithCategory = {
  id: string;
  slug: string;
  title: string;
  image: string;
  description: string;
  date: string;
  category: PhotoCategory;
  featured: boolean;
};

const categories: PhotoCategory[] = ['concert', 'landscape', 'art', 'professional', 'family', 'other'];
const categoryLabels: Record<PhotoCategory, string> = {
  concert: 'Concert',
  landscape: 'Landscape',
  art: 'Art',
  professional: 'Professional',
  family: 'Family',
  other: 'Other',
};

export default function AdminPage() {
  const [photos, setPhotos] = useState<PhotoWithCategory[]>(portfolioItems);
  const [selectedFeatured, setSelectedFeatured] = useState<string[]>(
    portfolioItems.filter((p) => p.featured).map((p) => p.id)
  );

  const updateCategory = (id: string, category: PhotoCategory) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, category } : p))
    );
  };

  const toggleFeatured = (id: string) => {
    setSelectedFeatured((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const generateCode = () => {
    const code = `import { Photo, PhotoCategory } from '@/types';

export type PhotoItem = {
  id: string;
  slug: string;
  title: string;
  image: string;
  description: string;
  date: string;
  category: PhotoCategory;
  featured: boolean;
};

export type PhotoCategory = 'concert' | 'landscape' | 'art' | 'professional' | 'family' | 'other';

export const categoryLabels: Record<PhotoCategory, string> = {
  concert: 'Concert',
  landscape: 'Landscape',
  art: 'Art',
  professional: 'Professional',
  family: 'Family',
  other: 'Other',
};

export const portfolioItems: PhotoItem[] = [
${photos
  .map(
    (photo) => `  {
    id: '${photo.id}',
    slug: '${photo.slug}',
    title: '${photo.title.replace(/'/g, "\\'")}',
    image: '${photo.image}',
    description: '${photo.description.replace(/'/g, "\\'")}',
    date: '${photo.date}',
    category: '${photo.category}',
    featured: ${selectedFeatured.includes(photo.id)},
  },`
  )
  .join('\n')}
];

export function getPhotosByCategory(category: PhotoCategory): PhotoItem[] {
  return portfolioItems.filter((p) => p.category === category);
}

export function getFeaturedPhotos(): PhotoItem[] {
  return portfolioItems.filter((p) => p.featured).slice(0, 5);
}`;
    return code;
  };

  const handleDownload = () => {
    const code = generateCode();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', 'portfolio.ts');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCode());
    alert('Code copied to clipboard!');
  };

  const categoryCounts = useMemo(() => {
    return categories.reduce(
      (acc, cat) => {
        acc[cat] = photos.filter((p) => p.category === cat).length;
        return acc;
      },
      {} as Record<PhotoCategory, number>
    );
  }, [photos]);

  return (
    <div className="min-h-screen bg-charcoal-bg">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-teal-light mb-4">Photo Organizer</h1>
          <p className="text-charcoal-light mb-4">
            Assign photos to categories and mark featured photos. {selectedFeatured.length} / 5 featured.
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 bg-teal-light text-white rounded-lg hover:shadow-lg transition"
            >
              Copy Code
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-emerald-light text-white rounded-lg hover:shadow-lg transition"
            >
              Download portfolio.ts
            </button>
          </div>
        </div>
      </div>

      {/* Category Summary */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((cat) => (
            <div key={cat} className="bg-white p-4 rounded-lg shadow text-center">
              <p className="text-2xl font-bold text-teal-light">{categoryCounts[cat]}</p>
              <p className="text-sm text-charcoal-light">{categoryLabels[cat]}</p>
            </div>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image */}
              <div className="relative aspect-square">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 truncate">{photo.title}</h3>
                <p className="text-sm text-charcoal-light mb-4 line-clamp-2">{photo.description}</p>

                {/* Category Select */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-charcoal-light mb-2">
                    Category
                  </label>
                  <select
                    value={photo.category}
                    onChange={(e) => updateCategory(photo.id, e.target.value as PhotoCategory)}
                    className="w-full px-3 py-2 border border-charcoal/20 rounded-lg bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-teal-light"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {categoryLabels[cat]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Featured Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFeatured.includes(photo.id)}
                    onChange={() => toggleFeatured(photo.id)}
                    disabled={selectedFeatured.length >= 5 && !selectedFeatured.includes(photo.id)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold">
                    Featured {selectedFeatured.includes(photo.id) && '✓'}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Code Preview */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Generated portfolio.ts</h2>
          <pre className="bg-charcoal-bg p-4 rounded-lg overflow-x-auto text-xs text-white max-h-96">
            <code>{generateCode()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
