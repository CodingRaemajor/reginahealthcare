import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Phone, Users, Calendar, AlertCircle } from "lucide-react"
import type { Facility } from "@/lib/data"

interface FacilityDetailsProps {
  facility: Facility
}

export function FacilityDetails({ facility }: FacilityDetailsProps) {
  const waitTimeColor =
    facility.currentWaitTime <= 30
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : facility.currentWaitTime <= 60
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-red-50 text-red-700 border-red-200"

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl mb-2 text-balance">{facility.name}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant={facility.isOpen ? "default" : "secondary"}>
                  {facility.isOpen ? "Open Now" : "Closed"}
                </Badge>
                <Badge variant="outline">{facility.type}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Address</p>
              <p className="text-slate-600 text-pretty">{facility.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Phone</p>
              <a href={`tel:${facility.phone}`} className="text-sky-600 hover:underline">
                {facility.phone}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Wait Time */}
      <Card className={`border-2 ${waitTimeColor}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Current Wait Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-4">{facility.currentWaitTime} minutes</div>
          <div className="flex items-center gap-2 text-sm mb-3">
            <Users className="w-4 h-4" />
            <span>
              <strong>{facility.queueLength}</strong> people currently in queue
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p className="text-pretty">
              Wait times are estimates and may vary. You'll be notified when your turn is approaching.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hours of Operation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Hours of Operation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(facility.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="font-medium capitalize text-slate-900">{day}</span>
                <span className="text-slate-600">{hours}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle>Services Offered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {facility.services.map((service) => (
              <Badge key={service} variant="secondary">
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
