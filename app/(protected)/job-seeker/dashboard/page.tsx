"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BriefcaseIcon, BookmarkIcon, Clock, MapPin, TrendingUp } from "lucide-react"
import Link from "next/link"

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

export default function JobSeekerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-foreground">Job Portal</h1>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/job-seeker/dashboard" className="text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link
                href="/job-seeker/jobs"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                href="/job-seeker/profile"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
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

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome back, John!</h2>
          <p className="text-muted-foreground mt-1">Here's your job search activity</p>
        </div>

        {/* Profile Completeness */}
        <Card className="border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Complete Your Profile</CardTitle>
                <CardDescription>Your profile is 75% complete</CardDescription>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={75} className="h-2" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Resume uploaded</Badge>
              <Badge variant="secondary">Skills added</Badge>
              <Badge variant="outline">Add portfolio</Badge>
              <Badge variant="outline">Add certifications</Badge>
            </div>
            <Button size="sm" asChild>
              <Link href="/job-seeker/profile">Complete Profile</Link>
            </Button>
          </CardContent>
        </Card>

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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Saved Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookmarkIcon className="w-5 h-5" />
                Saved Jobs
              </CardTitle>
              <CardDescription>Jobs you've bookmarked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <h3 className="font-medium text-foreground text-sm">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                      <span>•</span>
                      <span>{job.posted}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View All Saved
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recommended for You
              </CardTitle>
              <CardDescription>Based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground text-sm">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </div>
                      </div>
                      <Badge variant="default" className="text-xs">
                        {job.match}%
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
