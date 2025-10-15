// test-table-names.ts
// Run this to find the actual table names in your external database

import { externalPrisma } from '@/lib/external-prisma';

async function findTableNames() {
  try {
    console.log('🔍 Searching for tables in external database...\n');

    // Query information_schema to find all tables
    const tables = await externalPrisma.$queryRaw<
      Array<{ table_schema: string; table_name: string }>
    >`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    if (tables.length === 0) {
      console.log('❌ No tables found in public schema');
      console.log('   Check if you\'re connected to the right database');
      return;
    }

    console.log('✅ Found tables in public schema:\n');
    tables.forEach((table) => {
      console.log(`   📋 ${table.table_name}`);
    });

    console.log('\n---\n');

    // Get columns for each table
    for (const table of tables) {
      const columns = await externalPrisma.$queryRaw<
        Array<{ column_name: string; data_type: string; is_nullable: string }>
      >`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = ${table.table_name}
        ORDER BY ordinal_position
      `;

      console.log(`\n📊 Table: ${table.table_name}`);
      console.log('   Columns:');
      columns.forEach((col) => {
        const nullable = col.is_nullable === 'YES' ? '(nullable)' : '(required)';
        console.log(`     • ${col.column_name}: ${col.data_type} ${nullable}`);
      });
    }

    await externalPrisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

findTableNames();