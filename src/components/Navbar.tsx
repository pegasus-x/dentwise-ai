"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CalendarIcon, CrownIcon, HomeIcon, MicIcon, Menu, X, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/appointments", label: "Appointments", icon: CalendarIcon },
    { href: "/voice", label: "Voice", icon: MicIcon },
    { href: "/pro", label: "Pro", icon: CrownIcon },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? "top-4 mx-4 md:mx-12 rounded-[2rem] border border-white/10 bg-background/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] saturate-[1.8]"
          : "top-0 border-b border-border/40 bg-background/60 backdrop-blur-xl"
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Image src="/logo.png" alt="DentWise Logo" width={32} height={32} className="w-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
              DentWise
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-white/5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 group ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  <span className="text-sm font-semibold relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {/* USER INFO */}
            <motion.div 
              whileHover={{ x: -2 }}
              className="hidden lg:flex flex-col items-end gap-0.5 cursor-default group/text"
            >
              <span className="text-sm font-bold tracking-tight text-foreground/90 group-hover/text:text-primary transition-colors duration-300">
                {user?.firstName} {user?.lastName}
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/[0.03] border border-primary/10 shadow-[inset_0_1px_4px_rgba(var(--primary),0.05)]">
                <Sparkles className="w-2.5 h-2.5 text-primary/70 animate-pulse" />
                <span className="text-[10px] text-primary/70 uppercase tracking-[0.1em] font-black leading-none">
                  {user?.publicMetadata?.role as string || "Patient"}
                </span>
              </div>
            </motion.div>

            {/* AVATAR SECTION */}
            <div className="relative group flex items-center justify-center">
              {/* Outer Glow - Subtle & Centered */}
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Main Container */}
              <div className="relative flex items-center justify-center p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-primary/30 transition-all duration-500">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 rounded-full transition-transform duration-500 group-hover:scale-110",
                      userButtonTrigger: "focus:ring-0 focus:outline-none focus-visible:ring-0 active:scale-95 transition-transform p-0"
                    }
                  }}
                />
                
                {/* Status Indicator - Repositioned for circles */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-[2.5px] border-background rounded-full shadow-lg ring-1 ring-green-500/20 z-10" />
              </div>
            </div>

            
            {/* MOBILE MENU BUTTON */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="md:hidden flex items-center justify-center p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group/menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }}>
                    <X className="w-6 h-6 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }}>
                    <Menu className="w-6 h-6 text-muted-foreground group-hover/menu:text-foreground transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden absolute top-[calc(100%+0.75rem)] left-0 right-0 mx-4 p-5 rounded-[2rem] border border-white/10 bg-background/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] saturate-150"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all group ${isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "group-hover:text-foreground"}`} />
                        <span className="text-lg font-semibold">{link.label}</span>
                      </div>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;

