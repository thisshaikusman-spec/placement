// server/prompts/interviewEval.ts
// Output shape mirrors the frontend's FailureQuestion interface (src/types.ts)
// so MockInterview.tsx and FailureReplay.tsx can consume it directly.

export function buildInterviewEvalPrompt(
  question: string,
  transcript: string,
  audioDurationSec?: number
) {
  return `
Evaluate this candidate's spoken interview answer like a strict but fair senior
interviewer / coach.

QUESTION: "${question}"

CANDIDATE'S VERBATIM ANSWER TRANSCRIPT:
"""
${transcript}
"""

${audioDurationSec ? `ANSWER DURATION: ${audioDurationSec} seconds` : ''}

Return a JSON object with EXACTLY this shape:
{
  "originalScore": number,          // 0-100, score as if graded strictly first-pass
  "calibratedScore": number,        // 0-100, score after accounting for nerves/context
  "gaps": [
    { "title": string, "detail": string }
  ],
  "strengths": [
    { "title": string, "detail": string }
  ],
  "improvedAnswer": string,         // a rewritten, stronger version of the answer
  "coachingTips": [
    {
      "index": number,
      "badge": string,              // short label e.g. "Structure", "Confidence"
      "title": string,
      "description": string,
      "stat": string                // a short supporting stat/benchmark, e.g. "Top answers are 90s or less"
    }
  ]
}
Include 2-4 gaps, 2-3 strengths, and 3 coachingTips.
Do not include any text outside the JSON object.
`.trim();
}
