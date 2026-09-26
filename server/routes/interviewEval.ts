// server/routes/interviewEval.ts
import { Router } from 'express';
import { askGeminiJSON } from '../services/geminiClient.js';
import { buildInterviewEvalPrompt } from '../prompts/interviewEval.js';
import { appendToUserArray } from '../services/store.js';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, question, transcript, audioDurationSec } = req.body ?? {};

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId (string) is required' });
  }
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'question (string) is required' });
  }
  if (!transcript || typeof transcript !== 'string' || transcript.trim().length < 5) {
    return res
      .status(400)
      .json({ error: 'transcript (string, at least 5 chars) is required' });
  }

  try {
    const prompt = buildInterviewEvalPrompt(
      question,
      transcript,
      typeof audioDurationSec === 'number' ? audioDurationSec : undefined
    );
    const result = await askGeminiJSON<{
      originalScore: number;
      calibratedScore: number;
      gaps: { title: string; detail: string }[];
      strengths: { title: string; detail: string }[];
      improvedAnswer: string;
      coachingTips: {
        index: number;
        badge: string;
        title: string;
        description: string;
        stat: string;
      }[];
    }>(prompt);

    appendToUserArray(userId, 'interviewHistory', {
      question,
      transcript,
      result,
      evaluatedAt: new Date().toISOString(),
    });

    res.json(result);
  } catch (err: any) {
    console.error('[interview-eval] error:', err);
    res.status(500).json({ error: err.message || 'Interview evaluation failed' });
  }
});

export default router;
