"use client";

import { AppointmentConfirmationModal } from "@/components/appointments/AppointmentConfirmationModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import Navbar from "@/components/Navbar";
import {
  useBookAppointment,
  useUserAppointments,
} from "@/hooks/use-appointment";
import { APPOINTMENT_TYPES, cn } from "@/lib/utils";
import { DoctorAvatar } from "@/components/DoctorAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  Sparkles, 
  CheckCircle, 
  ArrowUpRight 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

function AppointmentsPage() {
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  const bookAppointmentMutation = useBookAppointment();
  const { data: userAppointments = [], isLoading: isAppointmentsLoading } = useUserAppointments();

  const handleDentistSelect = (dentistId: string) => {
    setSelectedDentistId(dentistId);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppointment = async () => {
    if (!selectedDentistId || !selectedDate || !selectedTime || !selectedType) {
      toast.error("Please complete all steps before confirming your appointment.");
      return;
    }
    const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);
    bookAppointmentMutation.mutate(
      {
        doctorId: selectedDentistId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentType?.name,
      },
      {
        onSuccess: async (appointment) => {
          setBookedAppointment(appointment);
          try {
            await fetch("/api/send-appointment-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userEmail: appointment.patientEmail,
                doctorName: appointment.doctorName,
                appointmentDate: format(new Date(appointment.date), "EEEE, MMMM d, yyyy"),
                appointmentTime: appointment.time,
                appointmentType: appointmentType?.name,
                duration: appointmentType?.duration,
                price: appointmentType?.price,
              }),
            });
          } catch (error) {
            console.error("Error sending confirmation email:", error);
          }
          setShowConfirmationModal(true);
          setSelectedDentistId(null);
          setSelectedDate("");
          setSelectedTime("");
          setSelectedType("");
          setCurrentStep(1);
        },
        onError: (error) => toast.error(`Failed to book appointment: ${error.message}`),
      },
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none opacity-50" />

      <Navbar />

      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Premium Care</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Reserve Your Session</h1>
            <p className="text-lg text-muted-foreground/80 max-w-xl">
              Connect with elite dental professionals and schedule your visit in seconds. 
              Quality care, tailored to your schedule.
            </p>
          </div>
          <ProgressSteps currentStep={currentStep} />
        </div>

        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {currentStep === 1 && (
                <DoctorSelectionStep
                  selectedDentistId={selectedDentistId}
                  onContinue={() => setCurrentStep(2)}
                  onSelectDentist={handleDentistSelect}
                />
              )}

              {currentStep === 2 && selectedDentistId && (
                <TimeSelectionStep
                  selectedDentistId={selectedDentistId}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedType={selectedType}
                  onBack={() => setCurrentStep(1)}
                  onContinue={() => setCurrentStep(3)}
                  onDateChange={setSelectedDate}
                  onTimeChange={setSelectedTime}
                  onTypeChange={setSelectedType}
                />
              )}

              {currentStep === 3 && selectedDentistId && (
                <BookingConfirmationStep
                  selectedDentistId={selectedDentistId}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  selectedType={selectedType}
                  isBooking={bookAppointmentMutation.isPending}
                  onBack={() => setCurrentStep(2)}
                  onModify={() => setCurrentStep(2)}
                  onConfirm={handleBookAppointment}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Upcoming Appointments Section */}
        {(isAppointmentsLoading || userAppointments.length > 0) && (
          <div className="mt-24 pt-12 border-t border-primary/10">
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-1">
                <h2 className="text-3xl font-black tracking-tight font-['Space_Grotesk'] text-foreground">
                  Your Scheduled Sessions
                </h2>
                <p className="text-sm text-muted-foreground/80 font-medium">
                  Manage and keep track of your elite dental care visits
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 mx-12 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {isAppointmentsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-card/20 backdrop-blur-xl border border-primary/5 rounded-[2.5rem] p-8 space-y-8 h-[400px]">
                    <div className="flex justify-center">
                      <Skeleton className="w-24 h-6 rounded-full bg-primary/10" />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <Skeleton className="size-20 rounded-full bg-primary/10" />
                      <div className="space-y-2 w-full flex flex-col items-center">
                        <Skeleton className="h-6 w-32 bg-primary/10" />
                        <Skeleton className="h-4 w-24 bg-primary/10" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-primary/5">
                      <div className="space-y-2 flex flex-col items-center">
                        <Skeleton className="h-2 w-16 bg-primary/10" />
                        <Skeleton className="h-4 w-20 bg-primary/10" />
                      </div>
                      <div className="space-y-2 flex flex-col items-center">
                        <Skeleton className="h-2 w-16 bg-primary/10" />
                        <Skeleton className="h-4 w-20 bg-primary/10" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                userAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.7, 
                      ease: [0.21, 0.45, 0.32, 0.9] 
                    }}
                    whileHover={{ y: -8, scale: 1.01 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />
                    
                    <div className="relative bg-card/30 backdrop-blur-3xl border border-primary/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_45px_100px_-20px_rgba(var(--primary),0.12)] overflow-hidden h-full">
                      {/* Inner Glow Effect */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Status & Date Row */}
                      <div className="flex items-center justify-center mb-8 relative">
                        <Badge className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 shadow-none",
                          appointment.status === "CONFIRMED" 
                            ? "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/20" 
                            : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 group-hover:bg-emerald-500/20"
                        )}>
                          {appointment.status === "CONFIRMED" ? (
                            <span className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                              Confirmed
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <CheckCircle className="w-3.5 h-3.5" />
                              Completed
                            </span>
                          )}
                        </Badge>
                      </div>

                      <div className="flex flex-col items-center text-center gap-5 mb-10 relative">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 scale-125" />
                          <div className="relative rounded-full p-1 border-2 border-primary/5 transition-colors duration-500 group-hover:border-primary/20">
                            <DoctorAvatar
                              name={appointment.doctorName}
                              gender={appointment.doctorGender}
                              imageUrl={appointment.doctorImageUrl}
                              className="size-24 rounded-full border-4 border-background/50 shadow-2xl z-10 transition-transform duration-700 group-hover:scale-110"
                              size={96}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-black text-2xl tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500 font-['Space_Grotesk']">
                            {appointment.doctorName}
                          </h4>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted/30 rounded-lg border border-muted-foreground/5">
                            <span className="text-[10px] font-extrabold text-muted-foreground/80 uppercase tracking-widest">
                              {appointment.reason}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-0 pt-8 border-t border-primary/10">
                        <div className="flex flex-col gap-2 items-center px-4">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Scheduled Date</span>
                          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-primary/5 rounded-2xl border border-primary/5 group-hover:border-primary/20 transition-all duration-500">
                            <Calendar className="w-3.5 h-3.5 text-primary/70" />
                            <span className="text-xs font-bold tracking-tight text-foreground/90">
                              {format(new Date(appointment.date), "MMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 items-center px-4 border-l border-primary/10">
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Selected Time</span>
                          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-primary/5 rounded-2xl border border-primary/5 group-hover:border-primary/20 transition-all duration-500">
                            <Clock className="w-3.5 h-3.5 text-primary/70" />
                            <span className="text-xs font-bold tracking-tight text-foreground/90 uppercase">
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Arrow Decoration */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-40 transition-opacity duration-500 transform translate-y-1 group-hover:translate-y-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </motion.main>

      {bookedAppointment && (
        <AppointmentConfirmationModal
          open={showConfirmationModal}
          onOpenChange={setShowConfirmationModal}
          appointmentDetails={{
            doctorName: bookedAppointment.doctorName,
            appointmentDate: format(new Date(bookedAppointment.date), "EEEE, MMMM d, yyyy"),
            appointmentTime: bookedAppointment.time,
            userEmail: bookedAppointment.patientEmail,
          }}
        />
      )}
    </div>
  );
}

export default AppointmentsPage;

