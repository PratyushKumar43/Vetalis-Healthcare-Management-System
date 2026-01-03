/**
 * Middleware for Route Protection
 * 
 * Protects dashboard routes and enforces role-based access
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";

export async function middleware(request: NextRequest) {
  // Public routes
  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith("/auth/") ||
    request.nextUrl.pathname.startsWith("/account/")
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const userId = request.cookies.get("neon-auth-user-id")?.value;
    
    if (!userId) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    // Check user role from database for admin routes
    if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
      try {
        const user = await sql`
          SELECT role FROM users WHERE id = ${userId}::uuid
        `;
        
        if (user.length === 0 || user[0].role !== "admin") {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
      }
    }
  }

  // Protect API routes (except auth endpoints)
  if (request.nextUrl.pathname.startsWith("/api") && 
      !request.nextUrl.pathname.startsWith("/api/auth")) {
    const userId = request.cookies.get("neon-auth-user-id")?.value;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
  ],
};
