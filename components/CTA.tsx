"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function CTA() {
  return (
    <section className="py-24 px-8 text-center bg-slate-900 relative overflow-hidden mt-16">
      {/* Background Decoration */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
      >
        <div className="absolute top-[-50%] left-[-20%] w-[80vw] h-[80vw] bg-teal-600/30 blur-[120px] rounded-full"></div>
      </motion.div>

      <AnimatedSection className="relative z-10 max-w-3xl mx-auto" delay={0.2}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-4xl lg:text-6xl font-medium tracking-tight text-white mb-8"
        >
          Optimize your <br /> <span className="text-teal-400">medical practice.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-lg mb-10"
        >
          Join over 500+ clinics using Vitalis to manage patients, automate prescriptions, and analyze reports.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="/auth/sign-up"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-teal-500 text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-teal-400 transition-colors rounded-sm uppercase text-center inline-block"
          >
            Get Started Free
          </motion.a>
          <motion.a
            href="/auth/sign-in"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-transparent border border-slate-700 text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-slate-800 transition-colors rounded-sm uppercase text-center inline-block"
          >
            Sign In
          </motion.a>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}

