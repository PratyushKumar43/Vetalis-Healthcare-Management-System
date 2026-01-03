"use client";

import { motion } from "framer-motion";
import AnimatedCard from "./AnimatedCard";

export default function Stats() {
  const stats = [
    { value: "99%", label: "Analysis Accuracy" },
    { value: "50k+", label: "Records Secured" },
    { value: "24/7", label: "Chatbot Availability" },
    { value: "1.2s", label: "Prescription Gen." },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-100 py-16">
      {stats.map((stat, index) => (
        <AnimatedCard
          key={index}
          index={index}
          delay={0.1}
          className={`p-10 lg:p-14 ${index < 3 ? "border-r border-slate-100" : ""} flex flex-col items-start hover:bg-slate-50 transition-colors group`}
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="text-4xl lg:text-5xl font-semibold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors"
          >
            {stat.value}
          </motion.span>
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">{stat.label}</span>
        </AnimatedCard>
      ))}
    </section>
  );
}

