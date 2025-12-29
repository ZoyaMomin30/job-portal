export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { extractTextFromResume } from "@/services/resumeParser.service";
import { createClient } from "@/lib/supabase/server"
import { cleanResumeText } from "@/lib/cleanResumeText";
import { parseResumeWithAI } from "@/services/aiResumeParser.service";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc"];

export async function POST(req: Request) {
  const supabase = await createClient()
  
  try {
    console.log("📤 Received upload request");
    
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    console.log("📄 File received:", {
      name: file?.name,
      type: file?.type,
      size: file?.size
    });

    if (!file) {
      console.error("❌ No file in form data");
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file extension
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    console.log("🔍 File extension:", fileExtension);
    
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      console.error("❌ Invalid file extension:", fileExtension);
      return NextResponse.json(
        { error: "Invalid file type. Only PDF and DOCX files are allowed." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.error("❌ File too large:", file.size);
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    console.log("✅ File validation passed");

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("📦 Buffer created, size:", buffer.length);
    
    const filePath = `resumes/${Date.now()}-${file.name}`;

    // Upload to Supabase Storage
    console.log("☁️ Uploading to Supabase:", filePath);
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, buffer, {
        contentType: file.type || 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      console.error("❌ Upload error:", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    console.log("✅ File uploaded to storage");

    // Extract text from resume
    console.log("📝 Extracting text from resume...");
    const resumeText = await extractTextFromResume(buffer, file.name);
    console.log("✅ Text extracted, length:", resumeText.length);

    if (!resumeText || resumeText.trim().length === 0) {
      console.error("❌ No text extracted");
      await supabase.storage.from("resumes").remove([filePath]);
      return NextResponse.json(
        { error: "Could not extract text from resume." },
        { status: 400 }
      );
    }

    // Insert into database
    console.log("💾 Inserting into database...");
    const { data, error: dbError } = await supabase
      .from("resumes")
      .insert({
        file_path: filePath,
        raw_text: resumeText,
        status: "PARSED"
      })
      .select()
      .single();

    if (dbError) {
      console.error("❌ Database error:", dbError);
      await supabase.storage.from("resumes").remove([filePath]);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("✅ Success! Resume ID:", data.id);
    const cleanText = cleanResumeText(resumeText);
    console.log(cleanText)
    const parsedData = await parseResumeWithAI(cleanText);
    console.log(parsedData)

    return NextResponse.json({
      success: true,
      resumeId: data.id,
      message: "Resume uploaded and parsed successfully"
    });

  } catch (err: any) {
    console.error("💥 Resume upload error:", err);
    
    
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
