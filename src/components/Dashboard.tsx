import React, { useState } from 'react';
import { TabType } from '../types';
import { USER_PROFILE } from '../data/mockData';
import { useUser } from '../context/UserContext';

interface DashboardProps {
  onNavigate: (tab: TabType) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { displayName } = useUser();
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const tips = [
    {
      title: 'Verbalizing Edge Cases First',
      body: 'In technical coding rounds, verbalizing edge cases (n=0, empty arrays, integer overflows, duplicate keys) and time complexities before writing code increases pass rates by 34%.',
      impact: '+34% Pass Rate',
    },
    {
      title: 'The STAR Technique Metric Rule',
      body: 'When answering behavioral questions, quantify results with real engineering metrics (e.g. "reduced p99 latency by 42%" instead of "improved performance").',
      impact: '2.4x Higher Offer Probability',
    },
    {
      title: 'Recovering From Getting Stuck',
      body: 'If you freeze during an algorithm round, articulate your mental invariant out loud: "Currently I am exploring if a monotonic stack can maintain the next greater element in O(N)." This invites constructive interviewer hints without penalty.',
      impact: '88% Recovery Rate',
    },
  ];

  return (
    <div className="w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-gutter py-space-lg flex flex-col gap-space-lg">
        {/* Hero / Welcome Header */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-primary-fixed/40 via-secondary-fixed/30 to-transparent blur-3xl pointer-events-none"></div>
          <div className="absolute right-12 bottom-0 w-64 h-64 rounded-full bg-tertiary-fixed/20 blur-2xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Cohort Batch 2025
                </span>
                <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-semibold">
                  <span
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                  Sprint Mode Active
                </span>
              </div>
              <h1 className="font-headline-xl text-3xl font-bold text-on-surface tracking-tight mt-1">
                Welcome back, {displayName || USER_PROFILE.name}!{' '}
                <span className="inline-block transform hover:rotate-12 transition-transform duration-200 cursor-pointer">
                  👋
                </span>
              </h1>
              <p className="font-body-md text-sm text-on-surface-variant flex items-center gap-2 flex-wrap">
                <span>
                  Targeting{' '}
                  <strong className="text-on-surface font-semibold">
                    {USER_PROFILE.targetRole}
                  </strong>{' '}
                  at Top Tech
                </span>
                <span className="text-outline-variant">•</span>
                <span className="inline-flex items-center gap-1 text-primary font-label-md font-semibold text-sm">
                  <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
                  Campus Placements in {USER_PROFILE.daysToPlacements} Days
                </span>
              </p>
            </div>

            {/* Quick Goal Progress Callout */}
            <div className="flex items-center gap-space-md bg-surface-container-low/80 backdrop-blur-md p-space-md rounded-xl border border-surface-container/50">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Next On-Campus Drive
                </span>
                <span className="font-headline-md text-base font-bold text-on-surface">
                  {USER_PROFILE.nextDrive}
                </span>
                <span className="font-body-sm text-xs text-tertiary flex items-center gap-1 font-semibold mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>{' '}
                  {USER_PROFILE.eligibilityMetCount} Eligibility Criteria Met
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Tip Banner */}
        <div className="bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high rounded-xl p-space-md flex items-center justify-between gap-space-md text-on-surface shadow-sm border border-surface-container/40">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs flex-shrink-0">
              <span
                className="material-symbols-outlined text-xl text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lightbulb
              </span>
            </div>
            <p className="font-body-md text-sm text-on-surface">
              <span className="font-semibold text-primary">Tip of the day:</span>{' '}
              {tips[currentTipIndex].body}
            </p>
          </div>
          <button
            onClick={() => setTipModalOpen(true)}
            className="hidden sm:flex items-center gap-1 font-label-sm text-xs font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors flex-shrink-0 cursor-pointer"
          >
            <span>More Tips</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Main Grid: Circular Score + Streak Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          {/* Placement Readiness Meter (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl flex flex-col justify-between shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60 relative overflow-hidden">
            <div className="flex items-start justify-between gap-space-md">
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Predictive Career Metric
                </span>
                <h2 className="font-headline-lg text-xl font-bold text-on-surface">
                  Placement Readiness Index
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-tertiary-fixed/70 text-on-tertiary-fixed font-label-sm text-xs font-semibold">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                Top 12% in Batch
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-space-lg my-space-md">
              {/* Radial Progress SVG */}
              <div className="relative w-48 h-48 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    className="opacity-70"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="66"
                    stroke="#E2E8FF"
                    strokeWidth="12"
                  ></circle>
                  {/* 78% of 2 * PI * 66 (= 414.69) => 414.69 * (1 - 0.78) = 91.23 offset */}
                  <circle
                    className="transition-all duration-1000 ease-out"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="66"
                    stroke="url(#readiness-gradient)"
                    strokeDasharray="414.69"
                    strokeDashoffset="91.23"
                    strokeLinecap="round"
                    strokeWidth="12"
                  ></circle>
                  <defs>
                    <linearGradient id="readiness-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#1550d3"></stop>
                      <stop offset="100%" stopColor="#00855b"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-numeric-metric text-4xl font-bold text-on-surface leading-none">
                    78
                    <span className="text-base text-on-surface-variant font-normal">/100</span>
                  </span>
                  <span className="font-label-sm text-xs text-tertiary font-bold mt-1">
                    Tier-1 Ready
                  </span>
                </div>
              </div>

              {/* Score Context & Status */}
              <div className="flex flex-col gap-space-sm max-w-xs text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 self-center sm:self-start px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  +6 Points past 14 days
                </div>
                <p className="font-headline-md text-base font-bold text-on-surface">
                  Cleared for Day 1 Campus Shortlists
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Your profile currently matches hiring benchmarks for{' '}
                  <strong className="text-on-surface">Amazon, Microsoft, and Atlassian</strong> entry-level roles.
                </p>
                <div className="pt-space-xs">
                  <button
                    onClick={() => onNavigate('analytics')}
                    className="inline-flex items-center gap-1 font-label-md text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    View Full Diagnostic Report
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-md bg-surface-container-low/50 rounded-xl px-space-md py-space-sm border border-surface-container/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">psychology</span>
                <span className="font-body-sm text-xs text-on-surface">
                  AI Calibration Model v3.4 updated today
                </span>
              </div>
              <span className="font-label-sm text-xs text-on-surface-variant">
                Next re-assessment in 3 days
              </span>
            </div>
          </div>

          {/* Preparation Streak Card (5 Cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl flex flex-col justify-between shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60">
            <div>
              <div className="flex items-center justify-between gap-space-sm mb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-2xl text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_fire_department
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-md text-base font-bold text-on-surface">
                      12-Day Preparation Streak
                    </h3>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      Keep daily momentum alive
                    </span>
                  </div>
                </div>
                <span className="px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">stars</span>
                  150 XP Bonus
                </span>
              </div>

              {/* Weekly Days Tracker */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2 my-space-md text-center">
                {/* Mon */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container-low">
                  <span className="font-label-sm text-xs text-on-surface-variant">Mon</span>
                  <div className="w-7 h-7 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
                {/* Tue */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container-low">
                  <span className="font-label-sm text-xs text-on-surface-variant">Tue</span>
                  <div className="w-7 h-7 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
                {/* Wed */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container-low">
                  <span className="font-label-sm text-xs text-on-surface-variant">Wed</span>
                  <div className="w-7 h-7 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
                {/* Thu */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container-low">
                  <span className="font-label-sm text-xs text-on-surface-variant">Thu</span>
                  <div className="w-7 h-7 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
                {/* Today */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-primary-fixed ring-2 ring-primary">
                  <span className="font-label-sm text-xs font-bold text-primary">Today</span>
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md animate-bounce">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_fire_department
                    </span>
                  </div>
                </div>
                {/* Sat */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container-low/60 opacity-60">
                  <span className="font-label-sm text-xs text-on-surface-variant">Sat</span>
                  <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-outline">lock</span>
                  </div>
                </div>
                {/* Sun */}
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container-low/60 opacity-60">
                  <span className="font-label-sm text-xs text-on-surface-variant">Sun</span>
                  <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-outline">lock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Streak Achievement Footer */}
            <div className="p-space-md rounded-xl bg-gradient-to-br from-secondary-fixed/50 to-primary-fixed/40 flex items-center gap-space-md border border-secondary-fixed">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-secondary flex items-center justify-center shadow-sm flex-shrink-0">
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  military_tech
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-secondary font-bold">
                  Consistency Champ
                </span>
                <span className="font-body-sm text-xs text-on-surface">
                  You're in the top 5% of active campus daily practitioners!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Sub-Scores Breakdown Grid */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-lg text-lg font-bold text-on-surface">
              Readiness Dimensions
            </h3>
            <span className="font-body-sm text-xs text-on-surface-variant">
              Real-time interview rubric breakdown
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Sub-score 1: DSA */}
            <div
              onClick={() => onNavigate('dsa-practice')}
              className="bg-surface-container-lowest rounded-2xl p-space-md flex flex-col justify-between gap-space-md shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">data_object</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-xs font-semibold">
                    Strong
                  </span>
                </div>
                <h4 className="font-headline-md text-sm font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                  DSA &amp; Problem Solving
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="font-numeric-metric text-2xl font-bold text-on-surface">84%</span>
                  <span className="font-label-sm text-xs text-tertiary flex items-center font-semibold">
                    <span className="material-symbols-outlined text-[15px]">arrow_upward</span> +4% this wk
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-xl">
                <div className="flex items-center gap-1.5 text-on-surface font-label-sm text-xs font-semibold mb-0.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">play_circle</span>
                  Next Recommended Action:
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant truncate">
                  Master Graph Shortest Paths (Dijkstra)
                </p>
              </div>
            </div>

            {/* Sub-score 2: Communication */}
            <div
              onClick={() => onNavigate('mock-interview')}
              className="bg-surface-container-lowest rounded-2xl p-space-md flex flex-col justify-between gap-space-md shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">record_voice_over</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary font-label-sm text-xs font-semibold">
                    On Track
                  </span>
                </div>
                <h4 className="font-headline-md text-sm font-bold text-on-surface mt-1 group-hover:text-secondary transition-colors">
                  Communication &amp; Clarity
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="font-numeric-metric text-2xl font-bold text-on-surface">72%</span>
                  <span className="font-label-sm text-xs text-tertiary flex items-center font-semibold">
                    <span className="material-symbols-outlined text-[15px]">arrow_upward</span> +5% this wk
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-xl">
                <div className="flex items-center gap-1.5 text-on-surface font-label-sm text-xs font-semibold mb-0.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">mic</span>
                  Next Recommended Action:
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant truncate">
                  Practice STAR format for conflict questions
                </p>
              </div>
            </div>

            {/* Sub-score 3: Resume Fit */}
            <div
              onClick={() => onNavigate('analytics')}
              className="bg-surface-container-lowest rounded-2xl p-space-md flex flex-col justify-between gap-space-md shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">description</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed font-label-sm text-xs font-semibold">
                    Exceptional
                  </span>
                </div>
                <h4 className="font-headline-md text-sm font-bold text-on-surface mt-1 group-hover:text-tertiary transition-colors">
                  Resume &amp; Project Fit
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="font-numeric-metric text-2xl font-bold text-on-surface">88%</span>
                  <span className="font-label-sm text-xs text-on-surface-variant flex items-center font-medium">
                    <span className="material-symbols-outlined text-[15px]">trending_flat</span> Maintained
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-xl">
                <div className="flex items-center gap-1.5 text-on-surface font-label-sm text-xs font-semibold mb-0.5">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                  Next Recommended Action:
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant truncate">
                  Add quantified metrics to Distributed System
                </p>
              </div>
            </div>

            {/* Sub-score 4: Mock Interview Confidence */}
            <div
              onClick={() => onNavigate('mock-interview')}
              className="bg-surface-container-lowest rounded-2xl p-space-md flex flex-col justify-between gap-space-md shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">videocam</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-error-container/70 text-on-error-container font-label-sm text-xs font-semibold">
                    Focus Area
                  </span>
                </div>
                <h4 className="font-headline-md text-sm font-bold text-on-surface mt-1 group-hover:text-error transition-colors">
                  Mock Interview Confidence
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="font-numeric-metric text-2xl font-bold text-on-surface">68%</span>
                  <span className="font-label-sm text-xs text-tertiary flex items-center font-semibold">
                    <span className="material-symbols-outlined text-[15px]">arrow_upward</span> +2% this wk
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-xl">
                <div className="flex items-center gap-1.5 text-on-surface font-label-sm text-xs font-semibold mb-0.5">
                  <span className="material-symbols-outlined text-[16px] text-error">priority_high</span>
                  Next Recommended Action:
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant truncate">
                  Book 1:1 Live System Design Mock Simulation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Next Actions Row */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-lg text-lg font-bold text-on-surface">
              Primary Next Actions
            </h3>
            <span className="font-body-sm text-xs text-on-surface-variant">
              Recommended based on your 42-day roadmap
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Action 1: Resume DSA Practice */}
            <div className="group bg-surface-container-lowest rounded-2xl p-space-lg flex flex-col justify-between shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60 hover:shadow-[0_8px_24px_-4px_rgba(79,124,255,0.12)] transition-all">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-xs font-semibold">
                    In Progress • Dynamic Programming
                  </span>
                  <span className="text-xs text-on-surface-variant font-label-sm">Medium</span>
                </div>
                <h4 className="font-headline-md text-base font-bold text-on-surface mt-2 group-hover:text-primary transition-colors">
                  Longest Increasing Subsequence
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  You left off at DP state transitions with O(N log N) binary search optimization.
                </p>
                <div className="flex items-center gap-space-md py-space-xs text-on-surface-variant font-label-sm text-xs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">timer</span> 18 mins spent
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">code</span> Java / C++
                  </span>
                </div>
              </div>
              <div className="pt-space-md mt-space-sm">
                <button
                  onClick={() => onNavigate('dsa-practice')}
                  className="w-full inline-flex items-center justify-center gap-2 px-space-md py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-sm font-semibold hover:bg-on-primary-fixed-variant transition-colors shadow-sm cursor-pointer"
                >
                  <span>Resume Solve</span>
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                </button>
              </div>
            </div>

            {/* Action 2: Start Mock Interview */}
            <div className="group bg-surface-container-lowest rounded-2xl p-space-lg flex flex-col justify-between shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60 hover:shadow-[0_8px_24px_-4px_rgba(79,124,255,0.12)] transition-all">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-semibold">
                    AI Simulation • 30 Mins
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-secondary font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span> Live Bot
                  </span>
                </div>
                <h4 className="font-headline-md text-base font-bold text-on-surface mt-2 group-hover:text-secondary transition-colors">
                  Behavioral &amp; System Design
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Calibrate speaking cadence, micro-pauses, and architectural trade-off articulation with real-time feedback.
                </p>
                <div className="flex items-center gap-space-md py-space-xs text-on-surface-variant font-label-sm text-xs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">videocam</span> Video &amp; Audio
                  </span>
                  <span className="flex items-center gap-1 text-secondary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span> Instant Rubric
                  </span>
                </div>
              </div>
              <div className="pt-space-md mt-space-sm">
                <button
                  onClick={() => onNavigate('mock-interview')}
                  className="w-full inline-flex items-center justify-center gap-2 px-space-md py-2.5 rounded-xl bg-secondary text-on-secondary font-label-md text-sm font-semibold hover:bg-secondary-container transition-colors shadow-sm cursor-pointer"
                >
                  <span>Launch AI Room</span>
                  <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                </button>
              </div>
            </div>

            {/* Action 3: Daily Challenge */}
            <div className="group bg-surface-container-lowest rounded-2xl p-space-lg flex flex-col justify-between shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60 hover:shadow-[0_8px_24px_-4px_rgba(79,124,255,0.12)] transition-all">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-xs font-semibold">
                    Daily Challenge • Hard
                  </span>
                  <span className="text-xs text-on-surface-variant font-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">alarm</span> Closes in 6h 24m
                  </span>
                </div>
                <h4 className="font-headline-md text-base font-bold text-on-surface mt-2 group-hover:text-primary transition-colors">
                  Binary Tree Maximum Path Sum
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Post-order recursion with global maximum accumulator. High recurrence in Tier-1 Google/Directi rounds.
                </p>
                <div className="flex items-center gap-space-md py-space-xs text-on-surface-variant font-label-sm text-xs">
                  <span className="flex items-center gap-1 text-tertiary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">groups</span> 250 solved today
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-secondary">
                    <span className="material-symbols-outlined text-[16px]">military_tech</span> +50 XP
                  </span>
                </div>
              </div>
              <div className="pt-space-md mt-space-sm">
                <button
                  onClick={() => onNavigate('dsa-practice')}
                  className="w-full inline-flex items-center justify-center gap-2 px-space-md py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Attempt Challenge</span>
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Placement Cohort Activity Preview */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] border border-surface-container/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
            <div>
              <h4 className="font-headline-md text-base font-bold text-on-surface">
                Campus Activity Pulse
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Real-time peers prepping in your college cohort
              </p>
            </div>
            <button
              onClick={() => onNavigate('peer-pod')}
              className="inline-flex items-center gap-1 text-primary font-label-sm text-xs font-semibold hover:underline cursor-pointer"
            >
              <span>Join Peer Pod Live Room</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-surface-container/30">
              <img
                className="w-10 h-10 rounded-full object-cover"
                alt="Rohan Mehra"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6iTxK2mPo1ABKObtsXGNAj72BrYbKhNmmROmJHaNhv2oCYLM3aJVlDBiFhhF1vsbTYOj0mOkXvWqd_50v5XrWUQ8qODVyVpB_s_4Uzu3gGj5bndQGu2gTOVwOiBmPCzdzyT9XaRPJaCbK-UUEb1zMVBlPxtODh6LJX37h9IGQv4CPFFSSBV1h-8uCWnOUPUXn03Kt-wDq50knfrcu9zOcBMcsbYvybuCQVpLj09nE9oZ2G9t3VtZl"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-sm font-semibold text-on-surface truncate">
                  Rohan Mehra
                </span>
                <span className="font-body-sm text-xs text-tertiary font-semibold truncate">
                  Solved 'LRU Cache' (Hard)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-surface-container/30">
              <img
                className="w-10 h-10 rounded-full object-cover"
                alt="Kavya Sharma"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEWcVKjT8uJfzLthYlFIGy7XmviOKhVmauWuh3Ba-OA_T6WtOpbZx9wu2xvqIv35QIn5iLyTcFyLXI__i0HvzjkxTXrgpJNUo0CpyAXIklZw_-VdCCRqDQ3VyS_rONkmC67dSwDE9oVuebbhdPoua_tiUdRUdd--1b-xDcQCo0XK3dnZeLSzXKpf8NUPcmH_rKUpKMQh-kzq5XCHAd8q_a88d2usnT9fcZWqgMJsB6GRtg2A2EACn9"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-sm font-semibold text-on-surface truncate">
                  Kavya Sharma
                </span>
                <span className="font-body-sm text-xs text-secondary font-semibold truncate">
                  Finished Microsoft Mock (92%)
                </span>
              </div>
            </div>

            <div
              onClick={() => onNavigate('peer-pod')}
              className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-surface-container/30 hover:bg-surface-container transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                +48
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-sm font-semibold text-on-surface truncate">
                  Batch 2025 Study Room
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant truncate">
                  48 peers currently active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tip of the Day Modal */}
      {tipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-lg shadow-xl border border-surface-container flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">lightbulb</span>
                </span>
                <h3 className="font-headline-md text-base font-bold text-on-surface">
                  Daily Interview Insights
                </h3>
              </div>
              <button
                onClick={() => setTipModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs font-bold text-primary uppercase">
                  {tips[currentTipIndex].title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold">
                  {tips[currentTipIndex].impact}
                </span>
              </div>
              <p className="font-body-md text-sm text-on-surface leading-relaxed">
                {tips[currentTipIndex].body}
              </p>
            </div>

            <div className="flex items-center justify-between pt-space-xs">
              <div className="flex items-center gap-1">
                {tips.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentTipIndex ? 'w-5 bg-primary' : 'bg-outline-variant'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentTipIndex((prev) => (prev > 0 ? prev - 1 : tips.length - 1))
                  }
                  className="px-3 py-1.5 rounded-xl border border-surface-container text-xs font-semibold hover:bg-surface-container"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentTipIndex((prev) => (prev < tips.length - 1 ? prev + 1 : 0))
                  }
                  className="px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-on-primary-fixed-variant"
                >
                  Next Insight
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
