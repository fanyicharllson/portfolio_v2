// lib/external-prisma.ts
import { PrismaClient as ExternalPrismaClient } from '../prisma/generated/external';

if (!process.env.EXTERNAL_DATABASE_URL) {
  throw new Error('EXTERNAL_DATABASE_URL is not defined in environment variables');
}

export const externalPrisma = new ExternalPrismaClient({
  datasources: {
    externalDb: {
      url: process.env.EXTERNAL_DATABASE_URL,
    },
  },
});

// Optional: Log connection in development
if (process.env.NODE_ENV === 'development') {
  console.log('📡 External Prisma Client initialized with datasource: externalDb');
}

export default externalPrisma;