"use client"

import { useState,useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, BriefcaseIcon, Users, BarChart3, Settings, FileText, MapPin, Eye, Edit, TrendingUp } from "lucide-react"
import Link from "next/link"

const stats = [
  { title: "Total Jobs Posted", value: "24", icon: FileText, trend: "+12%" },
  { title: "Active Jobs", value: "18", icon: BriefcaseIcon, trend: "+5%" },
  { title: "Total Applicants", value: "342", icon: Users, trend: "+28%" },
  { title: "Shortlisted", value: "47", icon: TrendingUp, trend: "+15%" },
]

interface Job {
  id: string
  title: string
  location: string
  status: string
  [key: string]: any
}

interface Profile {
  id: string
  full_name: string
  user_type: string
  [key: string]: any
}

interface Application {
  id: string
  match_percentage: number
  applied_at: string

  profiles: {
    full_name: string
  }[]

  jobs: {
    title: string
  }[]
}

interface RecruiterDashboardClientProps {
  profile: Profile
  jobs: Job[]
  applications: Application[]
}

export default function RecruiterDashboardClient({ profile, jobs, applications }: RecruiterDashboardClientProps) {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [apps, setApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


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
              <p className="text-sm text-muted-foreground">Welcome back, {profile?.full_name?.split(" ")[0]}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {profile?.full_name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "U"}
                </span>
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
              <CardTitle>Your Jobs</CardTitle>
              <CardDescription>Jobs posted by you</CardDescription>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No jobs posted yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Job Title</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                          <td className="py-3 px-4 font-medium">{job.title}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                              {job.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>


          <Card>
          <CardHeader>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>
              Latest candidates who applied to your positions
            </CardDescription>
          </CardHeader>

          <CardContent>
            {applications.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No applications yet.
              </p>
            ) : (
              <div className="space-y-4">
                {applications.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {applicant.profiles[0]?.full_name ?? "Unknown"
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium">
                          {applicant.profiles[0]?.full_name ?? "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {applicant.jobs[0]?.title ?? "Unknown Job"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge
                          variant={
                            applicant.match_percentage >= 75
                              ? "default"
                              : "secondary"
                          }
                          className="mb-1"
                        >
                          ATS {applicant.match_percentage}%
                        </Badge>

                        <p className="text-xs text-muted-foreground">
                          Applied{" "}
                          {new Date(applicant.applied_at).toLocaleDateString()}
                        </p>
                      </div>

                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </main>
    </div>
  )
}
