"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  LayoutDashboard,
  BriefcaseIcon,
  Users,
  BarChart3,
  Settings,
  FileText,
  MapPin,
  Edit,
  Search,
  Filter,
} from "lucide-react"
import Link from "next/link"

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    location: "Remote",
    status: "Open",
    applicants: 45,
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Product Designer",
    location: "San Francisco, CA",
    status: "Open",
    applicants: 32,
    posted: "5 days ago",
  },
  { id: 3, title: "Backend Engineer", location: "New York, NY", status: "Open", applicants: 28, posted: "1 week ago" },
  {
    id: 4,
    title: "Marketing Manager",
    location: "Austin, TX",
    status: "Closed",
    applicants: 19,
    posted: "2 weeks ago",
  },
  { id: 5, title: "Data Scientist", location: "Remote", status: "Open", applicants: 41, posted: "3 days ago" },
  { id: 6, title: "DevOps Engineer", location: "Seattle, WA", status: "Open", applicants: 23, posted: "4 days ago" },
  { id: 7, title: "Mobile Developer", location: "Remote", status: "Open", applicants: 38, posted: "1 week ago" },
  { id: 8, title: "UX Researcher", location: "Boston, MA", status: "Closed", applicants: 15, posted: "3 weeks ago" },
]

export default function RecruiterJobsPage() {
  const [activeNav, setActiveNav] = useState("jobs")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredJobs = statusFilter === "all" ? jobs : jobs.filter((job) => job.status.toLowerCase() === statusFilter)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden lg:block">
        <div className="p-6">
          <h2 className="text-lg font-bold text-foreground">TechCorp Inc.</h2>
          <p className="text-sm text-muted-foreground">Recruiter Portal</p>
        </div>
        <nav className="space-y-1 px-3">
          {[
            { name: "Dashboard", icon: LayoutDashboard, href: "/recruiter/dashboard" },
            { name: "Post Job", icon: FileText, href: "/recruiter/post-job" },
            { name: "Jobs", icon: BriefcaseIcon, href: "/recruiter/jobs" },
            { name: "Applicants", icon: Users, href: "/recruiter/applicants" },
            { name: "Analytics", icon: BarChart3, href: "#" },
            { name: "Settings", icon: Settings, href: "#" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveNav(item.name.toLowerCase())}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeNav === item.name.toLowerCase()
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="border-b border-border bg-card sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">All Jobs</h1>
              <p className="text-sm text-muted-foreground">Manage your job postings</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">AJ</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search jobs..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                  <select
                    className="px-4 py-2 rounded-md border border-input bg-background text-foreground"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-2">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </CardDescription>
                    </div>
                    <Badge variant={job.status === "Open" ? "default" : "secondary"}>{job.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Applicants</span>
                    <span className="font-semibold text-foreground">{job.applicants}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="text-foreground">{job.posted}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Users className="w-4 h-4 mr-1" />
                      View Applicants
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
