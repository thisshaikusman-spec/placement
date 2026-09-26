import React, { useState } from 'react';
import { POD_MEMBERS, INITIAL_POD_POSTS, USER_PROFILE } from '../data/mockData';
import { PodPost } from '../types';

export const PeerPod: React.FC = () => {
  const [posts, setPosts] = useState<PodPost[]>(INITIAL_POD_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState('Sneha K.');
  const [selectedSlot, setSelectedSlot] = useState('Today @ 6:00 PM');
  const [mockScheduledToast, setMockScheduledToast] = useState(false);
  const [rubricModalOpen, setRubricModalOpen] = useState(false);

  const handlePostUpdate = () => {
    if (!newPostText.trim()) return;

    const newPost: PodPost = {
      id: `post-${Date.now()}`,
      author: 'Ananya',
      authorAvatar: USER_PROFILE.avatarUrl,
      badge: 'You',
      isCurrentUser: true,
      timeAgo: 'Just now',
      content: newPostText.trim(),
      reactions: [
        { emoji: '👏', count: 1, userReacted: false },
        { emoji: '🚀', count: 1, userReacted: false },
      ],
      replyCount: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleToggleReaction = (postId: string, emojiIndex: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        const newReactions = [...post.reactions];
        const r = newReactions[emojiIndex];
        if (r) {
          const userReacted = !r.userReacted;
          newReactions[emojiIndex] = {
            ...r,
            count: userReacted ? r.count + 1 : r.count - 1,
            userReacted,
          };
        }
        return { ...post, reactions: newReactions };
      })
    );
  };

  const handleAcceptMock = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId && p.mockInvite) {
          return {
            ...p,
            mockInvite: {
              ...p.mockInvite,
              accepted: true,
            },
          };
        }
        return p;
      })
    );
  };

  const handleConfirmSchedule = () => {
    setScheduleModalOpen(false);
    setMockScheduledToast(true);
    setTimeout(() => setMockScheduledToast(false), 3500);
  };

  return (
    <div className="w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-gutter py-space-lg flex flex-col gap-space-lg">
        {/* Header Hero Banner with Soft Ambient Backdrop */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-space-lg md:p-space-xl shadow-sm border border-surface-container/50">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-secondary-fixed/50 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs max-w-3xl">
              <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-space-xs rounded-full bg-surface-container-lowest text-primary font-label-sm text-xs font-bold shadow-sm">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  groups
                </span>
                <span>Active Sprint Cohort</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                <span className="text-tertiary font-label-sm font-semibold">Safe &amp; Supportive Space</span>
              </div>
              <h1 className="font-headline-xl text-3xl font-bold text-on-surface tracking-tight">
                Peer Pod: Batch of 2025 Sprint Circle
              </h1>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Learn, hold each other accountable, and practice live peer interviews in a friendly, low-pressure cohort.
              </p>
            </div>
            <div className="flex items-center gap-space-sm flex-shrink-0">
              <button
                onClick={() => setScheduleModalOpen(true)}
                className="inline-flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs font-bold px-space-md py-space-sm rounded-xl transition-all shadow-[0_4px_14px_rgba(79,124,255,0.28)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">videocam</span>
                <span>Schedule 1-on-1 Peer Mock</span>
              </button>
            </div>
          </div>
        </div>

        {mockScheduledToast && (
          <div className="p-3 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold rounded-xl flex items-center justify-between shadow-md animate-fadeIn">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">event_available</span>
              Peer Mock scheduled with {selectedPartner} for {selectedSlot}! Google Meet link sent to your inbox.
            </span>
            <button
              onClick={() => setMockScheduledToast(false)}
              className="text-on-tertiary-fixed font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Top Group Card: Pod 14: The Algorithm Architects */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] flex flex-col gap-space-lg border border-surface-container/60">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-2xl">hub</span>
              </div>
              <div>
                <div className="flex items-center gap-space-sm flex-wrap">
                  <h2 className="font-headline-lg text-xl font-bold text-on-surface">
                    Pod 14: The Algorithm Architects
                  </h2>
                  <span className="px-space-sm py-0.5 rounded-full bg-surface-container font-label-sm text-xs text-on-surface-variant font-semibold">
                    5/5 Members
                  </span>
                  <span className="px-space-sm py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      eco
                    </span>
                    Sprint Week 3
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Focus Area: Trees, Graphs &amp; Dynamic Programming Sprint
                </p>
              </div>
            </div>

            {/* Weekly Collective Milestone Progress */}
            <div className="bg-surface-container-low rounded-xl p-space-sm px-space-md flex flex-col gap-space-xs min-w-[280px] lg:max-w-md w-full lg:w-auto border border-surface-container/40">
              <div className="flex items-center justify-between text-on-surface">
                <span className="font-label-sm text-xs flex items-center gap-1 text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-base text-primary">emoji_events</span>
                  Pod Milestone
                </span>
                <span className="font-label-sm text-xs text-primary font-bold">42 / 50 Solved (84%)</span>
              </div>
              <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: '84%' }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-xs text-tertiary font-bold">
                  On track for group coffee reward! ☕
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">2 days left</span>
              </div>
            </div>
          </div>

          {/* Member Goal Mini-Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
            {POD_MEMBERS.map((member) => (
              <div
                key={member.id}
                className={`relative rounded-xl p-space-md flex flex-col justify-between gap-space-sm transition-all border ${
                  member.isCurrentUser
                    ? 'bg-primary-fixed/20 border-primary/30 ring-1 ring-primary/40'
                    : 'bg-surface-container-low/70 border-surface-container/40 hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <img
                      className={`w-11 h-11 rounded-full object-cover shadow-sm ${
                        member.isCurrentUser ? 'ring-2 ring-primary' : ''
                      }`}
                      alt={member.name}
                      src={member.avatar}
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-surface-container-lowest ${
                        member.isCompleted ? 'bg-tertiary' : 'bg-secondary'
                      }`}
                    ></span>
                  </div>
                  {member.isCurrentUser ? (
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-[11px] font-bold">
                      You
                    </span>
                  ) : member.completedText ? (
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-[11px] font-bold ${
                        member.isCompleted
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-0.5'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {member.completedText}
                      {member.isCompleted && (
                        <span className="material-symbols-outlined text-[12px]">check</span>
                      )}
                    </span>
                  ) : null}
                </div>
                <div>
                  <h3 className="font-headline-md text-sm font-bold text-on-surface">{member.name}</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                    {member.goal}
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-on-surface-variant">Progress</span>
                    <span className={member.isCompleted ? 'text-tertiary' : 'text-primary'}>
                      {member.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${member.isCompleted ? 'bg-tertiary' : 'bg-primary'}`}
                      style={{ width: `${member.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Split Section: Async Standup Forum (Left) & Friendly Momentum (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Panel (8 Columns): Async Standup & Community Thread UI */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            {/* Daily Check-in Prompt Banner */}
            <div className="bg-surface-container-low rounded-2xl p-space-md md:p-space-lg flex items-start gap-space-md shadow-sm border border-surface-container/50">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-xl">wb_twilight</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-xs text-primary font-bold uppercase tracking-wider">
                  Today's Pulse Prompt
                </span>
                <h3 className="font-headline-md text-base font-bold text-on-surface">
                  🌅 Daily Check-in: What are you working on today, and where are you feeling stuck?
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Share your small wins or hurdles. No question is too trivial — that's why we're in this pod together.
                </p>
              </div>
            </div>

            {/* Community Feed Threads Container */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] flex flex-col gap-space-lg border border-surface-container/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs font-headline-md text-base font-bold text-on-surface">
                  <span className="material-symbols-outlined text-primary text-xl">chat_bubble</span>
                  <span>Pod Feed &amp; Standup</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  <span className="font-label-sm text-xs text-on-surface-variant font-medium">Live updates</span>
                </div>
              </div>

              {/* Feed Posts List */}
              <div className="flex flex-col gap-space-lg">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className={`flex flex-col gap-space-sm p-space-md rounded-xl transition-colors border ${
                      post.isCurrentUser
                        ? 'bg-surface-container-low/50 border-primary/20'
                        : 'bg-surface-container-lowest hover:bg-surface-container-low/40 border-surface-container/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <img
                          className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-primary-fixed"
                          alt={post.author}
                          src={post.authorAvatar}
                        />
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-headline-md text-sm font-bold text-on-surface">
                              {post.author}
                            </span>
                            {post.badge && (
                              <span
                                className={`px-2 py-0.2 rounded-full font-label-sm text-[11px] font-semibold ${
                                  post.badge === 'You'
                                    ? 'bg-primary-fixed text-primary font-bold'
                                    : 'bg-secondary-fixed text-on-secondary-fixed'
                                }`}
                              >
                                {post.badge}
                              </span>
                            )}
                          </div>
                          <span className="font-body-sm text-xs text-on-surface-variant">
                            {post.timeAgo}
                          </span>
                        </div>
                      </div>

                      {post.mockInvite ? (
                        <span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-bold">
                          {post.mockInvite.timeTag}
                        </span>
                      ) : (
                        <button className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container">
                          <span className="material-symbols-outlined text-base">more_horiz</span>
                        </button>
                      )}
                    </div>

                    <p className="font-body-md text-xs text-on-surface leading-relaxed pl-12">
                      {post.content}
                    </p>

                    {/* Mock Invite Action Card */}
                    {post.mockInvite && (
                      <div className="ml-12 p-space-sm rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm shadow-sm border border-surface-container/50">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
                            <span className="material-symbols-outlined text-base">mic</span>
                          </div>
                          <div>
                            <div className="font-label-md text-xs font-bold text-on-surface">
                              {post.mockInvite.title}
                            </div>
                            <div className="font-body-sm text-[11px] text-on-surface-variant">
                              {post.mockInvite.subtitle}
                            </div>
                          </div>
                        </div>

                        {post.mockInvite.accepted ? (
                          <span className="inline-flex items-center gap-1.5 bg-tertiary text-on-tertiary font-label-sm text-xs px-space-md py-1.5 rounded-xl shadow-sm font-bold">
                            <span className="material-symbols-outlined text-base">check</span>
                            Joined! Calendar invite sent
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAcceptMock(post.id)}
                            className="inline-flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-sm text-xs font-bold px-space-md py-1.5 rounded-xl transition-all shadow-[0_2px_8px_rgba(79,124,255,0.25)] flex-shrink-0 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            <span>Accept Invite</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Reactions & Replies Bar */}
                    <div className="flex items-center justify-between pl-12 pt-space-xs">
                      <div className="flex items-center gap-space-xs flex-wrap">
                        {post.reactions.map((r, rIdx) => (
                          <button
                            key={rIdx}
                            onClick={() => handleToggleReaction(post.id, rIdx)}
                            className={`inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full text-xs font-semibold transition-all shadow-sm cursor-pointer ${
                              r.userReacted
                                ? 'bg-primary-fixed text-primary ring-1 ring-primary'
                                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                            }`}
                          >
                            <span>{r.emoji}</span>
                            <span>{r.count}</span>
                          </button>
                        ))}
                      </div>

                      {post.replyCount !== undefined && post.replyCount > 0 && (
                        <button className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-sm text-xs transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-base">forum</span>
                          <span>{post.replyCount} replies</span>
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* Async Standup Input Field */}
              <div className="pt-space-sm border-t border-surface-container/40">
                <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs shadow-sm border border-surface-container/40">
                  <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        handlePostUpdate();
                      }
                    }}
                    rows={2}
                    placeholder="Share your progress, ask for advice, or share a win... (⌘+Enter to submit)"
                    className="w-full bg-transparent resize-none p-space-xs text-on-surface font-body-md text-xs placeholder:text-outline focus:outline-none"
                  />
                  <div className="flex items-center justify-between pt-space-xs border-t border-surface-container/30">
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <button
                        onClick={() => setNewPostText((p) => p + ' 🎯 Problem: ')}
                        className="p-1.5 rounded-lg hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                        title="Attach problem link"
                      >
                        <span className="material-symbols-outlined text-base">link</span>
                      </button>
                      <button
                        onClick={() => setNewPostText((p) => p + ' `code`')}
                        className="p-1.5 rounded-lg hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                        title="Insert code block"
                      >
                        <span className="material-symbols-outlined text-base">code</span>
                      </button>
                      <button
                        onClick={() => setNewPostText((p) => p + ' 🔥 ')}
                        className="p-1.5 rounded-lg hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                        title="Insert emoji"
                      >
                        <span className="material-symbols-outlined text-base">sentiment_satisfied</span>
                      </button>
                    </div>
                    <button
                      onClick={handlePostUpdate}
                      disabled={!newPostText.trim()}
                      className="inline-flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs font-bold px-space-md py-1.5 rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      <span>Send</span>
                      <span className="material-symbols-outlined text-base">send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel (4 Columns): Friendly Streak & Milestone Leaderboard */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            {/* Cohort Momentum Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_1px_3px_0_rgba(30,41,59,0.04),0_6px_16px_-4px_rgba(79,124,255,0.05)] flex flex-col gap-space-md border border-surface-container/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span
                    className="material-symbols-outlined text-secondary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_fire_department
                  </span>
                  <div>
                    <h3 className="font-headline-md text-base font-bold text-on-surface">Cohort Momentum</h3>
                    <p className="font-body-sm text-xs text-on-surface-variant">Friendly streak tracker</p>
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-outline cursor-help"
                  title="Streaks reset only after 48 hours of inactivity. Life happens!"
                >
                  info
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Every day you review a concept or tackle 1 problem keeps the team flame burning.
              </p>

              {/* Leaderboard List */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                {POD_MEMBERS.sort((a, b) => b.streakDays - a.streakDays).map((member, index) => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-space-sm rounded-xl transition-colors border ${
                      member.isCurrentUser
                        ? 'bg-primary-fixed/30 hover:bg-primary-fixed/50 border-primary/20'
                        : 'bg-surface-container-low hover:bg-surface-container border-surface-container/30'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <span
                        className={`w-5 font-headline-md text-xs font-bold text-center ${
                          member.isCurrentUser ? 'text-primary' : 'text-on-surface-variant'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <img
                        className={`w-9 h-9 rounded-full object-cover ${
                          member.isCurrentUser ? 'ring-2 ring-primary' : ''
                        }`}
                        alt={member.name}
                        src={member.avatar}
                      />
                      <div>
                        <div className="font-label-md text-xs font-bold text-on-surface">
                          {member.name} {member.isCurrentUser && '(You)'}
                        </div>
                        <div className="font-body-sm text-[11px] text-primary font-medium">
                          {member.streakTitle}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-space-sm py-1 rounded-full font-label-sm text-xs font-bold ${
                        member.isCurrentUser
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-secondary-fixed text-on-secondary-fixed'
                      }`}
                    >
                      <span>{member.streakDays} Days</span>
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        local_fire_department
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Group Consistency Score Ring */}
              <div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between gap-space-sm mt-space-xs border border-surface-container/40">
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs text-on-surface-variant font-medium">
                    Team Synchrony
                  </span>
                  <span className="font-headline-lg text-xl font-bold text-on-surface">96.4%</span>
                  <span className="font-body-sm text-xs text-tertiary font-bold">
                    All members active this week
                  </span>
                </div>
                {/* Gauge Chart */}
                <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    ></path>
                    <path
                      className="text-primary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="96, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    ></path>
                  </svg>
                  <span className="absolute font-headline-md text-xs font-bold text-primary">96%</span>
                </div>
              </div>
            </div>

            {/* Encouragement & Research Insight Card */}
            <div className="rounded-2xl p-space-lg bg-surface-container-low text-on-surface flex flex-col gap-space-sm shadow-sm relative overflow-hidden border border-surface-container/40">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary/10 blur-xl"></div>
              <div className="flex items-center gap-space-xs text-primary">
                <span className="material-symbols-outlined text-xl">handshake</span>
                <span className="font-label-md text-xs font-bold">PlacementIQ Research Insight</span>
              </div>
              <p className="font-body-md text-xs leading-relaxed text-on-surface">
                🤝 <strong>Fun fact:</strong> Pods that conduct at least{' '}
                <span className="text-primary font-bold">2 peer mocks weekly</span> achieve a{' '}
                <span className="text-tertiary font-bold">92% campus placement rate</span> compared to 54% solo applicants!
              </p>
              <div className="pt-space-xs">
                <button
                  onClick={() => setRubricModalOpen(true)}
                  className="inline-flex items-center gap-space-xs text-primary hover:text-primary-container font-label-md text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>View mock interview rubric</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Pod Quick Guidelines */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-[0_1px_3px_0_rgba(30,41,59,0.04)] flex items-start gap-space-sm border border-surface-container/60">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-base">favorite</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="font-label-md text-xs font-bold text-on-surface">Zero-Judgment Pod Pledge</h4>
                <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
                  We celebrate every question, embrace flawed first attempts, and lift each other up. Placements are a marathon, not a solo sprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule 1-on-1 Peer Mock Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-lg shadow-xl border border-surface-container flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">videocam</span>
                </span>
                <h3 className="font-headline-md text-base font-bold text-on-surface">
                  Schedule 1-on-1 Peer Mock
                </h3>
              </div>
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-sm text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Select Peer Partner</label>
                <select
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container focus:ring-1 focus:ring-primary font-medium"
                >
                  {POD_MEMBERS.filter((m) => !m.isCurrentUser).map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} ({m.goal})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Select Practice Track</label>
                <select className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container focus:ring-1 focus:ring-primary font-medium">
                  <option>Data Structures &amp; Algorithms (Reciprocal 45m)</option>
                  <option>System Design (High Concurrency &amp; Caching)</option>
                  <option>Behavioral &amp; Leadership (STAR Method)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">Available Time Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Today @ 6:00 PM', 'Today @ 8:30 PM', 'Tomorrow @ 11:00 AM', 'Tomorrow @ 5:00 PM'].map(
                    (slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2 rounded-xl text-center font-semibold transition-all cursor-pointer ${
                          selectedSlot === slot
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="px-space-md py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSchedule}
                className="px-space-md py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow hover:bg-primary-container cursor-pointer"
              >
                Confirm Peer Mock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Peer Rubric Modal */}
      {rubricModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-lg shadow-xl border border-surface-container flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-base font-bold text-on-surface">
                Peer Mock Evaluation Rubric
              </h3>
              <button
                onClick={() => setRubricModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="space-y-3 text-xs text-on-surface-variant leading-relaxed">
              <div className="p-3 bg-surface-container-low rounded-xl">
                <strong className="text-on-surface block mb-0.5">1. Problem Exploration (15%)</strong>
                Did candidate verbalize constraints, ask about nulls/edge cases before jumping into code?
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <strong className="text-on-surface block mb-0.5">2. Algorithmic Correctness (45%)</strong>
                Clean Big-O complexity analysis and working iterative/recursive implementation.
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <strong className="text-on-surface block mb-0.5">3. Communication &amp; Cadence (25%)</strong>
                Thinking aloud without long silent pauses, calm handling of interviewer nudges.
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <strong className="text-on-surface block mb-0.5">4. Code Cleanliness (15%)</strong>
                Meaningful variable naming, modular helper functions, no spaghetti logic.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
