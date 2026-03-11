import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
import resend from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    try {
        const body = await request.json();
        const {
            userEmail,
            doctorName,
            appointmentDate,
            appointmentTime,
            appointmentType,
            duration,
            price
        } = body;

        // validate required fields
        if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // send email using resend
        const { data, error } = await resend.emails.send({
            from: "DentWise <no-reply@resend.dev>",// do not use this in production, only for testing purposes
            to: [userEmail],
            subject: "Appointment Confirmation - DentWise",
            react: AppointmentConfirmationEmail({
                doctorName,
                appointmentDate,
                appointmentTime,
                appointmentType,
                duration,
                price
            }),
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 500 });
        }
        return NextResponse.json(
            { message: "Email sent successfully", emaiId: data?.id },
            { status: 200 }
        );

    } catch (error) {
        console.error("Email sending error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}