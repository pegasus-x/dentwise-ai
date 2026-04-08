import { useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  EditIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  StethoscopeIcon,
  TrendingUp,
  UserCheck2,
  Users2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";
import { Doctor } from "@prisma/client";
import { DoctorAvatar } from "../DoctorAvatar";

function DoctorsManagement() {
  const { data: doctors = [], isLoading } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  if (isLoading) return null;

  return (
    <>
      <Card className="border-none shadow-2xl bg-card/40 backdrop-blur-md overflow-hidden mb-12 ring-1 ring-white/5">
        {/* HEADER */}
        <CardHeader className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-muted/20 bg-muted/5">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-2.5">
               <div className="p-2 bg-primary/10 rounded-xl">
                 <StethoscopeIcon className="size-5 text-primary" />
               </div>
              Practitioner Registry
            </CardTitle>
            <CardDescription className="text-sm font-medium text-muted-foreground/80">
              Database of medical specialists and their availability status
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 h-11 px-6 font-bold tracking-tight rounded-xl"
          >
            <PlusIcon className="mr-2 size-4 stroke-[3px]" />
            Onboard New Specialist
          </Button>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="p-6">
          <div className="grid gap-6">
            {doctors.length === 0 ? (
              <div className="text-center py-20 bg-muted/5 border-2 border-dashed border-muted rounded-[2.5rem]">
                <div className="p-4 bg-muted/10 rounded-full w-fit mx-auto mb-4">
                  <Users2 className="size-10 text-muted-foreground/40" />
                </div>
                <p className="text-lg font-bold text-muted-foreground tracking-tight">No practitioners found in records.</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Start by adding your first medical specialist.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="
                      group relative flex flex-col sm:flex-row items-center gap-6
                      p-6 rounded-[2rem] border border-muted/20 bg-background/40 hover:bg-background/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-primary/30 transition-all duration-500
                    "
                  >
                    {/* LEFT SIDE: AVATAR & STATUS */}
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                      <DoctorAvatar
                        name={doctor.name}
                        gender={doctor.gender}
                        imageUrl={doctor.imageUrl}
                        className="relative size-20 rounded-[1.75rem] shrink-0 ring-4 ring-background shadow-xl group-hover:scale-105 transition-all duration-500"
                        size={80}
                      />
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-4 border-background rounded-full z-10 ${doctor.isActive ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-muted'}`} />
                    </div>

                    {/* CENTER: INFO */}
                    <div className="flex-1 space-y-4 text-center sm:text-left min-w-0">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <h3 className="font-black text-xl tracking-tighter group-hover:text-primary transition-colors truncate">{doctor.name}</h3>
                          <Badge variant="outline" className="h-5 px-1.5 text-[9px] font-black uppercase tracking-tighter bg-primary/5 text-primary border-primary/20">
                            {doctor.speciality}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground whitespace-nowrap">
                            <MailIcon className="h-3.5 w-3.5 text-primary/60" />
                            {doctor.email}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                            <PhoneIcon className="h-3.5 w-3.5 text-primary/60" />
                            {doctor.phone}
                          </div>
                        </div>
                      </div>

                      {/* STATS STRIP */}
                      <div className="flex items-center justify-center sm:justify-start gap-4 py-2 px-3 bg-muted/10 rounded-xl w-fit">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                            <TrendingUp className="size-3 text-emerald-600" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-black leading-none">{doctor.appointmentCount}</span>
                            <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">Total Active</span>
                          </div>
                        </div>
                        <div className="w-[1px] h-6 bg-muted/20" />
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-primary/10 rounded-lg">
                            <UserCheck2 className="size-3 text-primary" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-xs font-black leading-none">{doctor.isActive ? "100%" : "0%"}</span>
                             <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">Ready</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS: ABSOLUTE OR SIDE */}
                    <div className="sm:absolute sm:top-6 sm:right-6">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90"
                        onClick={() => handleEditDoctor(doctor)}
                        title="Edit Practitioner Properties"
                      >
                        <EditIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* DIALOGS */}
      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <EditDoctorDialog
        key={selectedDoctor?.id}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}
      />
    </>
  );
}

export default DoctorsManagement;
