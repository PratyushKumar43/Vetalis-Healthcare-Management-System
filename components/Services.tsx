"use client";

import { Layers, Users, FilePlus, ScanLine, Bot, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCard from "./AnimatedCard";
import AnimatedSection from "./AnimatedSection";

const services = [
  { icon: Users, title: "Patient Management", desc: "Add patients, track medical history, and log daily vital signs in a unified dashboard.", action: "Access", hoverColor: "group-hover:text-blue-500" },
  { icon: FilePlus, title: "AI Prescriptions", desc: "Generate accurate prescriptions instantly manually or with AI assistance for dosage.", action: "Generate", hoverColor: "group-hover:text-teal-500" },
  { icon: ScanLine, title: "Report Analyzer", desc: "Upload PDF or image reports for instant AI summarization and anomaly detection.", action: "Upload", hoverColor: "group-hover:text-amber-500" },
  { icon: Bot, title: "Medical Chatbot", desc: "Specialized AI assistant for medical queries, drug interactions, and quick reference.", action: "Chat Now", hoverColor: "group-hover:text-sky-500" },
  { icon: Activity, title: "Vitals Tracking", desc: "Log and visualize patient vital signs over time to identify trends early.", action: "Log Vitals", hoverColor: "group-hover:text-rose-500" },
  { icon: ShieldCheck, title: "HIPAA Compliant", desc: "Enterprise-grade security ensuring all patient data is encrypted and protected.", action: "Security", hoverColor: "group-hover:text-indigo-500" },
];

export default function Services() {
  return (
    <section className="border-b border-slate-100 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Header Column */}
        <AnimatedSection className="lg:col-span-3 p-10 lg:p-16 border-r border-slate-100 bg-slate-50/50">
          <div className="sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-6"
            >
              <Layers className="w-5 h-5" />
            </motion.div>
            <h2 className="text-3xl font-medium tracking-tight text-slate-900 mb-4">Core Modules</h2>
            <p className="text-sm leading-relaxed text-slate-500 mb-8">
              A unified platform integrating patient data, AI diagnostics, and administrative tools for modern healthcare facilities.
            </p>
            <motion.a
              whileHover={{ x: 5 }}
              href="/dashboard"
              className="inline-flex items-center text-xs font-bold tracking-widest text-teal-700 uppercase hover:text-teal-900"
            >
              View Dashboard <ArrowRight className="ml-2 w-3 h-3" />
            </motion.a>
          </div>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const borderClass = index < 2 ? "border-b border-r" : index === 2 ? "border-b" : index < 5 ? `border-b lg:border-b-0 border-r` : "";
            return (
              <AnimatedCard key={index} index={index} delay={0.2}>
                <motion.a
                  whileHover={{ y: -5, scale: 1.02 }}
                  href={
                    service.title === "Patient Management" ? "/dashboard/patients" :
                    service.title === "AI Prescriptions" ? "/dashboard/prescriptions" :
                    service.title === "Report Analyzer" ? "/dashboard/reports" :
                    service.title === "Medical Chatbot" ? "/dashboard/chatbot" :
                    service.title === "Vitals Tracking" ? "/dashboard/vitals" :
                    "/dashboard"
                  }
                  className={`group p-10 ${borderClass} border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-100/50 hover:relative hover:z-10 transition-all block`}
                >
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring" }}
                  >
                    <Icon className={`w-8 h-8 text-slate-300 ${service.hoverColor} transition-colors mb-12`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-6 flex items-center text-teal-600"
                  >
                    <span className="text-[10px] font-bold tracking-widest uppercase">{service.action}</span>
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </motion.div>
                </motion.a>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
