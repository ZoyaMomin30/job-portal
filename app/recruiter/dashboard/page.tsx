"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  BriefcaseIcon,
  Users,
  BarChart3,
  Settings,
  FileText,
  MapPin,
  Eye,
  Edit,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

// Dummy data
const stats = [
  { title: "Total Jobs Posted", value: "24", icon: FileText, trend: "+12%" },
  { title: "Active Jobs", value: "18", icon: BriefcaseIcon, trend: "+5%" },
  { title: "Total Applicants", value: "342", icon: Users, trend: "+28%" },
  { title: "Shortlisted", value: "47", icon: TrendingUp, trend: "+15%" },
]

const jobs = [
  { id: 1, title: "Senior Frontend Developer", location: "Remote", status: "Open", applicants: 45 },
  { id: 2, title: "Product Designer", location: "San Francisco, CA", status: "Open", applicants: 32 },
  { id: 3, title: "Backend Engineer", location: "New York, NY", status: "Open", applicants: 28 },
  { id: 4, title: "Marketing Manager", location: "Austin, TX", status: "Closed", applicants: 19 },
  { id: 5, title: "Data Scientist", location: "Remote", status: "Open", applicants: 41 },
]

const recentApplicants = [
  { id: 1, name: "Sarah Chen", job: "Senior Frontend Developer", score: 92, status: "New" },
  { id: 2, name: "Michael Rodriguez", job: "Product Designer", score: 88, status: "Shortlisted" },
  { id: 3, name: "Emily Thompson", job: "Backend Engineer", score: 95, status: "New" },
  { id: 4, name: "James Wilson", job: "Data Scientist", score: 84, status: "Shortlisted" },
  { id: 5, name: "Lisa Anderson", job: "Senior Frontend Developer", score: 79, status: "New" },
]

export default function RecruiterDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard")

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
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Alex Johnson</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">AJ</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-primary mt-1">{stat.trend} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription>Manage your job postings and view applicants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Job Title</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Applicants</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                        <td className="py-3 px-4 text-sm font-medium text-foreground">{job.title}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={job.status === "Open" ? "default" : "secondary"}>{job.status}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">{job.applicants}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Applicants */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
              <CardDescription>Latest candidates who applied to your positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {applicant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{applicant.name}</p>
                        <p className="text-sm text-muted-foreground">{applicant.job}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant={applicant.score >= 90 ? "default" : "secondary"} className="mb-1">
                          ATS {applicant.score}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{applicant.status}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
