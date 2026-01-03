"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import PatientAutocomplete from "./PatientAutocomplete";

interface ReportUploadFormProps {
  userRole: string;
  userId: string;
}

export default function ReportUploadForm({ userRole, userId }: ReportUploadFormProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [patientId, setPatientId] = useState("");
  const [reportType, setReportType] = useState<"lab" | "imaging" | "pathology" | "other">("lab");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle patient selection from autocomplete
  const handlePatientChange = (selectedPatientId: string) => {
    setPatientId(selectedPatientId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("patientId", userRole === "patient" ? userId : patientId);
      formData.append("reportType", reportType);

      const response = await fetch("/api/reports/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard/reports");
        router.refresh();
      } else {
        setError(data.error || "Failed to upload report");
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {userRole !== "patient" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Patient <span className="text-red-500">*</span>
            </label>
            <PatientAutocomplete
              value={patientId}
              onChange={handlePatientChange}
              placeholder="Type patient name or email to search..."
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as any)}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="lab">Lab Report</option>
            <option value="imaging">Imaging</option>
            <option value="pathology">Pathology</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Upload File
          </label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors">
            {file ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <FileText className="w-8 h-8 text-teal-600" />
                  <div className="text-left">
                    <p className="font-medium text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-1 rounded hover:bg-slate-100"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PDF, JPG, PNG (max 10MB)
                    </p>
                  </div>
                </div>
              </label>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !file}
            className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Upload Report</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

