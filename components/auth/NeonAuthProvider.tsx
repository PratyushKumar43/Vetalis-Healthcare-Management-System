"use client";

/**
 * Neon Auth UI Provider
 * 
 * Simplified provider that doesn't require React-specific exports
 * We'll handle auth UI manually or use a simpler approach
 */

export function NeonAuthProvider({ children }: { children: React.ReactNode }) {
  // For now, just return children since Neon Auth React components
  // require Next.js 16+ and we're on Next.js 14
  // We'll handle auth through server-side routes instead
  return <>{children}</>;
}
