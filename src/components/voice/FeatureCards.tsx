"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, ShieldIcon, Sparkles, Zap, Headphones } from "lucide-react";
import { motion } from "framer-motion";

function FeatureCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* How to Use Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="relative h-full overflow-hidden group bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/20 transition-all duration-500 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <CardHeader className="relative pb-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                <MicIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight">Interactive Voice</CardTitle>
                <CardDescription className="text-sm font-medium">Getting started is effortless</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-5 pt-2">
            {[
              { icon: Sparkles, text: "Click the start button to activate AI listening" },
              { icon: Zap, text: "Inquire about clinical protocols or scheduling" },
              { icon: Headphones, text: "Experience low-latency conversational responses" },
              { icon: ShieldIcon, text: "Review encrypted session transcripts instantly" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:bg-primary/5 hover:border-primary/10 transition-all duration-300">
                <div className="p-2 bg-primary/5 rounded-lg">
                  <item.icon className="w-4 h-4 text-primary/70" />
                </div>
                <span className="text-sm font-medium text-foreground/80">{item.text}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Capabilities Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="relative h-full overflow-hidden group bg-card/40 backdrop-blur-md border-primary/10 hover:border-primary/20 transition-all duration-500 rounded-3xl">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <CardHeader className="relative pb-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                <ShieldIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight">AI Ecosystem</CardTitle>
                <CardDescription className="text-sm font-medium">Advanced intelligence at your scale</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-2">
            {[
              { label: "Real-time Voice Synthesis", desc: "Natural, human-like voice interaction" },
              { label: "Intelligent Task Automation", desc: "Syncs directly with your practice software" },
              { label: "Contextual Awareness", desc: "Remembers previous session insights" }
            ].map((feat, i) => (
              <div key={i} className="flex flex-col p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-all duration-300 cursor-default">
                <span className="font-bold text-sm text-foreground tracking-wide mb-1 flex items-center justify-between">
                  {feat.label}
                  <Zap className="w-3 h-3 text-primary" />
                </span>
                <span className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default FeatureCards;