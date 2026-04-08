"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { MessageSquareIcon, CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MainActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12 font-['Manrope']">
      {/* AI Voice Assistant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-primary/10 bg-card/40 backdrop-blur-md rounded-[2rem] hover:border-primary/30 h-full">
          <div className="absolute inset-0 bg-linear-to-br from-primary/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="relative p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6 text-center sm:text-left font-['Space_Grotesk']">
              <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center ring-1 ring-primary/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/5">
                <Image
                  src="/audio.png"
                  alt="Voice AI"
                  width={40}
                  height={40}
                  className="w-10 md:w-12 h-auto drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight uppercase">AI Voice Assistant</h3>
                <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed font-['Manrope'] overflow-hidden">
                  Connect with our intelligent AI through seamless voice calls for instant dental guidance.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 group/item">
                <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/item:scale-150 transition-transform" />
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground group-hover/item:text-primary transition-colors">24/7 Expert AI</span>
              </div>
              <div className="flex items-center gap-2 group/item">
                <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/item:scale-150 transition-transform" />
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground group-hover/item:text-primary transition-colors">Instant Diagnosis</span>
              </div>
              <div className="flex items-center gap-2 group/item">
                <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/item:scale-150 transition-transform" />
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground group-hover/item:text-primary transition-colors">Safe & Secure</span>
              </div>
            </div>

            <Link
              href="/voice"
              className={buttonVariants({
                variant: "default",
                className:
                  "w-full bg-primary hover:bg-primary/90 text-white font-['Space_Grotesk'] font-bold py-6 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-lg uppercase tracking-tight",
              })}
            >
              <MessageSquareIcon className="mr-2 h-5 w-5" />
              Start AI Consultation
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Book Appointment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-primary/10 bg-card/40 backdrop-blur-md rounded-[2rem] hover:border-primary/30 h-full">
          <div className="absolute inset-0 bg-linear-to-br from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="relative p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6 text-center sm:text-left font-['Space_Grotesk']">
              <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center ring-1 ring-primary/20 group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500 shadow-lg shadow-primary/5">
                <Image
                  src="/calendar.png"
                  alt="Calendar"
                  width={40}
                  height={40}
                  className="w-10 md:w-12 h-auto drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight uppercase">Book Appointment</h3>
                <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed font-['Manrope'] overflow-hidden">
                  Schedule a priority visit with verified dental clinics and top-rated professionals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 group/item">
                <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/item:scale-150 transition-transform" />
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground group-hover/item:text-primary transition-colors">Verified Clinics</span>
              </div>
              <div className="flex items-center gap-2 group/item">
                <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/item:scale-150 transition-transform" />
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground group-hover/item:text-primary transition-colors">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 group/item">
                <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/item:scale-150 transition-transform" />
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground group-hover/item:text-primary transition-colors">Instant Booking</span>
              </div>
            </div>

            <Link href="/appointments">
              <Button
                variant="outline"
                className="w-full border border-primary/20 hover:border-primary/40 hover:bg-primary/10 font-['Space_Grotesk'] font-bold py-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 text-lg uppercase tracking-tight"
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                Schedule Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
