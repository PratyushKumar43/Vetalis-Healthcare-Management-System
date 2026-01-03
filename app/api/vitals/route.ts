/**
 * API Route: Get Vitals
 * 
 * GET /api/vitals
 * 
 * Returns list of vital signs records
 */

import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/neon-auth-server";
import { getVitalsByPatient } from "@/lib/db-helpers";
import { sql } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (user.role as string) || "patient";
    const searchParams = request.nextUrl.searchParams;
    const patientId = searchParams.get("patientId") || (userRole === "patient" ? user.id : null);
    const limit = parseInt(searchParams.get("limit") || "30");

    if (!patientId) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    // Check permissions
    if (userRole === "patient" && user.id !== patientId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const vitals = await getVitalsByPatient(patientId, limit);

    // Format vitals for display
    const formattedVitals = vitals.map((vital: any) => ({
      id: vital.id,
      date: vital.recorded_at,
      heartRate: vital.heart_rate,
      bloodPressure: vital.blood_pressure_systolic && vital.blood_pressure_diastolic
        ? `${vital.blood_pressure_systolic}/${vital.blood_pressure_diastolic}`
        : null,
      temperature: vital.temperature ? parseFloat(vital.temperature) : null,
      oxygenSat: vital.oxygen_saturation ? parseFloat(vital.oxygen_saturation) : null,
      respiratoryRate: vital.respiratory_rate,
      weight: vital.weight ? parseFloat(vital.weight) : null,
    }));

    // Calculate averages
    const averages = {
      heartRate: formattedVitals.length > 0
        ? Math.round(
            formattedVitals.reduce((sum, v) => sum + (v.heartRate || 0), 0) /
              formattedVitals.filter((v) => v.heartRate).length
          )
        : 0,
      temperature: formattedVitals.length > 0
        ? parseFloat(
            (
              formattedVitals.reduce((sum, v) => sum + (v.temperature || 0), 0) /
              formattedVitals.filter((v) => v.temperature).length
            ).toFixed(1)
          )
        : 0,
      oxygenSat: formattedVitals.length > 0
        ? Math.round(
            formattedVitals.reduce((sum, v) => sum + (v.oxygenSat || 0), 0) /
              formattedVitals.filter((v) => v.oxygenSat).length
          )
        : 0,
    };

    // Calculate average blood pressure
    let avgBP = "0/0";
    const bpReadings = formattedVitals.filter((v) => v.bloodPressure);
    if (bpReadings.length > 0) {
      const systolic = Math.round(
        bpReadings.reduce((sum, v) => {
          const [s] = v.bloodPressure!.split("/").map(Number);
          return sum + s;
        }, 0) / bpReadings.length
      );
      const diastolic = Math.round(
        bpReadings.reduce((sum, v) => {
          const [, d] = v.bloodPressure!.split("/").map(Number);
          return sum + d;
        }, 0) / bpReadings.length
      );
      avgBP = `${systolic}/${diastolic}`;
    }

    return NextResponse.json({
      success: true,
      vitals: formattedVitals,
      averages: {
        ...averages,
        bloodPressure: avgBP,
      },
      total: formattedVitals.length,
    });
  } catch (error) {
    console.error("Error fetching vitals:", error);
    return NextResponse.json(
      { error: "Failed to fetch vitals" },
      { status: 500 }
    );
  }
}

