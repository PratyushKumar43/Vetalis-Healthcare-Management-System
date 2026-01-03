/**
 * Report Upload Page
 * 
 * Upload medical reports for AI analysis
 */

import { getUser } from "@/lib/neon-auth-server";
import { redirect } from "next/navigation";
import ReportUploadForm from "@/components/dashboard/ReportUploadForm";

export default async function ReportUploadPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Only doctors and admins can upload reports
  const userRole = (user.role as string) || "patient";
  if (userRole === "patient") {
    redirect("/dashboard/reports");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">Upload Medical Report</h1>
        <p className="text-slate-600">Upload a medical report for AI analysis</p>
      </div>
      <ReportUploadForm userRole={userRole} userId={user.id} />
    </div>
  );
}
