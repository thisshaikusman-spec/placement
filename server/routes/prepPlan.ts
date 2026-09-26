// server/routes/prepPlan.ts
import { Router } from 'express';
import { askGeminiJSON } from '../services/geminiClient.js';
import { buildPrepPlanPrompt } from '../prompts/prepPlan.js';
import { getUser, updateUser } from '../services/store.js';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, weeksAvailable } = req.body ?? {};

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId (string) is required' });
  }

  const user = getUser(userId);

  if (!user.skillGap) {
    return res.status(400).json({
      error:
        'No skillGap found for this userId. Call /api/agents/skill-gap first.',
    });
  }

  try {
    const prompt = buildPrepPlanPrompt(
      user.skillGap,
      user.resume?.analysis,
      typeof weeksAvailable === 'number' ? weeksAvailable : 6
    );
    const plan = await askGeminiJSON<{
      weeklyPlan: { week: number; focusAreas: string[]; tasks: string[] }[];
      milestones: { title: string; targetWeek: number; description: string }[];
      motivation: { message: string; streakTip: string };
    }>(prompt);

    updateUser(userId, { prepPlan: plan });

    res.json(plan);
  } catch (err: any) {
    console.error('[prep-plan] error:', err);
    res.status(500).json({ error: err.message || 'Prep plan generation failed' });
  }
});

export default router;
