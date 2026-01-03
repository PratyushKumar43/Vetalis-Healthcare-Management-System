"use client";

import { Search, Settings } from "lucide-react";
import { useState } from "react";
import NotificationBell from "./NotificationBell";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients, reports, prescriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <NotificationBell />

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <Settings className="w-5 h-5 text-slate-600" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
              {userName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-900">{userName || "User"}</p>
              <p className="text-xs text-slate-500">Welcome back</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

