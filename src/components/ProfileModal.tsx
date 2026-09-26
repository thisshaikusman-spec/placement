import React from 'react';
import { USER_PROFILE } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDecoders: () => void;
  onLogout?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigateToDecoders,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-xl shadow-xl border border-surface-container flex flex-col gap-space-lg">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-space-md">
            <img
              src={USER_PROFILE.avatarUrl}
              alt={USER_PROFILE.fullName}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-fixed shadow-sm"
            />
            <div>
              <h2 className="font-headline-lg text-xl font-bold text-on-surface">
                {USER_PROFILE.fullName}
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                {USER_PROFILE.branch}
              </p>
              <span className="font-label-sm text-xs font-semibold text-primary">
                {USER_PROFILE.college}
              </span>
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
