/**
 * Database Helper Functions
 * 
 * Helper functions for common database operations using Neon
 */

import { sql } from "./db";

// ============================================
// User Operations
// ============================================

export async function getUserById(userId: string) {
  const result = await sql`
    SELECT * FROM users WHERE id = ${userId}::uuid
  `;
  return result.length > 0 ? result[0] : null;
}

export async function getUserByEmail(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  return result.length > 0 ? result[0] : null;
}

export async function getUsersByRole(role: "admin" | "doctor" | "patient") {
  return await sql`
    SELECT * FROM users WHERE role = ${role} ORDER BY created_at DESC
  `;
}

// ============================================
// Patient Operations
// ============================================

export async function getPatientById(patientId: string) {
  const result = await sql`
    SELECT * FROM patients WHERE id = ${patientId}::uuid
  `;
  return result.length > 0 ? result[0] : null;
}

export async function getPatientsByDoctor(doctorId: string) {
  // For doctors, show all patients (they can manage any patient)
  // In a real system, you might want to filter by clinic or assignment
  return await sql`
    SELECT p.*, u.name, u.email, u.phone, u.created_at
    FROM patients p
    JOIN users u ON p.id = u.id
    ORDER BY u.name
  `;
}

export async function getAllPatients(limit: number = 100, offset: number = 0) {
  return await sql`
    SELECT 
      p.*, 
      u.name, 
      u.email, 
      u.phone, 
      u.created_at,
      u.role
    FROM patients p
    JOIN users u ON p.id = u.id
    WHERE u.role = 'patient'
    ORDER BY u.name ASC
    LIMIT ${limit} OFFSET ${offset}
  `;
}

// ============================================
// Prescription Operations
// ============================================

export async function getPrescriptionsByPatient(patientId: string) {
  return await sql`
    SELECT p.*, u.name as doctor_name
    FROM prescriptions p
    JOIN users u ON p.doctor_id = u.id
    WHERE p.patient_id = ${patientId}::uuid
    ORDER BY p.created_at DESC
  `;
}

export async function getPrescriptionsByDoctor(doctorId: string) {
  return await sql`
    SELECT p.*, u.name as patient_name
    FROM prescriptions p
    JOIN users u ON p.patient_id = u.id
    WHERE p.doctor_id = ${doctorId}::uuid
    ORDER BY p.created_at DESC
  `;
}

// ============================================
// Vitals Operations
// ============================================

export async function getVitalsByPatient(
  patientId: string,
  limit: number = 30
) {
  return await sql`
    SELECT * FROM vitals
    WHERE patient_id = ${patientId}::uuid
    ORDER BY recorded_at DESC
    LIMIT ${limit}
  `;
}

export async function getLatestVitals(patientId: string) {
  const result = await sql`
    SELECT * FROM vitals
    WHERE patient_id = ${patientId}::uuid
    ORDER BY recorded_at DESC
    LIMIT 1
  `;
  return result.length > 0 ? result[0] : null;
}

// ============================================
// Report Operations
// ============================================

export async function getReportsByPatient(patientId: string) {
  return await sql`
    SELECT * FROM medical_reports
    WHERE patient_id = ${patientId}::uuid
    ORDER BY uploaded_at DESC
  `;
}

export async function getReportById(reportId: string) {
  const result = await sql`
    SELECT * FROM medical_reports WHERE id = ${reportId}::uuid
  `;
  return result.length > 0 ? result[0] : null;
}

// ============================================
// Doctor Operations
// ============================================

export async function getDoctorById(doctorId: string) {
  const result = await sql`
    SELECT d.*, u.name, u.email, u.phone
    FROM doctors d
    JOIN users u ON d.id = u.id
    WHERE d.id = ${doctorId}::uuid
  `;
  return result.length > 0 ? result[0] : null;
}

export async function getAllDoctors() {
  return await sql`
    SELECT d.*, u.name, u.email
    FROM doctors d
    JOIN users u ON d.id = u.id
    WHERE d.verified = true
    ORDER BY u.name
  `;
}
