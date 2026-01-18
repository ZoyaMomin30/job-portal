import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ProfileClient from "./profileClient"

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
  const { data: resumes } = await supabase
    .from("resumes")
    .select("*")
    .order("created_at", { ascending: false })
  
  const resumesList = resumes || []

  return (
    <ProfileClient
      resumes={resumesList}
    />
  )
}