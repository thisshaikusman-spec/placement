import React, { useState } from 'react';
import { TabType } from '../types';
import { LOGO_URL, USER_PROFILE } from '../data/mockData';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenNotifications,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'dsa-practice', label: 'DSA Practice' },
    { id: 'mock-interview', label: 'Mock Interview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'company-decoders', label: 'Company Decoders' },
    { id: 'peer-pod', label: 'Peer Pod' },
    { id: 'failure-replay', label: 'Failure Replay' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container/60">
      <div className="h-16 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
        {/* Brand Zone */}
        <div className="flex items-center gap-space-md flex-shrink-0">
          <button
            onClick={() => onTabChange('dashboard')}
            className="flex items-center gap-space-sm text-left group focus:outline-none"
            aria-label="PlacementIQ Home"
          >
            <img
              alt="PlacementIQ Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={LOGO_URL}
            />
            <span className="font-headline-md text-headline-md tracking-tight text-on-surface">
              Placement<span className="text-primary">IQ</span>
            </span>
          </button>
        </div>

        {/* Center Nav Zone */}
        <nav className="hidden xl:flex items-center gap-space-xs" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-space-sm py-space-xs transition-all cursor-pointer whitespace-nowrap text-sm font-semibold rounded-xl ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-headline-md shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions Zone */}
        <div className="flex items-center gap-space-sm flex-shrink-0">
          {/* Streak pill */}
          <button
            onClick={() => onTabChange('analytics')}
            title="12-Day Active Preparation Streak"
            className="hidden md:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shadow-[0_1px_3px_0_rgba(30,41,59,0.04)] hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-secondary text-body-md"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="font-semibold">{USER_PROFILE.streakDays} Days</span>
          </button>

          {/* Target Role pill */}
          <button
            onClick={() => onTabChange('company-decoders')}
            title="Target: SDE-1 @ Tier 1"
            className="hidden lg:flex items-center px-space-sm py-space-xs rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="text-on-surface-variant mr-1">Target:</span>
            <span className="font-semibold">{USER_PROFILE.targetRole}</span>
          </button>

          {/* Notifications Button */}
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative p-space-xs rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-md">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest animate-pulse"></span>
          </button>

          {/* Profile Avatar Button */}
          <button
            onClick={onOpenProfile}
            title={`${USER_PROFILE.fullName} - Profile & Goals`}
            className="flex items-center ml-space-xs rounded-full ring-2 ring-primary-fixed hover:ring-primary transition-all cursor-pointer overflow-hidden"
          >
            <img
              alt="Candidate Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={USER_PROFILE.avatarUrl}
            />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-space-xs rounded-xl text-on-surface-variant hover:bg-surface-container"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-surface-container px-gutter py-space-md flex flex-col gap-1.5 shadow-lg animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-space-md py-2.5 rounded-xl font-label-md transition-colors ${
                activeTab === item.id
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-surface-container-low flex items-center justify-between text-xs text-on-surface-variant">
            <span className="flex items-center gap-1 text-secondary font-semibold">
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              12-Day Streak
            </span>
            <span className="text-primary font-semibold">Target: SDE-1 @ Tier 1</span>
          </div>
        </div>
      )}
    </header>
  );
};
