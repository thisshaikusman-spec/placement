// server/index.ts - Entry point for the PlacementIQ backend
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
try {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
} catch {
  // Ignore error if .env file is missing
}

import healthRouter from './routes/health.js';
import resumeAnalyzerRouter from './routes/resumeAnalyzer.js';
import skillGapRouter from './routes/skillGap.js';
import prepPlanRouter from './routes/prepPlan.js';
import questionGenRouter from './routes/questionGen.js';
import interviewEvalRouter from './routes/interviewEval.js';
import interviewChatRouter from './routes/interviewChat.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  ...(process.env.CLIENT_ORIGIN ? [process.env.CLIENT_ORIGIN] : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
app.use(express.json({ limit: '2mb' }));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/agents/resume-analyze', resumeAnalyzerRouter);
app.use('/api/agents/skill-gap', skillGapRouter);
app.use('/api/agents/prep-plan', prepPlanRouter);
app.use('/api/agents/question-gen', questionGenRouter);
app.use('/api/agents/interview-eval', interviewEvalRouter);
app.use('/api/agents/interview-chat', interviewChatRouter);

// Fallback 404 for unknown API routes
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Unknown API route' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`PlacementIQ backend listening on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

export default app;

