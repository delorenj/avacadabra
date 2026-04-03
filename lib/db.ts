import { Pool } from 'pg';

// Singleton pattern to reuse the pool across imports.
let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString = process.env.AVA_DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('AVA_DATABASE_URL (or DATABASE_URL) is not defined');
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}