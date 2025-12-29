export function cleanResumeText(text: string): string {
  return text
    // Normalize line endings
    .replace(/\r\n/g, "\n")

    // Fix broken URLs split by newlines
    .replace(/(https?:\/\/[^\s]+)\s*\n\s*([^\s]+)/g, "$1$2")

    // Fix broken emails split by spaces
    .replace(/([a-zA-Z0-9._%+-]+)\s*@\s*([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, "$1@$2")

    // Replace multiple spaces/tabs with single space
    .replace(/[ \t]+/g, " ")

    // Clean spaces around newlines
    .replace(/\s*\n\s*/g, "\n")

    // Limit excessive newlines
    .replace(/\n{3,}/g, "\n\n")

    // Final trim
    .trim()
}
