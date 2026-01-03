/**
 * API Route: Get Dashboard Stats
 * 
 * GET /api/stats
 * 
 * Returns dashboard statistics based on user role
 */

import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/neon-auth-server";
import { sql } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (user.role as string) || "patient";

    if (userRole === "admin") {
      // Admin stats
      const [totalPatients, totalDoctors, totalPrescriptions, totalReports] = await Promise.all([
        sql`SELECT COUNT(*) as count FROM patients`,
        sql`SELECT COUNT(*) as count FROM doctors`,
        sql`SELECT COUNT(*) as count FROM prescriptions WHERE status = 'active'`,
        sql`SELECT COUNT(*) as count FROM medical_reports`,
      ]);

      return NextResponse.json({
        success: true,
        stats: {
          totalPatients: parseInt(totalPatients[0]?.count || "0"),
          totalDoctors: parseInt(totalDoctors[0]?.count || "0"),
          activePrescriptions: parseInt(totalPrescriptions[0]?.count || "0"),
          totalReports: parseInt(totalReports[0]?.count || "0"),
        },
      });
    } else if (userRole === "doctor") {
      // Doctor stats
      const [myPatients, todayAppointments, pendingReports, prescriptionsToday] = await Promise.all([
        sql`SELECT COUNT(DISTINCT patient_id) as count FROM patient_records WHERE doctor_id = ${user.id}::uuid`,
        sql`SELECT COUNT(*) as count FROM patient_records WHERE doctor_id = ${user.id}::uuid AND DATE(visit_date) = CURRENT_DATE`,
        sql`SELECT COUNT(*) as count FROM medical_reports WHERE doctor_id = ${user.id}::uuid AND ai_analysis IS NULL`,
        sql`SELECT COUNT(*) as count FROM prescriptions WHERE doctor_id = ${user.id}::uuid AND DATE(created_at) = CURRENT_DATE`,
      ]);

      return NextResponse.json({
        success: true,
        stats: {
          myPatients: parseInt(myPatients[0]?.count || "0"),
          todayAppointments: parseInt(todayAppointments[0]?.count || "0"),
          pendingReports: parseInt(pendingReports[0]?.count || "0"),
          prescriptionsToday: parseInt(prescriptionsToday[0]?.count || "0"),
        },
      });
    } else {
      // Patient stats
      const [myReports, activePrescriptions, lastCheckup, vitalsCount] = await Promise.all([
        sql`SELECT COUNT(*) as count FROM medical_reports WHERE patient_id = ${user.id}::uuid`,
        sql`SELECT COUNT(*) as count FROM prescriptions WHERE patient_id = ${user.id}::uuid AND status = 'active'`,
        sql`SELECT MAX(visit_date) as last_visit FROM patient_records WHERE patient_id = ${user.id}::uuid`,
        sql`SELECT COUNT(*) as count FROM vitals WHERE patient_id = ${user.id}::uuid`,
      ]);

      const lastVisit = lastCheckup[0]?.last_visit;
      let lastCheckupText = "No visits yet";
      if (lastVisit) {
        const daysAgo = Math.floor(
          (Date.now() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24)
        );
        lastCheckupText = daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
      }

      return NextResponse.json({
        success: true,
        stats: {
          myReports: parseInt(myReports[0]?.count || "0"),
          activePrescriptions: parseInt(activePrescriptions[0]?.count || "0"),
          lastCheckup: lastCheckupText,
          healthScore: vitalsCount[0]?.count > 0 ? "Good" : "No data",
        },
      });
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

