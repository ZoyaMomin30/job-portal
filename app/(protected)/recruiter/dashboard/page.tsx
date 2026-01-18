import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import RecruiterDashboardClient from "./RecruiterDashboardClient"

export default async function RecruiterDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  
  if (userError || !user) {
    redirect("/login")
  }

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profile?.user_type !== "recruiter") {
    redirect("/job-seeker/dashboard")
  }
  
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("recruiter_id", user.id)
  
  const jobsList = jobs || []

  // 5️⃣ Fetch applications for recruiter's jobs
const { data: applications, error: applicationsError } = await supabase
  .from("applications")
  .select(`
    id,
    match_percentage,
    applied_at,
    profiles (
      full_name
    ),
    jobs (
      title
    )
  `)
  .in(
    "job_id",
    jobs?.map((job) => job.id) || []
  )
  .order("applied_at", { ascending: false })

if (applicationsError) {
  console.error("Error fetching applications:", applicationsError)
  console.log(applicationsError)
}
  return (
    <RecruiterDashboardClient
    profile={profile}
    jobs={jobsList}
    applications={applications || []}
    />
  )
}