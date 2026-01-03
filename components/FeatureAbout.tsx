"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const features = [
  "Automated Prescription Generation",
  "Deep Learning Report Analysis",
  "Medical-Only Chatbot Constraints",
];

export default function FeatureAbout() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-slate-100 py-16">
      <AnimatedSection className="p-12 lg:p-24 flex flex-col justify-center bg-white relative overflow-hidden">
        {/* Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-bl-full -z-10"
        ></motion.div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-6"
        >
          Our Technology
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 mb-8 leading-[1.1]"
        >
          AI that speaks <br /> <span className="text-teal-700">medical language.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 text-lg leading-relaxed mb-10 max-w-md"
        >
          Vitalis isn&apos;t just a database; it&apos;s an intelligent assistant. Our system analyzes complex medical reports and assists in diagnosis, reducing administrative burden by 60%.
        </motion.p>

        <div className="space-y-4 mb-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-700"
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </motion.div>
              <span className="text-slate-700 font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-slate-900 text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-slate-800 transition-colors rounded-sm uppercase w-fit"
        >
          Request System Demo
        </motion.button>
      </AnimatedSection>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-[500px] lg:h-auto relative overflow-hidden group"
      >
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          alt="Data Analysis"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-12"
        >
          <p className="text-white/80 text-sm font-mono mb-2">POWERED BY</p>
          <p className="text-white text-2xl font-medium tracking-tight">Neural-Health Engine v2.0</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

