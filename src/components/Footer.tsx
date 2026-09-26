import React from 'react';
import { TabType } from '../types';

interface FooterProps {
  onTabChange: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-space-xl mt-space-xl border-t border-surface-container/60">
      <div className="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-body-sm text-body-sm text-sm">
        <div>© 2025 PlacementIQ. Calibrated for Campus Placements.</div>
        <div className="flex items-center gap-space-lg">
          <button
            onClick={() => onTabChange('dsa-practice')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Curriculum
          </button>
          <button
            onClick={() => onTabChange('analytics')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Readiness Index
          </button>
          <button
            onClick={() => onTabChange('peer-pod')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Student Community
          </button>
        </div>
      </div>
    </footer>
  );
};
