"use client";

import { motion } from "framer-motion";
import { 
  CrownIcon, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Clock, 
  ArrowLeft,
  Brain,
  Calendar,
  BarChart3,
  Mail
} from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PricingTable, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProSkeleton } from "@/components/dashboard/DashboardSkeletons";
import { useScroll, useSpring, useTransform } from "framer-motion";

export default function ProPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <>
        <Navbar />
        <ProSkeleton />
      </>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      } 
    },
  };

  const features = [
    {
      title: "AI Call Insights",
      description: "Get detailed breakdowns and smart summaries of your dental consultations.",
      icon: Brain,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Smart Booking",
      description: "Book dentist visits directly via our advanced AI assistant.",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "History & Reports",
      description: "Track past issues and recommendations with comprehensive history tracking.",
      icon: BarChart3,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Priority AI",
      description: "Get faster, more accurate AI assistance with priority response times.",
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
     {
      title: "Email Summaries",
      description: "Receive detailed reports and reminders directly in your inbox.",
      icon: Mail,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      title: "Secure Data",
      description: "Bank-level encryption for all your private sensitive dental information.",
      icon: ShieldCheck,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  const faqs = [
    {
      question: "What is included in the Pro plan?",
      answer: "The Pro plan includes unlimited AI dental consultations, priority support, advanced analysis features, and comprehensive history tracking. You also get early access to new AI models.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time through your account settings. You will continue to have access to Pro features until the end of your billing cycle.",
    },
    {
      question: "Is my dental data secure?",
      answer: "Absolutely. We use bank-level encryption and comply with all healthcare privacy standards (like HIPAA) to ensure your data is always safe and private.",
    },
    {
      question: "Do you offer a free trial?",
      answer: "We offer a limited free plan so you can experience the core features of Dentwise before deciding to upgrade for advanced analysis.",
    },
  ];

  return (
    <>
      <Navbar />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Mouse Following Glow */}
      <motion.div
        className="fixed pointer-events-none z-50 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] hidden lg:block"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 400 }}
      />

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-8 py-16 pt-32 md:pt-40 lg:pt-48 space-y-24 md:space-y-32 lg:space-y-48"
      >
        {/* PREMIUM BACKGROUND EFFECTS */}
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          {/* Refined Decorative Blobs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-1/4 w-[60rem] h-[60rem] bg-primary/5 rounded-full blur-[160px] -z-10" 
          />
          <motion.div 
             animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-1/4 w-[50rem] h-[50rem] bg-indigo-500/5 rounded-full blur-[140px] -z-10" 
          />
          <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-[140px] -z-10" />
        </div>

        {/* BACK BUTTON & BADGE */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-4 font-['Manrope']">
          <Link href="/dashboard" className="self-start sm:self-auto group">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-full transition-all font-semibold">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Button>
          </Link>
          <Badge variant="outline" className="px-5 py-2 border-primary/20 bg-primary/5 text-primary rounded-full font-bold shadow-sm sm:block flex items-center gap-2 backdrop-blur-sm">
            <CrownIcon className="w-4 h-4 shrink-0" />
            <span className="tracking-wide">PRO MEMBERSHIP</span>
          </Badge>
        </motion.div>

        {/* HERO SECTION */}
        <section className="relative px-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] md:h-[400px] bg-primary/10 blur-[100px] md:blur-[150px] rounded-full -z-10 opacity-30" />
          
          <motion.div variants={itemVariants} className="text-center space-y-8 md:space-y-16">
            <div className="space-y-6 md:space-y-10 max-w-7xl mx-auto">
              <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-['Space_Grotesk'] font-black tracking-tighter leading-[0.95] text-foreground">
                Elevate Your Dental <br className="hidden sm:block" /> Health with <span className="text-primary italic relative">Pro<Sparkles className="absolute -top-10 -right-12 w-12 h-12 text-amber-500 animate-pulse hidden md:block" /></span>
              </h1>
              <p className="text-lg sm:text-xl md:text-3xl font-['Manrope'] font-medium text-muted-foreground leading-relaxed max-w-5xl mx-auto px-4 opacity-70">
                The future of AI Dental Care is here. Discover brain-powered insights, smart booking, and 
                priority care to keep your smile perfect.
              </p>
            </div>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-6 px-4">
               <Button size="lg" className="rounded-full px-10 h-14 md:h-16 text-lg font-bold shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all bg-primary" asChild>
                  <a href="#pricing">Upgrade Now</a>
               </Button>
               <Button size="lg" variant="outline" className="rounded-full px-10 h-14 md:h-16 text-lg font-bold border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all backdrop-blur-sm" asChild>
                  <a href="#features">Upcoming Features</a>
               </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="space-y-10 md:space-y-16">
          <motion.div variants={itemVariants} className="text-center space-y-3 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Space_Grotesk'] font-black italic">🚀 Upcoming Pro Features</h2>
            <p className="text-muted-foreground font-['Manrope'] text-lg sm:text-xl font-bold opacity-70">We're building powerful features to enhance your experience.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-2 sm:px-4">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.05 }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]" />
                <Card className="h-full border border-primary/15 bg-card/30 backdrop-blur-3xl transition-all duration-500 hover:bg-card/50 hover:border-primary/50 hover:shadow-[0_32px_64px_-16px_rgba(231,138,83,0.2)] ring-1 ring-primary/10 rounded-[3rem] overflow-hidden relative z-10 p-2">
                  <CardHeader className="p-10 space-y-8">
                    <div className={`w-16 h-16 md:w-20 md:h-20 ${feature.bgColor} rounded-[1.75rem] flex items-center justify-center transition-all duration-700 group-hover:rotate-[15deg] group-hover:scale-125 shadow-2xl overflow-hidden relative`}>
                      <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <feature.icon className={`w-8 h-8 md:w-10 md:h-10 ${feature.color} relative z-10`} />
                    </div>
                    <div className="space-y-4">
                      <CardTitle className="text-3xl md:text-4xl font-['Space_Grotesk'] font-black leading-tight bg-linear-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">{feature.title}</CardTitle>
                      <CardDescription className="text-lg md:text-xl font-['Manrope'] leading-relaxed font-bold text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="space-y-10 md:space-y-16 relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-primary/10 blur-[100px] md:blur-[150px] -z-10" />
          
          <motion.div variants={itemVariants} className="text-center space-y-4 px-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-['Space_Grotesk'] font-black tracking-tighter">Transparent Pricing</h2>
            <p className="text-muted-foreground font-['Manrope'] text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-bold opacity-70">
              Join now and be the first to access all premium features as they launch.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="rounded-[2.5rem] md:rounded-[3.5rem] border border-primary/20 bg-card/30 backdrop-blur-2xl p-4 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden ring-1 ring-primary/10 mx-2 relative group"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:scale-125 transition-transform duration-1000" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-10 group-hover:scale-125 transition-transform duration-1000" />
            <div className="overflow-x-auto pb-4 sm:pb-0 relative z-10 custom-scrollbar">
               <PricingTable />
            </div>
          </motion.div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto space-y-10 md:space-y-16 pb-12 md:pb-24 px-4">
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-black tracking-tighter">Common Questions</h2>
            <p className="text-muted-foreground font-['Manrope'] text-lg sm:text-xl font-bold opacity-70">Everything you need to know about Dentwise Pro.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-card/30 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-16 border border-primary/15 ring-1 ring-primary/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
            <Accordion type="single" collapsible className="w-full relative z-10">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-primary/10 last:border-0 py-2 md:py-4 group">
                  <AccordionTrigger className="text-xl sm:text-2xl md:text-3xl font-['Space_Grotesk'] font-black hover:text-primary transition-all hover:no-underline px-4 text-left group-data-[state=open]:text-primary tracking-tight">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-['Manrope'] text-sm sm:text-base md:text-xl leading-relaxed px-4 pb-6 md:pb-10 font-bold opacity-60">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* FOOTER CALLOUT */}
        <motion.section 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-linear-to-br from-primary/20 via-background to-indigo-500/10 border border-primary/25 p-10 md:p-32 text-center mx-2 shadow-[0_48px_96px_-16px_rgba(0,0,0,0.15)] ring-1 ring-primary/10"
        >
          <div className="space-y-8 md:space-y-12 relative z-10">
            <motion.h2 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-9xl font-['Space_Grotesk'] font-black leading-[0.95] tracking-tighter"
            >
              Ready for a <br className="hidden sm:block" /> <span className="text-primary italic">Healthier</span> Smile?
            </motion.h2>
            <p className="text-muted-foreground font-['Manrope'] text-lg sm:text-2xl md:text-3xl max-w-3xl mx-auto font-black opacity-60">
              Upgrade to Pro and lead the way in AI-powered dental care. Join thousands of users improving their health.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8 pt-8">
               <Button size="lg" className="w-full sm:w-auto rounded-full px-16 h-16 md:h-20 text-xl md:text-2xl font-['Manrope'] font-black shadow-2xl shadow-primary/50 transition-all hover:scale-110 active:scale-95 bg-primary hover:shadow-primary/60" asChild>
                  <a href="#pricing">Upgrade to Pro</a>
               </Button>
               <Link href="/dashboard" className="text-muted-foreground font-['Manrope'] hover:text-foreground font-black text-lg md:text-2xl transition-all hover:translate-x-2 flex items-center gap-2">
                  Keep exploring for free <ArrowLeft className="w-5 h-5 rotate-180" />
               </Link>
            </div>
          </div>
          
          {/* Animated background elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -left-40 w-96 h-96 md:w-[40rem] md:h-[40rem] bg-primary/15 rounded-full blur-[100px] md:blur-[150px] -z-10" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -right-40 w-96 h-96 md:w-[40rem] md:h-[40rem] bg-indigo-500/15 rounded-full blur-[100px] md:blur-[150px] -z-10" 
          />
        </motion.section>
      </motion.div>
    </>
  );
}
