// server/routes/questionGen.ts
import { Router } from 'express';
import { askGeminiJSON } from '../services/geminiClient.js';
import { buildQuestionGenPrompt, QuestionType } from '../prompts/questionGen.js';
import { appendToUserArray } from '../services/store.js';

const router = Router();

const VALID_TYPES: QuestionType[] = ['dsa', 'behavioral', 'company-specific'];

router.post('/', async (req, res) => {
  const { userId, topic, difficulty, type, count } = req.body ?? {};

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId (string) is required' });
  }
  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ error: 'topic (string) is required' });
  }
  if (!type || !VALID_TYPES.includes(type)) {
    return res
      .status(400)
      .json({ error: `type must be one of: ${VALID_TYPES.join(', ')}` });
  }

  try {
    const prompt = buildQuestionGenPrompt(
      topic,
      difficulty || 'medium',
      type,
      typeof count === 'number' ? count : 5
    );
    const result = await askGeminiJSON<{
      questions: {
        id: string;
        question: string;
        difficulty: string;
        hints: string[];
        expectedApproach: string;
      }[];
    }>(prompt);

    appendToUserArray(userId, 'questionHistory', {
      topic,
      difficulty,
      type,
      generatedAt: new Date().toISOString(),
      questionIds: result.questions.map((q) => q.id),
    });

    res.json(result);
  } catch (err: any) {
    console.error('[question-gen] error:', err);
    res.status(500).json({ error: err.message || 'Question generation failed' });
  }
});

export default router;
