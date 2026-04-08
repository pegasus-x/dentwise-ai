"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { CalendarIcon, MicIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as any,
    },
  },
};

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden lg:overflow-visible pt-20">
      {/* GRID BG */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-muted/5 to-primary/5">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" 
        />
      </div>

      {/* Gradient ORBS */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 w-72 h-72 bg-linear-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-linear-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" 
      />

      <div className="relative z-10 w-full px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT CONTENT */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10 order-2 lg:order-1"
            >
              <div className="space-y-6">
                {/* BADGE */}
                <motion.div variants={itemVariants}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-primary rounded-full" 
                    />
                    <span className="text-sm font-medium text-primary">
                      AI-Powered Dental Assistant
                    </span>
                  </div>
                </motion.div>
                    
                {/* HEADING */}
                <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                    Your dental
                  </span>
                  <br />
                  <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    questions
                  </span>
                  <br />
                  <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                    answered instantly
                  </span>
                </motion.h1>

                {/* SUBTITLE */}
                <motion.p variants={itemVariants} className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg font-medium">
                  Chat with our AI dental assistant for instant advice, book smart
                  appointments, and get personalized care recommendations.
                  Available 24/7.
                </motion.p>
              </div>

              {/* CTA BUTTONS */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <SignUpButton mode="modal">
                  <Button size="lg" className="w-full sm:w-auto relative overflow-hidden group">
                    <span className="relative z-10 flex items-center">
                      <MicIcon className="mr-2 size-5" />
                      Try voice agent
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                    />
                  </Button>
                </SignUpButton>

                <SignUpButton mode="modal">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                    <CalendarIcon className="mr-2 size-5 transition-transform group-hover:scale-110" />
                    Book an appointment
                  </Button>
                </SignUpButton>
              </motion.div>

              {/* TESTIMONIALS */}
              <motion.div variants={itemVariants} className="pt-8">
                <div className="flex flex-wrap items-center gap-6">
                  {/* AVATARS */}
                  <div className="flex -space-x-3">
                    {[
                      "photo-1544005313-94ddf0286df2",
                      "photo-1560250097-0b93528c311a",
                      "photo-1580489944761-15a19d654956",
                      "photo-1633332755192-727a05c4013d",
                      "photo-1598300042247-d088f8ab3a91",
                    ].map((img, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.2, zIndex: 10, y: -5 }}
                        className="relative"
                      >
                        <Image
                          src={`https://images.unsplash.com/${img}?w=100&h=100&fit=crop&crop=face`}
                          alt="User"
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover ring-4 ring-background shadow-lg"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* RATINGS */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.div
                            key={star}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: star * 0.2 }}
                          >
                            <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        4.9/5
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Trusted by{" "}
                      <span className="font-semibold text-foreground">
                        1,200+ patients
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT CONTENT – IMAGE */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative order-1 lg:order-2 lg:pl-8 flex justify-center"
            >
              <motion.div 
                animate={{ rotate: [45, 55, 45] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl blur-xl" 
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-2xl" 
              />

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/hero.png"
                  alt="Dentwise AI Dental Assistant"
                  width={600}
                  height={600}
                  className="w-[260px] sm:w-[320px] md:w-[420px] lg:w-full mx-auto"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

