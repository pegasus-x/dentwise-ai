import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function DoctorCardSkeleton() {
  return (
    <Card className="bg-card/20 backdrop-blur-xl border border-primary/5 rounded-[2.5rem] overflow-hidden p-8 space-y-8 h-full">
      <div className="flex items-center gap-5">
        <Skeleton className="size-20 rounded-[28px] bg-primary/10" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-3 w-16 rounded-full bg-primary/10 opacity-60" />
          <Skeleton className="h-6 w-32 rounded-lg bg-primary/10" />
          <Skeleton className="h-4 w-24 rounded-md bg-primary/10 opacity-70" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-8 bg-primary/10" />
          <Skeleton className="h-2 w-12 bg-primary/5 rounded-full" />
        </div>
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-10 bg-primary/10" />
          <Skeleton className="h-2 w-12 bg-primary/5 rounded-full" />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-3">
          <Skeleton className="w-4 h-4 bg-primary/10" />
          <Skeleton className="h-4 w-32 bg-primary/10" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-4 h-4 bg-primary/10" />
          <Skeleton className="h-4 w-40 bg-primary/10" />
        </div>
      </div>

      <div className="pt-4">
        <Skeleton className="h-14 w-full bg-primary/5 rounded-2xl" />
      </div>
    </Card>
  );
}

export function DoctorCardsLoading() {
  // this will show 6 skeleton cards
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <DoctorCardSkeleton key={i} />
      ))}
    </div>
  );
}
