import { PrismaClient } from '@prisma/client'; // Your DB
import { externalPrisma } from '@/lib/external-prisma'; // External DB

async function main() {
  try {
    // Test your database
    const contactCount = await new PrismaClient().contact.count();
    console.log(`✅ Your DB: ${contactCount} contacts`);

    // Test external database
    const softwareCount = await externalPrisma.software.count();
    const categoryCount = await externalPrisma.category.count();
    console.log(`✅ External DB: ${softwareCount} software, ${categoryCount} categories`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();