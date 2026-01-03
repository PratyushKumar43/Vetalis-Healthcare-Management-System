"use client";

import { ArrowRight, Linkedin } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import AnimatedCard from "./AnimatedCard";

const doctors = [
  { name: "Dr. Alana Ray", role: "Chief Medical Officer", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" },
  { name: "Dr. James Wilson", role: "Head of AI Research", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop" },
  { name: "Dr. Sarah Chen", role: "Clinical Data Lead", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1887&auto=format&fit=crop" },
  { name: "Dr. Marcus Ford", role: "Security Systems", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop" },
];

export default function Specialists() {
  return (
    <section className="border-b border-slate-100 py-16">
      {/* Header */}
      <AnimatedSection className="px-8 py-12 lg:px-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-100 bg-slate-50/30">
        <div>
          <span className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-3 block">Advisory Board</span>
          <h2 className="text-3xl lg:text-4xl font-medium tracking-tight text-slate-900">Developed by Experts</h2>
        </div>
        <motion.a
          whileHover={{ x: 5 }}
          href="#"
          className="text-sm font-bold tracking-widest text-slate-900 hover:text-teal-600 flex items-center gap-2 uppercase transition-colors"
        >
          View Team <ArrowRight className="w-4 h-4" />
        </motion.a>
      </AnimatedSection>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {doctors.map((doctor, index) => {
          const DoctorImage = ({ src, alt }: { src: string; alt: string }) => {
            const [imgSrc, setImgSrc] = useState(src);
            return (
              <Image
                src={imgSrc}
                alt={alt}
                fill
                className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                onError={() => {
                  setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=0d9488&color=fff&size=400`);
                }}
              />
            );
          };
          return (
            <AnimatedCard key={index} index={index} delay={0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className={`group relative ${index < 3 ? "border-r border-slate-100" : ""} bg-white`}
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-100 relative">
                  <DoctorImage src={doctor.image} alt={doctor.name} />
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1, rotate: 360 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-teal-600"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold tracking-widest text-teal-600 uppercase mb-1">{doctor.role}</p>
                <h3 className="text-lg font-semibold text-slate-900">{doctor.name}</h3>
              </div>
            </motion.div>
          </AnimatedCard>
          );
        })}
      </div>
    </section>
  );
}

