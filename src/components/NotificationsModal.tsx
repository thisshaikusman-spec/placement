import React from 'react';
import { TabType } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabType) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'Sneha posted a peer mock invite for 6:00 PM',
      subtitle: 'Behavioral & Leadership round • Google & Amazon question bank',
      time: '3 hours ago',
      unread: true,
      targetTab: 'peer-pod' as TabType,
      icon: 'groups',
      color: 'text-secondary',
    },
    {
      id: 'n2',
      title: 'Amazon & Google Day 1 Shortlist Criteria Met',
      subtitle: 'Your 78/100 Readiness Score has qualified you for initial slot allocation.',
      time: '5 hours ago',
      unread: true,
      targetTab: 'analytics' as TabType,
      icon: 'verified',
      color: 'text-tertiary',
    },
    {
      id: 'n3',
      title: 'Daily Challenge: Binary Tree Maximum Path Sum',
      subtitle: 'Closes in 6h 24m. 250 cohort peers solved today (+50 XP).',
      time: '6 hours ago',
      unread: false,
      targetTab: 'dsa-practice' as TabType,
      icon: 'alarm',
      color: 'text-primary',
    },
    {
      id: 'n4',
      title: 'New AI Insight on Failure Replay',
      subtitle: 'Review your distributed microservices consistency response breakdown.',
      time: 'Yesterday',
      unread: false,
      targetTab: 'failure-replay' as TabType,
      icon: 'psychology',
      color: 'text-secondary',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-on-surface/30 backdrop-blur-xs animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-space-md shadow-2xl border border-surface-container flex flex-col gap-space-sm mt-12">
        <div className="flex items-center justify-between pb-space-xs border-b border-surface-container/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">notifications</span>
            <h3 className="font-headline-md text-sm font-bold text-on-surface">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onClose();
                onNavigate(item.targetTab);
              }}
              className={`p-3 rounded-xl flex items-start gap-3 transition-colors cursor-pointer border ${
                item.unread
                  ? 'bg-surface-container-low border-primary/20 hover:bg-surface-container'
                  : 'bg-surface-container-lowest hover:bg-surface-container-low border-surface-container/30'
              }`}
            >
              <span className={`material-symbols-outlined text-lg mt-0.5 ${item.color}`}>
                {item.icon}
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-xs font-bold text-on-surface truncate">
                    {item.title}
                  </span>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 ml-1"></span>
                  )}
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">
                  {item.subtitle}
                </p>
                <span className="text-[10px] text-outline mt-0.5">{item.time}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full text-center py-2 text-xs font-semibold text-primary hover:underline cursor-pointer border-t border-surface-container/30 pt-2"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};
