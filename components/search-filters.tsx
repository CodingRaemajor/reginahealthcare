"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"

export function SearchFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [facilityType, setFacilityType] = useState("all")
  const [waitTime, setWaitTime] = useState("all")
  const [availability, setAvailability] = useState("all")

  const activeFilters = [
    facilityType !== "all" && { key: "type", value: facilityType },
    waitTime !== "all" && { key: "wait", value: waitTime },
    availability !== "all" && { key: "availability", value: availability },
  ].filter(Boolean)

  const clearFilters = () => {
    setFacilityType("all")
    setWaitTime("all")
    setAvailability("all")
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search by facility name, address, or service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={facilityType} onValueChange={setFacilityType}>
          <SelectTrigger className="w-[180px]">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Facility Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="urgent-care">Urgent Care</SelectItem>
            <SelectItem value="walk-in">Walk-in Clinic</SelectItem>
            <SelectItem value="hospital">Hospital</SelectItem>
            <SelectItem value="specialist">Specialist Clinic</SelectItem>
          </SelectContent>
        </Select>

        <Select value={waitTime} onValueChange={setWaitTime}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Wait Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Wait Time</SelectItem>
            <SelectItem value="short">Under 30 min</SelectItem>
            <SelectItem value="medium">30-60 min</SelectItem>
            <SelectItem value="long">Over 60 min</SelectItem>
          </SelectContent>
        </Select>

        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Facilities</SelectItem>
            <SelectItem value="open-now">Open Now</SelectItem>
            <SelectItem value="accepting">Accepting Patients</SelectItem>
          </SelectContent>
        </Select>

        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-600">
            Clear Filters
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter: any) => (
            <Badge key={filter.key} variant="secondary" className="px-3 py-1">
              {filter.value}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
