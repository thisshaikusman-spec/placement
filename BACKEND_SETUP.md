# PlacementIQ Backend — Setup

This folder contains a **complete, working** Express + TypeScript backend that
powers the 5 Gemini agents for your existing `linkdraft` frontend.

## 1. Copy these into your project

Copy the whole `server/` folder and `.env.example` into the root of your
`linkdraft` project (same level as `src/`, `package.json`, etc).

Then **replace** your existing `package.json` with the one in this folder
(it's your original file plus `cors`, `@types/cors`, and a new `"server"` script —
nothing else changed).

Your project root should now look like:
```
linkdraft/
  server/
    index.ts
    routes/
    services/
    prompts/
    data/            <- created automatically on first run
  src/
  .env               <- you create this (see step 2)
  .env.example
  package.json
  ...
```

## 2. Add your Gemini API key

Copy `.env.example` to `.env` in the project root:
```
GEMINI_API_KEY="your-real-key-here"
PORT=4000
```
Get a key at https://aistudio.google.com/app/apikey — never commit `.env` or
paste the raw key anywhere public.

## 3. Install the two new dependencies

```powershell
npm install --legacy-peer-deps
```
(This just adds `cors`/`@types/cors`; everything else you already installed.)

## 4. Run frontend + backend together (two terminals)

**Terminal 1 — frontend:**
```powershell
npm run dev
```
→ http://localhost:3000

**Terminal 2 — backend:**
```powershell
npm run server
```
→ http://localhost:4000  (auto-restarts on file changes, thanks to `tsx watch`)

## 5. Test it

```powershell
curl http://localhost:4000/api/health
```
Should return `{"status":"ok", ...}`.

Then try each agent, e.g.:
```powershell
curl -X POST http://localhost:4000/api/agents/resume-analyze `
  -H "Content-Type: application/json" `
  -d '{\"userId\":\"test1\",\"resumeText\":\"Experienced CS student skilled in Java, DSA, and React. Built 3 projects...\"}'
```

## Endpoints

| Method | Route                          | Purpose                          |
|--------|---------------------------------|-----------------------------------|
| GET    | /api/health                    | Backend + key status              |
| POST   | /api/agents/resume-analyze     | Resume Analyzer Agent             |
| POST   | /api/agents/skill-gap          | Skill Gap Analyzer Agent          |
| POST   | /api/agents/prep-plan          | Personalized Prep Planner Agent   |
| POST   | /api/agents/question-gen       | Question Generator Agent          |
| POST   | /api/agents/interview-eval     | Interview Answer Evaluator Agent  |

All request/response JSON shapes are documented as comments at the top of each
file in `server/prompts/`.

## Data storage

Per-user data (resume, skill gap, prep plan, question/interview history) is
stored in `server/data/users.json`, keyed by `userId`. This is a simple file
store for the hackathon — swap `server/services/store.ts` for a real DB call
later without touching any route code.

## Wiring the frontend

In each component (e.g. `DsaPractice.tsx`, `MockInterview.tsx`,
`Analytics.tsx`, `FailureReplay.tsx`), replace the mock-data calls with a
`fetch('http://localhost:4000/api/agents/...')` POST call using the request
shapes above. Keep a single `userId` (e.g. from a login/localStorage) and pass
it on every call so each student's data stays separate.
