export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { parseResumeWithAI } from "@/services/aiResumeParser.service";

export async function POST(req: Request) {
  try {
    const { resumeId } = await req.json();
    const supabase = await createClient()

    // 1️⃣ Fetch resume text
    const { data: resume, error } = await supabase
      .from("resumes")
      .select("raw_text")
      .eq("id", resumeId)
      .single();

    if (error || !resume) throw new Error("Resume not found");

    // 2️⃣ AI parsing
    const parsedData = await parseResumeWithAI(resume.raw_text);

    // 3️⃣ Store parsed data
    await supabase
      .from("resumes")
      .update({
        parsed_data: parsedData,
        status: "AI_PARSED",
      })
      .eq("id", resumeId);

    return NextResponse.json({ success: true, parsedData });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}