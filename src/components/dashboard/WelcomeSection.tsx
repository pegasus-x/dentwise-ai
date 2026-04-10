import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { FadeInUp } from "./MotionWrapper";

export default async function WelcomeSection() {
  const user = await currentUser();

  const hour = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  hour12: false,
});

const currentHour = parseInt(hour);

  return (
    <FadeInUp>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between bg-primary/[0.03] backdrop-blur-md rounded-[2rem] p-6 md:p-10 border border-primary/10 mb-8 md:mb-12 overflow-hidden shadow-sm font-['Manrope']">
        {/* Decorative gradient glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full -z-10" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 blur-[80px] rounded-full -z-10" />

        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 transition-transform hover:scale-105">
            <div className="size-1.5 bg-primary rounded-full animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary font-['Space_Grotesk']">
              Online & Ready
            </span>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-['Space_Grotesk'] leading-tight">
              Good{" "}
              <span className="text-primary">
               {currentHour < 12
                  ? "Morning"
              : currentHour < 18
                 ? "Afternoon"
                 : "Evening"}
               </span>  
              , {user?.firstName}
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-sm font-medium leading-relaxed opacity-70">
              Professional AI Dental care at your fingertips. Monitoring your oral health 24/7.
            </p>
          </div>
        </div>

        <div className="mt-8 md:mt-0 flex items-center justify-center size-24 md:size-32 bg-primary/10 backdrop-blur-xl rounded-full border border-primary/20 shadow-inner group transition-transform duration-500 hover:rotate-12">
          <Image
            src="/logo.png"
            alt="DentWise"
            width={64}
            height={64}
            className="w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl transition-transform group-hover:scale-110"
          />
        </div>
      </div>
    </FadeInUp>
  );
}
