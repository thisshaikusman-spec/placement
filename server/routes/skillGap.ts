// server/routes/skillGap.ts
import { Router } from 'express';
import { askGeminiJSON } from '../services/geminiClient.js';
import { buildSkillGapPrompt } from '../prompts/skillGap.js';
import { getUser, updateUser } from '../services/store.js';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, resumeText, targetRole } = req.body ?? {};

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId (string) is required' });
  }
  if (!targetRole || typeof targetRole !== 'string') {
    return res.status(400).json({ error: 'targetRole (string) is required' });
  }

  // Fall back to previously stored resume text if not supplied this call.
  const user = getUser(userId);
  const finalResumeText = resumeText || user.resume?.resumeText;

  if (!finalResumeText) {
    return res.status(400).json({
      error:
        'resumeText is required (no previously analyzed resume found for this userId)',
    });
  }

  try {
    const prompt = buildSkillGapPrompt(finalResumeText, targetRole);
    const result = await askGeminiJSON<{
      summary: string;
      skillGaps: {
        skill: string;
        currentLevel: string;
        requiredLevel: string;
        priority: string;
      }[];
    }>(prompt);

    updateUser(userId, { skillGap: result });

    res.json(result);
  } catch (err: any) {
    console.error('[skill-gap] error:', err);
    res.status(500).json({ error: err.message || 'Skill gap analysis failed' });
  }
});

export default router;
