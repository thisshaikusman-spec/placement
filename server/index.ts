// server/index.ts - Entry point for the PlacementIQ backend
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import healthRouter from './routes/health';
import resumeAnalyzerRouter from './routes/resumeAnalyzer';
import skillGapRouter from './routes/skillGap';
import prepPlanRouter from './routes/prepPlan';
import questionGenRouter from './routes/questionGen';
import interviewEvalRouter from './routes/interviewEval';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '2mb' }));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/agents/resume-analyze', resumeAnalyzerRouter);
app.use('/api/agents/skill-gap', skillGapRouter);
app.use('/api/agents/prep-plan', prepPlanRouter);
app.use('/api/agents/question-gen', questionGenRouter);
app.use('/api/agents/interview-eval', interviewEvalRouter);

// Fallback 404 for unknown API routes
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Unknown API route' });
});

app.listen(PORT, () => {
  console.log(`PlacementIQ backend listening on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
