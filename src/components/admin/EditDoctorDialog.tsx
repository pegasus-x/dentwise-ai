import { useUpdateDoctor } from "@/hooks/use-doctors";
import { formatPhoneNumber } from "@/lib/utils";
import { Doctor, Gender } from "@prisma/client";
import { useState, useEffect } from "react";
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
import { Settings2, ShieldCheck, Mail, Phone, Fingerprint } from "lucide-react";

interface EditDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

function EditDoctorDialog({ doctor, isOpen, onClose }: EditDoctorDialogProps) {
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(doctor);

  // keep internal state in sync with prop
  useEffect(() => {
    setEditingDoctor(doctor);
  }, [doctor]);

  const updateDoctorMutation = useUpdateDoctor();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    if (editingDoctor) {
      setEditingDoctor({ ...editingDoctor, phone: formattedPhoneNumber });
    }
  };

  const handleSave = () => {
    if (editingDoctor) {
      updateDoctorMutation.mutate({ ...editingDoctor }, { onSuccess: handleClose });
    }
  };

  const handleClose = () => {
    onClose();
    setEditingDoctor(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl bg-card/95 backdrop-blur-2xl rounded-[2.5rem] p-0 overflow-hidden ring-1 ring-white/10">
        <DialogHeader className="p-8 pb-4 bg-primary/5 border-b border-muted/20">
           <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight">Edit Specialist</DialogTitle>
          </div>
          <DialogDescription className="text-sm font-medium text-muted-foreground/80">
            Modify the credentials or availability status of this practitioner.
          </DialogDescription>
        </DialogHeader>

        {editingDoctor && (
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Full Name</Label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <Input
                    id="edit-name"
                    className="h-12 pl-10 rounded-xl bg-background/50 border-muted/20 focus:border-primary/30 transition-all font-medium"
                    value={editingDoctor.name}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-speciality" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Speciality</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <Input
                    id="edit-speciality"
                    className="h-12 pl-10 rounded-xl bg-background/50 border-muted/20 focus:border-primary/30 transition-all font-medium"
                    value={editingDoctor.speciality}
                    onChange={(e) =>
                      setEditingDoctor({ ...editingDoctor, speciality: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <Input
                    id="edit-email"
                    type="email"
                    className="h-12 pl-10 rounded-xl bg-background/50 border-muted/20 focus:border-primary/30 transition-all font-medium text-xs"
                    value={editingDoctor.email}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
                  />
                </div>
              </div>

               <div className="space-y-2">
                <Label htmlFor="edit-phone" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <Input
                    id="edit-phone"
                    className="h-12 pl-10 rounded-xl bg-background/50 border-muted/20 focus:border-primary/30 transition-all font-medium"
                    value={editingDoctor.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="edit-gender" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Gender</Label>
                <Select
                  value={editingDoctor.gender || ""}
                  onValueChange={(value) =>
                    setEditingDoctor({ ...editingDoctor, gender: value as Gender })
                  }
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
                <Label htmlFor="edit-status" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Service Status</Label>
                <Select
                  value={editingDoctor.isActive ? "active" : "inactive"}
                  onValueChange={(value) =>
                    setEditingDoctor({ ...editingDoctor, isActive: value === "active" })
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
        )}

        <div className="p-8 pt-4 flex items-center justify-end gap-3 bg-muted/5 border-t border-muted/20">
          <Button variant="ghost" className="rounded-xl font-bold text-xs" onClick={handleClose}>
            Discard
          </Button>
          <Button
            onClick={handleSave}
            className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold tracking-tight active:scale-95 transition-all"
            disabled={updateDoctorMutation.isPending}
          >
            {updateDoctorMutation.isPending ? "Syncing..." : "Update Record"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditDoctorDialog;