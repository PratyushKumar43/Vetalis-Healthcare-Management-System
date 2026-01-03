"use client";

import { Activity, Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full flex items-center justify-between px-6 py-6 lg:px-10 border-b border-slate-100 bg-[#fcfdff]/80 backdrop-blur-md sticky top-0 z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg border border-teal-600/20 flex items-center justify-center text-teal-600 bg-teal-50/50 shadow-sm">
          <Activity className="w-4 h-4 stroke-[2.5]" />
        </div>
        <span className="text-xl font-semibold tracking-tight text-slate-900">
          VITALIS <span className="text-teal-600 text-xs align-top font-bold">HMS</span>
        </span>
      </div>

      {/* Links */}
      <div className="hidden lg:flex items-center gap-10">
        <a href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors">
          Dashboard
        </a>
        <a href="/dashboard/patients" className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors">
          Patients
        </a>
        <a href="/dashboard/reports" className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors">
          AI Reports
        </a>
        <a href="/dashboard/prescriptions" className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors">
          Prescriptions
        </a>
      </div>

      {/* CTA */}
      <a href="/auth/sign-in" className="hidden lg:block bg-slate-900 text-white px-6 py-3 text-[11px] font-bold tracking-widest hover:bg-slate-800 transition-colors rounded-sm uppercase">
        Login
      </a>

      {/* Mobile Toggle */}
      <button
        className="lg:hidden text-slate-900"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 lg:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <motion.a
                whileHover={{ x: 5 }}
                href="/dashboard"
                className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
              >
                Dashboard
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="/dashboard/patients"
                className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
              >
                Patients
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="/dashboard/reports"
                className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
              >
                AI Reports
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="/dashboard/prescriptions"
                className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
              >
                Prescriptions
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/auth/sign-in"
                className="bg-slate-900 text-white px-6 py-3 text-[11px] font-bold tracking-widest hover:bg-slate-800 transition-colors rounded-sm uppercase w-fit"
              >
                Login
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

