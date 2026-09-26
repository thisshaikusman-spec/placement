import React, { useState } from 'react';
import { TabType } from '../types';

interface AnalyticsProps {
  onNavigate: (tab: TabType) => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({ onNavigate }) => {
  const [selectedRange, setSelectedRange] = useState<'7D' | '30D' | '90D' | 'Term'>('30D');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
        {/* Top Meta Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs font-bold uppercase tracking-wider">
                Psychometrics &amp; Trajectory
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              <span className="font-label-sm text-xs text-tertiary font-semibold">Calibrated Live</span>
            </div>
            <h1 className="font-headline-xl text-3xl font-bold text-on-surface">
              Confidence &amp; Performance Analytics
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Visualizing cognitive composure, topic-wise vulnerability, and your evolving readiness curve across targeted tech rounds.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="inline-flex items-center bg-surface-container-low rounded-xl p-1 shadow-sm border border-surface-container/40">
              {(['7D', '30D', '90D', 'Term'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRange(r)}
                  className={`px-space-md py-1.5 font-label-sm text-xs rounded-lg transition-all cursor-pointer font-semibold ${
                    selectedRange === r
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {r === '30D' ? 'Last 30 Days' : r === 'Term' ? 'Term Pace' : r}
                </button>
              ))}
            </div>
            <button
              onClick={handleExportPdf}
              className="flex items-center gap-space-xs bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-xs font-semibold px-space-md py-2.5 rounded-xl shadow-sm transition-all duration-200 border border-surface-container/60 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-primary">sim_card_download</span>
              <span>Export PDF Report</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Metric Ticker */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all border border-surface-container/60">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-fixed/30 rounded-full blur-2xl group-hover:bg-primary-fixed/50 transition-all"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs text-on-surface-variant font-semibold">Readiness Index</span>
              <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
            </div>
            <div className="mt-space-md flex items-baseline gap-space-xs">
              <span className="font-numeric-metric text-4xl font-bold text-on-surface">78%</span>
              <span className="font-label-sm text-xs text-tertiary flex items-center font-bold">
                <span className="material-symbols-outlined text-sm">arrow_upward</span> +26%
              </span>
            </div>
            <div className="mt-space-xs font-body-sm text-xs text-on-surface-variant">Started at 52% baseline 30d ago</div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all border border-surface-container/60">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-tertiary-fixed/30 rounded-full blur-2xl group-hover:bg-tertiary-fixed/50 transition-all"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs text-on-surface-variant font-semibold">Clarity Velocity</span>
              <span className="material-symbols-outlined text-tertiary text-xl">speed</span>
            </div>
            <div className="mt-space-md flex items-baseline gap-space-xs">
              <span className="font-numeric-metric text-4xl font-bold text-on-surface">4m 15s</span>
              <span className="font-label-sm text-xs text-tertiary flex items-center font-bold">
                <span className="material-symbols-outlined text-sm">arrow_downward</span> -51%
              </span>
            </div>
            <div className="mt-space-xs font-body-sm text-xs text-on-surface-variant">Time to first sound pseudocode</div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all border border-surface-container/60">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary-fixed/40 rounded-full blur-2xl group-hover:bg-secondary-fixed/60 transition-all"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs text-on-surface-variant font-semibold">Recovery Quotient</span>
              <span className="material-symbols-outlined text-secondary text-xl">psychology</span>
            </div>
            <div className="mt-space-md flex items-baseline gap-space-xs">
              <span className="font-numeric-metric text-4xl font-bold text-on-surface">
                8.4<span className="text-base text-on-surface-variant font-normal">/10</span>
              </span>
              <span className="font-label-sm text-xs text-secondary font-bold">High EQ</span>
            </div>
            <div className="mt-space-xs font-body-sm text-xs text-on-surface-variant">Pivot rate under harsh counter-questions</div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all border border-surface-container/60">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-fixed/20 rounded-full blur-2xl group-hover:bg-primary-fixed/40 transition-all"></div>
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs text-on-surface-variant font-semibold">Mock Stride</span>
              <span className="material-symbols-outlined text-primary text-xl">emoji_events</span>
            </div>
            <div className="mt-space-md flex items-baseline gap-space-xs">
              <span className="font-numeric-metric text-4xl font-bold text-on-surface">19</span>
              <span className="text-base text-on-surface-variant font-normal ml-1">Rounds</span>
            </div>
            <div className="mt-space-xs font-body-sm text-xs text-on-surface-variant">Across Algorithms &amp; System Archetypes</div>
          </div>
        </div>

        {/* Main Hero Chart Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg lg:p-space-xl shadow-md relative overflow-hidden flex flex-col gap-space-lg border border-surface-container/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-lg text-xl font-bold text-on-surface">
                  Confidence &amp; Readiness Score Over Time
                </span>
                <span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-bold">
                  +26% Gain
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                Daily aggregated biometric &amp; evaluation composure rating (Weeks 1 to 4)
              </p>
            </div>

            {/* Legend Chips */}
            <div className="flex flex-wrap items-center gap-space-md text-xs font-medium">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-on-surface font-semibold">Aggregated Readiness</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                <span className="text-on-surface-variant">Emotional Equilibrium</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-sm bg-tertiary"></span>
                <span className="text-on-surface-variant">Target Threshold (75%)</span>
              </div>
            </div>
          </div>

          {/* Interactive Line Chart Visualization */}
          <div className="relative w-full h-80 lg:h-96 select-none" id="chart-container">
            {/* Target Goal Line at 75% */}
            <div className="absolute left-10 right-0 top-[25%] flex items-center pointer-events-none opacity-60">
              <div className="w-full border-t border-dashed border-tertiary"></div>
              <span className="ml-2 font-label-sm text-xs text-tertiary whitespace-nowrap bg-surface-container-lowest px-1 font-semibold">
                Campus Placement Cutoff (75%)
              </span>
            </div>

            {/* Y Axis Guidelines */}
            <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between font-label-sm text-xs text-outline select-none">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            {/* SVG Line Canvas */}
            <div className="absolute left-10 right-0 top-0 bottom-8">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <defs>
                  <linearGradient id="readinessGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#1550d3" stopOpacity="0.32"></stop>
                    <stop offset="100%" stopColor="#1550d3" stopOpacity="0.0"></stop>
                  </linearGradient>
                  <linearGradient id="confidenceGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#8455ef" stopOpacity="0.22"></stop>
                    <stop offset="100%" stopColor="#8455ef" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line stroke="#eff4ff" strokeWidth="1.5" x1="0" x2="1000" y1="75" y2="75"></line>
                <line stroke="#eff4ff" strokeWidth="1.5" x1="0" x2="1000" y1="150" y2="150"></line>
                <line stroke="#eff4ff" strokeWidth="1.5" x1="0" x2="1000" y1="225" y2="225"></line>

                {/* Area fills */}
                <path
                  d="M 0 144 C 120 150, 200 180, 260 174 S 400 120, 480 190 S 640 100, 720 90 S 880 75, 1000 66 L 1000 300 L 0 300 Z"
                  fill="url(#readinessGrad)"
                ></path>
                <path
                  d="M 0 160 C 140 168, 220 192, 280 185 S 420 140, 500 200 S 660 115, 740 105 S 900 85, 1000 78 L 1000 300 L 0 300 Z"
                  fill="url(#confidenceGrad)"
                ></path>

                {/* Emotional Composure Line */}
                <path
                  d="M 0 160 C 140 168, 220 192, 280 185 S 420 140, 500 200 S 660 115, 740 105 S 900 85, 1000 78"
                  fill="none"
                  stroke="#8455ef"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                ></path>

                {/* Readiness Primary Trajectory Line */}
                <path
                  className="drop-shadow-sm"
                  d="M 0 144 C 120 150, 200 180, 260 174 S 400 120, 480 190 S 640 100, 720 90 S 880 75, 1000 66"
                  fill="none"
                  stroke="#1550d3"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>

                {/* Milestone Marker Lines */}
                <line opacity="0.5" stroke="#737686" strokeDasharray="3 3" strokeWidth="1" x1="166" x2="166" y1="30" y2="300"></line>
                <line opacity="0.5" stroke="#737686" strokeDasharray="3 3" strokeWidth="1" x1="600" x2="600" y1="20" y2="300"></line>
                <line opacity="0.35" stroke="#ba1a1a" strokeDasharray="3 3" strokeWidth="1" x1="466" x2="466" y1="40" y2="300"></line>

                {/* Interactive Points */}
                <circle
                  cx="0"
                  cy="144"
                  fill="#ffffff"
                  r="6"
                  stroke="#1550d3"
                  strokeWidth="3"
                  className="cursor-pointer hover:r-8 transition-all"
                  onClick={() => setSelectedEvent('Day 1 Baseline (52%): Initial aptitude screening')}
                ></circle>
                <circle
                  cx="266"
                  cy="174"
                  fill="#ba1a1a"
                  r="6"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer hover:scale-125 transition-transform"
                  onClick={() => setSelectedEvent('Day 8 (-12%): Knapsack recurrence delay in DP practice')}
                ></circle>
                <circle
                  cx="466"
                  cy="190"
                  fill="#ba1a1a"
                  r="7"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="cursor-pointer hover:scale-125 transition-transform"
                  onClick={() => setSelectedEvent('Day 14 (-20%): System Design Distributed Caching consistency spike')}
                ></circle>
                <circle
                  cx="700"
                  cy="90"
                  fill="#006947"
                  r="7"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="cursor-pointer hover:scale-125 transition-transform"
                  onClick={() => setSelectedEvent('Day 21 (+18%): STAR method breakthrough in Behavioral mocks')}
                ></circle>
                <circle
                  cx="1000"
                  cy="66"
                  fill="#1550d3"
                  r="6"
                  stroke="#ffffff"
                  strokeWidth="3"
                  className="cursor-pointer hover:scale-125 transition-transform"
                  onClick={() => setSelectedEvent('Today (78%): Cleared Tier-1 campus placement benchmark')}
                ></circle>
              </svg>

              {/* Milestone HTML Badges Overlay */}
              <div className="absolute left-[16.6%] top-2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-surface-container-high/90 backdrop-blur-sm px-space-xs py-1 rounded-full shadow-sm text-xs font-semibold text-on-surface">
                <span className="material-symbols-outlined text-primary text-sm">flag</span>
                <span>Started Daily Mocks</span>
              </div>
              <div className="absolute left-[60%] top-1 -translate-x-1/2 hidden md:flex items-center gap-1 bg-surface-container-high/90 backdrop-blur-sm px-space-xs py-1 rounded-full shadow-sm text-xs font-semibold text-on-surface">
                <span className="material-symbols-outlined text-secondary text-sm">task_alt</span>
                <span>Completed Trees Sprint</span>
              </div>

              {/* Day 14 Tooltip Callout */}
              <div className="absolute left-[46.6%] top-[66%] -translate-x-1/2 bg-surface-container-lowest shadow-lg rounded-xl p-space-xs text-center z-10 flex flex-col items-center border border-surface-container/60">
                <span className="font-label-sm text-xs text-error font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-sm">arrow_downward</span> Day 14: -20%
                </span>
                <span className="text-[11px] leading-tight text-on-surface-variant">Sys. Design Spike</span>
              </div>

              {/* Day 21 Tooltip Callout */}
              <div className="absolute left-[70%] top-[18%] -translate-x-1/2 bg-surface-container-lowest shadow-lg rounded-xl p-space-xs text-center z-10 flex flex-col items-center border border-surface-container/60">
                <span className="font-label-sm text-xs text-tertiary font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-sm">arrow_upward</span> Day 21: +18%
                </span>
                <span className="text-[11px] leading-tight text-on-surface-variant">STAR Mastery</span>
              </div>
            </div>

            {/* X Axis Dates */}
            <div className="absolute left-10 right-0 bottom-0 h-6 flex justify-between font-label-sm text-xs text-outline select-none">
              <span>Day 1 (Nov 1)</span>
              <span>Day 7</span>
              <span>Day 14 (Mid-Pace)</span>
              <span>Day 21</span>
              <span>Day 28</span>
              <span className="text-primary font-bold">Today (78%)</span>
            </div>
          </div>

          {/* Event Popover / Notification */}
          {selectedEvent && (
            <div className="p-3 bg-primary-fixed/50 rounded-xl flex items-center justify-between text-xs text-on-surface border border-primary-fixed">
              <span className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-primary text-base">info</span>
                {selectedEvent}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Quick Interactive Hint */}
          <div className="flex items-center justify-between pt-space-xs text-xs text-on-surface-variant">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-base">touch_app</span>
              <span>Click data points on the trajectory to view contextual shifts in stress resistance &amp; topic mastery.</span>
            </div>
            <button
              onClick={() => setSelectedEvent('Full 4-week rubric: DSA (+28%), System Thinking (+22%), STAR Behavioral (+34%), Cadence (+19%)')}
              className="hidden sm:inline font-label-sm text-xs font-semibold text-primary cursor-pointer hover:underline"
            >
              Toggle Full Dimension Overlay →
            </button>
          </div>
        </div>

        {/* Correlated Dips & Highs Breakdown */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-lg text-lg font-bold text-on-surface">
                Correlated Dips &amp; Highs Breakdown
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Algorithmic causality analysis: connecting confidence swings to specific conceptual challenges.
              </p>
            </div>
            <span className="hidden md:flex font-label-sm text-xs font-semibold px-space-sm py-1 bg-surface-container rounded-full text-on-surface-variant">
              3 Critical Events Detected
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
            {/* Dip 1: System Design */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-all border border-surface-container/60">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_down</span> -20% Dip
                  </span>
                  <span className="font-label-sm text-xs text-outline">Day 14</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-base font-bold text-on-surface">System Design</h4>
                  <div className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Topic: <span className="text-on-surface font-semibold">Distributed Caching &amp; Sharding</span>
                  </div>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant bg-surface-container-low p-space-sm rounded-xl leading-relaxed border border-surface-container/40">
                  Faltered during consistency tradeoff cross-examination. Heart rate spiked 22 bpm; hesitation pauses extended to 14.2s.
                </p>
              </div>
              <div className="pt-space-xs">
                <button
                  onClick={() => onNavigate('failure-replay')}
                  className="w-full flex items-center justify-center gap-space-xs bg-error-container/60 hover:bg-error-container text-on-error-container font-label-md text-xs font-bold py-2.5 px-space-md rounded-xl transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">replay</span>
                  <span>Review Failure Replay</span>
                </button>
              </div>
            </div>

            {/* Dip 2: Dynamic Programming */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-all border border-surface-container/60">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_down</span> -12% Dip
                  </span>
                  <span className="font-label-sm text-xs text-outline">Day 8</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-base font-bold text-on-surface">Dynamic Programming</h4>
                  <div className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Topic: <span className="text-on-surface font-semibold">Knapsack Variations &amp; Subsets</span>
                  </div>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant bg-surface-container-low p-space-sm rounded-xl leading-relaxed border border-surface-container/40">
                  State transition recurrence formulation was delayed. Needed 2 interviewer nudges before bounding the 2D memo table.
                </p>
              </div>
              <div className="pt-space-xs">
                <button
                  onClick={() => onNavigate('dsa-practice')}
                  className="w-full flex items-center justify-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs font-bold py-2.5 px-space-md rounded-xl transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">fitness_center</span>
                  <span>Practice Recommended Set</span>
                </button>
              </div>
            </div>

            {/* High 1: Behavioral Rounds */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-all border border-surface-container/60">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span> +18% Surge
                  </span>
                  <span className="font-label-sm text-xs text-outline">Day 21</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-base font-bold text-on-surface">Behavioral Rounds</h4>
                  <div className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Topic: <span className="text-on-surface font-semibold">STAR Method Mastery &amp; Conflict</span>
                  </div>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant bg-surface-container-low p-space-sm rounded-xl leading-relaxed border border-surface-container/40">
                  Superb narrative framing on cross-functional friction. Zero defensive posture; articulated quantifiable deliverables fluently.
                </p>
              </div>
              <div className="pt-space-xs">
                <div className="w-full flex items-center justify-center gap-space-xs bg-tertiary-fixed/40 text-tertiary font-label-md text-xs font-bold py-2.5 px-space-md rounded-xl">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Validated in Tier-1 Benchmark</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Asymmetric Section: Insights & Milestones + Placement Predictor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Card-based Insights & Milestones Grid (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div>
              <h3 className="font-headline-lg text-lg font-bold text-on-surface">
                Qualitative Milestones &amp; Adaptability
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Continuous heuristic tracking of poise, speed, and recovery under pressure.
              </p>
            </div>

            <div className="flex flex-col gap-space-sm">
              {/* Highlight 1: Weekly Highlight */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-all flex items-start gap-space-md border border-surface-container/60">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center flex-shrink-0 text-secondary">
                  <span className="material-symbols-outlined text-2xl">hotel_class</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-secondary">
                      Weekly Highlight
                    </span>
                    <span className="text-outline text-xs">•</span>
                    <span className="font-label-sm text-xs text-tertiary font-semibold">9.1 / 10 Score</span>
                  </div>
                  <h4 className="font-headline-md text-base font-bold text-on-surface">
                    Behavioral Response Architecture Improved 15%
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                    You improved 15% in behavioral rounds this week. Your response structure scored 9.1/10, adhering seamlessly to Situation-Task-Action-Result with concrete telemetry metrics.
                  </p>
                </div>
              </div>

              {/* Highlight 2: Speed & Clarity */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-all flex items-start gap-space-md border border-surface-container/60">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined text-2xl">timer</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-primary">
                      Speed &amp; Clarity
                    </span>
                    <span className="text-outline text-xs">•</span>
                    <span className="font-label-sm text-xs text-tertiary font-semibold">51% Faster</span>
                  </div>
                  <h4 className="font-headline-md text-base font-bold text-on-surface">
                    Rapid Ideation to Valid Pseudocode
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                    Average time to first valid pseudocode decreased dramatically from{' '}
                    <strong className="text-on-surface">8m 40s</strong> to{' '}
                    <strong className="text-on-surface text-primary">4m 15s</strong>. Edge cases are now pre-identified during the initial problem restatement phase.
                  </p>
                </div>
              </div>

              {/* Highlight 3: Emotional Stamina */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-all flex items-start gap-space-md border border-surface-container/60">
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center flex-shrink-0 text-tertiary">
                  <span className="material-symbols-outlined text-2xl">self_improvement</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="font-label-sm text-xs font-bold uppercase tracking-wider text-tertiary">
                      Emotional Stamina
                    </span>
                    <span className="text-outline text-xs">•</span>
                    <span className="font-label-sm text-xs text-tertiary font-semibold">Resilience High</span>
                  </div>
                  <h4 className="font-headline-md text-base font-bold text-on-surface">
                    Reduced Freeze-Response During Curveballs
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                    Handled difficult follow-up questions with 40% less hesitation than 2 weeks ago. Filler word frequency lowered from 18/session to under 4/session.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Placement Predictor Widget (5 Cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg lg:p-space-xl shadow-md flex flex-col gap-space-md relative overflow-hidden border border-surface-container/60">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="font-label-sm text-xs text-primary font-bold uppercase tracking-wider">
                  Predictive Fit
                </span>
                <h3 className="font-headline-lg text-lg font-bold text-on-surface">
                  Target Company Match Rate
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Calculated against historical rubric cutoffs from successful alumni offers.
                </p>
              </div>
              <div className="p-2 rounded-xl bg-primary-fixed text-primary">
                <span className="material-symbols-outlined text-xl">target</span>
              </div>
            </div>

            {/* Target Company List */}
            <div className="flex flex-col gap-space-md pt-space-xs">
              {/* Microsoft */}
              <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl border border-surface-container/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-xs text-on-surface shadow-sm">
                      MS
                    </div>
                    <div>
                      <div className="font-label-md text-xs font-bold text-on-surface">Microsoft</div>
                      <div className="text-[11px] text-on-surface-variant">Role: SDE-1 Core Engineering</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-md text-base font-bold text-tertiary">85%</span>
                    <span className="font-label-sm text-[11px] text-tertiary block leading-none font-semibold">Optimal Fit</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Atlassian */}
              <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl border border-surface-container/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-xs text-primary shadow-sm">
                      AT
                    </div>
                    <div>
                      <div className="font-label-md text-xs font-bold text-on-surface">Atlassian</div>
                      <div className="text-[11px] text-on-surface-variant">Role: Graduate Software Engineer</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-md text-base font-bold text-tertiary">82%</span>
                    <span className="font-label-sm text-[11px] text-tertiary block leading-none font-semibold">High Match</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              {/* Amazon */}
              <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl border border-surface-container/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-xs text-secondary shadow-sm">
                      AM
                    </div>
                    <div>
                      <div className="font-label-md text-xs font-bold text-on-surface">Amazon</div>
                      <div className="text-[11px] text-on-surface-variant">Role: SDE-1 (AWS Cloud Services)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-md text-base font-bold text-on-surface">79%</span>
                    <span className="font-label-sm text-[11px] text-primary block leading-none font-semibold">LP Alignment Strong</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '79%' }}></div>
                </div>
              </div>

              {/* Google */}
              <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md rounded-xl border border-surface-container/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-xs text-on-surface shadow-sm">
                      GO
                    </div>
                    <div>
                      <div className="font-label-md text-xs font-bold text-on-surface">Google</div>
                      <div className="text-[11px] text-on-surface-variant">Role: Software Engineer, Campus</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-md text-base font-bold text-on-surface">74%</span>
                    <span className="font-label-sm text-[11px] text-outline block leading-none font-semibold">Graph DP Needed</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-secondary-container rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>
            </div>

            {/* Strategy Suggestion Box */}
            <div className="bg-surface-container p-space-md rounded-xl flex items-start gap-space-sm mt-space-xs border border-surface-container/60">
              <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">lightbulb</span>
              <div className="flex flex-col gap-1">
                <div className="font-label-md text-xs font-bold text-on-surface">
                  Recommendation for Google (74% → 85%)
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Re-attempt 2 Hard Graph/Trie problems without looking at hints. Alleviating this will push your predicted Google bar past interview qualification threshold.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('company-decoders')}
              className="w-full text-center py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-xs font-bold shadow-sm transition-all border border-surface-container cursor-pointer"
            >
              Explore Company Decoders &amp; Past Questions →
            </button>
          </div>
        </div>

        {/* Contextual Peer Benchmark Banner */}
        <div className="bg-surface-container-low rounded-2xl p-space-lg lg:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg border border-surface-container/50">
          <div className="flex items-center gap-space-md">
            <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="font-headline-md text-base font-bold text-on-surface">
                Join the Peer Pod Calibration Round
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant max-w-xl leading-relaxed">
                Students who participate in live reciprocal peer mock interviews experience 3x faster emotional recovery from mid-interview blockers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('peer-pod')}
              className="w-full md:w-auto text-center px-space-lg py-3 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Schedule Peer Mock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
