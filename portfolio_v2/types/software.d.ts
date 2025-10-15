export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Software {
  id: string;
  name: string;
  slug: string;
  description: string;
  version: string | null;
  platform: string[];
  price: number;
  imageUrl: string;
  downloadUrl: string;
  featured: boolean;
  categoryId: string;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
  webUrl?: string;
  tags?: string[];
  repoUrl?: string;
}

// Transform Software to match your Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  category: ProjectCategory;
  featured?: boolean;
  platform?: string[];
  downloadUrl?: string;
  webUrl?: string;
}

export type ProjectCategory = 'all' | 'web' | 'mobile' | 'saas' | 'microservice' | 'android' | 'other';