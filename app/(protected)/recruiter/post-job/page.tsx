import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import PostJobClient from "./PostJobClient"

export default async function JobPostPage() {
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

  return (
    <PostJobClient
      profile={profile} 
      jobs={jobsList}
    />
  )
}