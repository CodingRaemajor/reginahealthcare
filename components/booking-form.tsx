"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, CheckCircle2, Loader2 } from "lucide-react"
import type { Facility } from "@/lib/data"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface BookingFormProps {
  facility: Facility
}

export function BookingForm({ facility }: BookingFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    hasHealthCard: "yes",
    reasonForVisit: "",
    bookingMethod: "online",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          facility: {
            id: facility.id,
            name: facility.name,
            address: facility.address,
            phone: facility.phone,
            hoursToday: facility.hoursToday,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create booking")
      }

      console.log("[v0] Booking created successfully:", data)

      if (data.emailSent) {
        toast({
          title: "Booking Confirmed!",
          description: `Confirmation email sent to ${formData.email}`,
        })
      } else {
        toast({
          title: "Booking Confirmed!",
          description: `Your booking is confirmed. Please save your booking ID: ${data.bookingId}`,
        })
      }

      // Redirect to dashboard with booking info
      router.push(
        `/dashboard?bookingId=${data.bookingId}&facilityId=${facility.id}&name=${formData.firstName} ${formData.lastName}&email=${formData.email}`,
      )
    } catch (error) {
      console.error("[v0] Booking error:", error)

      // Show error toast
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Please try again or contact the facility directly.",
      })

      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Book Your Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Booking Method */}
          <div className="space-y-3">
            <Label>How would you like to book?</Label>
            <RadioGroup value={formData.bookingMethod} onValueChange={(value) => updateField("bookingMethod", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="font-normal cursor-pointer">
                  Book online now (instant confirmation)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="call" id="call" />
                <Label htmlFor="call" className="font-normal cursor-pointer">
                  Request callback to book by phone
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Personal Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            <p className="text-sm text-slate-500">
              We'll try to send a confirmation email. Your booking details will be shown on the next screen.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              placeholder="(306) 555-0123"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
            />
          </div>

          {/* Health Card */}
          <div className="space-y-3">
            <Label>
              Do you have a Saskatchewan Health Card? <span className="text-red-500">*</span>
            </Label>
            <RadioGroup value={formData.hasHealthCard} onValueChange={(value) => updateField("hasHealthCard", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="font-normal cursor-pointer">
                  Yes, I have a health card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="font-normal cursor-pointer">
                  No, I don't have a health card
                </Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-slate-500">Please bring your health card to your appointment if you have one</p>
          </div>

          {/* Reason for Visit */}
          <div className="space-y-2">
            <Label htmlFor="reason">
              Reason for Visit <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reason"
              required
              placeholder="Please briefly describe your symptoms or reason for visit..."
              rows={4}
              value={formData.reasonForVisit}
              onChange={(e) => updateField("reasonForVisit", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing Booking...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Confirm Booking
              </>
            )}
          </Button>

          <p className="text-sm text-slate-500 text-center text-pretty">
            By booking, you agree to receive appointment confirmations and updates via email and SMS
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
