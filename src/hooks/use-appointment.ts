"use client";

import { getAppointments } from "@/lib/actions/appointments";
import { useQuery } from "@tanstack/react-query";
import { get } from "http";

export function useGetAppointments() {
    const result = useQuery({
        queryKey: ["getAppointments"],
        queryFn: getAppointments,
    });

    return result;
}