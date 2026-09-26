// server/prompts/prepPlan.ts
export function buildPrepPlanPrompt(
  skillGap: any,
  resumeAnalysis: any,
  weeksAvailable: number = 6
) {
  return `
Create a personalized placement-preparation roadmap for a student based on their
skill gap analysis and resume analysis below.

SKILL GAP ANALYSIS:
${JSON.stringify(skillGap ?? {}, null, 2)}

RESUME ANALYSIS:
${JSON.stringify(resumeAnalysis ?? {}, null, 2)}

TIMEFRAME: ${weeksAvailable} weeks

Return a JSON object with EXACTLY this shape:
{
  "weeklyPlan": [
    {
      "week": number,
      "focusAreas": string[],
      "tasks": string[]
    }
  ],
  "milestones": [
    { "title": string, "targetWeek": number, "description": string }
  ],
  "motivation": {
    "message": string,              // one short, genuine, encouraging line for this week
    "streakTip": string             // one tip to keep daily consistency
  }
}
weeklyPlan must contain exactly ${weeksAvailable} entries, one per week.
Do not include any text outside the JSON object.
`.trim();
}
