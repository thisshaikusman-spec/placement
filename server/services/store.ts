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

function getDataDir(): string {
  if (process.env.VERCEL) {
    return path.join(os.tmpdir(), 'placementiq-data');
  }
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, '../data');
}

function getDbFile(): string {
  return path.join(getDataDir(), 'users.json');
}

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
    const dataDir = getDataDir();
    const dbFile = getDbFile();
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dbFile)) {
      fs.writeFileSync(dbFile, JSON.stringify({}, null, 2), 'utf-8');
    }
    const raw = fs.readFileSync(dbFile, 'utf-8');
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
    const dataDir = getDataDir();
    const dbFile = getDbFile();
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2), 'utf-8');
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
