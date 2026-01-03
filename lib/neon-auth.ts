/**
 * Neon Auth Client Configuration
 * 
 * Server and client-side authentication using Neon Auth
 */

"use client";

import { createAuthClient } from "@neondatabase/neon-js/auth";

if (!process.env.NEXT_PUBLIC_NEON_AUTH_URL) {
  console.warn("NEXT_PUBLIC_NEON_AUTH_URL is not set. Neon Auth will not work.");
}

export const authClient = createAuthClient(
  process.env.NEXT_PUBLIC_NEON_AUTH_URL || ""
);

// Server-side session helper (for API routes)
export async function getSession() {
  try {
    // In Next.js 14, we need to handle this differently
    // For now, we'll use cookies to get the session
    if (typeof window !== "undefined") {
      // Client-side: use authClient directly
      return await authClient.getSession();
    } else {
      // Server-side: we'll need to read from cookies
      // This is a simplified version - you may need to adjust based on your setup
      return null;
    }
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

// Server-side user helper
export async function getUser() {
  const session: any = await getSession();
  // Handle different session structures
  return session?.user || session?.data?.user || null;
}
