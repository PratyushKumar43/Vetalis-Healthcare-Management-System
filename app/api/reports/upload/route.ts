/**
 * API Route: Upload Medical Report to Cloudinary
 * 
 * POST /api/reports/upload
 * 
 * Handles file uploads for medical reports (PDFs, images)
 * Uploads to Cloudinary and stores metadata in database
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/neon-auth-server';
import { uploadMedicalReport } from '@/lib/cloudinary';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check permissions (Admin or Doctor can upload)
    const userRole = (user.role as string) || 'patient';
    if (userRole !== 'admin' && userRole !== 'doctor') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const patientId = formData.get('patientId') as string;
    const reportType = formData.get('reportType') as 'lab' | 'imaging' | 'pathology';

    if (!file || !patientId || !reportType) {
      return NextResponse.json(
        { error: 'Missing required fields: file, patientId, reportType' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PDF, JPG, PNG' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate report ID
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Upload to Cloudinary
    const uploadResult = await uploadMedicalReport(
      buffer,
      patientId,
      reportId,
      reportType
    );

    // Store in database using raw SQL
    const report = await sql`
      INSERT INTO medical_reports (
        id, patient_id, doctor_id, report_type, file_url, 
        public_id, file_format, file_size, uploaded_at
      ) VALUES (
        gen_random_uuid(), ${patientId}::uuid, ${user.id}::uuid, ${reportType}, 
        ${uploadResult.secure_url}, ${uploadResult.public_id}, 
        ${uploadResult.format}, ${uploadResult.bytes}, NOW()
      )
      RETURNING id, uploaded_at
    `;

    return NextResponse.json({
      success: true,
      report: {
        id: report[0].id,
        public_id: uploadResult.public_id,
        file_url: uploadResult.secure_url,
        report_type: reportType,
        uploaded_at: report[0].uploaded_at,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload report' },
      { status: 500 }
    );
  }
}

