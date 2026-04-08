"use client";

import { MicIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function WelcomeSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex flex-col md:flex-row items-center justify-between bg-card/40 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-primary/10 shadow-2xl overflow-hidden group"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors duration-500" />
      
      <div className="relative z-10 space-y-6 max-w-2xl text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary),.5)]" />
          <span className="text-sm font-semibold text-primary/90 tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Your Practice
          </span>
        </div>
        
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Next-Gen <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Voice AI</span> Assistant
          </h1>
          <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-xl">
            A hands-free, natural language voice experience tailored for dental professionals. Elevate patient care through seamless AI interaction.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex relative">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 bg-gradient-to-br from-primary/30 to-primary/5 rounded-[40px] flex items-center justify-center border border-primary/20 shadow-xl"
        >
          <MicIcon className="w-20 h-20 text-primary drop-shadow-2xl" />
        </motion.div>
        {/* Animated Rings around the icon */}
        <div className="absolute inset-0 -m-4 border border-primary/10 rounded-[50px] animate-ping opacity-20 duration-10000" />
      </div>
    </motion.div>
  );
}

export default WelcomeSection;