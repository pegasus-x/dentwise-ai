import { NextResponse } from "next/server";
import { bookAppointment } from "@/lib/actions/appointments";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📥 API received:", body);

    // ✅ AUTO SELECT DOCTOR
    let doctorId = body.doctorId;

    if (!doctorId || doctorId === "auto") {
      const doctor = await prisma.doctor.findFirst({
        where: { isActive: true },
      });

      if (!doctor) {
        throw new Error("No doctors available");
      }

      doctorId = doctor.id;
    }

    const result = await bookAppointment({
      doctorId, // ✅ now dynamic
      date: body.date,
      time: body.time,
      reason: body.reason,
      userId: body.userId,
    });

    console.log("✅ Appointment created:", result);

    return NextResponse.json({ success: true, result });

  } catch (error: any) {
    console.error("❌ API Error:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}