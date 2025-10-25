import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { BookingConfirmationEmail } from "@/components/emails/booking-confirmation"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, dateOfBirth, hasHealthCard, reasonForVisit, bookingMethod, facility } =
      body

    // Generate booking ID
    const bookingId = `BK${Date.now().toString().slice(-8)}`

    let emailSent = false
    let emailError = null

    try {
      const { data, error } = await resend.emails.send({
        from: "Regina Healthcare <no-reply@reginacare.xyz>",
        to: [email],
        subject: `Booking Confirmation - ${facility.name}`,
        react: BookingConfirmationEmail({
          bookingId,
          patientName: `${firstName} ${lastName}`,
          facility,
          bookingMethod,
          phone,
          dateOfBirth,
          hasHealthCard,
          reasonForVisit,
        }),
      })

      if (error) {
        console.error("[v0] Email sending error:", error)
        emailError = error.message || "Email delivery failed"
      } else {
        console.log("[v0] Email sent successfully:", data)
        emailSent = true
      }
    } catch (emailErr) {
      console.error("[v0] Email exception:", emailErr)
      emailError = emailErr instanceof Error ? emailErr.message : "Email service unavailable"
    }

    return NextResponse.json({
      success: true,
      bookingId,
      emailSent,
      emailError,
      bookingDetails: {
        patientName: `${firstName} ${lastName}`,
        email,
        phone,
        facility: facility.name,
        bookingMethod,
      },
    })
  } catch (error) {
    console.error("[v0] Booking API error:", error)
    return NextResponse.json(
      { error: "Failed to process booking", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
