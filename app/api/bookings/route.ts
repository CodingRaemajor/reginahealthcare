import { type NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"
import { render } from "@react-email/render"
import { BookingConfirmationEmail } from "@/components/emails/booking-confirmation"

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, dateOfBirth, hasHealthCard, reasonForVisit, bookingMethod, facility } =
      body

    // Generate booking ID
    const bookingId = `BK${Date.now().toString().slice(-8)}`

    let emailSent = false
    let emailError = null

    if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL) {
      const missing = [
        !SENDGRID_API_KEY ? "SENDGRID_API_KEY" : null,
        !SENDGRID_FROM_EMAIL ? "SENDGRID_FROM_EMAIL" : null,
      ]
        .filter(Boolean)
        .join(", ")

      const message = `Email service is not configured. Missing environment variables: ${missing}`
      console.warn("[v0] Email configuration warning:", message)
      emailError = message
    } else {
      try {
        const emailComponent = BookingConfirmationEmail({
          bookingId,
          patientName: `${firstName} ${lastName}`,
          facility,
          bookingMethod,
          phone,
          dateOfBirth,
          hasHealthCard,
          reasonForVisit,
        })

        const emailHtml = render(emailComponent)
        const emailText = render(emailComponent, { plainText: true })

        await sgMail.send({
          to: email,
          from: SENDGRID_FROM_EMAIL,
          subject: `Booking Confirmation - ${facility.name}`,
          html: emailHtml,
          text: emailText,
        })

        console.log("[v0] Email sent successfully via SendGrid")
        emailSent = true
      } catch (emailErr) {
        console.error("[v0] SendGrid email error:", emailErr)
        emailError = emailErr instanceof Error ? emailErr.message : "Email delivery failed"
      }
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
