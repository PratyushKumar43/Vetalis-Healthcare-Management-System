/**
 * API Route: Create User (Admin Only)
 * 
 * POST /api/users/create
 * 
 * Allows admins to create user accounts with specific roles.
 * Creates user in database. User must sign up with Neon Auth using the same email.
 */

import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/neon-auth-server";
import { sql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const currentUser = await getUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only admins can create users
    const userRole = (currentUser.role as string) || "patient";
    if (userRole !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Only admins can create users" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, name, role, phone } = body;

    // Validate required fields
    if (!email || !name || !role) {
      return NextResponse.json(
        { error: "Missing required fields: email, name, role" },
        { status: 400 }
      );
    }

    // Validate role
    if (!["admin", "doctor", "patient"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be admin, doctor, or patient" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Generate a temporary UUID for the user
    // This will be updated when they sign up with Neon Auth
    const tempUserId = crypto.randomUUID();

    try {
      // Create user in database with a placeholder ID
      // When user signs up with Neon Auth, the sync-user endpoint will update this
      await sql`
        INSERT INTO users (id, email, name, phone, role, created_at, updated_at)
        VALUES (${tempUserId}::uuid, ${email}, ${name}, ${phone || null}, ${role}, NOW(), NOW())
      `;

      // Create role-specific records
      if (role === "doctor") {
        await sql`
          INSERT INTO doctors (id, verified, created_at)
          VALUES (${tempUserId}::uuid, false, NOW())
          ON CONFLICT (id) DO NOTHING
        `;
      } else if (role === "patient") {
        await sql`
          INSERT INTO patients (id, created_at, updated_at)
          VALUES (${tempUserId}::uuid, NOW(), NOW())
          ON CONFLICT (id) DO NOTHING
        `;
      }

      return NextResponse.json({
        success: true,
        message: `User account created with ${role} role. User must sign up at /auth/sign-up using email: ${email}. The role will be automatically assigned.`,
        user: {
          id: tempUserId,
          email,
          name,
          phone,
          role,
        },
      });
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: dbError.message || "Failed to create user in database" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}
