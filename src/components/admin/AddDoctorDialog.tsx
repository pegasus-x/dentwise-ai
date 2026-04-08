import { useCreateDoctor } from "@/hooks/use-doctors";
import { Gender } from "@prisma/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { formatPhoneNumber } from "@/lib/utils";
import { UserPlus2, ShieldCheck, Mail, Phone, Fingerprint } from "lucide-react";

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE" as Gender,
    isActive: true,
  });

  const createDoctorMutation = useCreateDoctor();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber });
  };

  const handleSave = () => {
    createDoctorMutation.mutate({ ...newDoctor }, { onSuccess: handleClose });
  };

  const handleClose = () => {
    onClose();
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      isActive: true,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl bg-card/95 backdrop-blur-2xl rounded-[2.5rem] p-0 overflow-hidden ring-1 ring-white/10">
        <DialogHeader className="p-8 pb-4 bg-primary/5 border-b border-muted/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <UserPlus2 className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight">Onboard Specialist</DialogTitle>
          </div>
          <DialogDescription className="text-sm font-medium text-muted-foreground/80">
            Initialize a new medical practitioner record in the system database.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="new-name" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Full Name *</Label>
              <div className="relative">
                <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <Input
                  id="new-name"
                  className="h-12 pl-10 rounded-xl bg-background/50 border-muted/20 focus:border-primary/30 transition-all font-medium"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  placeholder="Dr. John Smith"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-speciality" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Speciality *</Label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <Input
                  id="new-speciality"
                   className="h-12 pl-10 rounded-xl bg-background/50 border-muted/20 focus:border-primary/30 transition-all font-medium"
                  value={newDoctor.speciality}
                  onChange={(e) => setNewDoctor({ ...newDoctor, speciality: e.target.value })}
                  placeholder="General Dentistry"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
              <Label htmlFor="new-email" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <Input
                  id="new-email"
                  type="email"
                   className="h-12 pl-10 rounded-xl bg-background/50 border-muted/20 focus:border-primary/30 transition-all font-medium text-xs"
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                  placeholder="doctor@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-phone" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Contact No.</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <Input
                  id="new-phone"
                   className="h-12 pl-10 rounded-xl bg-background/50 border-muted/20 focus:border-primary/30 transition-all font-medium"
                  value={newDoctor.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="212-555-1234"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="new-gender" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Gender</Label>
              <Select
                value={newDoctor.gender || ""}
                onValueChange={(value) => setNewDoctor({ ...newDoctor, gender: value as Gender })}
              >
                <SelectTrigger className="h-12 rounded-xl bg-background/50 border-muted/20 focus:ring-primary/20 transition-all font-medium">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-muted/20 backdrop-blur-xl">
                  <SelectItem value="MALE">Male Practitioner</SelectItem>
                  <SelectItem value="FEMALE">Female Practitioner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-status" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Initial Status</Label>
              <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, isActive: value === "active" })
                }
              >
                <SelectTrigger className="h-12 rounded-xl bg-background/50 border-muted/20 focus:ring-primary/20 transition-all font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-muted/20 backdrop-blur-xl">
                  <SelectItem value="active" className="text-emerald-500 font-bold">Active Service</SelectItem>
                  <SelectItem value="inactive" className="text-muted-foreground">On Standby</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 pt-4 flex items-center justify-end gap-3 bg-muted/5 border-t border-muted/20">
          <Button variant="ghost" className="rounded-xl font-bold text-xs" onClick={handleClose}>
            Discard
          </Button>

          <Button
            onClick={handleSave}
            className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold tracking-tight active:scale-95 transition-all"
            disabled={
              !newDoctor.name ||
              !newDoctor.email ||
              !newDoctor.speciality ||
              createDoctorMutation.isPending
            }
          >
            {createDoctorMutation.isPending ? "Processing..." : "Confirm Onboarding"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDoctorDialog;