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

// export const runtime = "nodejs";

// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";
// import { parseResumeWithAI } from "@/services/aiResumeParser.service";

// export async function POST(req: Request) {
//   try {
//     const { resumeId } = await req.json();

//     if (!resumeId) {
//       return NextResponse.json(
//         { error: "Resume ID is required" },
//         { status: 400 }
//       );
//     }

//     const supabase = await createClient();

//     // 1️⃣ Fetch resume text
//     const { data: resume, error: fetchError } = await supabase
//       .from("resumes")
//       .select("raw_text, user_id")
//       .eq("id", resumeId)
//       .single();

//     if (fetchError || !resume) {
//       return NextResponse.json(
//         { error: "Resume not found" },
//         { status: 404 }
//       );
//     }

//     if (!resume.raw_text) {
//       return NextResponse.json(
//         { error: "Resume has no text content to parse" },
//         { status: 400 }
//       );
//     }

//     // 2️⃣ AI parsing
//     const parsedData = await parseResumeWithAI(resume.raw_text);

//     if (!parsedData) {
//       return NextResponse.json(
//         { error: "Failed to parse resume" },
//         { status: 500 }
//       );
//     }

//     // 3️⃣ Store parsed data in the parsed_data column
//     const { data: updatedResume, error: updateError } = await supabase
//       .from("resumes")
//       .update({
//         parsed_data: parsedData,
//         status: "AI_PARSED",
//         updated_at: new Date().toISOString(),
//       })
//       .eq("id", resumeId)
//       .select()
//       .single();

//     if (updateError) {
//       console.error("Error updating resume:", updateError);
//       return NextResponse.json(
//         { error: "Failed to save parsed data" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Resume parsed and saved successfully",
//       parsedData,
//       resumeId,
//     });

//   } catch (err: any) {
//     console.error("Parse resume error:", err);
//     return NextResponse.json(
//       { error: err.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }