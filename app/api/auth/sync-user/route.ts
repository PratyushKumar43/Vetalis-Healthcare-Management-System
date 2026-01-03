/**
 * API Route: Sync User from Neon Auth to Database
 * 
 * POST /api/auth/sync-user
 * 
 * Creates or updates user in database after Neon Auth sign-up/sign-in
 * Handles role assignment from pre-created accounts or sign-up selection
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, email, name, role = "patient" } = body;

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields: id, email" },
        { status: 400 }
      );
    }

    // Check if user exists by email (admin may have pre-created the user)
    const existingUserByEmail = await sql`
      SELECT id, role FROM users WHERE email = ${email}
    `;

    if (existingUserByEmail.length > 0) {
      const existingUser = existingUserByEmail[0];
      
      // If the existing user has a different ID, update it to match Neon Auth ID
      // This handles the case where admin created user first, then user signs up
      if (existingUser.id !== id) {
        // Update the existing user's ID to match Neon Auth ID
        // First, update any foreign key references
        await sql`
          UPDATE users
          SET id = ${id}::uuid, updated_at = NOW()
          WHERE email = ${email}
        `;
        
        // Update doctors table if exists
        await sql`
          UPDATE doctors
          SET id = ${id}::uuid
          WHERE id = ${existingUser.id}::uuid
        `;
        
        // Update patients table if exists
        await sql`
          UPDATE patients
          SET id = ${id}::uuid
          WHERE id = ${existingUser.id}::uuid
        `;
      } else {
        // Update existing user (preserve role if already set by admin)
        const existingRole = existingUser.role;
        await sql`
          UPDATE users
          SET email = ${email}, name = ${name || null}, updated_at = NOW()
          WHERE id = ${id}::uuid
        `;
        // Role was pre-set by admin, it's already correct
      }
    } else {
      // Check if user exists by ID
      const existingUserById = await sql`
        SELECT id, role FROM users WHERE id = ${id}::uuid
      `;

      if (existingUserById.length > 0) {
        // Update existing user (preserve role if it was set)
        await sql`
          UPDATE users
          SET email = ${email}, name = ${name || null}, updated_at = NOW()
          WHERE id = ${id}::uuid
        `;
      } else {
        // Create new user with the specified role (from sign-up form)
        await sql`
          INSERT INTO users (id, email, name, role, created_at, updated_at)
          VALUES (${id}::uuid, ${email}, ${name || null}, ${role}, NOW(), NOW())
          ON CONFLICT (id) DO UPDATE
          SET email = EXCLUDED.email, name = EXCLUDED.name, updated_at = NOW()
        `;

        // Create role-specific records
        if (role === "doctor") {
          await sql`
            INSERT INTO doctors (id, verified, created_at)
            VALUES (${id}::uuid, false, NOW())
            ON CONFLICT (id) DO NOTHING
          `;
        } else if (role === "patient") {
          await sql`
            INSERT INTO patients (id, created_at, updated_at)
            VALUES (${id}::uuid, NOW(), NOW())
            ON CONFLICT (id) DO NOTHING
          `;
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Failed to sync user" },
      { status: 500 }
    );
  }
}
