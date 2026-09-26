import React, { useState, useEffect } from 'react';

const BOILERPLATES: Record<string, string> = {
  'Python 3': `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # dp[i] represents minimum coins to make amount i
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        # Bottom-up iterative computation
        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
        return dp[amount] if dp[amount] != float('inf') else -1`,
  'C++ (g++ 20)': `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; ++a) {
            for (int c : coins) {
                if (a - c >= 0) {
                    dp[a] = min(dp[a], 1 + dp[a - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
  'Java (OpenJDK 17)': `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (a - c >= 0) {
                    dp[a] = Math.min(dp[a], 1 + dp[a - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
};

export const DsaPractice: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Python 3');
  const [code, setCode] = useState<string>(BOILERPLATES['Python 3']);
  const [activeLeftTab, setActiveLeftTab] = useState<'desc' | 'hints' | 'subs' | 'discuss'>('desc');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'tests' | 'logs'>('tests');
  const [isRunning, setIsRunning] = useState(false);
  const [runSuccess, setRunSuccess] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Voice Check States
  const [isRecording, setIsRecording] = useState(true);
  const [recordingSeconds, setRecordingSeconds] = useState(84); // 01:24
  const [evaluatedClarity, setEvaluatedClarity] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => (prev < 180 ? prev + 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setCode(BOILERPLATES[lang] || '');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setRunSuccess(true);
    }, 800);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1200);
  };

  const handleEvaluateClarity = () => {
    setIsRecording(false);
    setEvaluatedClarity(
      'Score: 94/100 • Excellent technical articulation. Explicitly identified subproblem recurrence and space optimization trade-offs!'
    );
  };

  const formatTimer = (secs: number) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const codeLines = code.split('\n');

  return (
    <div className="w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-gutter py-space-md flex flex-col gap-space-lg">
        {/* Top Progress Track Section */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container/60">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-xs mb-space-sm">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">terminal</span>
              </div>
              <div>
                <h2 className="font-headline-md text-base font-bold text-on-surface">
                  Curated DSA Track
                </h2>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Tier-1 High Frequency Syllabus Calibration
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm self-stretch md:self-auto justify-between md:justify-end">
              <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-low text-primary font-label-sm text-xs font-semibold">
                <span className="material-symbols-outlined text-base text-tertiary">check_circle</span>
                <span>63 / 97 Target Problems Cleared (65%)</span>
              </div>
              <button
                className="p-space-xs rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors flex items-center justify-center cursor-pointer"
                title="Filter Curricula"
              >
                <span className="material-symbols-outlined text-lg">tune</span>
              </button>
            </div>
          </div>

          {/* Topic Progress Cards Slider / Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-space-sm pt-space-xs">
            {/* Arrays & Hashing */}
            <div className="bg-surface-container-low/70 hover:bg-surface-container-low transition-all p-space-sm rounded-xl flex flex-col gap-space-xs cursor-pointer group border border-surface-container/30">
              <div className="flex items-center justify-between text-on-surface">
                <span className="font-label-md text-xs font-semibold truncate group-hover:text-primary transition-colors">
                  Arrays &amp; Hashing
                </span>
                <span className="font-label-sm text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                  90%
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-xs text-on-surface-variant">
                <span>18/20 Solved</span>
                <span className="text-tertiary font-bold">Mastered</span>
              </div>
            </div>

            {/* Trees & Graphs */}
            <div className="bg-surface-container-low/70 hover:bg-surface-container-low transition-all p-space-sm rounded-xl flex flex-col gap-space-xs cursor-pointer group border border-surface-container/30">
              <div className="flex items-center justify-between text-on-surface">
                <span className="font-label-md text-xs font-semibold truncate group-hover:text-primary transition-colors">
                  Trees &amp; Graphs
                </span>
                <span className="font-label-sm text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">
                  64%
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '64%' }}></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-xs text-on-surface-variant">
                <span>14/22 Solved</span>
                <span className="text-primary font-bold">In Progress</span>
              </div>
            </div>

            {/* Dynamic Programming (Active) */}
            <div className="bg-surface-container-lowest shadow-[0_2px_10px_rgba(21,80,211,0.08)] p-space-sm rounded-xl flex flex-col gap-space-xs cursor-pointer relative overflow-hidden border border-secondary/30">
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
              <div className="flex items-center justify-between text-on-surface">
                <span className="font-label-md text-xs truncate text-secondary font-bold">
                  Dynamic Prog.
                </span>
                <span className="font-label-sm text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                  36%
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '36%' }}></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-xs text-on-surface-variant">
                <span>9/25 Solved</span>
                <span className="text-secondary font-bold flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span> Active
                </span>
              </div>
            </div>

            {/* Strings & Two Pointers */}
            <div className="bg-surface-container-low/70 hover:bg-surface-container-low transition-all p-space-sm rounded-xl flex flex-col gap-space-xs cursor-pointer group border border-surface-container/30">
              <div className="flex items-center justify-between text-on-surface">
                <span className="font-label-md text-xs font-semibold truncate group-hover:text-primary transition-colors">
                  Two Pointers
                </span>
                <span className="font-label-sm text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                  88%
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-xs text-on-surface-variant">
                <span>16/18 Solved</span>
                <span className="text-tertiary font-bold">Near Ready</span>
              </div>
            </div>

            {/* System Design Basics */}
            <div className="col-span-2 md:col-span-1 bg-surface-container-low/70 hover:bg-surface-container-low transition-all p-space-sm rounded-xl flex flex-col gap-space-xs cursor-pointer group border border-surface-container/30">
              <div className="flex items-center justify-between text-on-surface">
                <span className="font-label-md text-xs font-semibold truncate group-hover:text-primary transition-colors">
                  Sys Design Core
                </span>
                <span className="font-label-sm text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                  50%
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-outline h-full rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
              </div>
              <div className="flex items-center justify-between font-label-sm text-xs text-on-surface-variant">
                <span>6/12 Solved</span>
                <span className="text-on-surface-variant font-bold">Foundational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Workspace IDE Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
          {/* Left Panel: Problem Statement & Context (5 cols desktop) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col border border-surface-container/60">
            {/* Navigation Tab Header */}
            <div className="flex items-center justify-between px-space-md pt-space-sm bg-surface-container-low/50 border-b border-surface-container/40">
              <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveLeftTab('desc')}
                  className={`px-space-sm py-space-xs font-label-md text-xs rounded-t-xl flex items-center gap-1 transition-all cursor-pointer ${
                    activeLeftTab === 'desc'
                      ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">description</span>
                  <span>Description</span>
                </button>
                <button
                  onClick={() => setActiveLeftTab('hints')}
                  className={`px-space-sm py-space-xs font-label-md text-xs rounded-t-xl flex items-center gap-1 transition-all cursor-pointer ${
                    activeLeftTab === 'hints'
                      ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">lightbulb</span>
                  <span>Hints (2)</span>
                </button>
                <button
                  onClick={() => setActiveLeftTab('subs')}
                  className={`px-space-sm py-space-xs font-label-md text-xs rounded-t-xl flex items-center gap-1 transition-all cursor-pointer ${
                    activeLeftTab === 'subs'
                      ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">history</span>
                  <span>Submissions</span>
                </button>
                <button
                  onClick={() => setActiveLeftTab('discuss')}
                  className={`px-space-sm py-space-xs font-label-md text-xs rounded-t-xl flex items-center gap-1 transition-all cursor-pointer ${
                    activeLeftTab === 'discuss'
                      ? 'text-primary bg-surface-container-lowest font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">forum</span>
                  <span>Discuss</span>
                </button>
              </div>
              <button
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer"
                title="Share Problem"
              >
                <span className="material-symbols-outlined text-base">share</span>
              </button>
            </div>

            {/* Problem Content Container */}
            <div className="p-space-lg flex flex-col gap-space-md max-h-[780px] overflow-y-auto">
              {activeLeftTab === 'desc' && (
                <>
                  {/* Header & Metadata Badges */}
                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between gap-space-sm flex-wrap">
                      <h1 className="font-headline-lg text-xl font-bold text-on-surface tracking-tight">
                        322. Coin Change
                      </h1>
                      <div className="flex items-center gap-space-xs">
                        <button
                          onClick={() => setIsBookmarked(!isBookmarked)}
                          className={`p-1 transition-colors cursor-pointer ${
                            isBookmarked ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
                          }`}
                          title="Bookmark"
                        >
                          <span
                            className="material-symbols-outlined text-xl"
                            style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            bookmark
                          </span>
                        </button>
                        <button
                          onClick={() => setCode(BOILERPLATES[selectedLanguage])}
                          className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                          title="Reset boilerplate"
                        >
                          <span className="material-symbols-outlined text-xl">restart_alt</span>
                        </button>
                      </div>
                    </div>

                    {/* Tags Row */}
                    <div className="flex items-center gap-space-xs flex-wrap pt-1">
                      <span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-bold">
                        Medium
                      </span>
                      <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-xs font-semibold">
                        Acceptance: 43.8%
                      </span>
                      <span className="flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-xs font-semibold">
                        <span className="material-symbols-outlined text-sm text-tertiary">corporate_fare</span>
                        <span>Google</span>
                      </span>
                      <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-xs font-semibold">
                        Amazon
                      </span>
                      <span className="px-space-sm py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-xs font-semibold">
                        Microsoft
                      </span>
                    </div>
                  </div>

                  {/* Problem Body */}
                  <div className="font-body-md text-sm text-on-surface flex flex-col gap-space-sm leading-relaxed">
                    <p>
                      You are given an integer array{' '}
                      <code className="px-1.5 py-0.5 rounded-md bg-surface-container font-mono text-xs text-primary font-semibold">
                        coins
                      </code>{' '}
                      representing coins of different denominations and an integer{' '}
                      <code className="px-1.5 py-0.5 rounded-md bg-surface-container font-mono text-xs text-primary font-semibold">
                        amount
                      </code>{' '}
                      representing a total amount of money.
                    </p>
                    <p>
                      Return{' '}
                      <em>the fewest number of coins that you need to make up that amount</em>. If that amount of
                      money cannot be made up by any combination of the coins, return{' '}
                      <code className="px-1.5 py-0.5 rounded-md bg-surface-container font-mono text-xs text-primary font-semibold">
                        -1
                      </code>
                      .
                    </p>
                    <p className="text-on-surface-variant text-xs">
                      You may assume that you have an infinite number of each kind of coin.
                    </p>
                  </div>

                  {/* Example 1 */}
                  <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs font-mono text-xs border border-surface-container/40">
                    <span className="font-sans font-bold text-on-surface">Example 1:</span>
                    <div className="text-on-surface-variant space-y-0.5">
                      <div>
                        <strong className="text-on-surface font-sans">Input:</strong> coins = [1, 2, 5], amount = 11
                      </div>
                      <div>
                        <strong className="text-on-surface font-sans">Output:</strong> 3
                      </div>
                      <div className="font-sans text-xs text-tertiary mt-1 font-semibold">
                        Explanation: 11 = 5 + 5 + 1 (3 coins total)
                      </div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs font-mono text-xs border border-surface-container/40">
                    <span className="font-sans font-bold text-on-surface">Example 2:</span>
                    <div className="text-on-surface-variant space-y-0.5">
                      <div>
                        <strong className="text-on-surface font-sans">Input:</strong> coins = [2], amount = 3
                      </div>
                      <div>
                        <strong className="text-on-surface font-sans">Output:</strong> -1
                      </div>
                    </div>
                  </div>

                  {/* Constraints */}
                  <div className="flex flex-col gap-space-xs pt-space-xs">
                    <span className="font-label-md text-xs font-bold text-on-surface">Constraints:</span>
                    <ul className="list-disc list-inside font-mono text-xs text-on-surface-variant space-y-1">
                      <li>1 ≤ coins.length ≤ 12</li>
                      <li>1 ≤ coins[i] ≤ 2³¹ - 1</li>
                      <li>0 ≤ amount ≤ 10⁴</li>
                    </ul>
                  </div>

                  {/* Placement AI Prep Note Card */}
                  <div className="p-space-sm rounded-xl bg-primary-fixed/40 flex items-start gap-space-xs mt-space-xs border border-primary-fixed">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">psychology</span>
                    <div className="flex flex-col text-on-surface">
                      <span className="font-label-md text-xs font-bold text-primary">Interviewer Expectations</span>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                        Top tech rounds expect you to state the recurrence relation{' '}
                        <code className="text-primary font-mono text-[11px]">dp[i] = min(dp[i], dp[i - c] + 1)</code> and highlight the
                        Bottom-Up space-optimization vs recursion stack overhead.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeLeftTab === 'hints' && (
                <div className="flex flex-col gap-space-sm">
                  <div className="p-space-sm bg-surface-container-low rounded-xl border border-surface-container/40">
                    <span className="font-bold text-xs text-primary block mb-1">Hint 1: Why Greedy Fails</span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Consider coins = [1, 3, 4] and amount = 6. A greedy choice picks coin 4, leaving amount 2, which requires 1 + 1 (total 3 coins: 4, 1, 1). However, the optimal answer is 3 + 3 (total 2 coins). Hence, dynamic programming is strictly required.
                    </p>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-xl border border-surface-container/40">
                    <span className="font-bold text-xs text-primary block mb-1">Hint 2: Recurrence Formulation</span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Let dp[i] represent the minimum coins needed for sub-amount i. Base case: dp[0] = 0. For every amount from 1 to total, and for each available coin denomination c: if i - c &gt;= 0, dp[i] = min(dp[i], dp[i - c] + 1).
                    </p>
                  </div>
                </div>
              )}

              {activeLeftTab === 'subs' && (
                <div className="flex flex-col gap-space-sm">
                  <div className="p-space-sm bg-tertiary-fixed/30 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-tertiary">Accepted</span>
                      <span className="text-on-surface-variant ml-2">14 minutes ago</span>
                    </div>
                    <div className="font-mono text-on-surface">Runtime: 42ms • Python 3</div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-error">Time Limit Exceeded</span>
                      <span className="text-on-surface-variant ml-2">Yesterday</span>
                    </div>
                    <div className="font-mono text-on-surface">Pure Recursion • Python 3</div>
                  </div>
                </div>
              )}

              {activeLeftTab === 'discuss' && (
                <div className="flex flex-col gap-space-sm text-xs">
                  <div className="p-space-sm bg-surface-container-low rounded-xl">
                    <span className="font-bold text-on-surface">BFS vs Bottom-Up DP: Speed Comparison</span>
                    <p className="text-on-surface-variant mt-1">
                      BFS also finds the shortest path on the state tree. On LeetCode, Bottom-Up 1D array runs in ~40ms while BFS queue handles around ~55ms due to object overhead.
                    </p>
                    <span className="text-primary font-semibold mt-1 inline-block">▲ 48 upvotes • 6 replies</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Code Editor, Voice Coach & Console (7 cols desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Code Editor Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col border border-surface-container/60">
              {/* Editor Action Toolbar */}
              <div className="px-space-md py-space-xs bg-surface-container-low flex flex-wrap items-center justify-between gap-space-xs border-b border-surface-container/40">
                <div className="flex items-center gap-space-sm">
                  {/* Language Selector */}
                  <div className="relative inline-flex items-center">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="appearance-none bg-surface-container-lowest text-on-surface font-label-md text-xs font-semibold py-1.5 pl-space-sm pr-7 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer border border-surface-container"
                    >
                      <option value="Python 3">Python 3</option>
                      <option value="C++ (g++ 20)">C++ (g++ 20)</option>
                      <option value="Java (OpenJDK 17)">Java (OpenJDK 17)</option>
                    </select>
                    <span className="material-symbols-outlined text-on-surface-variant pointer-events-none absolute right-2 text-base">
                      expand_more
                    </span>
                  </div>

                  {/* Prettify */}
                  <button
                    onClick={() => {
                      /* prettify trigger */
                    }}
                    className="px-space-xs py-1 text-on-surface-variant hover:text-on-surface font-label-sm text-xs flex items-center gap-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">format_align_left</span>
                    <span>Prettify</span>
                  </button>
                </div>

                {/* Run & Submit Actions */}
                <div className="flex items-center gap-space-xs">
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-space-md py-1.5 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-all font-label-md text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isRunning ? 'autorenew' : 'play_arrow'}
                    </span>
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isRunning}
                    className="px-space-md py-1.5 rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-all font-label-md text-xs font-semibold flex items-center gap-1 shadow-[0_2px_8px_rgba(21,80,211,0.25)] cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-base">cloud_upload</span>
                    <span>Submit</span>
                  </button>
                </div>
              </div>

              {submitSuccess && (
                <div className="p-3 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">verified</span>
                    Submission Accepted! All 189 test suites passed. Runtime: 42ms (Faster than 89.2%).
                  </span>
                  <span>+150 XP</span>
                </div>
              )}

              {/* Code Workspace Area with Line Numbers */}
              <div className="p-space-sm bg-[#0d1627] text-slate-100 font-mono text-xs overflow-x-auto flex min-h-[340px]">
                {/* Line numbers column */}
                <div className="select-none text-slate-500 text-right pr-space-sm flex flex-col font-mono text-xs leading-6">
                  {codeLines.map((_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                  <span>{codeLines.length + 1}</span>
                </div>

                {/* Highlighted Code Area */}
                <div className="flex-1 flex flex-col font-mono text-xs leading-6 pl-space-xs outline-none">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                    className="w-full h-full bg-transparent resize-none text-slate-100 font-mono text-xs leading-6 outline-none border-none p-0 focus:ring-0"
                    rows={Math.max(codeLines.length + 1, 14)}
                  />
                  <div className="text-slate-500 font-mono text-[11px] flex items-center gap-1.5 mt-2">
                    <span className="w-2 h-3 bg-primary inline-block animate-pulse"></span>
                    <span className="italic">Cursor active • Python 3.11</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Coach: Interactive 'Explain your approach' Module */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden border border-surface-container/60">
              <div className="flex items-center justify-between flex-wrap gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <div className="w-7 h-7 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-base">mic</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-sm font-bold text-on-surface">
                      Live Interviewer Voice Check
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Articulate intuition before submitting to simulate a Tier-1 technical panel.
                    </p>
                  </div>
                </div>
                {/* Real-time dynamic hint pill */}
                <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-base text-secondary">auto_awesome</span>
                  <span>AI Tip: Mention space complexity before testing.</span>
                </div>
              </div>

              {/* Audio Waveform Visualizer & Record Button */}
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col md:flex-row items-center justify-between gap-space-md border border-surface-container/40">
                {/* Pulsing Record CTA */}
                <div className="flex items-center gap-space-sm w-full md:w-auto">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`relative group flex items-center gap-space-xs px-space-md py-2 rounded-xl text-on-error transition-all shadow-md overflow-hidden flex-shrink-0 cursor-pointer ${
                      isRecording ? 'bg-error hover:bg-error/90' : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    {isRecording && (
                      <span className="w-3 h-3 rounded-full bg-white animate-ping absolute left-3"></span>
                    )}
                    <span className="material-symbols-outlined text-base ml-1">
                      {isRecording ? 'mic' : 'mic_off'}
                    </span>
                    <span className="font-label-md text-xs font-bold">
                      {isRecording ? 'Recording Approach...' : 'Resume Recording'}
                    </span>
                  </button>
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-on-surface text-sm tracking-wider">
                      {formatTimer(recordingSeconds)}{' '}
                      <span className="text-on-surface-variant font-normal text-xs">/ 03:00</span>
                    </span>
                    <span className="font-label-sm text-xs text-tertiary flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Audio sync clear
                    </span>
                  </div>
                </div>

                {/* Dynamic Animated Audio Waveform (SVG simulation) */}
                <div className="w-full md:w-5/12 h-10 flex items-center justify-between gap-1 px-space-xs bg-surface-container-lowest rounded-lg shadow-inner border border-surface-container/40">
                  <span className="w-1 bg-secondary rounded-full h-3 animate-pulse"></span>
                  <span className="w-1 bg-primary rounded-full h-6 animate-pulse"></span>
                  <span className="w-1 bg-primary rounded-full h-8 animate-pulse"></span>
                  <span className="w-1 bg-secondary rounded-full h-4 animate-pulse"></span>
                  <span className="w-1 bg-primary rounded-full h-7 animate-pulse"></span>
                  <span className="w-1 bg-secondary rounded-full h-9 animate-pulse"></span>
                  <span className="w-1 bg-primary rounded-full h-5 animate-pulse"></span>
                  <span className="w-1 bg-secondary rounded-full h-8 animate-pulse"></span>
                  <span className="w-1 bg-primary rounded-full h-6 animate-pulse"></span>
                  <span className="w-1 bg-primary rounded-full h-4 animate-pulse"></span>
                  <span className="w-1 bg-secondary rounded-full h-7 animate-pulse"></span>
                  <span className="w-1 bg-primary rounded-full h-9 animate-pulse"></span>
                  <span className="w-1 bg-secondary rounded-full h-3 animate-pulse"></span>
                  <span className="w-1 bg-primary rounded-full h-6 animate-pulse"></span>
                </div>

                {/* Stop / Finish & Evaluate Button */}
                <button
                  onClick={handleEvaluateClarity}
                  className="px-space-sm py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-xs font-semibold flex items-center gap-1 self-stretch md:self-auto justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-error">stop_circle</span>
                  <span>Evaluate Clarity</span>
                </button>
              </div>

              {/* Clarity Feedback notification */}
              {evaluatedClarity && (
                <div className="p-2.5 rounded-lg bg-tertiary-fixed/40 border border-tertiary-fixed text-xs text-on-surface flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base mt-0.5">verified</span>
                  <div>
                    <span className="font-bold text-tertiary">Voice Calibration Check Passed!</span>
                    <p className="mt-0.5 text-on-surface-variant">{evaluatedClarity}</p>
                  </div>
                </div>
              )}

              {/* Realtime Speech Transcribed Stream Preview */}
              <div className="px-space-sm py-1.5 rounded-lg bg-surface-container-low/50 text-on-surface-variant font-body-sm text-xs flex items-center justify-between border border-surface-container/30">
                <p className="truncate italic">
                  "I am allocating an array of size amount plus one filled with infinity, then building subproblem solutions bottom-up..."
                </p>
                <span className="text-tertiary font-label-sm text-xs flex-shrink-0 ml-2 font-bold">
                  96% Conf.
                </span>
              </div>
            </div>

            {/* Bottom Execution Console Tabs & Metrics */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-md flex flex-col gap-space-sm border border-surface-container/60">
              <div className="flex items-center justify-between pb-space-xs flex-wrap gap-space-xs border-b border-surface-container/40">
                <div className="flex items-center gap-space-xs">
                  <button
                    onClick={() => setActiveConsoleTab('tests')}
                    className={`px-space-sm py-1 rounded-lg font-label-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                      activeConsoleTab === 'tests'
                        ? 'bg-surface-container text-primary shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base text-tertiary">task_alt</span>
                    <span>Test Results (3/3 Passed)</span>
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab('logs')}
                    className={`px-space-sm py-1 rounded-lg font-label-md text-xs font-semibold transition-colors cursor-pointer ${
                      activeConsoleTab === 'logs'
                        ? 'bg-surface-container text-primary shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    Console Logs
                  </button>
                </div>

                {/* Performance stats metrics */}
                <div className="flex items-center gap-space-sm font-mono text-xs">
                  <div className="flex items-center gap-1 px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                    <span className="material-symbols-outlined text-sm">speed</span>
                    <span>Runtime: 42ms (Faster than 89.2%)</span>
                  </div>
                  <div className="flex items-center gap-1 px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
                    <span className="material-symbols-outlined text-sm">memory</span>
                    <span>Memory: 16.4 MB</span>
                  </div>
                </div>
              </div>

              {/* Console Body */}
              {activeConsoleTab === 'tests' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xs pt-1">
                  <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-1 border border-surface-container/30">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-xs text-on-surface font-bold">Case 1</span>
                      <span className="text-tertiary text-xs flex items-center font-bold gap-0.5">
                        <span className="material-symbols-outlined text-sm">check</span> Pass
                      </span>
                    </div>
                    <div className="font-mono text-xs text-on-surface-variant">coins = [1,2,5], amount = 11</div>
                    <div className="font-mono text-xs text-on-surface font-bold">Output: 3</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-1 border border-surface-container/30">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-xs text-on-surface font-bold">Case 2</span>
                      <span className="text-tertiary text-xs flex items-center font-bold gap-0.5">
                        <span className="material-symbols-outlined text-sm">check</span> Pass
                      </span>
                    </div>
                    <div className="font-mono text-xs text-on-surface-variant">coins = [2], amount = 3</div>
                    <div className="font-mono text-xs text-on-surface font-bold">Output: -1</div>
                  </div>
                  <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-1 border border-surface-container/30">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-xs text-on-surface font-bold">Case 3</span>
                      <span className="text-tertiary text-xs flex items-center font-bold gap-0.5">
                        <span className="material-symbols-outlined text-sm">check</span> Pass
                      </span>
                    </div>
                    <div className="font-mono text-xs text-on-surface-variant">coins = [1], amount = 0</div>
                    <div className="font-mono text-xs text-on-surface font-bold">Output: 0</div>
                  </div>
                </div>
              ) : (
                <div className="p-space-sm bg-surface-container-low rounded-xl font-mono text-xs text-on-surface space-y-1">
                  <div>[INFO] Initializing test harness for 322. Coin Change...</div>
                  <div>[DEBUG] Base case initialized: dp[0] = 0</div>
                  <div>[DEBUG] Iterating amount 1 to 11 with denominations [1, 2, 5]</div>
                  <div>[DEBUG] dp[11] computed: 3. Execution time: 42ms. Zero memory leaks detected.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
