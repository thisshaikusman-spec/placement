// server/services/store.ts
// Very small per-user JSON file store. Good enough for a hackathon; swap for
// a real DB (Postgres/Mongo) later by re-implementing these same functions.
//
// On Vercel the filesystem is read-only except /tmp, so when process.env.VERCEL
// is set we use os.tmpdir() for the data folder. All disk operations are wrapped
// in try/catch so storage errors never crash a request.

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// On Vercel use /tmp; otherwise use server/data (local dev).
const DATA_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), 'placementiq-data')
  : path.resolve(__dirname, '../data');

const DB_FILE = path.join(DATA_DIR, 'users.json');

export interface UserProfile {
  userId: string;
  resume?: {
    resumeText: string;
    analysis?: any;
    updatedAt: string;
  };
  skillGap?: any;
  prepPlan?: any;
  questionHistory?: any[];
  interviewHistory?: any[];
}

type DB = Record<string, UserProfile>;

function ensureDb(): DB {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), 'utf-8');
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    try {
      return JSON.parse(raw) as DB;
    } catch {
      return {};
    }
  } catch (err) {
    console.warn('[store] ensureDb failed (filesystem unavailable?):', err);
    return {};
  }
}

function writeDb(db: DB): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[store] writeDb failed (filesystem unavailable?):', err);
  }
}

export function getUser(userId: string): UserProfile {
  try {
    const db = ensureDb();
    if (!db[userId]) {
      db[userId] = { userId };
      writeDb(db);
    }
    return db[userId];
  } catch (err) {
    console.warn('[store] getUser failed:', err);
    return { userId };
  }
}

export function updateUser(
  userId: string,
  patch: Partial<UserProfile>
): UserProfile {
  try {
    const db = ensureDb();
    const existing = db[userId] || { userId };
    db[userId] = { ...existing, ...patch };
    writeDb(db);
    return db[userId];
  } catch (err) {
    console.warn('[store] updateUser failed:', err);
    return { userId, ...patch };
  }
}

export function appendToUserArray(
  userId: string,
  field: 'questionHistory' | 'interviewHistory',
  item: any
): UserProfile {
  try {
    const db = ensureDb();
    const existing = db[userId] || { userId };
    const arr = existing[field] || [];
    arr.push(item);
    existing[field] = arr;
    db[userId] = existing;
    writeDb(db);
    return existing;
  } catch (err) {
    console.warn('[store] appendToUserArray failed:', err);
    return { userId };
  }
}
