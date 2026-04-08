"use client";

import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";
import Navbar from "@/components/Navbar";
import { useGetAppointments } from "@/hooks/use-appointment";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon, Crown } from "lucide-react";

function AdminDashboardClient() {
  const { user } = useUser();
  const { data: doctors = [], isLoading: doctorsLoading } = useGetDoctors();
  const { data: appointments = [], isLoading: appointmentsLoading } = useGetAppointments();

  // calculate stats from real data
  const stats = {
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter((doc) => doc.isActive).length,
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter((app) => app.status === "COMPLETED").length,
  };

  if (doctorsLoading || appointmentsLoading) return <LoadingUI />;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-background via-background to-primary/5">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* ADMIN WELCOME SECTION */}
        <div className="mb-10 relative overflow-hidden bg-gradient-to-br from-card/80 to-background/40 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 border border-primary/10 shadow-2xl group transition-all duration-500 hover:border-primary/20">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:bg-primary/20 transition-all duration-700 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-[80px] group-hover:bg-primary/10 transition-all duration-700" />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-6 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md shadow-inner">
                <Crown className="w-3.5 h-3.5 text-primary animate-bounce" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">System Administration</span>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                  Welcome back, <br className="sm:hidden" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 italic px-1">
                    {user?.firstName || "Admin"}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                  Your practice analytics are looking <span className="text-primary font-bold">excellent</span>. You have <span className="text-foreground font-semibold decoration-primary/30 decoration-2 underline-offset-4 underline">{stats.totalAppointments}</span> active sessions across <span className="text-foreground font-semibold decoration-primary/30 decoration-2 underline-offset-4 underline">{stats.totalDoctors}</span> elite specialists.
                </p>
              </div>
            </div>

            <div className="relative group/icon">
              <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full scale-75 group-hover/icon:scale-110 transition-transform duration-700" />
              <div className="relative w-32 h-32 sm:w-44 sm:h-44 bg-gradient-to-br from-card/90 to-primary/5 rounded-[3rem] flex items-center justify-center rotate-3 group-hover:rotate-12 transition-all duration-700 border border-primary/10 shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <SettingsIcon className="w-16 h-16 sm:w-24 sm:h-24 text-primary/90 filter drop-shadow-lg animate-[spin_8s_linear_infinite]" />
              </div>
            </div>
          </div>
        </div>

        <AdminStats
          totalDoctors={stats.totalDoctors}
          activeDoctors={stats.activeDoctors}
          totalAppointments={stats.totalAppointments}
          completedAppointments={stats.completedAppointments}
        />

        <div className="space-y-12">
          <DoctorsManagement />
          <RecentAppointments />
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground border-t border-muted/20">
        &copy; {new Date().getFullYear()} Dentwise AI. All system records are synchronized and secure.
      </footer>
    </div>
  );
}

export default AdminDashboardClient;

function LoadingUI() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-muted-foreground animate-pulse">Initializing dashboard...</p>
          </div>
        </div>
      </div>
    </div>
  );
}