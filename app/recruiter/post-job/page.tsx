"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, BriefcaseIcon, Users, BarChart3, Settings, FileText, X } from "lucide-react"
import Link from "next/link"

export default function PostJobPage() {
  const [activeNav, setActiveNav] = useState("post job")
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js"])
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

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
              <h1 className="text-2xl font-bold text-foreground">Post a New Job</h1>
              <p className="text-sm text-muted-foreground">Fill in the details to create a job posting</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">AJ</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Enter the job information below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Job Title</label>
                <Input placeholder="e.g., Senior Frontend Developer" />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Job Description</label>
                <Textarea
                  placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                  rows={6}
                />
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Required Skills</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button onClick={addSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Experience Level</label>
                <select className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground">
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                  <option>Lead / Principal</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <Input placeholder="e.g., Remote, San Francisco, CA" />
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Employment Type</label>
                <select className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1">Post Job</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
