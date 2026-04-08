"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function WelcomeSkeleton() {
  return (
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between bg-primary/[0.03] backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-primary/10 mb-8 md:mb-12 overflow-hidden shadow-2xl transition-all duration-700">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full -mr-32 -mt-32 blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-[80px]" />
      <div className="space-y-6 text-center md:text-left w-full md:w-2/3 relative z-10">
        <Skeleton className="h-6 w-32 rounded-full bg-primary/10" />
        <div className="space-y-3">
          <Skeleton className="h-12 md:h-16 w-3/4 rounded-2xl bg-primary/10" />
          <Skeleton className="h-6 w-1/2 rounded-xl bg-primary/10 opacity-60" />
        </div>
      </div>
      <Skeleton className="mt-10 md:mt-0 size-28 md:size-40 rounded-[2.5rem] bg-primary/10 relative z-10" />
    </div>
  );
}

export function OverviewSkeleton() {
  return (
    <Card className="lg:col-span-2 border border-primary/10 bg-card/40 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-sm">
      <CardContent className="p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-40 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-[1.5rem]" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-[1.5rem]" />
      </CardContent>
    </Card>
  );
}

export function AppointmentSkeleton() {
  return (
    <Card className="border border-primary/10 bg-card/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl relative h-full">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-[40px] rounded-full -z-10" />
      <CardContent className="p-8 space-y-10">
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <Skeleton className="size-6 rounded-lg bg-primary/10" />
            <Skeleton className="h-6 w-40 rounded-lg bg-primary/10" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-28 rounded-full bg-primary/10" />
          <Skeleton className="h-6 w-16 rounded-md bg-primary/10 opacity-50" />
        </div>

        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-5 items-center">
              <Skeleton className="size-12 rounded-2xl bg-primary/10 shrink-0" />
              <div className="space-y-2.5 flex-1">
                <Skeleton className="h-5 w-3/4 rounded-lg bg-primary/10" />
                <Skeleton className="h-3.5 w-1/2 rounded-md bg-primary/10 opacity-70" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pt-28 md:pt-32 lg:pt-40 space-y-16 md:space-y-24">
      {/* Back button & badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Skeleton className="h-10 w-40 rounded-full bg-primary/10" />
        <Skeleton className="h-8 w-32 rounded-full bg-primary/10" />
      </div>

      {/* Hero section */}
      <div className="text-center space-y-10 max-w-4xl mx-auto py-12">
        <div className="space-y-6">
          <Skeleton className="h-16 md:h-24 w-3/4 mx-auto rounded-3xl bg-primary/10" />
          <Skeleton className="h-6 w-1/2 mx-auto rounded-xl bg-primary/10 opacity-60" />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Skeleton className="h-14 w-48 rounded-full bg-primary/10" />
          <Skeleton className="h-14 w-48 rounded-full bg-primary/10 border border-primary/20" />
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="h-56 border-primary/10 bg-card/40 backdrop-blur-md rounded-[2rem] p-8 space-y-6">
            <Skeleton className="size-14 rounded-2xl bg-primary/10" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-2/3 rounded-lg bg-primary/10" />
              <Skeleton className="h-4 w-full rounded-md bg-primary/10 opacity-50" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
