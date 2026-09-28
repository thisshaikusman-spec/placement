import React, { useState, useRef } from 'react';
import { USER_PROFILE } from '../data/mockData';
import { useUser, AppUser } from '../context/UserContext';
import Avatar from './Avatar';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDecoders: () => void;
  onLogout?: () => void;
}

const resizeImageToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        // Center crop to 1:1 aspect ratio before drawing 256x256
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 256, 256);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigateToDecoders,
  onLogout,
}) => {
  const { displayName, user, setUser } = useUser();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so re-selecting the same file fires onChange
    e.target.value = '';

    if (!file.type.startsWith('image/')) {
      setUploadError('Images only: please select an image file.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Image size exceeds maximum allowed size of 2 MB.');
      return;
    }

    setUploadError(null);

    try {
      const dataUrl = await resizeImageToDataUrl(file);
      const updatedUser: AppUser = {
        name: user?.name || displayName || USER_PROFILE.fullName,
        email: user?.email || '',
        avatarUrl: dataUrl,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Photo resize error:', err);
      setUploadError('Failed to process image. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-xl shadow-xl border border-surface-container flex flex-col gap-space-lg">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-space-md">
            <div className="relative group shrink-0">
              <Avatar
                user={user}
                size={64}
                className="ring-4 ring-primary-fixed shadow-sm"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 bg-surface-container-lowest text-primary hover:bg-primary hover:text-white rounded-full shadow border border-surface-container transition-colors cursor-pointer flex items-center justify-center"
                title="Change photo"
                aria-label="Change photo"
              >
                <span className="material-symbols-outlined text-sm leading-none">photo_camera</span>
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-headline-lg text-xl font-bold text-on-surface">
                  {displayName || USER_PROFILE.fullName}
                </h2>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">edit</span>
                  <span>Change photo</span>
                </button>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                {user?.email || USER_PROFILE.branch}
              </p>
              <span className="font-label-sm text-xs font-semibold text-primary">
                {USER_PROFILE.college}
              </span>
              {uploadError && (
                <p className="text-[11px] text-error font-medium mt-1">{uploadError}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Target Profile Card */}
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-2 border border-surface-container/40">
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Target Placement Tier</span>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">
              {USER_PROFILE.targetRole}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Placement Readiness Index</span>
            <span className="text-tertiary font-bold">{USER_PROFILE.readinessScore}/100 (Tier-1 Ready)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Current Preparation Streak</span>
            <span className="text-secondary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              {USER_PROFILE.streakDays} Consecutive Days
            </span>
          </div>
        </div>

        {/* Target Companies */}
        <div>
          <span className="font-bold text-xs text-on-surface block mb-2">Target Firms on Day 1</span>
          <div className="flex flex-wrap gap-2">
            {USER_PROFILE.targetFirms.map((firm) => (
              <span
                key={firm}
                className="px-3 py-1 rounded-xl bg-surface-container font-label-md text-xs font-semibold text-on-surface flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {firm}
              </span>
            ))}
          </div>
        </div>

        {/* Verification Status */}
        <div className="p-3 rounded-xl bg-tertiary-fixed/30 border border-tertiary-fixed/40 text-xs text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-lg">verified</span>
          <div>
            <span className="font-bold text-tertiary">Placement Cell Resume Verified</span>
            <p className="text-on-surface-variant text-[11px] mt-0.5">
              8/8 criteria verified for Day 1 on-campus company slot allocation.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-space-xs border-t border-surface-container/30">
          <button
            onClick={() => {
              onClose();
              onNavigateToDecoders();
            }}
            className="text-primary hover:underline text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>View Target Company Decoders</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          <div className="flex items-center gap-2">
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-2 rounded-xl text-error hover:bg-error-container/40 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                title="Log out of PlacementIQ"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-space-md py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow hover:bg-primary-container cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
