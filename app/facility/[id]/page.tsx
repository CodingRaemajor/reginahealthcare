import { notFound } from "next/navigation"
import { facilities } from "@/lib/data"
import { FacilityDetails } from "@/components/facility-details"
import { BookingForm } from "@/components/booking-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const facility = facilities.find((f) => f.id === id)

  if (!facility) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Facilities
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          <FacilityDetails facility={facility} />
          <BookingForm facility={facility} />
        </div>
      </div>
    </div>
  )
}
