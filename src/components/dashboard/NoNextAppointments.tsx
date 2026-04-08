import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

function NoNextAppointments() {
  return (
    <Card className="border border-primary/10 bg-card/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl relative group transition-all duration-700 hover:shadow-primary/5 font-['Manrope'] h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -z-10 group-hover:bg-primary/10 transition-all duration-700" />
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-black tracking-tighter font-['Space_Grotesk'] uppercase text-foreground">
          <div className="p-2 bg-primary/10 rounded-xl group-hover:rotate-12 transition-transform duration-500">
            <CalendarIcon className="size-5 text-primary" />
          </div>
          Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-10 text-muted-foreground relative">
          <div className="relative w-24 h-24 mx-auto mb-8 group-hover:scale-110 transition-transform duration-700">
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative w-full h-full bg-primary/[0.03] backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-primary/10 shadow-inner group-hover:border-primary/20 transition-all duration-500">
              <CalendarIcon className="size-10 text-primary/30 group-hover:text-primary/60 transition-colors duration-500" />
            </div>
          </div>
          <div className="space-y-3 mb-10">
            <h4 className="text-foreground text-xl font-black font-['Space_Grotesk'] uppercase tracking-tight leading-none">No Active Visits</h4>
            <p className="text-xs font-bold opacity-50 uppercase tracking-widest max-w-[200px] mx-auto">Schedule your professional AI dental consultation today.</p>
          </div>
          <Link href="/appointments">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl font-['Space_Grotesk'] uppercase tracking-[0.15em] text-[10px] h-14 transition-all hover:shadow-[0_20px_40px_-15px_rgba(var(--primary),0.3)] hover:-translate-y-1 active:scale-95 shadow-lg">
              Book Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoNextAppointments;
