// app/api/projects/counts/route.ts
import { externalPrisma } from "@/lib/external-prisma";
import { ProjectCategory } from "@/types/software";
import { NextResponse } from "next/server";

// Map database category slugs to your ProjectCategory type
function mapCategorySlugToProjectCategory(slug: string): ProjectCategory {
  const categoryMap: Record<string, ProjectCategory> = {
    'web': 'web',
    'mobile': 'mobile',
    'mobile-apps': 'mobile',
    'android': 'android',
    'ios': 'mobile',
    'saas': 'saas',
    'microservice': 'microservice',
    'microservices': 'microservice',
  };

  return categoryMap[slug.toLowerCase()] || 'other';
}

export async function GET() {
  try {
    // ✅ Fetch with category included
    const projects = await externalPrisma.software.findMany({
      include: {
        category: true,
      },
    });

    const counts: Record<ProjectCategory, number> = {
      all: projects.length,
      web: 0,
      mobile: 0,
      saas: 0,
      microservice: 0,
      android: 0,
      other: 0,
    };

    // ✅ Count based on category slug from database
    projects.forEach((project) => {
      const category = mapCategorySlugToProjectCategory(project.category.slug);
      counts[category]++;
    });

    return NextResponse.json(counts);
  } catch (error) {
    console.error("Failed to fetch project counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch project counts" },
      { status: 500 }
    );
  }
}