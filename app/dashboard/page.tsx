"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, MapPin, Mail, Users, Calendar, Phone, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { facilities } from "@/lib/data"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")
  const facilityId = searchParams.get("facilityId")
  const patientName = searchParams.get("name")
  const email = searchParams.get("email")

  const facility = facilities.find((f) => f.id === facilityId)
  const [queuePosition, setQueuePosition] = useState(3)
  const [estimatedWait, setEstimatedWait] = useState(25)

  // Simulate queue updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQueuePosition((prev) => Math.max(1, prev - 1))
      setEstimatedWait((prev) => Math.max(5, prev - 8))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (!facility || !bookingId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-slate-600">Booking information not found</p>
            <Button asChild className="w-full mt-4">
              <Link href="/">Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Success Message */}
          <Card className="border-2 border-emerald-200 bg-emerald-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 rounded-full p-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-emerald-900 mb-2">Booking Confirmed!</h1>
                  <p className="text-emerald-700 text-pretty">
                    Your appointment has been successfully booked. Please save your booking ID below for your records.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-sky-200 bg-sky-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-sky-100 rounded-full p-3">
                  <AlertCircle className="w-6 h-6 text-sky-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sky-900 mb-1">Email Confirmation</p>
                  <p className="text-sm text-sky-700 text-pretty">
                    We've attempted to send a confirmation email to <strong>{email}</strong>. If you don't receive it
                    within a few minutes, please check your spam folder or contact the facility directly with your
                    booking ID.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Booking ID</p>
                  <p className="font-mono font-semibold text-slate-900">{bookingId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Patient Name</p>
                  <p className="font-semibold text-slate-900">{patientName}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Facility</p>
                <p className="font-semibold text-slate-900">{facility.name}</p>
                <div className="flex items-start gap-2 text-sm text-slate-600 mt-1">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="text-pretty">{facility.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Queue Status */}
          <Card className="border-2 border-sky-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Queue Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-sky-50 rounded-lg p-6 text-center">
                <p className="text-sm text-slate-600 mb-2">Your Position in Queue</p>
                <div className="text-5xl font-bold text-sky-600 mb-4">#{queuePosition}</div>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg">
                    Estimated wait: <strong className="text-slate-900">{estimatedWait} minutes</strong>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="bg-sky-100 rounded-full p-2 mt-0.5">
                    <Users className="w-4 h-4 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 mb-1">People ahead of you</p>
                    <p className="text-sm text-slate-600">
                      {queuePosition - 1} patients are currently ahead in the queue
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="bg-emerald-100 rounded-full p-2 mt-0.5">
                    <Mail className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 mb-1">We'll notify you</p>
                    <p className="text-sm text-slate-600 text-pretty">
                      You'll receive an email and SMS when you're next in line (approximately 10 minutes before)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="bg-amber-100 rounded-full p-2 mt-0.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 mb-1">Wait times may vary</p>
                    <p className="text-sm text-slate-600 text-pretty">
                      Estimated times are based on current queue and may change based on patient needs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 text-pretty">
                If you need to cancel or reschedule your appointment, please contact the facility directly:
              </p>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <Phone className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="font-medium text-slate-900">{facility.name}</p>
                  <a href={`tel:${facility.phone}`} className="text-sky-600 hover:underline">
                    {facility.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                <Calendar className="w-5 h-5 text-slate-500 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900 mb-1">Hours Today</p>
                  <p className="text-slate-600">{facility.hoursToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/">Book Another Appointment</Link>
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => window.print()}>
              Print Confirmation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
