"use client";

import { useState } from "react";
import DentWiseLoader from "@/components/landing/DentWiseLoader";

export default function LandingWithLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <DentWiseLoader onComplete={() => setLoading(false)} duration={5000} />;
  }

  return <>{children}</>;
}