import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BrainIcon, MessageSquareIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { FadeInUp } from "./MotionWrapper";


async function DentalHealthOverview() {
    let appointmentStats = {
  completedAppointments: 0,
  totalAppointments: 0,
};

let user = null;

try {
  appointmentStats = await getUserAppointmentStats();
  user = await currentUser();
} catch (error) {
  console.error("Error loading overview:", error);
}
    
  return (
    <FadeInUp delay={0.2}>
      <Card className="lg:col-span-2 border border-primary/10 bg-card/40 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-sm font-['Manrope'] h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl font-extrabold tracking-tight font-['Space_Grotesk'] uppercase">
            <BrainIcon className="size-6 text-primary" />
            Clinical Pulse
          </CardTitle>
          <CardDescription className="text-base font-semibold opacity-70 uppercase tracking-widest text-[10px]">
            Patient Diagnostic Overview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 font-['Space_Grotesk']">
            <div className="text-center p-6 bg-primary/[0.03] border border-primary/5 rounded-[1.5rem] transition-all hover:scale-105 hover:bg-primary/[0.05]">
              <div className="text-3xl md:text-5xl font-extrabold text-primary mb-1">
                {appointmentStats.completedAppointments}
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                Completed
              </div>
            </div>
            <div className="text-center p-6 bg-primary/[0.03] border border-primary/5 rounded-[1.5rem] transition-all hover:scale-105 hover:bg-primary/[0.05]">
              <div className="text-3xl md:text-5xl font-extrabold text-primary mb-1">
                {appointmentStats.totalAppointments}
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                Total Visits
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 text-center p-6 bg-primary/[0.03] border border-primary/5 rounded-[1.5rem] transition-all hover:scale-105 hover:bg-primary/[0.05]">
              <div className="text-xl md:text-2xl font-extrabold text-primary mb-1">
               {user?.createdAt
  ? format(new Date(user.createdAt), "MMM yyyy")
  : "N/A"}
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Member Since</div>
            </div>
          </div>

          <div className="relative p-6 bg-linear-to-br from-primary/[0.08] to-transparent rounded-[1.5rem] border border-primary/10 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full -z-10 group-hover:bg-primary/10 transition-colors" />
            
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="size-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                <MessageSquareIcon className="size-6 text-primary" />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-primary mb-1 font-['Space_Grotesk'] tracking-tight uppercase">
                    Ready to optimize your health?
                  </h4>
                  <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-lg font-['Manrope']">
                    Access priority booking or engage with our dental AI for localized treatment insights and emergency support.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/voice">
                    <Button size="lg" className="rounded-xl px-8 bg-primary font-bold shadow-lg shadow-primary/20 uppercase tracking-tight text-xs font-['Space_Grotesk'] transition-all hover:scale-[1.02] active:scale-95">
                      Try AI Assistant
                    </Button>
                  </Link>
                  <Link href="/appointments">
                    <Button size="lg" variant="outline" className="rounded-xl px-8 border-primary/20 font-bold hover:bg-primary/10 text-primary uppercase tracking-tight text-xs font-['Space_Grotesk'] transition-all hover:scale-[1.02] active:scale-95">
                      Book Visit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeInUp>
  );
}

export default DentalHealthOverview
