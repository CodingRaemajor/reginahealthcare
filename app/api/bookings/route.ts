import { type NextRequest, NextResponse } from "next/server"
import { render } from "@react-email/render"
import { BookingConfirmationEmail } from "@/components/emails/booking-confirmation"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import type { Firestore } from "firebase-admin/firestore"

export const runtime = "nodejs"

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
const FIREBASE_FROM_EMAIL = process.env.FIREBASE_FROM_EMAIL
const FIREBASE_MAIL_COLLECTION = process.env.FIREBASE_MAIL_COLLECTION || "mail"

let firestoreInstance: Firestore | null = null

function ensureFirestore() {
  if (firestoreInstance) {
    return firestoreInstance
  }

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    return null
  }

  const existingApp = getApps()[0]

  const app =
    existingApp ??
    initializeApp({
      credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY,
      }),
    })

  firestoreInstance = getFirestore(app)
  return firestoreInstance
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, dateOfBirth, hasHealthCard, reasonForVisit, bookingMethod, facility } = body

    // Generate booking ID
    const bookingId = `BK${Date.now().toString().slice(-8)}`

    let emailSent = false
    let emailError = null

    const firestore = ensureFirestore()

    if (!firestore || !FIREBASE_FROM_EMAIL) {
      const missing = [
        !firestore ? "Firebase credentials (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY)" : null,
        !FIREBASE_FROM_EMAIL ? "FIREBASE_FROM_EMAIL" : null,
      ]
        .filter(Boolean)
        .join(", ")

      const message = `Email service is not configured. Missing: ${missing}`
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

        await firestore.collection(FIREBASE_MAIL_COLLECTION).add({
          to: [email],
          message: {
            subject: `Booking Confirmation - ${facility?.name ?? "Facility"}`,
            html: emailHtml,
            text: emailText,
            from: FIREBASE_FROM_EMAIL,
          },
          metadata: {
            bookingId,
            facilityId: facility?.id ?? null,
          },
        })

        console.log("[v0] Email enqueued in Firebase mail collection")
        emailSent = true
      } catch (emailErr) {
        console.error("[v0] Firebase email enqueue error:", emailErr)
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
        facility: facility?.name ?? "",
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
