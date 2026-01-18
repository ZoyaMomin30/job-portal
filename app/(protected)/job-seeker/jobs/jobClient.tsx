"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, MapPin, Clock, Building2 } from "lucide-react"
import Header from "./../header"

interface Job {
  id: number
  title: string
  location: string
  status: string
  description: string
  skills: string
  company?: string
  type?: string
  experience?: string
  match?: number
  posted?: string
  created_at?: string
  [key: string]: any
}

interface Resume {
  id: string
  title: string
  file_path: string
  raw_text: string
  parsed_data: JSON
  user_id: string
  created_at: string
  filename: string
  size: string
}

interface JobBrowseProps {
  jobs: Job[]
  resumes: Resume[]
}

export default function BrowseJobsPage({ jobs, resumes }: JobBrowseProps) {
  const [saved, setSaved] = useState<number[]>([])

const applyForJob = async (jobId: number) => {

  try {
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId,
        resumeId: resumes[0].id,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert(`Applied successfully! Match: ${data.matchPercentage}%`)
  } catch {
    alert("Something went wrong")
  }
}

  const toggleSave = (jobId: number) => {
    setSaved((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  // Helper function to format date
  const getPostedTime = (date: string | undefined) => {
    if (!date) return "Recently"
    const posted = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - posted.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
          <p className="text-muted-foreground mt-2">
            {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
          </p>
        </div>

        {jobs.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">No jobs available at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      {job.company && (
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Building2 className="w-3 h-3" />
                          {job.company}
                        </CardDescription>
                      )}
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
                    {job.type && <Badge variant="secondary">{job.type}</Badge>}
                    {job.experience && <Badge variant="secondary">{job.experience}</Badge>}
                    
                    {job.match && <Badge variant="default">Match: {job.match}%</Badge>}
                    <Badge variant="outline">{job.status || "Open"}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {job.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                    )}
                    Description:
                    {job.description && (
                      <div className="flex items-center gap-2">
                        
                        {job.description}
                      </div>
                    )}
                    <div className="text-primary">
                    
                    Skills
                    </div>
                    {job.skills && (
                      <div className="flex items-center gap-2">
                        {job.skills}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Posted {job.posted || getPostedTime(job.created_at)}
                    </div>
                  </div>
                  <Button onClick={() => applyForJob(job.id)} className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}