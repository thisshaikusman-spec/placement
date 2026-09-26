// server/services/store.ts
// Very small per-user JSON file store. Good enough for a hackathon; swap for
// a real DB (Postgres/Mongo) later by re-implementing these same functions.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../data');
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
}

function writeDb(db: DB) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

export function getUser(userId: string): UserProfile {
  const db = ensureDb();
  if (!db[userId]) {
    db[userId] = { userId };
    writeDb(db);
  }
  return db[userId];
}

export function updateUser(
  userId: string,
  patch: Partial<UserProfile>
): UserProfile {
  const db = ensureDb();
  const existing = db[userId] || { userId };
  db[userId] = { ...existing, ...patch };
  writeDb(db);
  return db[userId];
}

export function appendToUserArray(
  userId: string,
  field: 'questionHistory' | 'interviewHistory',
  item: any
): UserProfile {
  const db = ensureDb();
  const existing = db[userId] || { userId };
  const arr = existing[field] || [];
  arr.push(item);
  existing[field] = arr;
  db[userId] = existing;
  writeDb(db);
  return existing;
}
