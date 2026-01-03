/**
 * Database Connection
 * 
 * Neon PostgreSQL connection using Neon serverless client directly
 */

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Create Neon serverless client
export const sql = neon(process.env.DATABASE_URL);

// Helper function to execute queries with parameters
export async function query<T = any>(
  queryText: string,
  params: any[] = []
): Promise<T[]> {
  try {
    // Neon client handles parameterized queries
    const results = await sql(queryText, params);
    return results as T[];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Helper function for single row queries
export async function queryOne<T = any>(
  queryText: string,
  params: any[] = []
): Promise<T | null> {
  try {
    const results = await query<T>(queryText, params);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error("Database queryOne error:", error);
    throw error;
  }
}

// Helper function for executing queries (insert, update, delete)
export async function execute(
  queryText: string,
  params: any[] = []
): Promise<{ rowCount: number }> {
  try {
    const results = await sql(queryText, params);
    return { rowCount: Array.isArray(results) ? results.length : 1 };
  } catch (error) {
    console.error("Database execute error:", error);
    throw error;
  }
}
