import { readdirSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const portfolioPath = join(process.cwd(), 'public/portfolio');
    
    // Read portfolio.ts to get existing images
    const portfolioModule = await import('@/lib/portfolio');
    const existingPaths = new Set(
      portfolioModule.portfolioItems.map((item: any) => item.image)
    );

    const categories = ['concert', 'landscape', 'art', 'professional', 'family', 'other'];
    const newPhotos: any[] = [];
    let nextId = Math.max(
      ...portfolioModule.portfolioItems.map((item: any) => parseInt(item.id))
    ) + 1;

    // Scan each category folder
    for (const category of categories) {
      const categoryPath = join(portfolioPath, category);
      try {
        const files = readdirSync(categoryPath);
        
        for (const file of files) {
          if (/\.(jpg|jpeg|png)$/i.test(file)) {
            const imagePath = `/portfolio/${category}/${file}`;
            
            // Check if already in portfolio
            if (!existingPaths.has(imagePath)) {
              const slug = file
                .replace(/\.[^/.]+$/, '')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

              newPhotos.push({
                id: String(nextId),
                slug,
                title: 'Untitled',
                description: '',
                date: new Date().toISOString().split('T')[0],
                image: imagePath,
                category,
                featured: false,
              });
              nextId++;
            }
          }
        }
      } catch (error) {
        // Category folder might not exist, skip
      }
    }

    return Response.json({ 
      success: true, 
      newPhotos,
      count: newPhotos.length 
    });
  } catch (error) {
    console.error('Error scanning photos:', error);
    return Response.json(
      { error: 'Failed to scan photos' },
      { status: 500 }
    );
  }
}
