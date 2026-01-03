"use client";

import { useState, useEffect } from "react";
import { Calendar, Heart, Droplet, Thermometer, Activity, TrendingUp, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface VitalsTrackingProps {
  userRole: string;
  userId?: string;
}

interface Vital {
  id: string;
  date: string;
  heartRate: number | null;
  bloodPressure: string | null;
  temperature: number | null;
  oxygenSat: number | null;
  respiratoryRate: number | null;
  weight: number | null;
}

export default function VitalsTracking({ userRole, userId }: VitalsTrackingProps) {
  const [selectedPatient, setSelectedPatient] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState<"heartRate" | "temperature" | "oxygenSat">("heartRate");
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [averages, setAverages] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    if (userRole !== "patient") {
      fetchPatients();
    } else {
      fetchVitals();
    }
  }, [userRole]);

  useEffect(() => {
    if (selectedPatient !== "all") {
      fetchVitals(selectedPatient);
    } else if (userRole === "patient") {
      fetchVitals();
    }
  }, [selectedPatient]);

  const fetchPatients = async () => {
    try {
      const response = await fetch("/api/patients");
      const data = await response.json();
      if (data.success) {
        setPatients(data.patients);
        if (data.patients.length > 0 && selectedPatient === "all") {
          fetchVitals(data.patients[0].id);
        }
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const fetchVitals = async (patientId?: string) => {
    try {
      setLoading(true);
      // For patients, we need to get their ID from session
      // For now, we'll use a placeholder - this should be passed as prop or fetched
      const finalPatientId = patientId || (userRole === "patient" ? userId : selectedPatient);
      
      if (!finalPatientId) {
        setVitals([]);
        setLoading(false);
        return;
      }
      
      const response = await fetch(`/api/vitals?patientId=${finalPatientId}`);
      const data = await response.json();

      if (data.success) {
        setVitals(data.vitals);
        setAverages(data.averages);
      } else {
        setError("Failed to load vitals");
      }
    } catch (err) {
      console.error("Error fetching vitals:", err);
      setError("Failed to load vitals");
    } finally {
      setLoading(false);
    }
  };

  const chartData = vitals
    .slice()
    .reverse()
    .map((vital) => ({
      date: new Date(vital.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      heartRate: vital.heartRate,
      temperature: vital.temperature,
      oxygenSat: vital.oxygenSat,
    }));

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
          onClick={() => fetchVitals()}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Filter (for doctors/admins) */}
      {userRole !== "patient" && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Patient</label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Patients</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Chart */}
      {vitals.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Vitals Trend</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric("heartRate")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === "heartRate"
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Heart Rate
              </button>
              <button
                onClick={() => setSelectedMetric("temperature")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === "temperature"
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Temperature
              </button>
              <button
                onClick={() => setSelectedMetric("oxygenSat")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === "oxygenSat"
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                O2 Saturation
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke="#14b8a6"
                strokeWidth={2}
                name={
                  selectedMetric === "heartRate"
                    ? "Heart Rate (bpm)"
                    : selectedMetric === "temperature"
                    ? "Temperature (°F)"
                    : "O2 Saturation (%)"
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Vitals */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Recent Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Heart Rate</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Blood Pressure</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Temperature</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">O2 Saturation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vitals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No vitals records found
                  </td>
                </tr>
              ) : (
                vitals.slice().reverse().map((vital, index) => (
                  <tr key={vital.id || index} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-900">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {new Date(vital.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-slate-900">{vital.heartRate || "N/A"} bpm</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-slate-900">{vital.bloodPressure || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-slate-900">{vital.temperature ? `${vital.temperature}°F` : "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-slate-900">{vital.oxygenSat ? `${vital.oxygenSat}%` : "N/A"}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
