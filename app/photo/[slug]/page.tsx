import Image from 'next/image';
import Link from 'next/link';
import { portfolioItems, categoryLabels } from '@/lib/portfolio';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return portfolioItems.map((photo) => ({
    slug: photo.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const photo = portfolioItems.find((p) => p.slug === slug);

  if (!photo) {
    return {};
  }

  return {
    title: photo.title,
    description: photo.description,
  };
}

export default async function PhotoPage({ 
  params,
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const photo = portfolioItems.find((p) => p.slug === slug);

  if (!photo) {
    notFound();
  }

  // Get related photos from same category
  const related = portfolioItems
    .filter((p) => p.category === photo.category && p.id !== photo.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-charcoal-bg text-charcoal">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-teal-light">
            tarnoldphoto
          </Link>
          <Link href="/#portfolio" className="hover:text-teal-light transition">
            Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* Photo Detail */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative aspect-video mb-8 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={photo.image}
              alt={photo.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              priority
            />
          </div>

          {/* Photo Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{photo.title}</h1>
              <p className="text-lg text-charcoal-light mb-6">{photo.description}</p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-charcoal-light/70">Category</p>
                  <p className="text-lg">{categoryLabels[photo.category]}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal-light/70">Date</p>
                  <p className="text-lg">{photo.date}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Photo Details</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-charcoal-light/70">Category</p>
                  <p>{categoryLabels[photo.category]}</p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal-light/70">Date</p>
                  <p>{photo.date}</p>
                </div>
                <Link
                  href="/#portfolio"
                  className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-teal-light to-emerald-light text-white font-semibold rounded-lg hover:shadow-lg transition"
                >
                  View All Photos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Photos */}
      {related.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">
              More <span className="text-teal-light">{categoryLabels[photo.category]}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((relatedPhoto) => (
                <Link
                  key={relatedPhoto.id}
                  href={`/photo/${relatedPhoto.slug}`}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all aspect-square"
                >
                  <Image
                    src={relatedPhoto.image}
                    alt={relatedPhoto.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {relatedPhoto.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-charcoal-bg border-t border-charcoal/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-charcoal-light/70">
          <p>&copy; 2025 Timothy Arnold Photography. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
