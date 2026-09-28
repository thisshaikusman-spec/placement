import { createContext, useContext } from 'react';

export interface AppUser {
  name: string;
  email: string;
  avatarUrl?: string; // Google photo URL or data-URL from upload
}

interface UserContextValue {
  user: AppUser | null;
  displayName: string;
  setUser: (user: AppUser | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  displayName: '',
  setUser: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

/** Derive a display name: use user.name if present, else capitalise the part before '@'. */
export function deriveDisplayName(user: AppUser): string {
  if (user.name && user.name.trim()) return user.name.trim();
  const prefix = user.email.split('@')[0] ?? '';
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

/** Compute up-to-2 uppercase initials from a display name. */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.[0] ?? '?').toUpperCase();
}

/** Stable colour for a given name (based on char-code sum). */
const PALETTE = [
  ['#4F7CFF', '#EEF2FF'],
  ['#059669', '#ECFDF5'],
  ['#7C3AED', '#F5F3FF'],
  ['#D97706', '#FFFBEB'],
  ['#DB2777', '#FDF2F8'],
  ['#0891B2', '#ECFEFF'],
];

export function avatarColor(name: string): { bg: string; fg: string } {
  const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const [fg, bg] = PALETTE[sum % PALETTE.length]!;
  return { bg, fg };
}
