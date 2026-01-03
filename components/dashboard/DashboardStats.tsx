"use client";

import { useEffect, useState } from "react";
import { Users, FileText, Pill, Activity, TrendingUp, Clock, Loader2 } from "lucide-react";

interface DashboardStatsProps {
  userRole: string;
}

export default function DashboardStats({ userRole }: DashboardStatsProps) {
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
          </div>
        ))}
      </div>
    );
  }

  const statsConfig = {
    admin: [
      { label: "Total Patients", value: stats.totalPatients || 0, icon: Users, color: "blue" },
      { label: "Active Prescriptions", value: stats.activePrescriptions || 0, icon: Pill, color: "teal" },
      { label: "Reports Analyzed", value: stats.totalReports || 0, icon: FileText, color: "amber" },
      { label: "System Health", value: "99.9%", icon: Activity, color: "emerald" },
    ],
    doctor: [
      { label: "My Patients", value: stats.myPatients || 0, icon: Users, color: "blue" },
      { label: "Today's Appointments", value: stats.todayAppointments || 0, icon: Clock, color: "teal" },
      { label: "Pending Reports", value: stats.pendingReports || 0, icon: FileText, color: "amber" },
      { label: "Prescriptions Today", value: stats.prescriptionsToday || 0, icon: Pill, color: "purple" },
    ],
    patient: [
      { label: "My Reports", value: stats.myReports || 0, icon: FileText, color: "blue" },
      { label: "Active Prescriptions", value: stats.activePrescriptions || 0, icon: Pill, color: "teal" },
      { label: "Last Checkup", value: stats.lastCheckup || "No visits", icon: Activity, color: "amber" },
      { label: "Health Score", value: stats.healthScore || "No data", icon: TrendingUp, color: "emerald" },
    ],
  };

  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    teal: "bg-teal-100 text-teal-700",
    amber: "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };

  const currentStats = statsConfig[userRole as keyof typeof statsConfig] || statsConfig.patient;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {currentStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-1">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

