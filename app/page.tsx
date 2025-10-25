import { SearchFilters } from "@/components/search-filters"
import { FacilityCard } from "@/components/facility-card"
import { facilities } from "@/lib/data"
import { Clock, MapPin, Phone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-50 border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6 text-slate-900">
              Skip the Wait, Book Your Care
            </h1>
            <p className="text-lg md:text-xl text-slate-600 text-pretty mb-8">
              See real-time waiting times at Regina healthcare facilities. Book appointments online and track your queue
              position from anywhere.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-500" />
                <span>Real-time wait times</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sky-500" />
                <span>All Regina facilities</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-sky-500" />
                <span>Instant booking confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 py-8">
        <SearchFilters />
      </section>

      {/* Facilities Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Healthcare Facilities in Regina</h2>
          <p className="text-slate-600">{facilities.length} facilities available</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </section>
    </div>
  )
}
