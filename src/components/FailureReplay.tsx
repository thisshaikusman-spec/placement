import React, { useState, useEffect } from 'react';
import { FAILURE_QUESTIONS } from '../data/mockData';

export const FailureReplay: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playSeconds, setPlaySeconds] = useState(42);
  const [isSavedInPlaybook, setIsSavedInPlaybook] = useState(false);
  const [isPlayingModelAnswer, setIsPlayingModelAnswer] = useState(false);
  const [showRerecordModal, setShowRerecordModal] = useState(false);
  const [isReRecording, setIsReRecording] = useState(false);
  const [reRecordSeconds, setReRecordSeconds] = useState(0);
  const [reRecordSuccess, setReRecordSuccess] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const question = FAILURE_QUESTIONS[currentQuestionIndex] || FAILURE_QUESTIONS[0];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setPlaySeconds((prev) => (prev < 105 ? prev + 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAudio]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isReRecording) {
      interval = setInterval(() => {
        setReRecordSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isReRecording]);

  const formatTimer = (totalSecs: number) => {
    const m = String(Math.floor(totalSecs / 60)).padStart(2, '0');
    const s = String(totalSecs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCopyAnswer = () => {
    navigator.clipboard?.writeText(question.improvedAnswer);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % FAILURE_QUESTIONS.length);
    setPlaySeconds(0);
    setIsPlayingAudio(false);
    setIsPlayingModelAnswer(false);
  };

  const handleFinishRerecord = () => {
    setIsReRecording(false);
    setReRecordSuccess(true);
    setTimeout(() => {
      setReRecordSuccess(false);
      setShowRerecordModal(false);
      setReRecordSeconds(0);
    }, 2000);
  };

  return (
    <div className="w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-gutter py-space-xl flex flex-col gap-space-xl">
        {/* Top Context & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="flex items-center gap-space-xs">
              <span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs font-bold tracking-wide uppercase">
                Adaptive Debrief
              </span>
              <span className="text-outline-variant font-label-sm text-xs">•</span>
              <span className="text-on-surface-variant font-label-sm text-xs font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">history</span> Question{' '}
                {question.number} of {question.total} Reviewed
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl font-bold text-on-surface tracking-tight">
              Failure Replay &amp; Answer Evolution
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Transform interview missteps into unfair advantages with AI side-by-side reconstruction and actionable feedback.
            </p>
          </div>

          {/* Quick Session Meta */}
          <div className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm self-start md:self-auto border border-surface-container/60">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">video_camera_front</span>
            </div>
            <div className="flex flex-col pr-space-xs">
              <span className="font-label-sm text-xs text-on-surface-variant font-medium">Mock Session #4</span>
              <span className="font-label-md text-xs font-bold text-on-surface">Technical Round 2 (System Design)</span>
            </div>
          </div>
        </div>

        {/* Question & Score Calibration Banner */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg border border-surface-container/60">
          <div className="flex items-start gap-space-md max-w-4xl">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-space-xs font-label-sm text-xs text-on-surface-variant">
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-xs font-bold text-on-surface">
                  {question.category}
                </span>
                <span>•</span>
                <span>{question.recordedAt}</span>
              </div>
              <h2 className="font-headline-md text-lg font-bold text-on-surface leading-snug">
                {question.question}
              </h2>
            </div>
          </div>

          {/* Score Trajectory Widget */}
          <div className="flex items-center gap-space-md bg-surface-container-low p-space-md rounded-xl flex-shrink-0 border border-surface-container/40">
            <div className="flex flex-col items-center">
              <span className="font-label-sm text-xs text-error font-bold">Original Score</span>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="font-numeric-metric text-2xl font-bold text-error leading-none">
                  {question.originalScore}
                </span>
                <span className="font-label-sm text-xs text-on-surface-variant">/100</span>
              </div>
              <span className="px-2 py-0.5 mt-1 rounded-full bg-error-container text-on-error-container font-label-sm text-[11px] font-bold">
                Needs Improvement
              </span>
            </div>

            <div className="flex flex-col items-center text-outline">
              <span className="material-symbols-outlined text-xl text-tertiary">trending_up</span>
              <span className="font-label-sm text-xs text-tertiary font-bold">
                +{question.calibratedScore - question.originalScore} pts
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-label-sm text-xs text-tertiary font-bold">Target Calibrated</span>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="font-numeric-metric text-2xl font-bold text-tertiary leading-none">
                  {question.calibratedScore}+
                </span>
                <span className="font-label-sm text-xs text-on-surface-variant">/100</span>
              </div>
              <span className="px-2 py-0.5 mt-1 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-[11px] font-bold">
                Tier-1 Ready
              </span>
            </div>
          </div>
        </div>

        {/* Core Two-Column Comparison View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg items-stretch">
          {/* COLUMN 1: Your Recorded Answer */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg flex flex-col justify-between relative overflow-hidden border border-surface-container/60">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-error"></div>
            <div className="flex flex-col gap-space-md">
              {/* Column Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">mic</span>
                  </span>
                  <div>
                    <h3 className="font-headline-md text-base font-bold text-on-surface">
                      Your Recorded Answer
                    </h3>
                    <span className="font-label-sm text-xs text-on-surface-variant">
                      Round 2 Attempt • Audio duration {question.audioDuration}
                    </span>
                  </div>
                </div>
                <span className="px-space-sm py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">warning</span> {question.gaps.length} Gaps Flagged
                </span>
              </div>

              {/* Audio Snippet Player (Interactive) */}
              <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs border border-surface-container/40">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-8 h-8 rounded-full bg-surface-container-lowest text-on-surface hover:text-primary transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {isPlayingAudio ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <span className="font-bold text-on-surface">{formatTimer(playSeconds)}</span>
                    <span className="text-outline">/ {question.audioDuration}</span>
                  </div>
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">speed</span> 1.0x
                  </span>
                </div>

                {/* Waveform Scrubber */}
                <div
                  onClick={() => setPlaySeconds((prev) => (prev + 15) % 105)}
                  className="relative w-full h-8 flex items-center gap-1 px-1 cursor-pointer"
                >
                  {[3, 5, 2, 6, 8, 4, 7, 3, 6, 8, 5, 2, 4, 7, 3, 5, 6, 4, 2, 5, 7, 4, 3, 6, 8, 3, 2].map(
                    (h, idx) => {
                      const isActive = idx * 4 <= playSeconds;
                      return (
                        <span
                          key={idx}
                          className={`w-1 rounded-full transition-all ${
                            isActive ? 'bg-error' : 'bg-outline-variant'
                          }`}
                          style={{ height: `${h * 3.5}px` }}
                        />
                      );
                    }
                  )}
                </div>
              </div>

              {/* Verbatim Transcript with Highlighted Critique */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Verbatim Audio Transcript
                </span>
                <div className="p-space-md rounded-xl bg-surface-container-low font-body-md text-xs leading-relaxed text-on-surface border border-surface-container/30">
                  <mark className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-bold">
                    Uh, so basically
                  </mark>{' '}
                  I think we can use two-phase commit or maybe just save to the database and if something fails we{' '}
                  <mark className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-bold">
                    manually roll it back
                  </mark>{' '}
                  with an exception handler.{' '}
                  <mark className="bg-error-container text-on-error-container px-1 py-0.5 rounded font-bold">
                    But I guess
                  </mark>{' '}
                  two-phase commit is slow in production so that might have latency issues, but yeah.
                </div>
              </div>

              {/* Identified Gaps Checklist */}
              <div className="flex flex-col gap-space-xs mt-2">
                <span className="font-label-sm text-xs text-on-surface-variant font-bold">
                  Gaps Identified by AI Evaluator
                </span>
                <div className="flex flex-col gap-2">
                  {question.gaps.map((gap, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-space-xs p-space-sm rounded-xl bg-error-container/40 text-on-surface border border-error-container/50"
                    >
                      <span className="material-symbols-outlined text-error text-base mt-0.5">cancel</span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-xs font-bold text-on-surface">{gap.title}</span>
                        <span className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                          {gap.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-surface-container/40 flex items-center justify-between text-on-surface-variant font-label-sm text-xs">
              <span>Evaluated on 4 Core Dimensions</span>
              <span className="text-error font-bold">Clarity Score: 48%</span>
            </div>
          </div>

          {/* COLUMN 2: AI Improved Benchmark Version */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg flex flex-col justify-between relative overflow-hidden border border-surface-container/60">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-tertiary"></div>
            <div className="flex flex-col gap-space-md">
              {/* Column Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-label-md">
                    <span className="material-symbols-outlined text-base">auto_awesome</span>
                  </span>
                  <div>
                    <h3 className="font-headline-md text-base font-bold text-on-surface">
                      AI Improved Benchmark Version
                    </h3>
                    <span className="font-label-sm text-xs text-on-surface-variant">
                      Calibrated for Tier-1 SDE-1 / SDE-2
                    </span>
                  </div>
                </div>
                <span className="px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm">verified</span> {question.calibratedScore}+ Calibrated
                </span>
              </div>

              {/* Model Readout Audio / Prompt Speed */}
              <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between border border-surface-container/40">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingModelAnswer(!isPlayingModelAnswer)}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold flex items-center gap-1 shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isPlayingModelAnswer ? 'pause' : 'volume_up'}
                    </span>
                    <span>{isPlayingModelAnswer ? 'Playing Model Audio...' : 'Listen to Model Answer'}</span>
                  </button>
                  <span className="font-label-sm text-xs text-on-surface-variant font-medium">
                    Ideal pacing: 135 wpm
                  </span>
                </div>
                <button
                  onClick={handleCopyAnswer}
                  className="text-primary hover:text-on-primary-fixed-variant transition-colors p-1 cursor-pointer"
                  title="Copy Answer Text"
                >
                  <span className="material-symbols-outlined text-lg">content_copy</span>
                </button>
              </div>

              {copiedToast && (
                <div className="p-2 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold rounded-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check</span>
                  Model answer copied to clipboard!
                </div>
              )}

              {/* Model Answer Transcript with Green Enhancements */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-xs text-tertiary font-bold uppercase tracking-wider">
                  Target Answer Architecture
                </span>
                <div className="p-space-md rounded-xl bg-surface-container-low font-body-md text-xs leading-relaxed text-on-surface border border-surface-container/30">
                  “To ensure eventual consistency across distributed checkout services without blocking locks, I would implement the{' '}
                  <mark className="bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.5 rounded font-bold">
                    Saga Pattern
                  </mark>{' '}
                  using an{' '}
                  <mark className="bg-primary-fixed text-on-primary-fixed px-1.5 py-0.5 rounded font-bold">
                    orchestrated event-driven architecture
                  </mark>{' '}
                  with Apache Kafka. If the payment service fails after inventory reservation, an asynchronous{' '}
                  <mark className="bg-tertiary-fixed text-on-tertiary-fixed px-1.5 py-0.5 rounded font-bold">
                    compensating transaction
                  </mark>{' '}
                  is triggered by the orchestrator to immediately release the reserved stock and notify the user.”
                </div>
              </div>

              {/* Highlighted Strengths Checklist */}
              <div className="flex flex-col gap-space-xs mt-2">
                <span className="font-label-sm text-xs text-on-surface-variant font-bold">
                  Key Strengths Introduced
                </span>
                <div className="flex flex-col gap-2">
                  {question.strengths.map((str, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-space-xs p-space-sm rounded-xl bg-tertiary-fixed/30 text-on-surface border border-tertiary-fixed/40"
                    >
                      <span className="material-symbols-outlined text-tertiary text-base mt-0.5">check_circle</span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-xs font-bold text-on-surface">{str.title}</span>
                        <span className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                          {str.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-surface-container/40 flex items-center justify-between text-on-surface-variant font-label-sm text-xs">
              <span>Structural Cohesion: 96%</span>
              <span className="text-tertiary font-bold">Tier-1 Fit: Outstanding</span>
            </div>
          </div>
        </div>

        {/* Evolution Blueprint & Coaching Tips */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg flex flex-col gap-space-lg border border-surface-container/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <div>
                <h3 className="font-headline-md text-base font-bold text-on-surface">
                  Evolution Blueprint &amp; Coaching Tips
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Direct diff insights to calibrate your next live round
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-space-sm py-1 rounded-full bg-surface-container-high font-label-sm text-xs font-bold text-on-surface">
                3 Behavioral Micro-Corrections
              </span>
            </div>
          </div>

          {/* Coaching Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {question.coachingTips.map((tip) => (
              <div
                key={tip.index}
                className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm transition-all hover:bg-surface-container border border-surface-container/40"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center">
                    {tip.index}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-bold">
                    {tip.badge}
                  </span>
                </div>
                <h4 className="font-headline-md text-sm font-bold text-on-surface">{tip.title}</h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  {tip.description}
                </p>
                <div className="mt-auto pt-space-xs text-primary font-label-sm text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">spellcheck</span>
                  <span>{tip.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Visual Progress Anchor */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-lg border border-surface-container/60">
          <div className="flex items-center gap-space-md">
            <img
              className="w-16 h-16 rounded-2xl object-cover shadow-sm flex-shrink-0"
              alt="Candidate studying"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuSz-U9FdlYUnHQiHXeLvMqQ3s28jbPJeumbDEuUkJtHRWq5CYpwTEAJUGmZ1Cf3WmJ3tk9AiyxJGEXjipUlbLLLN7sNnjUFbZ8X2MYgfROwe6T62wOfB-bJPKNMI_WpkefKkYcMzfIAoUPN_F5MAEuVJ1M3ENCUROzZBrj9iwxTBlv0bBtsgRqcjIQiLdsj5pUrWJ1-nNRIu6QsmbRnKcnY8Zl3tIgBrfdcXUDAQjAMw1MHrncIPb"
            />
            <div className="flex flex-col">
              <span className="font-headline-md text-base font-bold text-on-surface">
                Your Retention Velocity is Top 5%
              </span>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Students who review their failures within 24 hours score an average of 89/100 on their subsequent live mock session.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm flex-shrink-0">
            <div className="flex flex-col text-right">
              <span className="font-label-sm text-xs text-on-surface-variant font-medium">Streak Protection</span>
              <span className="font-label-md text-xs text-secondary font-bold flex items-center gap-1 justify-end">
                <span className="material-symbols-outlined text-base">local_fire_department</span> Active &amp; Guarded
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Persistent Action Dock */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-space-md md:p-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md sticky bottom-4 z-40 border border-surface-container/60">
          <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
            <span>Ready to retry this exact prompt with revised mental framing</span>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm w-full sm:w-auto justify-end">
            <button
              onClick={handleNextQuestion}
              className="px-space-md py-2.5 rounded-xl font-label-md text-xs font-semibold text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Flagged Question</span>
              <span className="px-1.5 py-0.5 rounded-full bg-surface-container font-label-sm text-[11px] text-on-surface font-bold">
                {FAILURE_QUESTIONS.length - 1} remaining
              </span>
            </button>

            <button
              onClick={() => setIsSavedInPlaybook(!isSavedInPlaybook)}
              className={`px-space-md py-2.5 rounded-xl font-label-md text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                isSavedInPlaybook
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                  : 'bg-surface-container text-primary hover:bg-surface-container-high'
              }`}
            >
              <span
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: isSavedInPlaybook ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark
              </span>
              <span>{isSavedInPlaybook ? 'Saved in Playbook' : 'Save to My Playbook'}</span>
            </button>

            <button
              onClick={() => setShowRerecordModal(true)}
              className="px-space-lg py-2.5 rounded-xl font-label-md text-xs font-bold bg-primary text-on-primary hover:opacity-95 shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base animate-spin-hover">sync</span>
              <span>Try Again (Re-record Your Answer Now)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Re-record Answer Modal */}
      {showRerecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-lg shadow-xl border border-surface-container flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">mic</span>
                </span>
                <h3 className="font-headline-md text-base font-bold text-on-surface">
                  Calibrated Retry Studio
                </h3>
              </div>
              <button
                onClick={() => setShowRerecordModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-space-sm bg-surface-container-low rounded-xl text-xs text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Target Prompt:</strong> {question.question}
            </div>

            {/* Micro Recording Area */}
            <div className="p-space-lg bg-surface-container-low rounded-2xl flex flex-col items-center justify-center gap-space-md text-center border border-surface-container/50">
              <div className="relative">
                <button
                  onClick={() => setIsReRecording(!isReRecording)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                    isReRecording
                      ? 'bg-error text-white animate-pulse'
                      : 'bg-primary text-white hover:scale-105'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {isReRecording ? 'mic' : 'mic_none'}
                  </span>
                </button>
                {isReRecording && (
                  <span className="w-20 h-20 rounded-full border-2 border-error absolute -top-2 -left-2 animate-ping"></span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-lg font-bold text-on-surface">
                  {formatTimer(reRecordSeconds)}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {isReRecording ? 'Articulating solution with Saga pattern...' : 'Click to begin practice recording'}
                </span>
              </div>
            </div>

            {reRecordSuccess ? (
              <div className="p-3 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold rounded-xl flex items-center gap-1.5 justify-center">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Calibrated Score updated to 91/100! Superb progress.</span>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-space-sm pt-space-xs">
                <button
                  onClick={() => setShowRerecordModal(false)}
                  className="px-space-md py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  disabled={reRecordSeconds === 0}
                  onClick={handleFinishRerecord}
                  className="px-space-md py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow hover:bg-primary-container disabled:opacity-50 cursor-pointer"
                >
                  Evaluate New Recording
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
