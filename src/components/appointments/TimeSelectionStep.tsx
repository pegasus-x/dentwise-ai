"use client";

import { useBookedTimeSlots } from "@/hooks/use-appointment";
import {
  APPOINTMENT_TYPES,
  getAvailableTimeSlots,
  getNext5Days,
} from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft, Clock, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface TimeSelectionStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onTypeChange: (type: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

function TimeSelectionStep({
  onBack,
  onContinue,
  selectedDate,
  selectedTime,
  selectedType,
  onDateChange,
  onTimeChange,
  onTypeChange,
  selectedDentistId,
}: TimeSelectionStepProps) {
  const { data: bookedTimeSlots = [] } = useBookedTimeSlots(
    selectedDentistId,
    selectedDate,
  );

  const availableDates = getNext5Days();
  const availableTimeSlots = getAvailableTimeSlots();

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="rounded-xl hover:bg-primary/10 hover:text-primary">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Change Practitioner
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Appointment Type Selection */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/10 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-primary" />
             </div>
             <h3 className="text-xl font-bold tracking-tight">Select Treatment</h3>
          </div>
          
          <div className="space-y-4">
            {APPOINTMENT_TYPES.map((type) => (
              <Card
                key={type.id}
                className={`relative cursor-pointer transition-all duration-300 rounded-2xl border-2 hover:border-primary/30 overflow-hidden ${
                  selectedType === type.id ? "border-primary bg-primary/5 shadow-lg" : "border-primary/5 bg-card/40"
                }`}
                onClick={() => onTypeChange(type.id)}
              >
                <CardContent className="p-5">
                  <div className="flex justify-between items-center relative z-10">
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg">{type.name}</h4>
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        <Clock className="w-3 h-3" />
                        {type.duration} Session
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="font-black text-xl text-primary">{type.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-primary" />
               </div>
               <h3 className="text-xl font-bold tracking-tight">Available Schedule</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableDates.map((date) => {
                const dateObj = new Date(date);
                const isSelected = selectedDate === date;
                return (
                  <button
                    key={date}
                    onClick={() => onDateChange(date)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected 
                        ? "bg-primary border-primary text-primary-foreground shadow-lg" 
                        : "bg-card/40 border-primary/5 hover:border-primary/20 text-foreground"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">
                      {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    <span className="text-lg font-black leading-none my-1">
                      {dateObj.getDate()}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">
                      {dateObj.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {selectedDate && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                   <Clock className="w-4 h-4 text-primary" />
                   <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Select Time Window</h4>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {availableTimeSlots.map((time) => {
                    const isBooked = bookedTimeSlots.includes(time);
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        disabled={isBooked}
                        onClick={() => onTimeChange(time)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 border-2 ${
                          isSelected 
                            ? "bg-primary border-primary text-primary-foreground shadow-md" 
                            : isBooked 
                              ? "bg-muted/30 border-transparent text-muted-foreground opacity-50 cursor-not-allowed" 
                              : "bg-card/40 border-primary/5 hover:border-primary/20 text-foreground"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedType && selectedDate && selectedTime && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end pt-10"
          >
            <Button 
                onClick={onContinue}
                className="h-14 px-10 rounded-[20px] text-lg font-bold shadow-[0_10px_40px_rgba(var(--primary),0.3)] hover:scale-[1.02] transition-transform flex items-center gap-3"
              >
                Finalize Booking
                <ArrowRight className="w-5 h-5" />
              </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TimeSelectionStep;

