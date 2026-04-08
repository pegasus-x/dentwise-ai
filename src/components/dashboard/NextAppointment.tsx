import { getUserAppointments } from "@/lib/actions/appointments";
import { format, isAfter, isSameDay, parseISO } from "date-fns";
import NoNextAppointments from "./NoNextAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { FadeInUp } from "./MotionWrapper";

async function NextAppointment() {
  const appointments = await getUserAppointments();

  // filter for upcoming CONFIRMED appointments only (today or future)
  const upcomingAppointments =
    appointments?.filter((appointment)=> {
      const appointmentDate = parseISO(appointment.date);
      const today = new Date();
      const isUpcoming =
        isSameDay(appointmentDate, today) || isAfter(appointmentDate, today);
      return isUpcoming && appointment.status === "CONFIRMED";
    }) || [];
    
    // get the next appointment (the earliest one)
    const nextAppointment = upcomingAppointments[0];
    if (!nextAppointment) return <NoNextAppointments/ >; //no appointments, return nothing
    
    const appointmentDate = parseISO(nextAppointment.date);
    const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy");
    const isToday = isSameDay(appointmentDate, new Date());
    

  return (
    <FadeInUp delay={0.4}>
      <Card className="border border-primary/10 bg-card/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl relative group transition-all duration-500 hover:shadow-primary/5 hover:border-primary/30 font-['Manrope'] h-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -z-10 group-hover:bg-primary/20 transition-all duration-700 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 blur-[40px] rounded-full -z-10" />
        
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl font-black tracking-tighter font-['Space_Grotesk'] uppercase text-foreground">
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-500">
              <CalendarIcon className="size-5 text-primary" />
            </div>
            Next Visit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 shadow-inner group-hover:border-primary/30 transition-all duration-500">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary font-['Space_Grotesk']">
                {isToday ? "Happening Today" : "Confirmed Slot"}
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 bg-muted/20 px-3 py-1 rounded-lg border border-muted-foreground/10 font-['Space_Grotesk']">
              {nextAppointment.status}
            </span>
          </div>

          {/* Appointment Details */}
          <div className="space-y-8 relative">
            <div className="flex items-center gap-5 group/item transition-all duration-500 hover:translate-x-2">
              <div className="size-14 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/5 shadow-sm transition-all duration-500 group-hover/item:bg-primary/10 group-hover/item:border-primary/20 group-hover/item:shadow-primary/5">
                <UserIcon className="size-6 text-primary/70 group-hover/item:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] font-['Space_Grotesk']">
                  Specialist
                </p>
                <p className="font-black text-lg text-foreground leading-tight font-['Space_Grotesk'] group-hover/item:text-primary transition-colors">
                  {nextAppointment.doctorName}
                </p>
                <p className="text-xs text-muted-foreground font-bold tracking-tight opacity-70">
                  {nextAppointment.reason}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 group/item transition-all duration-500 hover:translate-x-2">
              <div className="size-14 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/5 shadow-sm transition-all duration-500 group-hover/item:bg-primary/10 group-hover/item:border-primary/20 group-hover/item:shadow-primary/5">
                <CalendarIcon className="size-6 text-primary/70 group-hover/item:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] font-['Space_Grotesk']">
                  Date
                </p>
                <p className="font-black text-lg text-foreground leading-tight font-['Space_Grotesk'] group-hover/item:text-primary transition-colors italic whitespace-nowrap">
                  {formattedDate}
                </p>
                <p className="text-xs text-primary font-black tracking-widest uppercase">
                  {isToday ? "Today" : format(appointmentDate, "EEEE")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 group/item transition-all duration-500 hover:translate-x-2">
              <div className="size-14 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/5 shadow-sm transition-all duration-500 group-hover/item:bg-primary/10 group-hover/item:border-primary/20 group-hover/item:shadow-primary/5">
                <ClockIcon className="size-6 text-primary/70 group-hover/item:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] font-['Space_Grotesk']">
                  Timing
                </p>
                <p className="font-black text-2xl text-primary leading-tight font-['Space_Grotesk'] tracking-tighter">
                  {nextAppointment.time}
                </p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Scheduled Time</p>
              </div>
            </div>
          </div>

          {/* More Appointments Count */}
          {upcomingAppointments.length > 1 && (
            <div className="pt-6 border-t border-primary/10 relative">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-center text-muted-foreground/30 group-hover:text-primary transition-all duration-500 cursor-default font-['Space_Grotesk']">
                +{upcomingAppointments.length - 1} Additional Sessions
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </FadeInUp>
  );
}

export default NextAppointment