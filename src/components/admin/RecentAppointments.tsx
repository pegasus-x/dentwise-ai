import { useGetAppointments, useUpdateAppointmentStatus, useDeleteAppointment } from "@/hooks/use-appointment";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Trash2, CheckCircle2, Clock, User, Stethoscope, ClipboardList, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

function RecentAppointments() {
  const { data: appointments = [], isLoading } = useGetAppointments();
  const updateAppointmentMutation = useUpdateAppointmentStatus();
  const deleteAppointmentMutation = useDeleteAppointment();

  const handleToggleAppointmentStatus = (appointmentId: string) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    const newStatus = appointment?.status === "CONFIRMED" ? "COMPLETED" : "CONFIRMED";
    updateAppointmentMutation.mutate({ id: appointmentId, status: newStatus });
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      deleteAppointmentMutation.mutate(appointmentId, {
        onSuccess: () => {
          toast.success("Appointment deleted successfully");
        },
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20 gap-1.5 px-3 py-1 transition-all font-bold text-[10px] uppercase tracking-wider">
            <Clock className="w-3 h-3" />
            Confirmed
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 gap-1.5 px-3 py-1 transition-all font-bold text-[10px] uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-md overflow-hidden ring-1 ring-white/5">
        <CardHeader className="pb-6 border-b border-muted/20 bg-muted/5">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 bg-primary/10 rounded-lg" />
              <Skeleton className="h-4 w-64 bg-primary/10 rounded-md" />
            </div>
            <Skeleton className="h-6 w-24 bg-primary/10 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden md:block">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow className="border-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableHead key={i}><Skeleton className="h-4 w-20 bg-primary/5 mx-auto" /></TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-b border-muted/5">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j} className="py-6 px-8">
                        <Skeleton className="h-10 w-full bg-primary/5 rounded-xl" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="md:hidden p-4 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full bg-primary/10 rounded-3xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-md overflow-hidden mb-12 ring-1 ring-white/5">
      <CardHeader className="pb-6 border-b border-muted/20 bg-muted/5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-2.5">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              Appointment Ledger
            </CardTitle>
            <CardDescription className="text-sm font-medium text-muted-foreground/80">
              Live overview of all upcoming and past dental sessions
            </CardDescription>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <Badge variant="secondary" className="font-bold text-[10px] px-2 py-1 bg-background/50 backdrop-blur-sm border-muted/30">
              {appointments.length} TOTAL ENTRIES
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/10">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="font-bold text-[11px] uppercase tracking-[0.1em] text-muted-foreground px-8 py-5">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 opacity-50" />
                    Patient
                  </div>
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-3.5 h-3.5 opacity-50" />
                    Specialist
                  </div>
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Scheduled Time</TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-3.5 h-3.5 opacity-50" />
                    Procedures
                  </div>
                </TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-[0.1em] text-muted-foreground text-center">Status</TableHead>
                <TableHead className="font-bold text-[11px] uppercase tracking-[0.1em] text-muted-foreground text-right px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <AnimatePresence mode="popLayout">
                {appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center text-muted-foreground italic font-medium">
                      No active sessions in the database.
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments.map((appointment, index) => (
                    <motion.tr
                      key={appointment.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="group hover:bg-primary/[0.03] transition-all duration-300 border-b border-muted/10 relative overflow-hidden"
                    >
                      <TableCell className="px-8 py-6 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-primary group-hover:h-3/4 transition-all duration-500 rounded-r-full" />
                        <div className="flex flex-col">
                          <span className="font-bold text-base text-foreground tracking-tight group-hover:text-primary transition-colors">
                            {appointment.patientName}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                            {appointment.patientEmail}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-8 bg-primary/5 rounded-lg flex items-center justify-center border border-primary/5 group-hover:bg-primary/10 transition-colors">
                            <Stethoscope className="w-4 h-4 text-primary/60" />
                          </div>
                          <span className="font-bold text-sm tracking-tight">{appointment.doctorName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
                            <Calendar className="w-3.5 h-3.5 text-primary/40" />
                            {new Date(appointment.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-primary/70 uppercase tracking-widest pl-5">
                            <Clock className="w-3 h-3 opacity-50" />
                            {appointment.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/30 rounded-xl border border-muted-foreground/5 group-hover:border-primary/10 transition-colors">
                            <ClipboardList className="w-3 h-3 text-muted-foreground/40" />
                            <span className="text-[11px] font-medium text-muted-foreground line-clamp-1 italic">
                              {appointment.reason || "General consultation"}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleToggleAppointmentStatus(appointment.id)}
                          className="shadow-sm rounded-full"
                          title="Change session status"
                        >
                          {getStatusBadge(appointment.status)}
                        </motion.button>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all rounded-2xl border border-transparent hover:border-destructive/10"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* MOBILE CARDS VIEW */}
        <div className="md:hidden grid gap-6 p-6">
          <AnimatePresence mode="popLayout">
            {appointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card/40 border border-primary/10 rounded-[2rem] p-6 space-y-6 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-[40px] rounded-full -z-1 transition-all duration-500 group-hover:bg-primary/10" />
                
                <div className="flex items-start justify-between relative">
                  <div className="space-y-1">
                    <div className="font-black text-xl tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {appointment.patientName}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">
                      {appointment.patientEmail}
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleToggleAppointmentStatus(appointment.id)}
                  >
                    {getStatusBadge(appointment.status)}
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-primary/5 relative">
                  <div className="space-y-1">
                    <div className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Time Slot</div>
                    <div className="flex items-center gap-2 text-sm font-bold text-primary/80">
                      <Clock className="w-3.5 h-3.5" />
                      {appointment.time}
                    </div>
                  </div>
                  <div className="space-y-1 pl-4 border-l border-primary/5">
                    <div className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Scheduled Date</div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Calendar className="w-3.5 h-3.5 opacity-40" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1 relative">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/5">
                      <Stethoscope className="w-5 h-5 text-primary/70" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-widest">Specialist</span>
                      <span className="text-sm font-bold tracking-tight">{appointment.doctorName}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    className="h-11 w-11 text-destructive/40 hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentAppointments;