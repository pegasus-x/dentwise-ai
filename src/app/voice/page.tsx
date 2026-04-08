"use client";

import Navbar from "@/components/Navbar";
import WelcomeSection from "@/components/voice/WelcomeSection";
import FeatureCards from "@/components/voice/FeatureCards";
import VapiWidget from "@/components/voice/VapiWidget";
import { motion } from "framer-motion";

function VoicePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Orbs for Depth */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none opacity-50" />

      <Navbar />

      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20"
      >
        <div className="space-y-12">
          <WelcomeSection />
          <FeatureCards />
          <div className="pt-8">
            <VapiWidget />
          </div>
        </div>
      </motion.main>
    </div>
  );
}

export default VoicePage;

