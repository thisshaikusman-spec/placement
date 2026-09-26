// server/prompts/resumeAnalyzer.ts
export function buildResumeAnalyzerPrompt(resumeText: string) {
  return `
Analyze the following resume for a campus placement / job-readiness platform.

RESUME TEXT:
"""
${resumeText}
"""

Return a JSON object with EXACTLY this shape:
{
  "atsScore": number,               // 0-100, how well it would pass an ATS scan
  "strengths": string[],            // 3-6 concrete strengths
  "weaknesses": string[],           // 3-6 concrete weaknesses
  "missingKeywords": string[],      // important role/skill keywords missing
  "suggestions": string[]           // 3-6 specific, actionable rewrite suggestions
}
Do not include any text outside the JSON object.
`.trim();
}
