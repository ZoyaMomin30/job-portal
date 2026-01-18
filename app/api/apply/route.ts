import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = await createClient()
  
  try {
    const { jobId, resumeId } = await req.json()

    if (!jobId || !resumeId) {
      return NextResponse.json(
        { error: "Missing jobId or resumeId" },
        { status: 400 }
      )
    }

    // 1️⃣ Fetch job - get all columns to see what we have
    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single()

    // 2️⃣ Fetch resume - get all columns including parsed_data
    const { data: resume, error: resumeError } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", resumeId)
      .single()

    if (jobError || resumeError) {
      console.error("Query errors:", { jobError, resumeError })
      return NextResponse.json(
        { error: "Database query failed", details: { jobError, resumeError } },
        { status: 500 }
      )
    }

    if (!job || !resume) {
      return NextResponse.json(
        { error: "Job or Resume not found" },
        { status: 404 }
      )
    }

    // 3️⃣ Extract skills from job (handle different formats)
    let jobSkills: string[] = []
    
    if (typeof job.skills === 'string') {
      // If skills is a comma-separated string
      jobSkills = job.skills.split(',').map((s: string) => s.trim().toLowerCase())
    } else if (Array.isArray(job.skills)) {
      // If skills is already an array
      jobSkills = job.skills.map((s: string) => s.toLowerCase())
    } else if (job.description) {
      // Fallback: extract skills from description
      const commonSkills = ['javascript', 'python', 'react', 'node', 'sql', 'aws', 'java', 'typescript', 'docker', 'kubernetes']
      jobSkills = commonSkills.filter(skill => 
        job.description.toLowerCase().includes(skill)
      )
    }

    // 4️⃣ Extract skills from resume parsed_data
    let resumeSkills: string[] = []
    
    if (resume.parsed_data) {
      const parsedData = typeof resume.parsed_data === 'string' 
        ? JSON.parse(resume.parsed_data) 
        : resume.parsed_data
      
      if (parsedData.skills && Array.isArray(parsedData.skills)) {
        resumeSkills = parsedData.skills.map((s: string) => s.toLowerCase())
      }
      
      // Also check for sports achievements
      if (parsedData.sports && Array.isArray(parsedData.sports)) {
        resumeSkills = [...resumeSkills, ...parsedData.sports.map((s: string) => s.toLowerCase())]
      }
    }
    
    // Fallback: parse from raw_text if parsed_data is empty
    if (resumeSkills.length === 0 && resume.raw_text) {
      const commonSkills = ['javascript', 'python', 'react', 'node', 'sql', 'aws', 'java', 'typescript', 'softball', 'baseball', 'basketball', 'running']
      resumeSkills = commonSkills.filter(skill => 
        resume.raw_text.toLowerCase().includes(skill)
      )
    }

    // 5️⃣ Calculate match
    const matched = jobSkills.filter((skill: string) =>
      resumeSkills.includes(skill)
    )

    const missing = jobSkills.filter((skill: string) =>
      !resumeSkills.includes(skill)
    )

    const matchPercentage = jobSkills.length > 0
      ? Math.round((matched.length / jobSkills.length) * 100)
      : 0

    // 6️⃣ Get user ID for the application
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      )
    }

    // 7️⃣ Save application
    const { error: insertError } = await supabase.from("applications").insert({
      job_id: jobId,
      resume_id: resumeId,
      user_id: user.id,
      match_percentage: matchPercentage,
      matched_skills: matched,
      missing_skills: missing,
      status: 'pending'
    })

    if (insertError) {
      console.error("Insert error:", insertError)
      throw insertError
    }

    return NextResponse.json({
      success: true,
      matchPercentage,
      matchedSkills: matched,
      missingSkills: missing,
    })

  } catch (err: any) {
    console.error("Application error:", err)
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    )
  }
}