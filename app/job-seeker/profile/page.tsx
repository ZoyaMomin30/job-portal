"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { BookmarkIcon, Upload, FileText, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function JobSeekerProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      <div className="container mx-auto px-6 py-8 max-w-4xl space-y-6">
        {/* Profile Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Your Profile</h2>
          <p className="text-muted-foreground mt-1">Manage your profile and improve your ATS score</p>
        </div>

        {/* ATS Score Overview */}
        <Card className="border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>ATS Score</CardTitle>
                <CardDescription>Your profile's Applicant Tracking System compatibility</CardDescription>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">85</div>
                <p className="text-xs text-muted-foreground">out of 100</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={85} className="h-2" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Resume uploaded</p>
                  <p className="text-xs text-muted-foreground">Well-structured format detected</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Skills complete</p>
                  <p className="text-xs text-muted-foreground">12 skills added</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Add portfolio links</p>
                  <p className="text-xs text-muted-foreground">Showcase your work</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Add certifications</p>
                  <p className="text-xs text-muted-foreground">Boost credibility</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resume
            </CardTitle>
            <CardDescription>Upload your resume for ATS analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm font-medium text-foreground mb-1">Drop your resume here or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX (Max 5MB)</p>
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-accent/20">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">John_Doe_Resume.pdf</p>
                  <p className="text-xs text-muted-foreground">Uploaded 2 weeks ago • 245 KB</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View
                </Button>
                <Button size="sm" variant="ghost">
                  Replace
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">First Name</label>
                <Input placeholder="John" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <Input placeholder="Doe" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input type="email" placeholder="john.doe@email.com" defaultValue="john.doe@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone</label>
              <Input type="tel" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Location</label>
              <Input placeholder="San Francisco, CA" defaultValue="San Francisco, CA" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Professional Summary</label>
              <Textarea
                placeholder="Brief summary of your experience and career goals..."
                rows={4}
                defaultValue="Experienced Frontend Developer with 5+ years building modern web applications. Specialized in React, TypeScript, and performance optimization."
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Add skills to improve your job matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Add a skill (e.g., React, Python)" />
              <Button>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "TypeScript",
                "Node.js",
                "JavaScript",
                "CSS",
                "HTML",
                "Git",
                "REST APIs",
                "GraphQL",
                "Next.js",
                "Tailwind CSS",
                "MongoDB",
              ].map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ATS Improvement Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Suggestions to Improve Your Score
            </CardTitle>
            <CardDescription>Follow these tips to increase your ATS compatibility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  title: "Add portfolio links",
                  description: "Include GitHub, personal website, or project demos",
                  impact: "+5 points",
                },
                {
                  title: "List certifications",
                  description: "Add relevant certifications or courses completed",
                  impact: "+4 points",
                },
                {
                  title: "Include keywords",
                  description: "Use industry-specific keywords in your summary",
                  impact: "+3 points",
                },
                {
                  title: "Add work experience dates",
                  description: "Ensure all positions have clear date ranges",
                  impact: "+3 points",
                },
              ].map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{suggestion.title}</p>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex gap-3">
          <Button className="flex-1">Save Changes</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
