import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone, Users, Calendar } from "lucide-react"
import type { Facility } from "@/lib/data"

interface FacilityCardProps {
  facility: Facility
}

export function FacilityCard({ facility }: FacilityCardProps) {
  const isOpen = facility.isOpen
  const waitTimeColor =
    facility.currentWaitTime <= 30
      ? "text-emerald-600"
      : facility.currentWaitTime <= 60
        ? "text-amber-600"
        : "text-red-600"

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-lg text-slate-900 text-balance">{facility.name}</h3>
            <Badge variant={isOpen ? "default" : "secondary"} className="mt-2">
              {isOpen ? "Open Now" : "Closed"}
            </Badge>
          </div>
          <Badge variant="outline" className="shrink-0">
            {facility.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Wait Time */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>Current Wait</span>
            </div>
            <div className={`text-2xl font-bold ${waitTimeColor}`}>{facility.currentWaitTime} min</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
            <Users className="w-4 h-4" />
            <span>{facility.queueLength} people in queue</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="text-pretty">{facility.address}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Phone className="w-4 h-4 shrink-0" />
          <a href={`tel:${facility.phone}`} className="hover:text-sky-600">
            {facility.phone}
          </a>
        </div>

        {/* Hours Today */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Today: {facility.hoursToday}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1">
            <Link href={`/facility/${facility.id}`}>
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href={`/facility/${facility.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
