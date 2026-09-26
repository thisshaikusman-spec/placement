import React, { useState } from 'react';
import { TabType } from '../types';
import { COMPANIES_DATA } from '../data/mockData';

interface CompanyDecodersProps {
  onNavigate: (tab: TabType) => void;
}

export const CompanyDecoders: React.FC<CompanyDecodersProps> = ({ onNavigate }) => {
  const [selectedCompanyKey, setSelectedCompanyKey] = useState<string>('Google');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pinnedTargets, setPinnedTargets] = useState<Record<string, boolean>>({ Google: true });

  const companyKeys = ['Google', 'Microsoft', 'Amazon', 'Uber', 'Atlassian', 'Flipkart', 'Goldman Sachs'];

  const filteredCompanyKeys = companyKeys.filter((c) =>
    c.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const activeCompany = COMPANIES_DATA[selectedCompanyKey] || COMPANIES_DATA['Google'];

  const togglePin = (comp: string) => {
    setPinnedTargets((prev) => ({
      ...prev,
      [comp]: !prev[comp],
    }));
  };

  return (
    <div className="w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container text-primary font-label-sm text-xs font-bold w-fit shadow-sm">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                psychology_alt
              </span>
              <span>CAMPUS REVERSE-ENGINEERED INTELLIGENCE</span>
            </div>
            <h1 className="font-headline-xl text-3xl font-bold text-on-surface tracking-tight">
              Company Interview &amp; Culture Decoders
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Reverse-engineered interview patterns, company evaluation rubrics, and real experiences from recent campus hires.
            </p>
          </div>

          {/* Quick Stats Callout */}
          <div className="flex items-center gap-space-md p-space-sm px-space-md rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container/60">
            <div className="flex flex-col">
              <span className="font-label-sm text-xs text-on-surface-variant font-medium">Decoded Drives</span>
              <span className="font-headline-md text-base font-bold text-primary">48+ Tiers</span>
            </div>
            <div className="w-px h-8 bg-surface-container-high"></div>
            <div className="flex flex-col">
              <span className="font-label-sm text-xs text-on-surface-variant font-medium">Alumni Inputs</span>
              <span className="font-headline-md text-base font-bold text-tertiary">1,240 Verified</span>
            </div>
          </div>
        </div>

        {/* Search & Company Selector */}
        <div className="flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container/60">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company (e.g. Google, Atlassian, Microsoft, Uber)..."
              className="w-full pl-12 pr-space-md py-3 rounded-xl bg-surface-container-low font-body-md text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest border border-surface-container/40 transition-all"
            />
            <div className="absolute right-space-sm top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container font-label-sm text-[11px] text-on-surface-variant font-mono">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          {/* Company Quick-Pill Filter Tabs */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none">
            {filteredCompanyKeys.map((comp) => {
              const isActive = selectedCompanyKey === comp;
              return (
                <button
                  key={comp}
                  onClick={() => setSelectedCompanyKey(comp)}
                  className={`flex items-center gap-space-xs px-space-md py-space-xs rounded-full font-label-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  {isActive && <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>}
                  <span>{comp}</span>
                  {pinnedTargets[comp] && (
                    <span className="material-symbols-outlined text-xs">bookmark</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Company Overview Card */}
        <div className="relative rounded-2xl bg-surface-container-lowest p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-xl overflow-hidden border border-surface-container/60">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>

          {/* Brand Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md z-10">
            <div className="flex items-start sm:items-center gap-space-md">
              {/* Company Logo Badge */}
              <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center flex-shrink-0 shadow-sm p-3 border border-surface-container/40">
                {activeCompany.name === 'Google' ? (
                  <svg className="w-full h-full" viewBox="0 0 24 24">
                    <path
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.86c2.26-2.09 3.685-5.17 3.685-9.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09C3.25 21.3 7.31 24 12 24z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.38l4-3.09z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.62l4 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                      fill="#EA4335"
                    />
                  </svg>
                ) : (
                  <span className="font-bold text-lg text-primary">
                    {activeCompany.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <h2 className="font-headline-lg text-xl font-bold text-on-surface">
                    {activeCompany.name}
                  </h2>
                  <span className="font-label-sm text-xs px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">
                    {activeCompany.trackName}
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-sm text-xs px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-semibold">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      speed
                    </span>
                    {activeCompany.difficulty} ({activeCompany.difficultyRating})
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                  <strong className="text-on-surface font-semibold">Hiring Bar:</strong> {activeCompany.hiringBar}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-space-sm flex-wrap">
              <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-xl bg-tertiary-fixed/40 text-on-tertiary-fixed font-label-sm text-xs font-semibold">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span>{activeCompany.lastUpdated}</span>
              </div>
              <button
                onClick={() => togglePin(activeCompany.name)}
                className="flex items-center gap-1 px-space-sm py-space-xs rounded-xl bg-surface-container hover:bg-surface-container-high font-label-sm text-xs font-semibold text-on-surface-variant transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">
                  {pinnedTargets[activeCompany.name] ? 'bookmark' : 'bookmark_border'}
                </span>
                <span>{pinnedTargets[activeCompany.name] ? 'Target Pinned' : 'Pin Target'}</span>
              </button>
            </div>
          </div>

          {/* Visual Rubric Summary Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md p-space-md rounded-xl bg-surface-container-low z-10 border border-surface-container/40">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-xl">code_blocks</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[11px] text-on-surface-variant">Data Structures Focus</span>
                <span className="font-label-md text-xs font-bold text-on-surface">
                  {activeCompany.rubric.dsFocus}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary flex-shrink-0">
                <span className="material-symbols-outlined text-xl">architecture</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[11px] text-on-surface-variant">System Thinking</span>
                <span className="font-label-md text-xs font-bold text-on-surface">
                  {activeCompany.rubric.systemThinking}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary flex-shrink-0">
                <span className="material-symbols-outlined text-xl">record_voice_over</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[11px] text-on-surface-variant">Communication Weight</span>
                <span className="font-label-md text-xs font-bold text-on-surface">
                  {activeCompany.rubric.communicationWeight}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl">psychology</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[11px] text-on-surface-variant">Cultural Rubric</span>
                <span className="font-label-md text-xs font-bold text-on-surface">
                  {activeCompany.rubric.culturalRubric}
                </span>
              </div>
            </div>
          </div>

          {/* 3-Column Structured Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg z-10">
            {/* Column 1: Typical Round Structure */}
            <div className="flex flex-col gap-space-md p-space-md rounded-2xl bg-surface-bright shadow-sm border border-surface-container/60">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-xl">timeline</span>
                  <h3 className="font-headline-md text-sm font-bold text-on-surface">Typical Round Structure</h3>
                </div>
                <span className="font-label-sm text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                  {activeCompany.rounds.length} Rounds
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                {activeCompany.rounds.map((rnd, idx) => (
                  <div key={idx} className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-1 border border-surface-container/40">
                    <div className="flex items-center justify-between">
                      <span className={`font-label-sm text-xs font-bold ${rnd.colorScheme === 'secondary' ? 'text-secondary' : 'text-primary'}`}>
                        {rnd.number}
                      </span>
                      <span className="font-label-sm text-xs text-on-surface-variant">{rnd.duration}</span>
                    </div>
                    <h4 className="font-label-md text-xs font-bold text-on-surface">{rnd.title}</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      {rnd.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Tone & Expectations */}
            <div className="flex flex-col gap-space-md p-space-md rounded-2xl bg-surface-bright shadow-sm border border-surface-container/60">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-xl">forum</span>
                  <h3 className="font-headline-md text-sm font-bold text-on-surface">Tone &amp; Expectations</h3>
                </div>
                <span className="font-label-sm text-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                  Calibration
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                {/* Atmosphere */}
                <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-1.5 border border-surface-container/40">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-base">lightbulb</span>
                    <span className="font-label-sm text-xs uppercase tracking-wider font-bold">Atmosphere &amp; Vibe</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                    {activeCompany.tone.atmosphere}
                  </p>
                </div>

                {/* Pitfall */}
                <div className="p-space-sm rounded-xl bg-error-container/30 shadow-sm flex flex-col gap-1.5 border border-error-container/40">
                  <div className="flex items-center gap-2 text-error">
                    <span className="material-symbols-outlined text-base">warning</span>
                    <span className="font-label-sm text-xs uppercase tracking-wider font-bold">Critical Pitfall To Avoid</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                    {activeCompany.tone.pitfall}
                  </p>
                </div>

                {/* Booster */}
                <div className="p-space-sm rounded-xl bg-tertiary-fixed/30 shadow-sm flex flex-col gap-1.5 border border-tertiary-fixed/40">
                  <div className="flex items-center gap-2 text-tertiary">
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      thumb_up
                    </span>
                    <span className="font-label-sm text-xs uppercase tracking-wider font-bold">What Interviewers Love</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                    {activeCompany.tone.booster}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Common Follow-up Patterns */}
            <div className="flex flex-col gap-space-md p-space-md rounded-2xl bg-surface-bright shadow-sm border border-surface-container/60">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-tertiary text-xl">alt_route</span>
                  <h3 className="font-headline-md text-sm font-bold text-on-surface">Follow-up Patterns</h3>
                </div>
                <span className="font-label-sm text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                  Curveballs
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Once your initial solution compiles, {activeCompany.name} interviewers frequently pivot with high-scale constraints:
                </p>
                {activeCompany.followUps.map((fu) => (
                  <div key={fu.number} className="p-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-space-xs border border-surface-container/40">
                    <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-label-sm text-xs text-primary font-bold flex-shrink-0 mt-0.5">
                      {fu.number}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-xs font-bold text-on-surface">{fu.question}</span>
                      <span className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        {fu.testedSkill}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Anonymized Alumni Placement Debriefs */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-xl">school</span>
              <h3 className="font-headline-lg text-lg font-bold text-on-surface">
                Verified Alumni Placement Debriefs
              </h3>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-xs text-on-surface-variant font-medium">Live Campus Sync</span>
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            </div>
          </div>

          {/* Horizontal Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {activeCompany.alumniQuotes.map((q, idx) => (
              <div
                key={idx}
                className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-all border border-surface-container/60"
              >
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs font-semibold px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">
                      {q.batch}
                    </span>
                    <span className="material-symbols-outlined text-outline-variant text-base">format_quote</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface italic leading-relaxed">
                    "{q.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-space-xs pt-space-xs border-t border-surface-container/30">
                  <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs font-bold flex items-center justify-center">
                    {q.authorInitials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-xs font-bold text-on-surface">{q.college}</span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">{q.offer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTA Card: Tailored Mock Round Simulator */}
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-container p-space-lg md:p-space-xl text-on-primary shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-md max-w-2xl">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-3xl text-white">bolt</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-lg text-lg font-bold text-white">
                  Practice {activeCompany.name} SDE-1 Tailored Mock Round
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/20 text-white font-label-sm text-xs font-semibold">
                  AI Proctor Enabled
                </span>
              </div>
              <p className="font-body-md text-xs text-white/85 leading-relaxed">
                Simulate a timed 45-minute live technical session with realistic curveballs, follow-up constraints, and an instant rubric breakdown.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('mock-interview')}
              className="w-full md:w-auto flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-xl bg-surface-container-lowest text-primary font-headline-md text-xs font-bold shadow-md hover:bg-white transition-all transform active:scale-95 cursor-pointer"
            >
              <span>Start Custom {activeCompany.name} Sim</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
