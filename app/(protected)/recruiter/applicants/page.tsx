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
  Search,
  X,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import Link from "next/link"

const applicants = [
  {
    id: 1,
    name: "Sarah Chen",
    job: "Senior Frontend Developer",
    score: 92,
    status: "New",
    match: "High",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    appliedDate: "2 days ago",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    job: "Product Designer",
    score: 88,
    status: "Shortlisted",
    match: "High",
    email: "m.rodriguez@email.com",
    phone: "+1 (555) 234-5678",
    location: "Remote",
    appliedDate: "3 days ago",
  },
  {
    id: 3,
    name: "Emily Thompson",
    job: "Backend Engineer",
    score: 95,
    status: "New",
    match: "High",
    email: "emily.t@email.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    appliedDate: "1 day ago",
  },
  {
    id: 4,
    name: "James Wilson",
    job: "Data Scientist",
    score: 84,
    status: "Shortlisted",
    match: "Medium",
    email: "james.w@email.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    appliedDate: "4 days ago",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    job: "Senior Frontend Developer",
    score: 79,
    status: "New",
    match: "Medium",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 567-8901",
    location: "Remote",
    appliedDate: "5 days ago",
  },
  {
    id: 6,
    name: "David Park",
    job: "DevOps Engineer",
    score: 91,
    status: "Shortlisted",
    match: "High",
    email: "david.park@email.com",
    phone: "+1 (555) 678-9012",
    location: "Seattle, WA",
    appliedDate: "3 days ago",
  },
]

export default function ApplicantsPage() {
  const [activeNav, setActiveNav] = useState("applicants")
  const [selectedApplicant, setSelectedApplicant] = useState<(typeof applicants)[0] | null>(null)

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
              <h1 className="text-2xl font-bold text-foreground">Applicants</h1>
              <p className="text-sm text-muted-foreground">Review and manage candidates</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">AJ</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search applicants by name or job title..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

          {/* Applicants Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Applicants</CardTitle>
              <CardDescription>Click on a row to view detailed information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Candidate</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ATS Score</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Match</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((applicant) => (
                      <tr
                        key={applicant.id}
                        className="border-b border-border hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedApplicant(applicant)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-semibold text-primary">
                                {applicant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-foreground">{applicant.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{applicant.job}</td>
                        <td className="py-3 px-4">
                          <Badge variant={applicant.score >= 90 ? "default" : "secondary"}>{applicant.score}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={applicant.match === "High" ? "default" : "secondary"}>
                            {applicant.match}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <select className="px-2 py-1 rounded-md border border-input bg-background text-sm text-foreground">
                            <option>{applicant.status}</option>
                            <option>Shortlisted</option>
                            <option>Interviewed</option>
                            <option>Rejected</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{applicant.appliedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Side Panel */}
      {selectedApplicant && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end"
          onClick={() => setSelectedApplicant(null)}
        >
          <div
            className="w-full max-w-md h-full bg-card border-l border-border overflow-auto animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Applicant Details</h2>
              <Button size="sm" variant="ghost" onClick={() => setSelectedApplicant(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary">
                    {selectedApplicant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground">{selectedApplicant.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedApplicant.job}</p>
              </div>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedApplicant.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedApplicant.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedApplicant.location}</span>
                  </div>
                </CardContent>
              </Card>

              {/* ATS Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">ATS Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overall Score</span>
                    <Badge variant="default" className="text-lg">
                      {selectedApplicant.score}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Match Strength</span>
                    <Badge variant={selectedApplicant.match === "High" ? "default" : "secondary"}>
                      {selectedApplicant.match}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Match */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Skill Match</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-foreground">React</span>
                    </div>
                    <span className="text-muted-foreground">5 years</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-foreground">TypeScript</span>
                    </div>
                    <span className="text-muted-foreground">4 years</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-foreground">Node.js</span>
                    </div>
                    <span className="text-muted-foreground">3 years</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">GraphQL</span>
                    </div>
                    <span className="text-muted-foreground">Not listed</span>
                  </div>
                </CardContent>
              </Card>

              {/* Resume Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Resume Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Experienced software engineer with 5+ years in frontend development. Proven track record of building
                    scalable web applications using modern JavaScript frameworks. Strong expertise in React, TypeScript,
                    and performance optimization.
                  </p>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Shortlist
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
