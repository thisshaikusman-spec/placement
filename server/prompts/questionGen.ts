// server/prompts/questionGen.ts
export type QuestionType = 'dsa' | 'behavioral' | 'company-specific';

export function buildQuestionGenPrompt(
  topic: string,
  difficulty: string,
  type: QuestionType,
  count: number = 5
) {
  return `
Generate ${count} interview/practice questions for a campus placement prep platform.

TYPE: ${type}
TOPIC: ${topic}
DIFFICULTY: ${difficulty}

Return a JSON object with EXACTLY this shape:
{
  "questions": [
    {
      "id": string,               // short unique slug, e.g. "dsa-arrays-001"
      "question": string,
      "difficulty": string,
      "hints": string[],          // 2-3 progressive hints, do not reveal the full answer
      "expectedApproach": string  // 2-4 sentence outline of the ideal approach/answer
    }
  ]
}
Do not include any text outside the JSON object.
`.trim();
}
