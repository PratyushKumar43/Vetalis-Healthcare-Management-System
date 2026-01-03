"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Eye, Edit, Sparkles, Calendar, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PrescriptionListProps {
  userRole: string;
}

interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  medications: string[];
  status: string;
  createdDate: string;
  aiGenerated: boolean;
}

export default function PrescriptionList({ userRole }: PrescriptionListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/prescriptions");
      const data = await response.json();

      if (data.success) {
        setPrescriptions(data.prescriptions);
      } else {
        setError("Failed to load prescriptions");
      }
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      setError("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch = prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || prescription.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchPrescriptions}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      {/* Search and Filter */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prescription Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Patient</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Medications</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredPrescriptions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No prescriptions found
                </td>
              </tr>
            ) : (
              filteredPrescriptions.map((prescription, index) => (
                <motion.tr
                  key={prescription.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
                        {prescription.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{prescription.patientName}</p>
                        <p className="text-sm text-slate-500">{prescription.doctorName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {prescription.medications.slice(0, 2).map((med, i) => (
                        <p key={i} className="text-sm text-slate-900">{med}</p>
                      ))}
                      {prescription.medications.length > 2 && (
                        <p className="text-xs text-slate-500">
                          +{prescription.medications.length - 2} more
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {prescription.aiGenerated ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                        <Sparkles className="w-3 h-3" />
                        AI-Assisted
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        Manual
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        prescription.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : prescription.status === "completed"
                          ? "bg-slate-100 text-slate-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(prescription.createdDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/prescriptions/${prescription.id}`}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <Eye className="w-5 h-5 text-slate-600" />
                      </Link>
                      {userRole !== "patient" && (
                        <Link
                          href={`/dashboard/prescriptions/${prescription.id}/edit`}
                          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <Edit className="w-5 h-5 text-slate-600" />
                        </Link>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
