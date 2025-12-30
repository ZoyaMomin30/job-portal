// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { BookmarkIcon, MapPin, Clock, Search, Filter, Building2 } from "lucide-react"
// import Header from "./../header"


// const jobs = [
//   {
//     id: 1,
//     title: "Senior Frontend Developer",
//     company: "TechCorp Inc.",
//     location: "Remote",
//     type: "Full-time",
//     experience: "Senior Level",
//     posted: "2 days ago",
//     match: 92,
//   },
//   {
//     id: 2,
//     title: "Product Designer",
//     company: "DesignHub",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     experience: "Mid Level",
//     posted: "3 days ago",
//     match: 88,
//   },
//   {
//     id: 3,
//     title: "Backend Engineer",
//     company: "CloudSystems",
//     location: "New York, NY",
//     type: "Full-time",
//     experience: "Senior Level",
//     posted: "5 days ago",
//     match: 95,
//   },
//   {
//     id: 4,
//     title: "Full Stack Developer",
//     company: "StartupXYZ",
//     location: "Remote",
//     type: "Contract",
//     experience: "Mid Level",
//     posted: "1 week ago",
//     match: 85,
//   },
//   {
//     id: 5,
//     title: "UI/UX Designer",
//     company: "CreativeAgency",
//     location: "Austin, TX",
//     type: "Full-time",
//     experience: "Entry Level",
//     posted: "1 week ago",
//     match: 79,
//   },
//   {
//     id: 6,
//     title: "DevOps Engineer",
//     company: "CloudTech",
//     location: "Seattle, WA",
//     type: "Full-time",
//     experience: "Senior Level",
//     posted: "2 weeks ago",
//     match: 91,
//   },
// ]

// export default function BrowseJobsPage() {
//   const [saved, setSaved] = useState<number[]>([])

//   const toggleSave = (jobId: number) => {
//     setSaved((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <Header />

//       <div className="container mx-auto px-6 py-8">
//         <div className="grid gap-6 lg:grid-cols-4">
          
//           {/* Job Listings */}
//           <div className="lg:col-span-4 space-y-4">
//             {/* Job Cards */}
//             <div className="grid gap-4 md:grid-cols-3">
//               {jobs.map((job) => (
//                 <Card key={job.id} className="hover:shadow-lg transition-shadow">
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <CardTitle className="text-lg">{job.title}</CardTitle>
//                         <CardDescription className="flex items-center gap-1 mt-1">
//                           <Building2 className="w-3 h-3" />
//                           {job.company}
//                         </CardDescription>
//                       </div>
//                       <Button
//                         size="sm"
//                         variant={saved.includes(job.id) ? "default" : "ghost"}
//                         onClick={() => toggleSave(job.id)}
//                       >
//                         <BookmarkIcon className={`w-4 h-4 ${saved.includes(job.id) ? "fill-current" : ""}`} />
//                       </Button>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="flex flex-wrap gap-2">
//                       <Badge variant="secondary">{job.type}</Badge>
//                       <Badge variant="secondary">{job.experience}</Badge>
//                       <Badge variant="default">Match: {job.match}%</Badge>
//                     </div>
//                     <div className="space-y-2 text-sm text-muted-foreground">
//                       <div className="flex items-center gap-2">
//                         <MapPin className="w-4 h-4" />
//                         {job.location}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Clock className="w-4 h-4" />
//                         Posted {job.posted}
//                       </div>
//                     </div>
//                     <Button className="w-full">Apply Now</Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import BrowseJobsPage from "./jobClient"

export default async function jobPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  
  if (userError || !user) {
    redirect("/login")
  }

  // Fetch all jobs (not just recruiter's jobs) - adjust the query based on your needs
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false })
  
  const jobsList = jobs || []

  return (
    <BrowseJobsPage
      jobs={jobsList}
    />
  )
}