import React, { useState, useEffect } from 'react';
import { AppUser, deriveDisplayName, getInitials, avatarColor } from '../context/UserContext';

interface AvatarProps {
  user?: AppUser | null;
  /** pixel size for width & height, default 32 */
  size?: number;
  className?: string;
}

/**
 * Shows, in priority order:
 *  1. user.avatarUrl  (Google photo or canvas-resized upload)
 *  2. Initials circle with a stable colour derived from the user's name (never stock photo)
 */
export const Avatar: React.FC<AvatarProps> = ({ user, size = 32, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [user?.avatarUrl]);

  const name = user ? deriveDisplayName(user) : '?';
  const initials = getInitials(name);
  const { bg, fg } = avatarColor(name);

  const style: React.CSSProperties = {
    width: size,
    height: size,
    minWidth: size,
    maxWidth: size,
    fontSize: Math.max(10, Math.round(size * 0.38)),
  };

  if (user?.avatarUrl && !imageError) {
    return (
      <img
        src={user.avatarUrl}
        alt={name}
        className={`rounded-full object-cover shrink-0 ${className}`}
        style={style}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <span
      className={`rounded-full flex items-center justify-center font-bold select-none shrink-0 ${className}`}
      style={{ ...style, background: bg, color: fg }}
      aria-label={name}
    >
      {initials}
    </span>
  );
};

export default Avatar;

