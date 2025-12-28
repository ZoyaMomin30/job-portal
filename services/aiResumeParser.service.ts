import { openai } from "@/lib/openai";

export const parseResumeWithAI = async (resumeText: string) => {
  const prompt = `
You are an AI resume parser.

Extract the following details from the resume text:
- Skills (array of strings)
- Education (array of strings)
- Total years of experience (number)
- Job roles / titles (array of strings)

Rules:
- Return ONLY valid JSON
- No explanations
- Use empty arrays if not found

Resume Text:
"""${resumeText}"""
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  return JSON.parse(response.choices[0].message.content!);
};
