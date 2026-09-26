// server/prompts/skillGap.ts
export function buildSkillGapPrompt(resumeText: string, targetRole: string) {
  return `
Compare this candidate's resume against the skill requirements for the target role
and identify the skill gaps.

RESUME TEXT:
"""
${resumeText}
"""

TARGET ROLE: ${targetRole}

Return a JSON object with EXACTLY this shape:
{
  "summary": string,                // 2-3 sentence overview of readiness for the role
  "skillGaps": [
    {
      "skill": string,
      "currentLevel": "none" | "beginner" | "intermediate" | "advanced",
      "requiredLevel": "beginner" | "intermediate" | "advanced" | "expert",
      "priority": "low" | "medium" | "high"
    }
  ]
}
Include 5-8 skillGaps entries, ordered by priority (high first).
Do not include any text outside the JSON object.
`.trim();
}
