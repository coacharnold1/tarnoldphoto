export type PhotoCategory = "concert" | "landscape" | "art" | "professional" | "family" | "other";

export interface PhotoItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: PhotoCategory;
  image: string;
  thumbnail?: string;
  date: string;
  location?: string;
  featured?: boolean;
}

export const categoryLabels: Record<PhotoCategory, string> = {
  concert: "Concert Photography",
  landscape: "Landscapes",
  art: "Art & Abstract",
  professional: "Professional Work",
  family: "Family & Personal",
  other: "Other",
};

export const categoryColors: Record<PhotoCategory, string> = {
  concert: "bg-orange-light",
  landscape: "bg-emerald-light",
  art: "bg-teal-light",
  professional: "bg-orange",
  family: "bg-emerald",
  other: "bg-teal",
};

// Sample portfolio items - replace with real content
export const portfolioItems: PhotoItem[] = [
  {
    id: "1",
    slug: "concert-energy",
    title: "Concert Energy",
    description: "Capturing the raw energy of live performance",
    category: "concert",
    image: "/portfolio/concert-1.jpg",
    date: "2025-08-15",
    featured: true,
  },
  {
    id: "2",
    slug: "mountain-sunrise",
    title: "Mountain Sunrise",
    description: "Golden hour in the peaks",
    category: "landscape",
    image: "/portfolio/landscape-1.jpg",
    date: "2025-07-22",
    featured: true,
  },
  {
    id: "3",
    slug: "abstract-light",
    title: "Abstract Light",
    description: "Playing with color and form",
    category: "art",
    image: "/portfolio/art-1.jpg",
    date: "2025-06-10",
    featured: true,
  },
  {
    id: "4",
    slug: "team-media-day",
    title: "Team Media Day",
    description: "Professional sports photography",
    category: "professional",
    image: "/portfolio/pro-1.jpg",
    date: "2025-05-30",
  },
  {
    id: "5",
    slug: "family-moments",
    title: "Family Moments",
    description: "Candid family gathering",
    category: "family",
    image: "/portfolio/family-1.jpg",
    date: "2025-04-20",
  },
];

export function getPhotosByCategory(category: PhotoCategory): PhotoItem[] {
  return portfolioItems.filter((item) => item.category === category);
}

export function getFeaturedPhotos(): PhotoItem[] {
  return portfolioItems.filter((item) => item.featured).slice(0, 6);
}

export function getPhotoBySlug(slug: string): PhotoItem | undefined {
  return portfolioItems.find((item) => item.slug === slug);
}
