// "use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BriefcaseIcon, BookmarkIcon, Clock, MapPin, TrendingUp } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import Header from "./../header"
import { redirect } from "next/navigation"

const appliedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    status: "Under Review",
    score: 92,
    appliedDate: "2 days ago",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignHub",
    status: "Interview Scheduled",
    score: 88,
    appliedDate: "5 days ago",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "CloudSystems",
    status: "Application Sent",
    score: 95,
    appliedDate: "1 week ago",
  },
]

const savedJobs = [
  { id: 1, title: "Full Stack Developer", company: "StartupXYZ", location: "Remote", posted: "3 days ago" },
  { id: 2, title: "UI/UX Designer", company: "CreativeAgency", location: "New York, NY", posted: "1 week ago" },
]

const recommendedJobs = [
  { id: 1, title: "React Developer", company: "WebSolutions", location: "Remote", match: 94 },
  { id: 2, title: "Software Engineer", company: "TechStartup", location: "San Francisco, CA", match: 89 },
  { id: 3, title: "Frontend Lead", company: "DigitalCorp", location: "Austin, TX", match: 87 },
]

export default async function JobSeekerDashboard() {
  const supabase = await createClient()

  const { data: jobs } = await supabase
  .from("jobs")
  .select("*")
  .eq("status", "open")
  .order("created_at", { ascending: false })

    const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

    if (userError || !user) {
      redirect("/login")
    }

  const { data: profiles } = await supabase
  .from("profiles")
  .select("*")
  .eq("id",user.id)
  .single()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome back, {profiles.full_name}</h2>
          <p className="text-muted-foreground mt-1">Here's your job search activity</p>
        </div>

        {/* Applied Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5" />
              Applied Jobs
            </CardTitle>
            <CardDescription>Track your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appliedJobs.map((job) => (
                <div key={job.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary">{job.status}</Badge>
                        <Badge variant="default">Match: {job.score}%</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.appliedDate}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
