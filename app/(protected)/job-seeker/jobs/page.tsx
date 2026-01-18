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

    const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .order("created_at", { ascending: false })
  
  const resumesList = resumes || []

  return (
    <BrowseJobsPage
      jobs={jobsList}
      resumes={resumesList}
    />
  )
}