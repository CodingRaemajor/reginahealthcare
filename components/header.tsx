import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Activity, Calendar } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-sky-500 rounded-lg p-2">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900">Regina Healthcare</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/">Find Facilities</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
