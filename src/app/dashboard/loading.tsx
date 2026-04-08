import { WelcomeSkeleton, OverviewSkeleton, AppointmentSkeleton } from "@/components/dashboard/DashboardSkeletons";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pt-24 space-y-8 font-['Manrope']">
      <WelcomeSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="h-64 bg-primary/[0.03] backdrop-blur-md rounded-[2rem] animate-pulse border border-primary/10" />
        <div className="h-64 bg-primary/[0.03] backdrop-blur-md rounded-[2rem] animate-pulse border border-primary/10" />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OverviewSkeleton />
        </div>
        <div className="lg:col-span-1">
          <AppointmentSkeleton />
        </div>
      </div>
    </div>
  );
}
