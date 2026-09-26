export type TabType =
  | 'dashboard'
  | 'dsa-practice'
  | 'mock-interview'
  | 'analytics'
  | 'company-decoders'
  | 'peer-pod'
  | 'failure-replay';

export interface PodMember {
  id: string;
  name: string;
  roleTag?: string;
  goal: string;
  progress: number;
  completedText?: string;
  isCompleted?: boolean;
  avatar: string;
  isCurrentUser?: boolean;
  streakDays: number;
  streakTitle: string;
}

export interface PodPost {
  id: string;
  author: string;
  authorAvatar: string;
  badge?: string;
  isCurrentUser?: boolean;
  timeAgo: string;
  content: string;
  reactions: {
    emoji: string;
    count: number;
    userReacted?: boolean;
  }[];
  replyCount?: number;
  mockInvite?: {
    title: string;
    subtitle: string;
    timeTag: string;
    accepted: boolean;
  };
}

export interface CompanyData {
  id: string;
  name: string;
  trackName: string;
  difficulty: string;
  difficultyRating: string;
  hiringBar: string;
  lastUpdated: string;
  rubric: {
    dsFocus: string;
    systemThinking: string;
    communicationWeight: string;
    culturalRubric: string;
  };
  rounds: {
    number: string;
    duration: string;
    title: string;
    description: string;
    colorScheme?: string;
  }[];
  tone: {
    atmosphere: string;
    pitfall: string;
    booster: string;
  };
  followUps: {
    number: number;
    question: string;
    testedSkill: string;
  }[];
  alumniQuotes: {
    batch: string;
    company: string;
    quote: string;
    authorInitials: string;
    college: string;
    offer: string;
  }[];
}

export interface FailureQuestion {
  id: string;
  number: number;
  total: number;
  category: string;
  recordedAt: string;
  question: string;
  originalScore: number;
  calibratedScore: number;
  audioDuration: string;
  verbatimTranscript: string;
  gaps: {
    title: string;
    detail: string;
  }[];
  improvedAnswer: string;
  strengths: {
    title: string;
    detail: string;
  }[];
  coachingTips: {
    index: number;
    badge: string;
    title: string;
    description: string;
    stat: string;
  }[];
}
