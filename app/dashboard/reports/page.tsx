/**
 * Report Analyzer Dashboard
 * 
 * Upload and analyze medical reports with AI
 */

import { getUser } from "@/lib/neon-auth-server";
import { redirect } from "next/navigation";
import { FileText, Upload, Sparkles, AlertTriangle } from "lucide-react";
import Link from "next/link";
import ReportList from "@/components/dashboard/ReportList";

export default async function ReportsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Medical Reports</h1>
          <p className="text-slate-600">Upload and analyze medical reports with AI assistance</p>
        </div>
        <Link
          href="/dashboard/reports/upload"
          className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
        >
          <Upload className="w-5 h-5" />
          Upload Report
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-700">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900 mb-1">789</p>
          <p className="text-sm text-slate-500">Total Reports</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-700">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900 mb-1">456</p>
          <p className="text-sm text-slate-500">AI Analyzed</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-amber-100 text-amber-700">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900 mb-1">23</p>
          <p className="text-sm text-slate-500">Anomalies Detected</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-emerald-100 text-emerald-700">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-900 mb-1">12</p>
          <p className="text-sm text-slate-500">This Week</p>
        </div>
      </div>

      {/* Report List */}
      <ReportList userRole={(user.role as string) || "patient"} />
    </div>
  );
}

