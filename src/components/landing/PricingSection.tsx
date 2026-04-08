"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { CheckCircleIcon } from "lucide-react";
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

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-muted/3 to-background">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_50%,#000_50%,transparent_85%)] opacity-20"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.06),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <motion.span 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-primary rounded-full"
            ></motion.span>
            <span className="text-sm font-medium text-primary">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Choose your
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AI dental plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Book appointments for free and upgrade for unlimited AI consultations. Perfect for
            ongoing dental care.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {/* Free Plan */}
          <motion.div variants={cardVariants} className="relative group">
            <motion.div 
              whileHover={{ y: -10 }}
              className="relative h-full bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-muted-foreground">Essential dental appointment booking</p>
                </div>
                <SignUpButton mode="modal">
                  <Button className="w-full py-3 bg-gradient-to-r from-muted to-muted/80 text-foreground rounded-xl font-semibold">
                    Get Started Free
                  </Button>
                </SignUpButton>

                <div className="space-y-4">
                  {[
                    "Unlimited appointment booking",
                    "Find dentists in your area",
                    "Basic text chat support",
                    "Appointment reminders"
                  ].map((feature, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Pro Plan - Featured */}
          <motion.div variants={cardVariants} className="relative group">
            {/* Popular Badge */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Most Popular
              </div>
            </motion.div>
            
            {/* Pulsing highlight effect */}
            <div className="absolute inset-x-0 inset-y-0 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative h-full bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/20 lg:scale-105"
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">AI Basic</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      $5
                    </span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-muted-foreground">AI consultations + appointment booking</p>
                </div>

                <Button className="w-full py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group/btn">
                  <span className="relative z-10">Start AI Basic</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500"
                  />
                </Button>

                <div className="space-y-4">
                  {[
                    "Everything in Free",
                    "10 AI voice calls per month",
                    "AI dental guidance & advice",
                    "Symptom assessment",
                    "Priority support",
                    "Call history & recordings"
                  ].map((feature, i) => (
                    <motion.div 
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div variants={cardVariants} className="relative group">
            <motion.div 
              whileHover={{ y: -10 }}
              className="relative h-full bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">AI Pro</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">$10</span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-muted-foreground">Unlimited AI consultations</p>
                </div>

                <Button
                  variant="outline"
                  className="w-full py-3 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-xl font-semibold transition-all duration-300"
                >
                  Upgrade to AI Pro
                </Button>

                <div className="space-y-4">
                  {[
                    "Everything in AI Basic",
                    "Unlimited AI voice calls",
                    "Advanced AI dental analysis",
                    "Personalized care plans",
                    "24/7 priority AI support",
                    "Detailed health reports"
                  ].map((feature, i) => (
                    <motion.div 
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;