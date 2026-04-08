"use client";

import { APPOINTMENT_TYPES } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft, Calendar, Clock, MapPin, CreditCard, ShieldCheck, ArrowRight, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DoctorInfo from "./DoctorInfo";
import { motion } from "framer-motion";

interface BookingConfirmationStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  isBooking: boolean;
  onBack: () => void;
  onConfirm: () => void;
  onModify: () => void;
}

function BookingConfirmationStep({
  selectedDentistId,
  selectedDate,
  selectedTime,
  selectedType,
  isBooking,
  onBack,
  onConfirm,
  onModify,
}: BookingConfirmationStepProps) {
  const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="rounded-xl hover:bg-primary/10 hover:text-primary">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Edit Schedule
        </Button>
      </div>

      <div className="grid md:grid-cols-5 gap-10 items-start">
        {/* Receipt Side */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3"
        >
          <Card className="relative overflow-hidden bg-card/40 backdrop-blur-xl border-primary/10 rounded-[40px] shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
            
            <CardHeader className="px-8 pt-10 pb-6 border-b border-primary/5">
               <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-primary/10 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                 </div>
                 <CardTitle className="text-2xl font-black tracking-tight">Booking Summary</CardTitle>
               </div>
               <p className="text-sm text-muted-foreground font-semibold uppercase tracking-widest leading-none mt-2">Verified Professional Session</p>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              <DoctorInfo doctorId={selectedDentistId} />

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-primary/5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                     <Calendar className="w-3 h-3" />
                     Date
                  </div>
                  <p className="font-bold text-sm">
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                     <Clock className="w-3 h-3" />
                     Time
                  </div>
                  <p className="font-bold text-sm">{selectedTime}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                     <CreditCard className="w-3 h-3" />
                     Treatment
                  </div>
                  <p className="font-bold text-sm">{appointmentType?.name}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                     <MapPin className="w-3 h-3" />
                     Location
                  </div>
                  <p className="font-bold text-sm">Dental Hub • Tower 1</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                 <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Fee</p>
                    <p className="text-3xl font-black text-primary">{appointmentType?.price}</p>
                 </div>
                 <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Pay at Clinic</span>
                 </div>
              </div>
            </CardContent>

            {/* Receipt "Teeth" Graphic at Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-background flex">
               {Array.from({ length: 20 }).map((_, i) => (
                 <div key={i} className="flex-1 h-full bg-card/40 rounded-t-full border-t border-primary/5" />
               ))}
            </div>
          </Card>
        </motion.div>

        {/* Actions Side */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 space-y-6"
        >
          <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10 space-y-6">
             <h3 className="font-bold text-lg leading-tight uppercase tracking-tight">Final Step</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               By confirming, you agree to our booking policy. You can cancel up to 24 hours before your session.
             </p>
             
             <div className="space-y-4">
                <Button 
                  onClick={onConfirm} 
                  disabled={isBooking}
                  className="w-full h-14 rounded-2xl text-lg font-bold shadow-[0_10px_30px_rgba(var(--primary),0.2)] hover:scale-[1.02] transition-transform"
                >
                  {isBooking ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="size-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                    />
                  ) : <CheckCircle2 className="w-5 h-5 mr-3" />}
                  {isBooking ? "Securing Slot..." : "Confirm Booking"}
                </Button>

                <Button 
                  variant="outline" 
                  onClick={onModify}
                  className="w-full h-14 rounded-2xl text-sm font-bold border-primary/10 hover:bg-primary/5"
                >
                  <XCircle className="w-4 h-4 mr-3 opacity-40" />
                  Discard & Restart
                </Button>
             </div>
          </div>

          <div className="p-6 bg-muted/20 rounded-[24px] border border-border flex items-start gap-4">
             <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
             <p className="text-[10px] font-bold text-muted-foreground leading-normal uppercase tracking-wider">
               Instant confirmation will be sent to your registered email address upon successful booking.
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
)

export default BookingConfirmationStep;

