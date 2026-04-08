"use client";

import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as any,
    },
  },
};

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 z-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
          <ZapIcon className="size-4 text-primary" />
          <span className="text-sm text-primary font-medium">
            Simple Process
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Three steps to
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            better dental health
          </span>
        </h2>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Our AI-powered dental assistant makes it easy to get personalized
          advice, schedule appointments, and manage your oral health all in one
          place. Just ask, and let us take care of the rest!
        </p>
      </motion.div>

      {/* Steps Section */}
      <div className="relative">
        {/* Background Connector Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-primary/30 to-transparent
          -translate-y-1/2 hidden lg:block z-0 origin-left"
        />

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 grid lg:grid-cols-3 gap-12 lg:gap-8"
        >
          {/* STEP 1 */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                1
              </div>

              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                <Image
                  src="/audio.png"
                  alt="Voice Chat"
                  width={40}
                  height={40}
                  className="w-14"
                />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-center">
                Ask Questions
              </h3>

              <p className="text-muted-foreground text-center leading-relaxed mb-6">
                Chat with our AI assistant about any dental concerns. Get
                instant answers about symptoms, treatments, and oral health
                tips.
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  24/7 Available
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Instant Response
                </span>
              </div>
            </div>
          </motion.div>

          {/* STEP 2 */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                2
              </div>

              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                <Image
                  src="/brain.png"
                  alt="AI Brain"
                  width={40}
                  height={40}
                  className="w-14"
                />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-center">
                Get Expert Advice
              </h3>

              <p className="text-muted-foreground text-center leading-relaxed mb-6">
                Receive personalized recommendations based on thousands of
                dental cases. Our AI provides professional-grade insights.
              </p>
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  AI-Powered
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Personalized
                </span>
              </div>
            </div>
          </motion.div>

          {/* STEP 3 */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                3
              </div>

              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                <Image
                  src="/calendar.png"
                  alt="Calendar"
                  width={40}
                  height={40}
                  className="w-14"
                />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-center">
                Book & Get Care
              </h3>

              <p className="text-muted-foreground text-center leading-relaxed mb-6">
                Schedule with verified dentists and receive comprehensive
                follow-up care. Track your progress seamlessly.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Verified Doctors
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Follow-Up Care
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center mt-16"
      >
        <SignUpButton mode="modal">
          <Button size={"lg"} className="group">
            <ArrowRightIcon className="size-5 mr-2 transition-transform group-hover:translate-x-1" />
            Get Started Now
          </Button>
        </SignUpButton>
      </motion.div>
    </section>
  );
}

export default HowItWorks;

