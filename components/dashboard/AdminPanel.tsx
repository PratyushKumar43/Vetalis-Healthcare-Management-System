"use client";

import { useState, useEffect } from "react";
import { Users, Settings, FileText, TrendingUp, Shield, Edit, Trash2, Plus, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import CreateUserModal from "./CreateUserModal";

const tabs = [
  { id: "users", label: "User Management", icon: Users },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "audit", label: "Audit Logs", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setError("Failed to load users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-indigo-600 text-indigo-700"
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
        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">User Management</h2>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center p-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchUsers}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Last Login</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-slate-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                                {user.name?.charAt(0) || "U"}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{user.name || "Unknown"}</p>
                                <p className="text-sm text-slate-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 uppercase">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">
                              {user.lastLogin
                                ? new Date(user.lastLogin).toLocaleDateString()
                                : "Never"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                                <Edit className="w-5 h-5 text-slate-600" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                                <Trash2 className="w-5 h-5 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">System Analytics</h2>
            <p className="text-slate-600">Analytics dashboard coming soon...</p>
          </div>
        )}

        {activeTab === "audit" && (
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Audit Logs</h2>
            <p className="text-slate-600">Audit log viewer coming soon...</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">System Settings</h2>
            <p className="text-slate-600">System settings coming soon...</p>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          fetchUsers();
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}
