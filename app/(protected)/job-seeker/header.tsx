import React from 'react'
import { Button } from "@/components/ui/button"
import { BookmarkIcon} from "lucide-react"
import Link from "next/link"

export default function header () {
  return (
    <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-foreground">Job Portal</h1>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/job-seeker/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/job-seeker/jobs"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse Jobs
              </Link>
              <Link href="/job-seeker/profile" className="text-sm font-medium text-primary">
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Saved
            </Button>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">JD</span>
            </div>
          </div>
        </div>
      </header>
    
  )
}