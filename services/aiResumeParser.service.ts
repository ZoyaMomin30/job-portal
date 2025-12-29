export async function parseResumeWithAI(resumeText: string) {
  const prompt = `
You are a resume parser.

Extract the following fields from the resume text.
Return ONLY valid JSON. No explanation. No markdown.

Fields:
- name (string or null)
- email (string or null)
- phone (string or null)
- skills (array of strings)
- education (array of strings)
- experience (array of strings)

Resume text:
"""
${resumeText}
"""
`

  const response = await fetch("http:///api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.2",
      prompt,
      stream: false,
    }),
  })

  if (!response.ok) {
    throw new Error("Ollama request failed")
  }

  const data = await response.json()

  if (!data.response) {
    throw new Error("Empty response from Ollama")
  }

  // SAFETY: extract JSON only
  const raw = data.response.trim()
  const start = raw.indexOf("{")
  const end = raw.lastIndexOf("}")

  if (start === -1 || end === -1) {
    throw new Error("No JSON found in Ollama response")
  }

  const jsonString = raw.slice(start, end + 1)

  return JSON.parse(jsonString)
}
