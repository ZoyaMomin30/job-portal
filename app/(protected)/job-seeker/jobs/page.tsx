"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookmarkIcon, MapPin, Clock, Search, Filter, Building2 } from "lucide-react"
import Header from "./../header"

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    type: "Full-time",
    experience: "Senior Level",
    posted: "2 days ago",
    match: 92,
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignHub",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Mid Level",
    posted: "3 days ago",
    match: 88,
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "CloudSystems",
    location: "New York, NY",
    type: "Full-time",
    experience: "Senior Level",
    posted: "5 days ago",
    match: 95,
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Contract",
    experience: "Mid Level",
    posted: "1 week ago",
    match: 85,
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "CreativeAgency",
    location: "Austin, TX",
    type: "Full-time",
    experience: "Entry Level",
    posted: "1 week ago",
    match: 79,
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "Senior Level",
    posted: "2 weeks ago",
    match: 91,
  },
]

export default function BrowseJobsPage() {
  const [saved, setSaved] = useState<number[]>([])

  const toggleSave = (jobId: number) => {
    setSaved((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Role */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Role</label>
                  <Input placeholder="Search role..." />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <select className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm">
                    <option>All Locations</option>
                    <option>Remote</option>
                    <option>San Francisco, CA</option>
                    <option>New York, NY</option>
                    <option>Austin, TX</option>
                    <option>Seattle, WA</option>
                  </select>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Experience</label>
                  <div className="space-y-2">
                    {["Entry Level", "Mid Level", "Senior Level", "Lead / Principal"].map((level) => (
                      <label key={level} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-input" />
                        <span className="text-foreground">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Job Type</label>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Freelance"].map((type) => (
                      <label key={type} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-input" />
                        <span className="text-foreground">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search for jobs, companies, or keywords..." className="pl-10" />
                </div>
              </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{jobs.length} jobs found</p>
              <select className="px-3 py-1.5 rounded-md border border-input bg-background text-sm text-foreground">
                <option>Best Match</option>
                <option>Most Recent</option>
                <option>Salary: High to Low</option>
              </select>
            </div>

            {/* Job Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Building2 className="w-3 h-3" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Button
                        size="sm"
                        variant={saved.includes(job.id) ? "default" : "ghost"}
                        onClick={() => toggleSave(job.id)}
                      >
                        <BookmarkIcon className={`w-4 h-4 ${saved.includes(job.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{job.type}</Badge>
                      <Badge variant="secondary">{job.experience}</Badge>
                      <Badge variant="default">Match: {job.match}%</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Posted {job.posted}
                      </div>
                    </div>
                    <Button className="w-full">Apply Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
