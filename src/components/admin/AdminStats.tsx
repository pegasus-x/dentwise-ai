import { Users, Calendar, UserCheck, Clock } from "lucide-react";

interface AdminStatsProps {
  totalDoctors: number;
  activeDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
}

function AdminStats({
  activeDoctors,
  totalDoctors,
  completedAppointments,
  totalAppointments,
}: AdminStatsProps) {
  const statsData = [
    {
      label: "Specialists",
      value: totalDoctors,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Active Now",
      value: activeDoctors,
      icon: UserCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Sessions",
      value: totalAppointments,
      icon: Calendar,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Completed",
      value: completedAppointments,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="relative mb-12">
      {/* Background Decorative Line (Desktop) */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-y-1/2 hidden lg:block" />
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {statsData.map((stat, index) => (
          <div 
            key={index} 
            className="group relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-[2rem] bg-card/40 backdrop-blur-md border border-white/5 hover:bg-card/60 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/5"
          >
            {/* Animated Ring on Hover */}
            <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100" />
            
            <div className={`mb-4 w-12 h-12 sm:w-16 sm:h-16 ${stat.bg} rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[10deg] shadow-inner`}>
              <stat.icon className={`size-6 sm:size-8 ${stat.color} filter drop-shadow-sm`} />
            </div>

            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black tracking-tighter tabular-nums drop-shadow-sm">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                {stat.label}
              </div>
            </div>

            {/* Indicator Dot */}
            <div className="mt-4 flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1 w-1 rounded-full ${i === 2 ? stat.color.replace('text', 'bg') : 'bg-muted/20'} transition-all group-hover:w-3`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminStats;