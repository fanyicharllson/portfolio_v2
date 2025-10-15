// app/api/projects/route.ts
import { externalPrisma } from '@/lib/external-prisma';
import { Project, ProjectCategory } from '@/types/software';
import { NextResponse } from 'next/server';

// Map database category slugs to your ProjectCategory type
function mapCategorySlugToProjectCategory(slug: string): ProjectCategory {
  const categoryMap: Record<string, ProjectCategory> = {
    'web': 'web',
    'mobile': 'mobile',
    'mobile-apps': 'mobile',
    'android-app': 'android',
    'ios': 'mobile',
    'saas': 'saas',
    'microservice': 'microservice',
    'microservices': 'microservice',
  };

  return categoryMap[slug.toLowerCase()] || 'other';
}

function mapSoftwareToProject(software: {
  category: { id: string; name: string; slug: string; createdAt: Date; updatedAt: Date };
  id: string;
  version: string | null;
  name: string;
  slug: string;
  description: string;
  platform: string[];
  tags?: string[];
  imageUrl: string;
  webUrl: string | null;
  downloadUrl: string | null;
  price: number;
  featured: boolean;
  repoUrl: string | null;
}): Project {
  // ✅ USE DATABASE CATEGORY SLUG instead of platform array
  const category = mapCategorySlugToProjectCategory(software.category.slug);

  return {
    id: software.id,
    title: software.name,
    description: software.description,
    tags: software.tags || [],
    image: software.imageUrl,
    demoUrl: software.webUrl ?? software.downloadUrl ?? undefined,
    repoUrl: software.repoUrl ?? undefined,
    category, // Now uses actual DB category
    featured: software.featured,
    platform: software.platform,
    downloadUrl: software.downloadUrl ?? undefined,
    webUrl: software.webUrl ?? undefined,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    const where = featured ? { featured: true } : {};

    const projects = await externalPrisma.software.findMany({
      where,
      include: {
        category: true, // Include category data
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const mappedProjects = projects.map(mapSoftwareToProject);

    return NextResponse.json(mappedProjects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}