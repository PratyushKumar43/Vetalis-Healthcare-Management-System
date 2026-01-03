/**
 * API Route: Get Signed Download URL for Medical Report
 * 
 * GET /api/reports/[id]/download
 * 
 * Generates a signed URL for secure file access from Cloudinary
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/neon-auth-server';
import { generateSignedUrl } from '@/lib/cloudinary';
import { sql } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reportId = params.id;

    // Get report from database using raw SQL
    const report = await sql`
      SELECT id, patient_id, doctor_id, public_id
      FROM medical_reports
      WHERE id = ${reportId}::uuid
      LIMIT 1
    `;

    if (!report || report.length === 0) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // Check permissions
    const userRole = (user.role as string) || 'patient';
    const reportData = report[0];

    if (userRole === 'patient' && reportData.patient_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Generate signed URL (expires in 1 hour)
    const signedUrl = generateSignedUrl(reportData.public_id, 3600);

    return NextResponse.json({
      success: true,
      download_url: signedUrl,
      expires_in: 3600, // seconds
    });
  } catch (error) {
    console.error('Download URL generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate download URL' },
      { status: 500 }
    );
  }
}

