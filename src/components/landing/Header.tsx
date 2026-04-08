"use client";

import { Button } from "../ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#what-to-ask", label: "About" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${isScrolled
          ? "top-5 mx-auto max-w-5xl rounded-3xl border border-white/10 bg-background/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/10 saturate-200"
          : "top-0 border-b border-border/20 bg-background/10 backdrop-blur-xl"
        }`}
    >
      <div className="px-8 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image src="/logo.png" alt="DentWise Logo" width={32} height={32} className="w-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[10deg]" />
            <div className="absolute -inset-2 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          <span className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-foreground via-foreground to-foreground/50 bg-clip-text text-transparent group-hover:tracking-normal transition-all duration-500">
            DentWise
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-5 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
            >
              {link.label}
              <motion.span
                className="absolute -bottom-1 left-5 right-5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="font-bold text-sm hover:bg-white/5 transition-all">Login</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="relative group bg-primary hover:bg-primary/90 text-primary-foreground font-black px-6 rounded-2xl transition-all duration-500 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                <span className="relative z-10 flex items-center gap-2">
                  Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
              </Button>
            </SignUpButton>
          </div>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary/5 hover:border-primary/20 transition-all text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-6 h-6 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9, height: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
            exit={{ opacity: 0, y: -20, scale: 0.9, height: 0 }}
            className="md:hidden absolute top-[calc(100%+1rem)] left-0 right-0 mx-4 overflow-hidden rounded-[2.5rem] border border-white/10 bg-background/80 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] saturate-150"
          >
            <div className="p-6 flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="px-6 py-5 rounded-[1.5rem] text-lg font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all flex items-center justify-between group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
              <div className="h-px bg-white/5 my-4 sm:hidden" />
              <div className="flex flex-col gap-3 sm:hidden">
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 hover:bg-white/5 text-lg font-bold">Login</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full h-14 bg-primary text-primary-foreground rounded-2xl text-lg font-black shadow-xl shadow-primary/20">Get Started</Button>
                </SignUpButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Header;

