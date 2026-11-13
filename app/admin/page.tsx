'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [photos, setPhotos] = useState<PhotoWithCategory[]>(portfolioItems);
  const [selectedFeatured, setSelectedFeatured] = useState<string[]>(
    portfolioItems.filter((p) => p.featured).map((p) => p.id)
  );
  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      alert('❌ Incorrect password');
      setPasswordInput('');
    }
  };

  const updateCategory = (id: string, category: PhotoCategory) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, category } : p))
    );
  };

  const updateTitle = (id: string, title: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title } : p))
    );
  };

  const updateDescription = (id: string, description: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, description } : p))
    );
  };

  const deletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setDeletedPhotos((prev) => [...prev, id]);
    // Also remove from featured if it was selected
    setSelectedFeatured((prev) => prev.filter((pid) => pid !== id));
  };

  const toggleFeatured = (id: string) => {
    setSelectedFeatured((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const generateCode = () => {
    const code = `export type PhotoCategory = 'concert' | 'landscape' | 'art' | 'professional' | 'family' | 'other';

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

  // Password gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal to-charcoal-light flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                <span className="text-teal-light">T</span>
                <span className="text-emerald-light">A</span>
                <span className="text-orange">Photo</span>
              </h1>
              <p className="text-charcoal-light text-sm">Admin Panel</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Enter Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-charcoal-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-light"
                  autoFocus
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-teal-light text-white py-2 rounded-lg hover:bg-teal transition font-medium"
              >
                Access Admin Panel
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-charcoal-light/10">
              <Link 
                href="/" 
                className="text-sm text-teal-light hover:text-emerald-light transition flex items-center justify-center gap-2"
              >
                ← Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-bg">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-teal-light">Photo Organizer</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1 text-sm text-charcoal-light hover:text-orange transition"
            >
              🚪 Logout
            </button>
          </div>
          <p className="text-charcoal-light mb-4">
            Edit titles, descriptions, categories, and mark featured photos. {selectedFeatured.length} / 5 featured. {photos.length} photos total.
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

      {/* Warning Box */}
      {deletedPhotos.length > 0 && (
        <div className="bg-orange-100 border-l-4 border-orange-500 p-6 max-w-7xl mx-auto m-6">
          <h3 className="text-lg font-bold text-orange-800 mb-2">📝 Important: Deletion Workflow</h3>
          <p className="text-orange-900 mb-3">
            You've marked <strong>{deletedPhotos.length}</strong> photo(s) for deletion. To complete the removal:
          </p>
          <ol className="list-decimal list-inside text-orange-900 space-y-2 mb-4">
            <li><strong>Copy or Download</strong> the updated code below</li>
            <li><strong>Replace</strong> the contents of <code className="bg-orange-50 px-2 py-1 rounded">lib/portfolio.ts</code></li>
            <li><strong>Delete the image files</strong> from <code className="bg-orange-50 px-2 py-1 rounded">public/portfolio/</code>:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                {deletedPhotos.map((id) => {
                  const photo = portfolioItems.find((p) => p.id === id);
                  return (
                    <li key={id} className="font-mono text-sm">
                      {photo?.image}
                    </li>
                  );
                })}
              </ul>
            </li>
            <li><strong>Commit and push</strong> to GitHub (Vercel auto-deploys)</li>
          </ol>
        </div>
      )}

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-0">
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
                <div className="p-4 flex flex-col justify-between">
                  {/* Title Input */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-charcoal-light mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={photo.title}
                      onChange={(e) => updateTitle(photo.id, e.target.value)}
                      className="w-full px-2 py-1 border border-charcoal/20 rounded text-sm bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-teal-light"
                      placeholder="Photo title"
                    />
                  </div>

                  {/* Description Input */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-charcoal-light mb-1">
                      Description
                    </label>
                    <textarea
                      value={photo.description}
                      onChange={(e) => updateDescription(photo.id, e.target.value)}
                      className="w-full px-2 py-1 border border-charcoal/20 rounded text-xs bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-teal-light resize-none"
                      placeholder="Photo description"
                      rows={3}
                    />
                  </div>

                  {/* Category Select */}
                  <div className="mb-3">
                    <label className="block text-xs font-semibold text-charcoal-light mb-1">
                      Category
                    </label>
                    <select
                      value={photo.category}
                      onChange={(e) => updateCategory(photo.id, e.target.value as PhotoCategory)}
                      className="w-full px-2 py-1 border border-charcoal/20 rounded text-xs bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-teal-light"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {categoryLabels[cat]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Featured Toggle */}
                  <div className="mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFeatured.includes(photo.id)}
                        onChange={() => toggleFeatured(photo.id)}
                        disabled={selectedFeatured.length >= 5 && !selectedFeatured.includes(photo.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-xs font-semibold">
                        Featured {selectedFeatured.includes(photo.id) && '✓'}
                      </span>
                    </label>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="w-full px-3 py-2 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-charcoal-light text-lg">All photos deleted. Copy the code below to update your portfolio!</p>
          </div>
        )}

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
