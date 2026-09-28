// server/prompts/interviewChat.ts

export interface ChatHistoryItem {
  sender: 'alex' | 'candidate';
  text: string;
}

export function buildInterviewChatPrompt(
  round: string,
  history: ChatHistoryItem[],
  message: string
): string {
  const recentHistory = (history || []).slice(-10);
  const formattedHistory =
    recentHistory.length > 0
      ? recentHistory
          .map(
            (item) =>
              `${item.sender === 'alex' ? 'Alex' : 'Candidate'}: ${item.text}`
          )
          .join('\n')
      : '(No previous messages)';

  return `
You are Alex, a friendly senior engineering interviewer running a ${round} round for a campus placement candidate. Read the conversation so far and the candidate's latest message.
- If the candidate asks a question or a clarification (for example 'what is python'), answer it briefly and clearly in 2-3 sentences, then ask one follow-up interview question.
- If the candidate gives an answer, give one short piece of feedback (what was good, what was missing), then ask the next question.
- Never reply with only a question when they asked something.
- Keep replies under 90 words, conversational, no markdown.

Return ONLY JSON: { "reply": string }

Conversation history (last 10 messages):
${formattedHistory}

Candidate's latest message:
"${message}"
`.trim();
}
