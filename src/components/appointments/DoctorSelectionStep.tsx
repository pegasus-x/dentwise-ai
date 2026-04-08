"use client";

import { useAvailableDoctors } from "@/hooks/use-doctors";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MapPinIcon, PhoneIcon, StarIcon, ShieldCheck, ChevronRight, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { DoctorAvatar } from "../DoctorAvatar";
import { DoctorCardsLoading } from "./DoctorCardsLoading";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentistId: string) => void;
  onContinue: () => void;
}

function DoctorSelectionStep({
  onSelectDentist,
  selectedDentistId,
  onContinue,
}: DoctorSelectionStepProps) {
  const { data: dentists = [], isLoading } = useAvailableDoctors();

  if (isLoading)
    return (
      <div className="space-y-10">
        <div className="h-8 w-64 bg-muted animate-pulse rounded-full" />
        <DoctorCardsLoading />
      </div>
    );

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {dentists.map((dentist, index) => (
            <motion.div
              layout
              key={dentist.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`relative group cursor-pointer h-full transition-all duration-500 bg-card/40 backdrop-blur-md overflow-hidden rounded-[32px] border-2 border-primary/5 hover:border-primary/20 hover:shadow-2xl hover:-translate-y-2 ${selectedDentistId === dentist.id ? "ring-2 ring-primary border-primary/40 shadow-[0_20px_50px_rgba(var(--primary),0.15)]" : ""
                  }`}
                onClick={() => onSelectDentist(dentist.id)}
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-colors duration-500 group-hover:bg-primary/15 ${selectedDentistId === dentist.id ? "bg-primary/20" : ""}`} />

                <CardHeader className="relative pb-0 pt-8 px-8">
                  <div className="flex items-center gap-5">
                    <div className="relative group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <DoctorAvatar
                        name={dentist.name}
                        gender={dentist.gender}
                        imageUrl={dentist.imageUrl}
                        className="relative w-20 h-20 rounded-[28px] shrink-0 ring-4 ring-background z-10"
                        size={80}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full z-20 shadow-lg">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 rounded-full w-fit">
                        <StarIcon className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-[10px] font-bold text-primary tracking-wider">Top Verified</span>
                      </div>
                      <CardTitle className="text-xl font-bold tracking-tight leading-tight">{dentist.name}</CardTitle>
                      <p className="text-sm font-semibold text-primary opacity-80 uppercase tracking-widest">{dentist.speciality || "General Specialist"}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-6 p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center gap-1">
                      <span className="text-sm font-bold text-foreground">5.0</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Rating</span>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center gap-1">
                      <span className="text-sm font-bold text-foreground">{dentist.appointmentCount}+</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Cases</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-foreground/70 font-medium">
                      <MapPinIcon className="w-4 h-4 text-primary" />
                      <span>Professional Health Center</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground/70 font-medium">
                      <PhoneIcon className="w-4 h-4 text-primary" />
                      <span>{dentist.phone}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic">
                    "{dentist.bio || "Providing bespoke dental solutions with a focus on patient comfort and clinical excellence."}"
                  </p>

                  <div className="pt-2">
                    <div className={`w-full py-3 px-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${selectedDentistId === dentist.id ? "bg-primary text-white shadow-xl" : "bg-muted hover:bg-primary/5 text-foreground/80"
                      }`}>
                      <span className="text-xs font-bold uppercase tracking-widest leading-none">
                        {selectedDentistId === dentist.id ? "Practitioner Selected" : "Review Profile"}
                      </span>
                      <ChevronRight className={`w-4 h-4 ${selectedDentistId === dentist.id ? "" : "opacity-40"}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedDentistId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex justify-end pt-10"
          >
            <Button
              onClick={onContinue}
              className="h-14 px-10 rounded-[20px] text-lg font-bold shadow-[0_10px_40px_rgba(var(--primary),0.3)] hover:scale-[1.02] transition-transform flex items-center gap-3"
            >
              Configure Schedule
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DoctorSelectionStep;

