// server/routes/interviewChat.ts
import { Router } from 'express';
import { askGeminiJSON } from '../services/geminiClient.js';
import { buildInterviewChatPrompt } from '../prompts/interviewChat.js';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, round, history, message } = req.body ?? {};

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId (string) is required' });
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message (non-empty string) is required' });
  }

  try {
    const prompt = buildInterviewChatPrompt(
      typeof round === 'string' && round.trim() ? round : 'Technical Interview',
      Array.isArray(history) ? history : [],
      message.trim()
    );

    const result = await askGeminiJSON<{ reply: string }>(prompt);

    res.json({ reply: result.reply });
  } catch (err: any) {
    console.error('[interview-chat] error:', err);
    res.status(500).json({ error: err.message || 'Interview chat failed' });
  }
});

export default router;
