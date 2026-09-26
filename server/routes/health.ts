// server/routes/health.ts
import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'PlacementIQ backend',
    time: new Date().toISOString(),
    geminiKeyConfigured:
      !!process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY',
  });
});

export default router;
