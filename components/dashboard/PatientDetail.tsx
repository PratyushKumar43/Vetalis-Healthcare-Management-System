"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Phone, Mail, MapPin, Heart, Activity, FileText, Pill, TrendingUp, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PatientDetailProps {
  patientId: string;
  userRole: string;
}

export default function PatientDetail({ patientId, userRole }: PatientDetailProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "vitals" | "reports" | "prescriptions">("overview");
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/patients/${patientId}`);
      const data = await response.json();

      if (data.success) {
        setPatient(data.patient);
      } else {
        setError("Failed to load patient data");
      }
    } catch (err) {
      console.error("Error fetching patient:", err);
      setError("Failed to load patient data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
        <p className="text-red-600">{error || "Patient not found"}</p>
        <Link
          href="/dashboard/patients"
          className="mt-4 inline-block px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Back to Patients
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "history", label: "Medical History", icon: FileText },
    { id: "vitals", label: "Vitals", icon: Heart },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "prescriptions", label: "Prescriptions", icon: Pill },
  ];

  return (
    <div className="space-y-6">
      {/* Patient Info Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-2xl font-semibold">
              {patient.name?.charAt(0) || "?"}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-1">{patient.name || "Unknown"}</h2>
              <p className="text-slate-600">Patient ID: {patient.id}</p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
            Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500 mb-1">Email</p>
              <p className="text-sm font-medium text-slate-900">{patient.email || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500 mb-1">Phone</p>
              <p className="text-sm font-medium text-slate-900">{patient.phone || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500 mb-1">Date of Birth</p>
              <p className="text-sm font-medium text-slate-900">
                {patient.date_of_birth
                  ? `${new Date(patient.date_of_birth).toLocaleDateString()} (${patient.age || "?"} years)`
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500 mb-1">Blood Type</p>
              <p className="text-sm font-medium text-slate-900">{patient.blood_type || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "border-teal-600 text-teal-700"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Emergency Contact */}
              {patient.emergency_contact && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Emergency Contact</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="font-medium text-slate-900">{patient.emergency_contact.name}</p>
                    <p className="text-sm text-slate-600">{patient.emergency_contact.relationship}</p>
                    <p className="text-sm text-slate-600">{patient.emergency_contact.phone}</p>
                  </div>
                </div>
              )}

              {/* Allergies */}
              {patient.allergies && Array.isArray(patient.allergies) && patient.allergies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Medications */}
              {patient.currentMedications && patient.currentMedications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Medications</h3>
                  <div className="space-y-3">
                    {patient.currentMedications.map((med: any, index: number) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">
                              {Array.isArray(med.medications)
                                ? med.medications.map((m: any) => m.name || m).join(", ")
                                : "Medication"}
                            </p>
                            {med.doctor && <p className="text-sm text-slate-600">Dr. {med.doctor}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Last Vitals */}
              {patient.lastVitals && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Last Vitals</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {patient.lastVitals.temperature && (
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">Temperature</p>
                        <p className="text-lg font-semibold text-slate-900">{patient.lastVitals.temperature}°F</p>
                      </div>
                    )}
                    {patient.lastVitals.blood_pressure_systolic && (
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">Blood Pressure</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {patient.lastVitals.blood_pressure_systolic}/{patient.lastVitals.blood_pressure_diastolic}
                        </p>
                      </div>
                    )}
                    {patient.lastVitals.heart_rate && (
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">Heart Rate</p>
                        <p className="text-lg font-semibold text-slate-900">{patient.lastVitals.heart_rate} bpm</p>
                      </div>
                    )}
                    {patient.lastVitals.oxygen_saturation && (
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 mb-1">O2 Saturation</p>
                        <p className="text-lg font-semibold text-slate-900">{patient.lastVitals.oxygen_saturation}%</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                patient.medicalHistory.map((record: any, index: number) => (
                  <div key={index} className="border-l-4 border-teal-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-slate-900">{record.diagnosis || "Visit"}</p>
                      <span className="text-sm text-slate-500">
                        {new Date(record.visit_date).toLocaleDateString()}
                      </span>
                    </div>
                    {record.doctor_name && <p className="text-sm text-slate-600">Dr. {record.doctor_name}</p>}
                    {record.notes && <p className="text-sm text-slate-500 mt-1">{record.notes}</p>}
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No medical history available</p>
              )}
            </div>
          )}

          {activeTab === "vitals" && (
            <div>
              <Link
                href={`/dashboard/vitals?patientId=${patientId}`}
                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-4"
              >
                <TrendingUp className="w-4 h-4" />
                View Full Vitals History
              </Link>
              {patient.lastVitals ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-1">Temperature</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {patient.lastVitals.temperature || "N/A"}°F
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-1">Blood Pressure</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {patient.lastVitals.blood_pressure_systolic && patient.lastVitals.blood_pressure_diastolic
                        ? `${patient.lastVitals.blood_pressure_systolic}/${patient.lastVitals.blood_pressure_diastolic}`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-1">Heart Rate</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {patient.lastVitals.heart_rate || "N/A"} bpm
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-500 mb-1">O2 Saturation</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {patient.lastVitals.oxygen_saturation || "N/A"}%
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-600">No vitals data available</p>
              )}
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <Link
                href={`/dashboard/reports?patientId=${patientId}`}
                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-4"
              >
                <FileText className="w-4 h-4" />
                View All Reports
              </Link>
              <p className="text-slate-600">Medical reports will be displayed here.</p>
            </div>
          )}

          {activeTab === "prescriptions" && (
            <div>
              <Link
                href={`/dashboard/prescriptions?patientId=${patientId}`}
                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-4"
              >
                <Pill className="w-4 h-4" />
                View All Prescriptions
              </Link>
              {patient.currentMedications && patient.currentMedications.length > 0 ? (
                <div className="space-y-3">
                  {patient.currentMedications.map((med: any, index: number) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4">
                      <p className="font-medium text-slate-900">
                        {Array.isArray(med.medications)
                          ? med.medications.map((m: any) => `${m.name} ${m.dosage} - ${m.frequency}`).join(", ")
                          : "Medication"}
                      </p>
                      {med.doctor && <p className="text-sm text-slate-600">Prescribed by Dr. {med.doctor}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No prescriptions available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
