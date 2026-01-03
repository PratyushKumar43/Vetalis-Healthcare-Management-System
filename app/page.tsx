import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import FeatureAbout from "@/components/FeatureAbout";
import Specialists from "@/components/Specialists";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-[#fcfdff] text-slate-600 antialiased selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      {/* Ambient Background Glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vh] bg-cyan-100/60 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vh] bg-teal-50/60 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <Navigation />

      {/* Main Wrapper */}
      <div className="w-full max-w-[1920px] mx-auto border-x border-slate-100 bg-white shadow-xl shadow-slate-200/20">
        <Hero />
        <Stats />
        <Services />
        <FeatureAbout />
        <Specialists />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

