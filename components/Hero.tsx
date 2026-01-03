"use client";

import { UserPlus, Bot, FileText, Download, ArrowRight, Database, Brain } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-90px)] relative z-10 border-b border-slate-100">
      {/* Left Column: Description & Network */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:col-span-3 border-r border-slate-100 p-8 lg:p-12 flex flex-col justify-between relative bg-gradient-to-b from-slate-50/30 to-white"
      >
        <div className="pt-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg leading-relaxed text-slate-500 font-normal"
          >
            A comprehensive management system empowering doctors with AI-driven prescriptions, instant report analysis, and seamless patient monitoring.
          </motion.p>
        </div>

        <div className="mt-16 lg:mt-0">
          <div className="w-full h-px bg-slate-200/50 mb-10"></div>
          <div className="space-y-6">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">System Integrations</p>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                <Database className="w-5 h-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
                <span className="text-xl font-semibold tracking-tight text-slate-500 group-hover:text-slate-900">EMR/EHR</span>
              </div>
              <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                <Brain className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                <span className="text-xl font-semibold tracking-tight text-slate-500 group-hover:text-slate-900">OpenAI API</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 pt-12">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-slate-500 font-semibold tracking-wide uppercase">System Operational</span>
          </div>
        </div>
      </motion.div>

      {/* Center Column: Hero Text & Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="lg:col-span-5 border-r border-slate-100 p-8 lg:p-16 flex flex-col justify-center relative bg-white"
      >
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none"></div>

        <div className="flex flex-col relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-6xl lg:text-[5.5rem] font-medium tracking-tighter text-slate-900 leading-[0.95]"
          >
            Intelligent
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-6xl lg:text-[5.5rem] font-medium tracking-tighter text-[#94a3b8] leading-[0.95]"
          >
            Medical
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-6xl lg:text-[5.5rem] font-medium tracking-tighter text-teal-700 leading-[0.95]"
          >
            Management
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-20 flex flex-col sm:flex-row sm:items-center gap-10 relative z-10"
        >
          {/* Action Button */}
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="/auth/sign-in"
            className="group inline-flex items-center justify-between gap-6 bg-white border border-slate-200 pl-6 pr-2 py-2 rounded-full shadow-sm hover:shadow-lg hover:border-slate-300 transition-all w-fit"
          >
            <span className="text-sm font-medium text-slate-700">Get Started</span>
            <motion.div
              whileHover={{ rotate: 90 }}
              className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-teal-500 group-hover:text-white transition-colors flex items-center justify-center text-slate-600 border border-slate-100 group-hover:border-teal-500"
            >
              <UserPlus className="w-4 h-4" />
            </motion.div>
          </motion.a>

          {/* Wait Time Indicator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-col"
          >
            <p className="text-[10px] font-bold tracking-widest text-slate-900 uppercase mb-1.5">AI Report Speed</p>
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-emerald-500"
              ></motion.div>
              <span className="text-sm font-mono text-slate-500 font-medium">&lt; 2.5 SEC</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Column: Image & Widget */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="lg:col-span-4 relative flex flex-col bg-white"
      >
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative h-[400px] lg:h-[62%] w-full overflow-hidden bg-slate-100 group"
        >
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            alt="Doctor with Tablet"
            fill
            className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            priority
          />

          {/* Floating Icon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="absolute bottom-8 left-8 w-14 h-14 bg-white/90 backdrop-blur rounded-xl shadow-lg shadow-slate-200/50 flex items-center justify-center text-slate-700 z-20 border border-white/50"
          >
            <Bot className="w-6 h-6 text-teal-700" />
          </motion.div>
        </motion.div>

        {/* Portal Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex-1 bg-white p-8 lg:p-12 flex flex-col justify-between relative border-t border-slate-100"
        >
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 mb-5"
            >
              <FileText className="w-4 h-4 text-teal-600 stroke-2" />
              <span className="text-[10px] font-bold tracking-widest text-teal-600 uppercase">Recent Analysis</span>
            </motion.div>
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Lab Report #4092</h3>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors cursor-pointer"
              >
                <Download className="w-5 h-5" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="pl-4 border-l-2 border-teal-500/30 py-1 space-y-1"
            >
              <p className="text-lg text-slate-900 font-medium">Patient: John Doe</p>
              <p className="text-sm text-teal-600 font-medium uppercase tracking-wide text-[10px] mb-1">Status: Anomaly Detected</p>
              <p className="text-sm text-slate-400">AI Confidence: 98.4%</p>
            </motion.div>
          </div>

          <div className="flex items-center justify-end">
            <motion.a
              whileHover={{ x: 5 }}
              href="#"
              className="text-[10px] font-bold tracking-widest text-slate-900 hover:text-teal-600 flex items-center gap-1.5 uppercase transition-colors group"
            >
              View Full Report <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

