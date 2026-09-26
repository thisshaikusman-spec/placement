import React, { useState, useEffect, useRef } from 'react';
import { TabType } from '../types';

interface MockInterviewProps {
  onNavigate: (tab: TabType) => void;
}

interface Message {
  id: string;
  sender: 'alex' | 'candidate';
  senderName: string;
  time: string;
  text: string;
}

export const MockInterview: React.FC<MockInterviewProps> = ({ onNavigate }) => {
  const [timerSeconds, setTimerSeconds] = useState(24 * 60 + 18);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [showMoodBanner, setShowMoodBanner] = useState(true);

  // AV controls
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [volume, setVolume] = useState(75);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    if (!isCameraOn) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraError(null);
      })
      .catch((err) => {
        console.error('Camera access denied/error:', err);
        setCameraError('Camera permission denied or unavailable.');
        setIsCameraOn(false);
      });
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, [isCameraOn]);

  // Tabs: Transcript vs Scratchpad
  const [activeTab, setActiveTab] = useState<'transcript' | 'scratchpad'>('transcript');
  const [candidateInput, setCandidateInput] = useState('');
  const [scratchpadCode, setScratchpadCode] = useState(
    `// Write helper notes or pseudocode here...
bool hasCycle(int V, vector<int> adj[]) {
    vector<int> inDegree(V, 0);
    // Kahn's Algorithm
}`
  );

  // Clarify & End Modals
  const [showClarifyModal, setShowClarifyModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Messages list
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'alex',
      senderName: 'Alex',
      time: '10:14 AM',
      text: 'Welcome Ananya. Can you explain how you would detect a cycle in a directed graph?',
    },
    {
      id: 'm2',
      sender: 'candidate',
      senderName: 'Ananya',
      time: '10:15 AM',
      text: "Sure! For directed graphs, we can use Depth-First Search with recursion stack tracking, or Kahn's algorithm using indegree array with a queue...",
    },
    {
      id: 'm3',
      sender: 'alex',
      senderName: 'Alex',
      time: 'Just now',
      text: 'Great start. What would the time complexity be if the graph is represented as an adjacency matrix vs adjacency list?',
    },
  ]);

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isPaused && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, timerSeconds]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const moodFeedbackTexts: Record<number, string> = {
    1: '“It is completely okay to feel nervous! Take a sip of water, speak slowly, and remember Alex is here to help you shine.”',
    2: '“Neutral and grounded is a great baseline. Focus on breaking down the graph problem step-by-step.”',
    3: '“A little nervous is normal! Deep breaths, take your time before answering.”',
    4: '“High energy detected! Channel that clarity into well-structured time and space explanations.”',
    5: '“Unstoppable mindset! Crush this round with clean trade-off discussions and edge-case mastery.”',
  };

  const handleSendMessage = () => {
    if (!candidateInput.trim()) return;

    const userText = candidateInput.trim();
    const newMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'candidate',
      senderName: 'Ananya',
      time: 'Just now',
      text: userText,
    };

    setMessages((prev) => [...prev, newMsg]);
    setCandidateInput('');

    // Simulate AI response after short delay
    setTimeout(() => {
      const alexResponse: Message = {
        id: `alex-${Date.now()}`,
        sender: 'alex',
        senderName: 'Alex',
        time: 'Just now',
        text:
          userText.toLowerCase().includes('matrix') || userText.toLowerCase().includes('list')
            ? 'Exactly. For an adjacency matrix, scanning all potential edges requires O(V²) time regardless of edge density. With an adjacency list, traversal drops to O(V + E), which is significantly superior for sparse campus-scale graphs. How would you handle disconnected subgraphs?'
            : 'Good insight! In addition to that, notice how space complexity shifts between O(V²) for dense matrices and O(V + E) for adjacency lists. Can you walk me through the code logic for the indegree queue?',
      };
      setMessages((prev) => [...prev, alexResponse]);
    }, 1500);
  };

  const handleConfirmEnd = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setShowEndModal(false);
      onNavigate('analytics');
    }, 1600);
  };

  return (
    <div className="w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-gutter py-space-md flex flex-col gap-space-md">
        {/* Top Status Header Strip */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-wrap items-center justify-between gap-space-md border border-surface-container/60">
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">terminal</span>
            </div>
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-md text-base font-bold text-on-surface">
                  Technical Round 2: Data Structures &amp; Problem Solving
                </span>
                <span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold uppercase tracking-wider">
                  Live Sim
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-space-xs mt-0.5">
                <span>
                  Interviewer: <strong className="text-on-surface font-semibold">Alex</strong> (Senior Eng AI Evaluator)
                </span>
                <span>•</span>
                <span className="text-secondary font-semibold">Standard SDE-1 Benchmark</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container-low border border-surface-container/40">
              <span className="material-symbols-outlined text-primary text-xl animate-pulse">timer</span>
              <div>
                <div className="font-label-sm text-[11px] text-on-surface-variant font-medium">Time Remaining</div>
                <div className="font-headline-md text-base font-bold text-primary tracking-tight">
                  {formatTimer(timerSeconds)}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-space-xs text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-surface-container transition-colors flex items-center justify-center cursor-pointer"
              title={isPaused ? 'Resume Session' : 'Pause Session'}
            >
              <span className="material-symbols-outlined text-2xl">
                {isPaused ? 'play_circle' : 'pause_circle'}
              </span>
            </button>
          </div>
        </div>

        {/* Pre-session Mood Check-in Strip */}
        {showMoodBanner && (
          <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm relative overflow-hidden transition-all duration-300 border border-surface-container/60">
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-primary-fixed/20 pointer-events-none blur-2xl"></div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md relative z-10">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">psychology_alt</span>
                </div>
                <div>
                  <div className="font-headline-md text-sm font-bold text-on-surface flex items-center gap-space-xs">
                    <span>🌱 How confident do you feel right now?</span>
                    <span className="text-primary font-label-sm text-xs font-normal">Pre-round Calibration</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    {moodFeedbackTexts[selectedMood]}
                  </p>
                </div>
              </div>

              {/* Interactive Mood Picker */}
              <div className="flex items-center gap-space-xs sm:gap-space-sm bg-surface-container-low p-1.5 rounded-full self-stretch lg:self-auto justify-between sm:justify-start border border-surface-container/40">
                {[
                  { val: 1, emoji: '😟', label: 'Nervous' },
                  { val: 2, emoji: '😐', label: 'Neutral' },
                  { val: 3, emoji: '🙂', label: 'Ready' },
                  { val: 4, emoji: '🚀', label: 'Confident' },
                  { val: 5, emoji: '🔥', label: 'Unstoppable' },
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setSelectedMood(item.val)}
                    className={`px-space-sm py-1.5 rounded-full font-label-sm text-xs transition-all flex items-center gap-1 cursor-pointer ${
                      selectedMood === item.val
                        ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => setShowMoodBanner(false)}
                  aria-label="Dismiss banner"
                  className="p-1 rounded-full text-on-surface-variant hover:text-on-surface ml-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area: Split 7 / 5 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md w-full items-start">
          {/* Left Column: Video & Telemetry (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Video Viewport Frame */}
            <div className="relative w-full aspect-[16/10] bg-surface-container-highest rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between p-space-md border border-surface-container/60">
              {/* Evaluator AI Representation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-tertiary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[120px] text-primary/40 select-none">
                  smart_toy
                </span>
              </div>

              {/* Gradient Scrim for readable overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-inverse-surface/40 pointer-events-none"></div>

              {/* Top Video Overlay Badges */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-space-xs bg-surface-container-lowest/90 backdrop-blur-md px-space-sm py-1 rounded-full shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-error -ml-3.5"></span>
                  <span className="font-label-sm text-xs font-semibold text-on-surface">
                    Alex • Senior AI Evaluator
                  </span>
                </div>

                {/* Audio Waveform Live Pulse */}
                <div className="flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-space-sm py-1.5 rounded-full shadow-sm">
                  <span className="font-label-sm text-xs text-primary font-semibold mr-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-primary">graphic_eq</span>
                    Audio Active
                  </span>
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-1 bg-primary rounded-full h-2 animate-[bounce_0.8s_infinite_100ms]"></span>
                    <span className="w-1 bg-primary rounded-full h-3.5 animate-[bounce_0.8s_infinite_250ms]"></span>
                    <span className="w-1 bg-primary rounded-full h-1.5 animate-[bounce_0.8s_infinite_400ms]"></span>
                    <span className="w-1 bg-primary rounded-full h-3 animate-[bounce_0.8s_infinite_150ms]"></span>
                  </div>
                </div>
              </div>

              {/* Bottom Inside Video: Speaking status & Self-view PIP */}
              <div className="relative z-10 flex items-end justify-between w-full">
                {/* Speaking Indicator Pill */}
                <div className="flex items-center gap-space-xs bg-surface-container-lowest/95 backdrop-blur-md px-space-md py-space-xs rounded-xl shadow-md text-on-surface">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                  <span className="font-label-md text-xs text-on-surface font-semibold tracking-wide ml-1">
                    Alex is listening...
                  </span>
                </div>

                {/* Student Picture-in-Picture PIP */}
                <div className="relative w-28 sm:w-36 aspect-video bg-surface-container-low rounded-xl overflow-hidden shadow-lg border border-white/20">
                  {isCameraOn ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover -scale-x-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white/60">
                      <span className="material-symbols-outlined text-2xl">videocam_off</span>
                    </div>
                  )}
                  {cameraError && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-2 text-center text-[10px] text-red-400">
                      {cameraError}
                    </div>
                  )}
                  <div className="absolute bottom-1 left-2 font-label-sm text-[10px] text-surface-container-lowest bg-inverse-surface/70 px-1.5 py-0.5 rounded">
                    You (Ananya)
                  </div>
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-fixed-dim ring-1 ring-surface-container-lowest"></div>
                </div>
              </div>
            </div>

            {/* Subtle Non-Intrusive Live Coaching Telemetry */}
            <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md border border-surface-container/60">
              <div className="flex items-center gap-space-sm w-full sm:w-auto">
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed/30 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-xl">speed</span>
                </div>
                <div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant font-medium">Speech Cadence</div>
                  <div className="font-label-md text-xs text-on-surface flex items-center gap-1 font-semibold">
                    <span>Optimal (130 wpm)</span>
                    <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-outline-variant/30"></div>

              <div className="flex items-center gap-space-sm w-full sm:w-auto">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </div>
                <div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant font-medium">Visual Presence</div>
                  <div className="font-label-md text-xs text-on-surface flex items-center gap-1 font-semibold">
                    <span>Eye Contact: Good</span>
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-outline-variant/30"></div>

              <div className="flex items-center gap-space-sm w-full sm:w-auto">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-xl">sentiment_satisfied</span>
                </div>
                <div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant font-medium">Vocal Clarity</div>
                  <div className="font-label-md text-xs text-on-surface flex items-center gap-1 font-semibold">
                    <span>Tone: Clear &amp; Calm</span>
                    <span className="material-symbols-outlined text-secondary text-sm">sentiment_very_satisfied</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Transcript & Scratchpad (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col overflow-hidden h-[540px] border border-surface-container/60">
              {/* Header with Tabs: Transcript vs Scratchpad */}
              <div className="p-space-sm bg-surface-container-low flex items-center justify-between border-b border-surface-container/40">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('transcript')}
                    className={`px-space-md py-1.5 rounded-xl font-label-md text-xs font-semibold cursor-pointer transition-all ${
                      activeTab === 'transcript'
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Live Transcript
                  </button>
                  <button
                    onClick={() => setActiveTab('scratchpad')}
                    className={`px-space-md py-1.5 rounded-xl font-label-md text-xs font-semibold cursor-pointer transition-all ${
                      activeTab === 'scratchpad'
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Code Scratchpad
                  </button>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant text-xs">
                  <span className="material-symbols-outlined text-sm animate-spin" style={{ animationDuration: '4s' }}>
                    autorenew
                  </span>
                  <span className="font-label-sm text-[11px]">Syncing</span>
                </div>
              </div>

              {/* Transcript Content Area */}
              {activeTab === 'transcript' ? (
                <div className="flex-1 p-space-md overflow-y-auto flex flex-col gap-space-md space-y-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-space-sm ${
                        msg.sender === 'candidate' ? 'flex-row-reverse self-end' : ''
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                          msg.sender === 'alex'
                            ? 'bg-primary-container text-on-primary-container'
                            : 'bg-secondary-container text-on-secondary-container'
                        }`}
                      >
                        {msg.sender === 'alex' ? 'A' : 'You'}
                      </div>
                      <div
                        className={`flex flex-col gap-1 max-w-[85%] ${
                          msg.sender === 'candidate' ? 'items-end' : ''
                        }`}
                      >
                        <div className="flex items-center gap-space-xs">
                          <span className="font-label-sm text-xs font-semibold text-on-surface">
                            {msg.senderName}
                          </span>
                          <span className="text-[11px] text-on-surface-variant">{msg.time}</span>
                        </div>
                        <div
                          className={`p-space-md rounded-2xl text-xs font-body-sm leading-relaxed ${
                            msg.sender === 'candidate'
                              ? 'bg-primary-container text-on-primary-container rounded-tr-sm shadow-sm'
                              : 'bg-surface-container-low text-on-surface rounded-tl-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* AI Whisper Tip */}
                  <div className="w-full bg-surface-container rounded-xl p-space-sm flex items-start gap-space-sm shadow-sm border border-surface-container/60 mt-2">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5 flex-shrink-0">
                      lightbulb
                    </span>
                    <div className="flex-1">
                      <div className="font-label-sm text-xs font-bold text-primary">
                        PlacementIQ AI Whisper
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                        💡 Remember to mention vertices <strong>V</strong> and edges <strong>E</strong> in your
                        complexity notation (e.g., O(V²) vs O(V + E)).
                      </p>
                    </div>
                  </div>
                  <div ref={transcriptEndRef} />
                </div>
              ) : (
                /* Code Scratchpad Pane */
                <div className="flex-1 p-space-md flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between text-on-surface-variant text-xs">
                    <span>Language: C++ / Python (Shared in real time)</span>
                    <button
                      onClick={() => {
                        /* format */
                      }}
                      className="text-primary hover:underline font-semibold cursor-pointer"
                    >
                      Format Code
                    </button>
                  </div>
                  <textarea
                    value={scratchpadCode}
                    onChange={(e) => setScratchpadCode(e.target.value)}
                    className="w-full flex-1 p-space-md bg-surface-container-low font-mono text-xs text-on-surface rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container"
                  />
                </div>
              )}

              {/* Transcript Input Quick Action */}
              <div className="p-space-sm bg-surface-container-lowest flex items-center gap-space-xs border-t border-surface-container/40">
                <input
                  value={candidateInput}
                  onChange={(e) => setCandidateInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-surface-container-low rounded-xl px-space-md py-2 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container/30"
                  placeholder="Or type an answer / clarification..."
                  type="text"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-primary text-on-primary rounded-xl hover:bg-primary-container transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Persistent Interview Control Bar */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-md flex flex-wrap items-center justify-between gap-space-md mt-space-xs border border-surface-container/60">
          {/* Left Controls: AV Media Toggles */}
          <div className="flex items-center gap-space-xs sm:gap-space-sm">
            {/* Mic Toggle Button */}
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container text-on-surface font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className={`material-symbols-outlined text-xl ${isMicOn ? 'text-primary' : 'text-error'}`}>
                {isMicOn ? 'mic' : 'mic_off'}
              </span>
              <span className="hidden sm:inline">{isMicOn ? 'Mic On' : 'Muted'}</span>
            </button>

            {/* Camera Toggle Button */}
            <button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container text-on-surface font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className={`material-symbols-outlined text-xl ${isCameraOn ? 'text-primary' : 'text-error'}`}>
                {isCameraOn ? 'videocam' : 'videocam_off'}
              </span>
              <span className="hidden sm:inline">{isCameraOn ? 'Camera On' : 'Camera Off'}</span>
            </button>

            {/* Screen Share */}
            <button
              onClick={() => setIsSharingScreen(!isSharingScreen)}
              className={`flex items-center gap-space-xs px-space-md py-space-xs rounded-xl transition-colors cursor-pointer font-label-md text-xs font-semibold ${
                isSharingScreen
                  ? 'bg-secondary-fixed text-on-secondary-fixed'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-xl">present_to_all</span>
              <span className="hidden md:inline">
                {isSharingScreen ? 'Sharing Screen' : 'Share Screen'}
              </span>
            </button>
          </div>

          {/* Center Controls: Voice Volume Slider */}
          <div className="hidden lg:flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-xl border border-surface-container/30">
            <span className="material-symbols-outlined text-on-surface-variant text-base">volume_up</span>
            <label className="sr-only" htmlFor="volume-range">
              Interviewer Audio Volume
            </label>
            <input
              id="volume-range"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">{volume}%</span>
          </div>

          {/* Right Controls: Help & End Session */}
          <div className="flex items-center gap-space-sm ml-auto">
            <button
              onClick={() => setShowClarifyModal(true)}
              className="px-space-md py-space-xs rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">help_outline</span>
              <span className="hidden sm:inline">Clarify</span>
            </button>

            {/* Red End Interview & Generate Report Button */}
            <button
              onClick={() => setShowEndModal(true)}
              className="flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-error text-on-error font-label-md text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">call_end</span>
              <span>End Interview &amp; Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clarify Helper Modal */}
      {showClarifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-lg shadow-xl border border-surface-container flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-base font-bold text-on-surface">
                Request Interviewer Clarification
              </h3>
              <button
                onClick={() => setShowClarifyModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              In real technical rounds, asking focused clarifying questions reflects high engineering seniority. Choose a prompt:
            </p>
            <div className="flex flex-col gap-2 mt-1">
              {[
                'Can I assume the input directed graph has no self-loops or parallel edges?',
                'Are vertices numbered 0 to V-1, or can they be arbitrary string identifiers?',
                'Should we optimize for memory footprint or execution speed on dense graphs?',
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCandidateInput(q);
                    setShowClarifyModal(false);
                  }}
                  className="text-left p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs text-on-surface font-medium transition-colors cursor-pointer border border-surface-container/30"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exit & Report Confirmation Modal */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-xl shadow-xl flex flex-col gap-space-md border border-surface-container">
            <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">flag</span>
            </div>
            <div>
              <h3 className="font-headline-lg text-xl font-bold text-on-surface">
                Conclude Technical Round?
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant mt-1 leading-relaxed">
                Your response transcripts, speech cadence metrics, and complexity explanations will be compiled into your{' '}
                <strong className="text-on-surface">Placement Readiness Scorecard</strong>.
              </p>
            </div>
            <div className="p-space-md bg-surface-container-low rounded-xl flex items-center gap-space-sm border border-surface-container/40">
              <span className="material-symbols-outlined text-tertiary text-2xl">auto_awesome</span>
              <div className="font-label-sm text-xs text-on-surface leading-relaxed">
                Includes comprehensive AI feedback on graph algorithmic efficiency, behavioral confidence, and model solutions.
              </div>
            </div>
            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <button
                disabled={isEvaluating}
                onClick={() => setShowEndModal(false)}
                className="px-space-md py-space-xs rounded-xl font-label-md text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
              >
                Return to Session
              </button>
              <button
                disabled={isEvaluating}
                onClick={handleConfirmEnd}
                className="px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow hover:bg-primary-container transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">autorenew</span>
                    <span>Evaluating Session...</span>
                  </>
                ) : (
                  <span>Generate Full Evaluation</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
