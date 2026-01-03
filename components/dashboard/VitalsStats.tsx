"use client";

import { useEffect, useState } from "react";
import { Heart, Droplet, Thermometer, TrendingUp, Loader2 } from "lucide-react";

interface VitalsStatsProps {
  userId: string;
  userRole: string;
}

export default function VitalsStats({ userId, userRole }: VitalsStatsProps) {
  const [averages, setAverages] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAverages();
  }, [userId]);

  const fetchAverages = async () => {
    try {
      const response = await fetch(`/api/vitals?patientId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setAverages(data.averages || {});
      }
    } catch (error) {
      console.error("Error fetching vitals averages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-red-100 text-red-700">
            <Heart className="w-6 h-6" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-slate-900 mb-1">
          {averages.heartRate || "N/A"}
        </p>
        <p className="text-sm text-slate-500">Avg Heart Rate (bpm)</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-700">
            <Droplet className="w-6 h-6" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-slate-900 mb-1">
          {averages.bloodPressure || "N/A"}
        </p>
        <p className="text-sm text-slate-500">Avg Blood Pressure</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-amber-100 text-amber-700">
            <Thermometer className="w-6 h-6" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-slate-900 mb-1">
          {averages.temperature ? `${averages.temperature}°F` : "N/A"}
        </p>
        <p className="text-sm text-slate-500">Avg Temperature</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-emerald-100 text-emerald-700">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-slate-900 mb-1">
          {averages.oxygenSat ? `${averages.oxygenSat}%` : "N/A"}
        </p>
        <p className="text-sm text-slate-500">Avg O2 Saturation</p>
      </div>
    </div>
  );
}

