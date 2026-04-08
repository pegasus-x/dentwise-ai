import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import MainActions from "@/components/dashboard/MainActions";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import DentalHealthOverview from "@/components/dashboard/DentalHealthOverview";
import NextAppointment from "@/components/dashboard/NextAppointment";
import {
  WelcomeSkeleton,
  OverviewSkeleton,
  AppointmentSkeleton,
} from "@/components/dashboard/DashboardSkeletons";

function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24 font-['Manrope']">
        <Suspense fallback={<WelcomeSkeleton />}>
          <WelcomeSection />
        </Suspense>
        
        <MainActions />
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Suspense fallback={<OverviewSkeleton />}>
              <DentalHealthOverview />
            </Suspense>
          </div>
          <div className="lg:col-span-1">
            <Suspense fallback={<AppointmentSkeleton />}>
              <NextAppointment />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
