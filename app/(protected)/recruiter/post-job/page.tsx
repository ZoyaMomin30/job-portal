"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, BriefcaseIcon, Users, BarChart3, Settings, FileText, X, User } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
// import { error } from "console"

export default function PostJobPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
      title: "",
      description:"",
      company :"",
      location :"",
      job_type :"",
      experience :"",
      status :"",
      })

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()  //doesnt reload the whole page 
      setIsLoading(true)

        // 1. Get logged-in user
      const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser()

      if (!user || userError) {
        alert("You must be logged in")
        setIsLoading(false)
        return
      }
        const { data: job, error: jobError } = await supabase
        .from("jobs")
        .insert({
          title: formData.title,
          description: formData.description,
          company: formData.company,
          location: formData.location,
          job_type: formData.job_type,
          experience: formData.experience,
          status: "open",
          created_by: user.id,
        })

          if (jobError) {
          console.error(jobError)
          alert("Failed to post job")
        } else {
          alert("Job posted successfully ")
          setFormData({
            title: "",
            description: "",
            company: "",
            location: "",
            job_type: "",
            experience: "",
            status: ""
          })
        }
    }

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
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Enter the job information below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Job Title</label>
                <Input type="text" placeholder="e.g., Senior Frontend Developer" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Job Description</label>
                <Textarea 
                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                <select 
                name="experience"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground">
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                  <option>Lead / Principal</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <Input type = "location" placeholder="e.g., Remote, San Francisco, CA" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value}) }/>
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Employment Type</label>
                <select name="job_type"
                value={formData.job_type}
                onChange={(e) =>
                  setFormData({ ...formData, job_type: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">Post Job</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
  function setIsLoading(arg0: boolean) {
    throw new Error("Function not implemented.")
  }
