"use client";

import { Conversation } from "@elevenlabs/client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, PhoneOff, Loader2, User, Bot, Sparkles, Volume2 } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

function VapiWidget() {
  const { user, isLoaded } = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const messageContainerRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<any>(null);

  // prevents duplicate bookings in a single turn if AI repeats itself
  const hasBookedRef = useRef(false);

  const handleAIAction = async (text: string) => {
    try {
      if (hasBookedRef.current) return;
      if (!text.includes("BOOKING_DATA:")) return;

      const jsonPart = text.split("BOOKING_DATA:")[1]?.trim();
      if (!jsonPart) return;

      let data;
      try {
        data = JSON.parse(jsonPart);
      } catch (parseErr) {
        return;
      }

      if (!data.date || !data.time || !data.reason) return;

      hasBookedRef.current = true;

      await fetch("/api/ai-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: data.reason,
          date: data.date,
          time: data.time,
          doctorId: data.doctor || "auto",
          userId: user?.id,
        }),
      });
    } catch (err: any) {
      hasBookedRef.current = false;
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startConversation = async () => {
    try {
      setConnecting(true);
      setMessages([]);
      setCallEnded(false);
      setIsSpeaking(false);
      hasBookedRef.current = false;

      const conversation = await Conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
        connectionType: "websocket",

        onConnect: () => {
          setConnecting(false);
          setCallActive(true);
        },

        onDisconnect: () => {
          setCallActive(false);
          setConnecting(false);
          setIsSpeaking(false);
          setCallEnded(true);
        },

        onModeChange: (mode: any) => {
          setIsSpeaking(mode?.mode === "speaking");
        },

        onMessage: (msg: any) => {
          if (!msg) return;
          const text = msg.message;
          if (!text?.trim()) return;

          const role: "assistant" | "user" =
            msg.source === "ai" || msg.role === "agent" ? "assistant" : "user";

          setMessages((prev) => [...prev, { role, content: text }]);

          if (role === "assistant") {
            handleAIAction(text);
          }
        },

        onError: (err: any) => {
          console.error("ElevenLabs error:", err);
          setIsSpeaking(false);
        },
      });

      conversationRef.current = conversation;
    } catch (error) {
      console.error("Failed to start session:", error);
      setConnecting(false);
    }
  };

  const endConversation = () => {
    if (conversationRef.current) {
      conversationRef.current.endSession();
      conversationRef.current = null;
    }
    setCallActive(false);
    setCallEnded(true);
    setIsSpeaking(false);
  };

  const toggleCall = () => {
    if (callActive) endConversation();
    else startConversation();
  };

  if (!isLoaded) return null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      {/* Visual Interaction Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side: Avatar Interaction */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* AI Assistant Card */}
            <Card className="relative overflow-hidden bg-card/30 backdrop-blur-xl border-primary/10 flex flex-col items-center justify-center p-8 group transition-all duration-500 hover:border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative size-32 mb-6">
                <AnimatePresence>
                  {isSpeaking && (
                    <motion.div 
                      key="speaking-glow"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
                    />
                  )}
                </AnimatePresence>
                
                <div className={`relative w-full h-full rounded-full bg-card border-2 flex items-center justify-center overflow-hidden transition-all duration-500 ${isSpeaking ? "border-primary scale-105 shadow-[0_0_30px_rgba(var(--primary),0.3)]" : "border-primary/20"}`}>
                  <Image src="/logo.png" alt="AI Agent" width={80} height={80} className="object-contain" />
                </div>

                <div className="absolute -bottom-2 -right-2 p-2 bg-background border border-primary/20 rounded-full shadow-lg">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-bold text-xl tracking-tight">DentWise AI</h3>
                <p className="text-xs font-semibold text-primary uppercase tracking-widest opacity-70">Dental Specialist</p>
              </div>

              {callActive && (
                <div className="mt-6">
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <div className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-primary animate-pulse" : "bg-primary/40"}`} />
                    <span className="text-[10px] font-bold text-primary uppercase">{isSpeaking ? "Transmitting" : "Ready"}</span>
                  </div>
                </div>
              )}
            </Card>

            {/* User Card */}
            <Card className="relative overflow-hidden bg-card/30 backdrop-blur-xl border-primary/10 flex flex-col items-center justify-center p-8 transition-all duration-500 hover:border-primary/20 lg:min-h-[350px]">
              <div className="relative size-32 mb-6">
                <div className="relative w-full h-full rounded-full bg-card border-2 border-primary/10 overflow-hidden">
                  {user?.imageUrl ? (
                    <Image src={user.imageUrl} alt="User" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                      <User className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 bg-background border border-primary/20 rounded-full shadow-lg">
                  <User className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-bold text-xl tracking-tight">{user?.firstName || "Professional"}</h3>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest opacity-70">User Session</p>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-muted/30 rounded-full border border-border">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Online</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Control Button Area */}
          <div className="flex items-center justify-center pt-2">
             <Button
                onClick={toggleCall}
                disabled={connecting}
                className={`group relative h-16 w-full max-w-sm rounded-2xl text-lg font-bold transition-all duration-500 overflow-hidden ${
                  callActive 
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_10px_40px_rgba(239,68,68,0.2)]" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_40px_rgba(var(--primary),0.2)]"
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                   {connecting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : callActive ? (
                    <PhoneOff className="w-6 h-6" />
                  ) : (
                    <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  )}
                  <span>
                    {connecting ? "Initializing AI..." : callActive ? "Terminate Session" : "Start Voice Consult"}
                  </span>
                </div>
                
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
          </div>
        </div>

        {/* Right Side: Transcript & History */}
        <div className="flex flex-col h-full lg:min-h-[450px]">
          <Card className="flex flex-col h-full bg-card/40 backdrop-blur-2xl border-primary/10 overflow-hidden rounded-[32px] shadow-2xl">
            <div className="p-6 border-b border-primary/5 bg-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-xl">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight leading-none">Session Intelligence</h4>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase mt-1">Real-time Transcript</p>
                </div>
              </div>
              {callActive && (
                 <motion.div 
                  animate={{ opacity: [1, 0.5, 1] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2"
                >
                  <div className="size-1.5 bg-red-500 rounded-full" />
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live</span>
                </motion.div>
              )}
            </div>

            <div 
              ref={messageContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide scroll-smooth"
            >
              <AnimatePresence mode="popLayout">
                {messages.length === 0 ? (
                  <motion.div 
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-20"
                  >
                    <div className="p-4 bg-primary/5 rounded-full">
                      <Volume2 className="w-10 h-10 text-primary/30" />
                    </div>
                    <p className="text-sm font-medium max-w-[200px]">Voice interaction will appear here once started</p>
                  </motion.div>
                ) : (
                  messages.map((msg, idx) => (
                    <motion.div
                      key={`msg-${idx}`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
                    >
                      <div className={`mt-1 size-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <div className={`space-y-1 max-w-[85%]`}>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                          {msg.role === 'assistant' ? 'AI Assistant' : 'You'}
                        </div>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'assistant' 
                            ? 'bg-primary/10 text-foreground border border-primary/10 rounded-tl-none' 
                            : 'bg-muted/50 text-foreground border border-border rounded-tr-none'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>

              {callEnded && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center pt-8"
                >
                  <div className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
                    Session Log Concluded
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="p-4 bg-muted/10 border-t border-primary/5 text-center">
               <p className="text-[10px] font-medium text-muted-foreground/60 italic tracking-wide">
                Securely encrypted end-to-end voice session
               </p>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default VapiWidget;
