/**
 * Neon Auth Server-Side Helpers
 * 
 * Server-side authentication helpers for API routes and server components
 * 
 * Note: This is a simplified implementation for Next.js 14.
 * For production, you should implement proper session verification with Neon Auth tokens.
 */

import { cookies } from "next/headers";
import { sql } from "./db";

// Get user from database based on session
export async function getUser() {
  try {
    // For now, we'll use a simple approach:
    // Check if there's a user ID in cookies or session
    // In a real implementation, you'd verify the Neon Auth session token
    
    const cookieStore = await cookies();
    const userId = cookieStore.get("neon-auth-user-id")?.value;
    
    if (!userId) {
      return null;
    }

    // Get user from database
    const user = await sql`
      SELECT id, email, name, phone, role, created_at
      FROM users
      WHERE id = ${userId}::uuid
    `;

    if (user.length === 0) {
      return null;
    }

    return {
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
      phone: user[0].phone,
      role: user[0].role,
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

// Get session (simplified for Next.js 14)
export async function getSession() {
  const user = await getUser();
  return user ? { user } : null;
}
