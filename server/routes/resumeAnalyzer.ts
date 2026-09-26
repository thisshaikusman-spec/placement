// server/routes/resumeAnalyzer.ts
import { Router } from 'express';
import { askGeminiJSON } from '../services/geminiClient';
import { buildResumeAnalyzerPrompt } from '../prompts/resumeAnalyzer';
import { updateUser } from '../services/store';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, resumeText } = req.body ?? {};

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId (string) is required' });
  }
  if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length < 20) {
    return res
      .status(400)
      .json({ error: 'resumeText (string, at least 20 chars) is required' });
  }

  try {
    const prompt = buildResumeAnalyzerPrompt(resumeText);
    const analysis = await askGeminiJSON<{
      atsScore: number;
      strengths: string[];
      weaknesses: string[];
      missingKeywords: string[];
      suggestions: string[];
    }>(prompt);

    updateUser(userId, {
      resume: { resumeText, analysis, updatedAt: new Date().toISOString() },
    });

    res.json(analysis);
  } catch (err: any) {
    console.error('[resume-analyze] error:', err);
    res.status(500).json({ error: err.message || 'Resume analysis failed' });
  }
});

export default router;
