import { CompanyData, FailureQuestion, PodMember, PodPost } from '../types';

export const USER_PROFILE = {
  name: 'Ananya',
  fullName: 'Ananya Iyer',
  college: 'Campus University (Batch 2025)',
  branch: 'Computer Science & Engineering',
  targetRole: 'SDE-1 @ Tier 1',
  targetFirms: ['Google', 'Microsoft', 'Amazon', 'Atlassian'],
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCuRn_VvaX6ksZ-9QDh_wm8I4dCYYGfK0Zn9QdLdxTM0b9cetUzPHJHVwMfDepmxE1iS4mFwkBavq6ENilkUwZV2hndvQpqMVGnQm-sxv53Lb1TgrPwiToKIzxKHxfXsuTsTELRs242omYxsnRlBrfgOe2lzTgCIwOWqQ_oPIrArd1B5t7MTBq5jlhNPVTo_9vBjikGEJZ7FaPdviFpY2j6k6Q9Ni3Go6jxmIcIoYATIYVD7BxBCuzC',
  readinessScore: 78,
  streakDays: 12,
  daysToPlacements: 42,
  nextDrive: 'Amazon & Google Day 1',
  eligibilityMetCount: 8,
};

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAqczTABorRBYWh627vKjZJQI-JFbDZSL0DkVKjOhVPPUSp9dnTngqkP0A7Uuz8XYvfsWq8EX0m5NCW2mmdyZtrZj-2ZjfKQreqpgAhkNDl2WpRHW6hwZUlRm2twBP1oewCfKyecHQolknBpbbHEdgc137P7RThDDndiyQ5BThrPeb9PR2QNrilc9bwORjFVVOfO8OBnLOTXEJl9jIP6oCpamQcQwhEzJGacJTDTNDq-yEA7IELQY4v';

export const POD_MEMBERS: PodMember[] = [
  {
    id: 'm1',
    name: 'Ananya',
    roleTag: 'You',
    goal: 'Goal: 15 DP problems',
    progress: 80,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmWM7j_M8BwWYrWUNPkI7bZwZequOo95VLlc-_sk7aBRFUl5nf4PiygMT0JHBDaVb00-kkqkktf2FWoJ7IrqwyvE-b3xCtUoE_oYfe1pD7BDqNwLxKLDNGfI-pn09EQyUVfkdEiUrtzfHTl6q-D-7uvFfTRIi_Rd3qgacjNW46nOWCvJ5wuYIig6Dg5P7nwbMVzffEQnjkuePMjhznhshMFyENSaCQKSjejesjCpO2rqxCtcoelWL-',
    isCurrentUser: true,
    streakDays: 12,
    streakTitle: 'Steady Climber',
  },
  {
    id: 'm2',
    name: 'Rohan M.',
    goal: 'Goal: 10 Tree problems',
    progress: 90,
    completedText: '9/10 Done',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOJlyddCDTIDN2MeVT57Nc5DlvX0Kmkv_ev_QcGEheaF_fXvqsAafKyN6ydMoNunhezd4SI_VjmLO38WKXpqW-s7rzQN8Xada6I_dDX3By_mj4fzgl6Hmg-d6SWtONbn-BFkzfH3_1UlrQccGc6UwR8u_ZP8_jJdPL1QUNvw-_y-wo_V6dE3496fu8k-XOEokeGFCBvbXpEnzIk2-Vk-fAmziiscRKlSn4T4pYvmoxiLvipwA944bO',
    streakDays: 9,
    streakTitle: 'Weekend Warrior',
  },
  {
    id: 'm3',
    name: 'Sneha K.',
    goal: 'Goal: 3 System Design mocks',
    progress: 100,
    completedText: '3/3',
    isCompleted: true,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDr0cS0m9hR3XgZCLGmWGc__DWlUwPTpk4fvCLmJPCJAxeKPx6JLdrtDplyoD5jTMs536Hk7I-_NiihDTb2mE-6fglPNzGKHF6JBaYvcrXo-PhKPSU87W06jnZFUBFIaJyUldfQ7whdHvjRuRGAgWEztoYvaXpP9hIx6hP_7rYTEYM8zlx4kFtlRRPnTQmA11i142_l07nky4BWnIRxIeCv46-hOLpNARpDZq_sy0w3Y5D-GPlaG3-M',
    streakDays: 16,
    streakTitle: 'Consistency Master',
  },
  {
    id: 'm4',
    name: 'Vikram P.',
    goal: 'Goal: 12 Graph problems',
    progress: 60,
    completedText: '7/12 Done',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDx66arolGHNbh4FqEronEO2idI3KNZj8yQ0F9V7GRpGBkyhwuum34z7sGxjRFJe83I7OsSE6JkRqGW-up5xA9_mBR3ndSzs0KFpcEr1bSLVBoia_wkPWLxnn4Emxt8siwxOhXFsBApqYVrlvpEi-eI0KaIHEEUluvfh_6cjq12oT4ZuSZNtT4oUv0FrA9m-y15H53RZKgoiUSTymbIpfmLcwhew0vj94xIkjMy0CURuPgnFND_q05P',
    streakDays: 7,
    streakTitle: 'Building Habits',
  },
  {
    id: 'm5',
    name: 'Tanvi R.',
    goal: 'Goal: 2 Mock Behavioral',
    progress: 100,
    completedText: '2/2',
    isCompleted: true,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHY4wPfRencsjzsMDTyJ0RoCXsylXOnOt8tSOodE8gACmT_m79JLcTE3IczawCW2XGgGceI4foQF6sdoP5FLrecbmbu2YUhU44XjuIG7qoeXnCJlmrpJO5SKXTvYBiIumOB32xQ1qlX1Y3W1BuvIZFEyPkt3GKwq8-XbeJbVd-A4fR-vdH1X5sqbRbuJHn0fW0449pd1iJvfkZcIEC8vn6TBJNcQ4C2e0qgXKopB08oJUZ902svTMg',
    streakDays: 11,
    streakTitle: 'Rising Star',
  },
];

export const INITIAL_POD_POSTS: PodPost[] = [
  {
    id: 'post-1',
    author: 'Rohan M.',
    authorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNHHNHgVg7VnFKUl8Z2R2FUorkFfpz7FGubT0FgZ765NzBpG4q7DEFC6sx-Qg9XW6fRzlFp7yPK-HIl6rtBb04PicJuHiisAnvZpdWcr8xrGaga0Ho2S3F2FyG13muBTrHrVtwf-XMuf1akWqogRo6Bf9fwhTAXuiTZ1zKCTGt7WCwsQtSS2lDFA2odPmPRvO6hmOIrPJHaTU0FYyZywYHZaK3nYnDI8KqiCiTofCKskp7RkmuVwJ4',
    badge: 'Trees & Graphs',
    timeAgo: '25 minutes ago',
    content:
      "Just tackled Dijkstra's algorithm. Trick was using Python's heapq! Happy to jump on a quick 15-min call if anyone needs intuition.",
    reactions: [
      { emoji: '🔥', count: 1, userReacted: false },
      { emoji: '👏', count: 1, userReacted: false },
      { emoji: '💡', count: 1, userReacted: false },
    ],
    replyCount: 2,
  },
  {
    id: 'post-2',
    author: 'Ananya',
    authorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAyBBuXuV_QnEqccJt-_YqZKf0SLNN1ol3Q0O9e3uIG2QoMncrjnRe0oQoNKPdrhT_x5Kkps877yO5kufftkEFKsBvrqCo_uY4LjVWmkyv9E1AL3xVnaE1HDgFX4haORyUOElVXM-ZMNZASQJ3VeqYKjut6YTIIj2ZGuI6Dkw6ph2suAvyLV3aC0zbgETffvjWYhG9yAbXg-ymKBzbyweEafdAAUx7mNm53TdjQDrutz6UYpCuHYJCw',
    badge: 'You',
    isCurrentUser: true,
    timeAgo: '2 hours ago',
    content:
      'Finished Coin Change bottom-up DP! Feeling much better about space optimization. Took me 3 tries to get the boundary base cases right, but the 1D rolling array clicked! 🎯',
    reactions: [
      { emoji: '🚀', count: 2, userReacted: true },
      { emoji: '🙌', count: 2, userReacted: false },
    ],
    replyCount: 0,
  },
  {
    id: 'post-3',
    author: 'Sneha K.',
    authorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDaeiWiXSFjKqI6REM_00U9KEMCb3mtqV5MmScKq-zbFHPlov0-vMfd8YFvdWuLIWN7G5FbCtIhIQfjFcKrMPrPbGUHlRiXnGlh1pF1cbBOdhg_Qk1jVZfVuER3G15w9tFx6II8nzTZC9l99FzeEaMszBXEdzwisERz-_bFGyGj7T8N_Vajg58ZDjNLLEg_jrHSW2dljWOTT3B9e-NxDqJkXcydZFM17ws3zSaORR3-5MAZgr5O0lK5',
    badge: 'Mock Request',
    timeAgo: '3 hours ago',
    content:
      'Anyone free for a quick 30-min behavioral mock around 6 PM today? Focusing on STAR method for leadership and conflict resolution questions.',
    reactions: [],
    replyCount: 1,
    mockInvite: {
      title: 'Behavioral Peer Mock (30m)',
      subtitle: 'Google & Amazon Question Bank',
      timeTag: 'Today @ 6 PM',
      accepted: false,
    },
  },
];

export const COMPANIES_DATA: Record<string, CompanyData> = {
  Google: {
    id: 'google',
    name: 'Google',
    trackName: 'SDE-1 Campus Drive Track',
    difficulty: 'Challenging',
    difficultyRating: '4.3/5',
    hiringBar:
      'Heavy emphasis on Clean Modular Code, Graph/DP Algorithms, and Googleyness.',
    lastUpdated: 'Refined Nov 2024 Hiring Wave',
    rubric: {
      dsFocus: 'Graphs, Heaps, DP (92%)',
      systemThinking: 'OOP & Scalability Basics',
      communicationWeight: 'High (Think-Aloud Rule)',
      culturalRubric: 'Googleyness & Ambiguity',
    },
    rounds: [
      {
        number: 'ROUND 01',
        duration: '60 Mins',
        title: 'Online Assessment (OA)',
        description:
          '2 LeetCode Medium/Hard algorithmic challenges on Google Hire Portal. Focus on edge test suites.',
      },
      {
        number: 'ROUND 02',
        duration: '45 Mins',
        title: 'Technical Phone Screen / Live DSA',
        description:
          'Live collaborative Doc. Heavy emphasis on data structures and recursive optimization under scrutiny.',
      },
      {
        number: 'ROUND 03',
        duration: '45 Mins',
        title: 'Live Coding & System Fundamentals',
        description:
          'Scalability trade-offs, modular helper functions, and handling massive data scale considerations.',
      },
      {
        number: 'ROUND 04',
        duration: '45 Mins',
        title: 'Googleyness & Leadership',
        description:
          'STAR-framework behavioral checks. Navigating intellectual friction, ambiguity, and student group dynamics.',
        colorScheme: 'secondary',
      },
    ],
    tone: {
      atmosphere:
        'Collaborative & inquisitive: The interviewer acts as a peer engineer. They expect active thinking aloud rather than silence while writing code.',
      pitfall:
        'Premature Coding: Jumping immediately into typing solutions before verifying ambiguous edge cases, integer overflow, or null bounds will drop your score.',
      booster:
        'Unprompted Big-O Mastery: Proactively analyzing time/space trade-offs and stating: "We can trade O(N) memory for O(1) auxiliary by leveraging cycle detection" before they ask.',
    },
    followUps: [
      {
        number: 1,
        question: '"What if the input does not fit into RAM?"',
        testedSkill:
          'Tests external sorting, chunking, map-reduce fundamentals, and stream hashing.',
      },
      {
        number: 2,
        question: '"How would you handle concurrent writes to this cache?"',
        testedSkill:
          'Tests lock granularity, ReadWriteLock semantics, and eventual consistency trade-offs.',
      },
      {
        number: 3,
        question: '"Can we reduce space from O(N) to O(1)?"',
        testedSkill:
          'Tests in-place pointer manipulation, bit masking, or mathematical transformations.',
      },
    ],
    alumniQuotes: [
      {
        batch: "Batch of '24 • Placed at Google",
        company: 'Google',
        quote:
          "Don't panic if they change constraints midway. They intentionally want to see how you adapt to shifting specs!",
        authorInitials: 'AG',
        college: 'IIT Kharagpur Alum',
        offer: 'Offer: SDE-1 Core Search',
      },
      {
        batch: "Batch of '24 • Placed at Microsoft",
        company: 'Microsoft',
        quote:
          'Microsoft loved when I explained trade-offs between BFS and DFS rather than just picking one blindly.',
        authorInitials: 'RS',
        college: 'BITS Pilani Alum',
        offer: 'Offer: Software Engineer - Azure',
      },
      {
        batch: "Batch of '23 • Placed at Uber",
        company: 'Uber',
        quote:
          'Focus deeply on concurrency and graph modeling. The questions are rarely direct standard LeetCode copies.',
        authorInitials: 'VK',
        college: 'NIT Trichy Alum',
        offer: 'Offer: SDE-1 Mobility Platform',
      },
    ],
  },
  Microsoft: {
    id: 'microsoft',
    name: 'Microsoft',
    trackName: 'SDE-1 Core Engineering Track',
    difficulty: 'Moderate to High',
    difficultyRating: '3.9/5',
    hiringBar:
      'Strong fundamentals in Data Structures, OS, Concurrency, and clean API design.',
    lastUpdated: 'Refined Oct 2024 Hiring Wave',
    rubric: {
      dsFocus: 'Trees, Linked Lists, Strings (88%)',
      systemThinking: 'Concurrency, Memory & OS',
      communicationWeight: 'High (Structured Reasoning)',
      culturalRubric: 'Growth Mindset & Curiosity',
    },
    rounds: [
      {
        number: 'ROUND 01',
        duration: '60 Mins',
        title: 'Codility OA Screen',
        description: '3 problems covering arrays, strings, and graph traversal with strict time benchmarks.',
      },
      {
        number: 'ROUND 02',
        duration: '45 Mins',
        title: 'Data Structures & Problem Solving',
        description: 'Binary trees, BST balancing, and memory leaks handling in C++ / Java.',
      },
      {
        number: 'ROUND 03',
        duration: '45 Mins',
        title: 'System Internals & OOP Design',
        description: 'Design an elevator controller or LRU cache with thread-safe constructs.',
      },
      {
        number: 'ROUND 04',
        duration: '45 Mins',
        title: 'AA Round (As-Appropriate / Partner Director)',
        description: 'High-level behavioral checks, conflict resolution, and vision alignment.',
        colorScheme: 'secondary',
      },
    ],
    tone: {
      atmosphere:
        'Pragmatic & engineering-oriented: They value clean code that compiles cleanly and handles edge cases without defensive bloat.',
      pitfall:
        'Neglecting low-level edge cases: Forgetting null pointer checks, integer overflow, or resource cleanup.',
      booster:
        'Explaining algorithmic alternatives: Comparing recursion stack overhead vs iterative two-pointer approaches upfront.',
    },
    followUps: [
      {
        number: 1,
        question: '"How would you make this data structure thread-safe?"',
        testedSkill: 'Tests mutexes, lock-free queues, and concurrent read guarantees.',
      },
      {
        number: 2,
        question: '"What happens if the operating system runs out of file descriptors?"',
        testedSkill: 'Tests OS kernel concepts and fault tolerance.',
      },
      {
        number: 3,
        question: '"Refactor this logic into an extensible OOP hierarchy."',
        testedSkill: 'Tests SOLID design principles and interface segregation.',
      },
    ],
    alumniQuotes: [
      {
        batch: "Batch of '24 • Placed at Microsoft",
        company: 'Microsoft',
        quote: 'My interviewer spent 15 minutes discussing how I would write unit tests for my tree serializer. Write testable code!',
        authorInitials: 'PR',
        college: 'IIIT Hyderabad Alum',
        offer: 'Offer: SDE-1 Teams & O365',
      },
      {
        batch: "Batch of '23 • Placed at Microsoft",
        company: 'Microsoft',
        quote: 'The AA round was purely about culture and learning from past failure. Be honest about your project shortcomings.',
        authorInitials: 'SK',
        college: 'DTU Alum',
        offer: 'Offer: SDE-1 Azure Core',
      },
      {
        batch: "Batch of '24 • Placed at Amazon",
        company: 'Amazon',
        quote: 'LP answers need metrics. Never say "we improved performance", say "reduced latency by 42% on p99".',
        authorInitials: 'DA',
        college: 'NSUT Alum',
        offer: 'Offer: SDE-1 AWS S3',
      },
    ],
  },
  Amazon: {
    id: 'amazon',
    name: 'Amazon',
    trackName: 'SDE-1 Campus Drive Track (AWS & Retail)',
    difficulty: 'Challenging',
    difficultyRating: '4.1/5',
    hiringBar:
      'Rigorous dual evaluation on Algorithms + 16 Amazon Leadership Principles (LP).',
    lastUpdated: 'Refined Jan 2025 Hiring Wave',
    rubric: {
      dsFocus: 'Graphs, BFS/DFS, Heaps (89%)',
      systemThinking: 'Microservices & Distributed Basics',
      communicationWeight: 'Very High (STAR Method LP)',
      culturalRubric: 'Customer Obsession & Bias for Action',
    },
    rounds: [
      {
        number: 'ROUND 01',
        duration: '70 Mins',
        title: 'OA (HackerRank + Work Simulation)',
        description: '2 algorithm problems + AWS priority simulation scenario questions.',
      },
      {
        number: 'ROUND 02',
        duration: '60 Mins',
        title: 'Technical Round 1 (DSA + LP)',
        description: '20 mins STAR LP questions + 40 mins graph/heap coding challenge.',
      },
      {
        number: 'ROUND 03',
        duration: '60 Mins',
        title: 'Technical Round 2 (DSA + LLD)',
        description: 'Low level object-oriented design and tree/string algorithms with complexity analysis.',
      },
      {
        number: 'ROUND 04',
        duration: '60 Mins',
        title: 'Bar Raiser Round',
        description: 'Independent Amazonian assessing if you raise the median bar across both tech and leadership.',
        colorScheme: 'secondary',
      },
    ],
    tone: {
      atmosphere:
        'Data-driven and decisive: Always quantify your contributions in behavioral rounds, and explain time complexity mathematically.',
      pitfall:
        'Using "We" instead of "I" in LP stories: Amazon wants to know specifically what YOU designed, coded, and delivered.',
      booster:
        'Customer-centric framing: Explaining why an algorithmic optimization actually reduces user load times or AWS cloud cost.',
    },
    followUps: [
      {
        number: 1,
        question: '"Tell me about a time you had a disagreement with your team lead."',
        testedSkill: 'Tests Have Backbone; Disagree and Commit LP.',
      },
      {
        number: 2,
        question: '"How would you design a rate limiter for 100,000 requests/sec?"',
        testedSkill: 'Tests Token Bucket, Leaky Bucket, and Redis cluster caching.',
      },
      {
        number: 3,
        question: '"What if 1% of transactions fail silently?"',
        testedSkill: 'Tests idempotency keys, Dead Letter Queues, and reconciliation.',
      },
    ],
    alumniQuotes: [
      {
        batch: "Batch of '24 • Placed at Amazon",
        company: 'Amazon',
        quote: 'Have at least 4 distinct project stories mapped to different Leadership Principles. Do not repeat the same project for every answer.',
        authorInitials: 'NT',
        college: 'BITS Goa Alum',
        offer: 'Offer: SDE-1 AWS Aurora',
      },
      {
        batch: "Batch of '24 • Placed at Google",
        company: 'Google',
        quote: 'Focus on recursion trees and state reduction. Google loves testing depth on simple-looking problems.',
        authorInitials: 'SJ',
        college: 'IIT Roorkee Alum',
        offer: 'Offer: SDE-1 YouTube Infrastructure',
      },
      {
        batch: "Batch of '23 • Placed at Atlassian",
        company: 'Atlassian',
        quote: 'Values interview is not a formality. They take "Open Company, No Bullshit" very seriously.',
        authorInitials: 'RM',
        college: 'VIT Vellore Alum',
        offer: 'Offer: Grad Engineer - Jira',
      },
    ],
  },
  Uber: {
    id: 'uber',
    name: 'Uber',
    trackName: 'SDE-1 Mobility & Dispatch Track',
    difficulty: 'High',
    difficultyRating: '4.4/5',
    hiringBar:
      'Intense focus on concurrency, distributed queues, geometry/spatial indexing (H3), and clean code.',
    lastUpdated: 'Refined Dec 2024 Hiring Wave',
    rubric: {
      dsFocus: 'Graphs, Disjoint Sets, Concurrency (94%)',
      systemThinking: 'Event-driven, High QPS Systems',
      communicationWeight: 'High (Architectural clarity)',
      culturalRubric: 'Go-Getter & Technical Rigor',
    },
    rounds: [
      {
        number: 'ROUND 01',
        duration: '75 Mins',
        title: 'Codesignal Online Assessment',
        description: 'Fast-paced algorithmic challenge testing speed, accuracy, and edge-case coverage.',
      },
      {
        number: 'ROUND 02',
        duration: '60 Mins',
        title: 'Advanced DSA & Graph Modeling',
        description: 'Shortest path with dynamic weights, spatial grid matching, and complex state machines.',
      },
      {
        number: 'ROUND 03',
        duration: '60 Mins',
        title: 'System Design & High Concurrency',
        description: 'Design a ride-matching service or distributed pub-sub messaging system.',
      },
      {
        number: 'ROUND 04',
        duration: '45 Mins',
        title: 'Engineering Culture & Values',
        description: 'Handling production incidents, working cross-functionally, and ownership mindset.',
        colorScheme: 'secondary',
      },
    ],
    tone: {
      atmosphere:
        'Fast-paced and rigorous: Interviewers will push hard on performance bottlenecks, thread safety, and edge scale.',
      pitfall:
        'Ignoring race conditions: Submitting code that fails under simultaneous requests or has unhandled shared memory mutations.',
      booster:
        'Demonstrating lock-free primitives or atomic operations without prompting.',
    },
    followUps: [
      {
        number: 1,
        question: '"What if 10,000 drivers and riders are matching in the same 1km radius?"',
        testedSkill: 'Tests geo-hashing, spatial trees, and lock striping.',
      },
      {
        number: 2,
        question: '"How do you guarantee exactly-once payment processing?"',
        testedSkill: 'Tests two-phase commit, Kafka transactional producers, and idempotency.',
      },
      {
        number: 3,
        question: '"Reduce cache contention across multiple availability zones."',
        testedSkill: 'Tests cache invalidation protocols and distributed read replicas.',
      },
    ],
    alumniQuotes: [
      {
        batch: "Batch of '24 • Placed at Uber",
        company: 'Uber',
        quote: 'They asked me to write working multi-threaded Java code in round 2. Practice threading and concurrent collections!',
        authorInitials: 'SM',
        college: 'IIT Delhi Alum',
        offer: 'Offer: SDE-1 Dispatch Platform',
      },
      {
        batch: "Batch of '23 • Placed at Flipkart",
        company: 'Flipkart',
        quote: 'Machine coding round was the differentiator. Write clean, modular, design-patterned code with good separation of concerns.',
        authorInitials: 'AB',
        college: 'BITS Pilani Alum',
        offer: 'Offer: SDE-1 Supply Chain',
      },
      {
        batch: "Batch of '24 • Placed at Google",
        company: 'Google',
        quote: 'Always verify edge cases (n=0, n=1, negative numbers, extreme inputs) before typing the first line.',
        authorInitials: 'RK',
        college: 'IIT Bombay Alum',
        offer: 'Offer: SDE-1 Cloud Spanner',
      },
    ],
  },
  Atlassian: {
    id: 'atlassian',
    name: 'Atlassian',
    trackName: 'Graduate Software Engineer Track',
    difficulty: 'Moderate to High',
    difficultyRating: '4.0/5',
    hiringBar:
      'High emphasis on clean craftsmanship, readable code, and the 5 Atlassian Values.',
    lastUpdated: 'Refined Jan 2025 Hiring Wave',
    rubric: {
      dsFocus: 'HashMaps, Trees, Trie (86%)',
      systemThinking: 'Modular OOP & Clean APIs',
      communicationWeight: 'Very High (Collaborative Pair)',
      culturalRubric: 'Open Company, No Bullshit',
    },
    rounds: [
      {
        number: 'ROUND 01',
        duration: '60 Mins',
        title: 'HackerRank OA',
        description: '2 data structure problems with emphasis on clean syntax and algorithmic efficiency.',
      },
      {
        number: 'ROUND 02',
        duration: '60 Mins',
        title: 'Live Pair Programming (DSA)',
        description: 'Interactive pair coding with Atlassian engineer. Treated as a mutual working session.',
      },
      {
        number: 'ROUND 03',
        duration: '60 Mins',
        title: 'Design & Code Craftsmanship',
        description: 'Building a mini in-memory database or tagging system with unit tests.',
      },
      {
        number: 'ROUND 04',
        duration: '45 Mins',
        title: 'Values & Teamwork Interview',
        description: 'Deep dive into "Play, as a team", "Be the change you seek", and constructive feedback.',
        colorScheme: 'secondary',
      },
    ],
    tone: {
      atmosphere:
        'Warm, open, and candid: Interviewers love when you treat them like teammates and ask clarifying questions early.',
      pitfall:
        'Being defensive when given feedback: Atlassian explicitly checks how well you take constructive hints.',
      booster:
        'Writing clean variable names, helper methods, and unit tests during the live round.',
    },
    followUps: [
      {
        number: 1,
        question: '"How would you test this class against concurrent reads and writes?"',
        testedSkill: 'Tests concurrency safety and mock testing.',
      },
      {
        number: 2,
        question: '"Tell me about a time you gave critical feedback to a peer."',
        testedSkill: 'Tests empathy, communication clarity, and values alignment.',
      },
      {
        number: 3,
        question: '"How would you extend this system to support arbitrary custom attributes?"',
        testedSkill: 'Tests extensibility and strategy pattern.',
      },
    ],
    alumniQuotes: [
      {
        batch: "Batch of '24 • Placed at Atlassian",
        company: 'Atlassian',
        quote: 'The interviewer gave me a hint midway. I said "Oh that is a much cleaner insight, let me refactor around that" and they loved it!',
        authorInitials: 'KA',
        college: 'IIIT Allahabad Alum',
        offer: 'Offer: Graduate Engineer - Confluence',
      },
      {
        batch: "Batch of '24 • Placed at Microsoft",
        company: 'Microsoft',
        quote: 'Practice explaining BFS level-order using two queues vs queue with size tracking.',
        authorInitials: 'MN',
        college: 'Jadavpur University Alum',
        offer: 'Offer: SDE-1 Bing Search',
      },
      {
        batch: "Batch of '23 • Placed at Goldman Sachs",
        company: 'Goldman Sachs',
        quote: 'Math and probability questions are frequent. Review Bayes theorem, combinatorics, and dynamic programming.',
        authorInitials: 'RP',
        college: 'IIT Madras Alum',
        offer: 'Offer: Analyst - Core Strats',
      },
    ],
  },
  Flipkart: {
    id: 'flipkart',
    name: 'Flipkart',
    trackName: 'SDE-1 Campus Hiring Track',
    difficulty: 'High',
    difficultyRating: '4.2/5',
    hiringBar:
      'Famous for the 90-minute Machine Coding Round with strictly working and modular code.',
    lastUpdated: 'Refined Nov 2024 Hiring Wave',
    rubric: {
      dsFocus: 'Design Patterns, Collections, OOP (95%)',
      systemThinking: 'In-Memory Low Level Design',
      communicationWeight: 'High (Design Defense)',
      culturalRubric: 'Speed & Customer First',
    },
    rounds: [
      {
        number: 'ROUND 01',
        duration: '90 Mins',
        title: 'Machine Coding Round',
        description: 'Implement a complete working console app (e.g. Splitwise, Ride Sharing, Movie Booking) with clean OOP design.',
      },
      {
        number: 'ROUND 02',
        duration: '60 Mins',
        title: 'Machine Coding Defense',
        description: 'Explaining your design choices, extending with new requirements, and code walkthrough.',
      },
      {
        number: 'ROUND 03',
        duration: '60 Mins',
        title: 'Core DSA & Algorithms',
        description: 'Hard DP, Trie, Graph algorithms with proof of correctness.',
      },
      {
        number: 'ROUND 04',
        duration: '45 Mins',
        title: 'Hiring Manager Fit',
        description: 'Cultural alignment, resilience during high-scale Big Billion Days, and teamwork.',
        colorScheme: 'secondary',
      },
    ],
    tone: {
      atmosphere:
        'Practical and execution-heavy: Code must execute without crashes, handle edge inputs, and adhere to clean design patterns.',
      pitfall:
        'Writing all code in a single file or main function: Instant reject in the machine coding round.',
      booster:
        'Applying Factory, Strategy, and Observer patterns properly with clean interface abstractions.',
    },
    followUps: [
      {
        number: 1,
        question: '"Now add support for surge pricing without changing existing service classes."',
        testedSkill: 'Tests Open-Closed Principle and Strategy Pattern.',
      },
      {
        number: 2,
        question: '"How would you make this booking system handle duplicate concurrent bookings?"',
        testedSkill: 'Tests optimistic locking vs pessimistic locking.',
      },
      {
        number: 3,
        question: '"Reduce time complexity from O(N²) to O(N log N)."',
        testedSkill: 'Tests sorting, segment trees, and binary search.',
      },
    ],
    alumniQuotes: [
      {
        batch: "Batch of '24 • Placed at Flipkart",
        company: 'Flipkart',
        quote: 'In Machine Coding, first write models, interfaces, and repos before business logic. Keep 20 mins at the end to verify working I/O.',
        authorInitials: 'TK',
        college: 'PSG Tech Alum',
        offer: 'Offer: SDE-1 Marketplace Order Management',
      },
      {
        batch: "Batch of '24 • Placed at Google",
        company: 'Google',
        quote: 'Practice on Google Docs without syntax highlighting or auto-complete. It builds immense muscle memory.',
        authorInitials: 'AP',
        college: 'IIT Kanpur Alum',
        offer: 'Offer: SDE-1 Android Core',
      },
      {
        batch: "Batch of '23 • Placed at Amazon",
        company: 'Amazon',
        quote: 'Always prepare 2 questions to ask the interviewer at the end. Make them about team architecture or upcoming challenges.',
        authorInitials: 'DS',
        college: 'Thapar Alum',
        offer: 'Offer: SDE-1 Prime Video',
      },
    ],
  },
  'Goldman Sachs': {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    trackName: 'Engineering Campus Analyst Track',
    difficulty: 'Moderate to High',
    difficultyRating: '4.1/5',
    hiringBar:
      'Rigorous test of Math, Probability, DSA, and low-latency system design.',
    lastUpdated: 'Refined Dec 2024 Hiring Wave',
    rubric: {
      dsFocus: 'DP, Trees, Math & Combinatorics (90%)',
      systemThinking: 'Low Latency, High Throughput',
      communicationWeight: 'High (Quantitative Precision)',
      culturalRubric: 'Integrity & Intellectual Humility',
    },
    rounds: [
      {
        number: 'ROUND 01',
        duration: '105 Mins',
        title: 'Aptitude & Technical OA',
        description: 'DSA questions + Quantitative Aptitude + Probability puzzles.',
      },
      {
        number: 'ROUND 02',
        duration: '45 Mins',
        title: 'Data Structures & Algorithmic Problem Solving',
        description: 'Array manipulations, two pointers, sliding window, and tree traversals.',
      },
      {
        number: 'ROUND 03',
        duration: '45 Mins',
        title: 'Math, Probability & System Architecture',
        description: 'Puzzles, conditional probability (Bayes), and designing a low-latency price feed.',
      },
      {
        number: 'ROUND 04',
        duration: '45 Mins',
        title: 'Values, Integrity & Fit',
        description: 'Risk assessment, teamwork under high pressure, and regulatory integrity.',
        colorScheme: 'secondary',
      },
    ],
    tone: {
      atmosphere:
        'Analytical, sharp, and quantitative: Interviewers love structured derivations on puzzles and mathematical proof of why code works.',
      pitfall:
        'Guessing probability answers: Never guess without writing down the sample space or step-by-step conditional probability formula.',
      booster:
        'Discussing memory layout, cache lines, and branch prediction when optimizing critical paths.',
    },
    followUps: [
      {
        number: 1,
        question: '"What is the probability of winning this game given unfair coin flips?"',
        testedSkill: 'Tests geometric distributions and recursive probability.',
      },
      {
        number: 2,
        question: '"How do you process 1,000,000 tick updates per second in sub-millisecond time?"',
        testedSkill: 'Tests ring buffers (LMAX Disruptor), zero-allocation Java/C++, and memory mapped files.',
      },
      {
        number: 3,
        question: '"Can this dynamic programming space be optimized from O(N*M) to O(min(N,M))?"',
        testedSkill: 'Tests rolling array space optimization.',
      },
    ],
    alumniQuotes: [
      {
        batch: "Batch of '24 • Placed at Goldman Sachs",
        company: 'Goldman Sachs',
        quote: 'Do not ignore math and probability! I was asked 2 hard probability puzzles before we even touched code.',
        authorInitials: 'VS',
        college: 'IIT Roorkee Alum',
        offer: 'Offer: Analyst - Global Markets Tech',
      },
      {
        batch: "Batch of '24 • Placed at Microsoft",
        company: 'Microsoft',
        quote: 'Make sure you understand asynchronous programming and Event Loop in Node / thread pools in Java.',
        authorInitials: 'HN',
        college: 'VNIT Nagpur Alum',
        offer: 'Offer: SDE-1 OneDrive',
      },
      {
        batch: "Batch of '23 • Placed at Uber",
        company: 'Uber',
        quote: 'Be ready to write custom comparator functions and handle complex edge cases on interval scheduling.',
        authorInitials: 'LR',
        college: 'NIT Surathkal Alum',
        offer: 'Offer: SDE-1 Uber Freight',
      },
    ],
  },
};

export const FAILURE_QUESTIONS: FailureQuestion[] = [
  {
    id: 'fq-2',
    number: 2,
    total: 5,
    category: 'Distributed Systems',
    recordedAt: 'Recorded Yesterday, 16:40',
    question:
      '“How do you ensure data consistency across microservices during a distributed checkout flow?”',
    originalScore: 54,
    calibratedScore: 88,
    audioDuration: '01:45',
    verbatimTranscript:
      'Uh, so basically I think we can use two-phase commit or maybe just save to the database and if something fails we manually roll it back with an exception handler. But I guess two-phase commit is slow in production so that might have latency issues, but yeah.',
    gaps: [
      {
        title: 'Vague fallback strategy',
        detail:
          'Stated “manually roll it back with an exception handler” without describing atomic state reconciliation.',
      },
      {
        title: 'Hesitation & filler vocabulary',
        detail:
          'Used 7 passive phrases (“uh”, “basically”, “I guess”, “but yeah”) diminishing technical conviction.',
      },
      {
        title: 'Missed core industry pattern',
        detail:
          'Failed to mention the Saga Pattern (orchestration vs choreography) and compensating transactions.',
      },
    ],
    improvedAnswer:
      '“To ensure eventual consistency across distributed checkout services without blocking locks, I would implement the Saga Pattern using an orchestrated event-driven architecture with Apache Kafka. If the payment service fails after inventory reservation, an asynchronous compensating transaction is triggered by the orchestrator to immediately release the reserved stock and notify the user.”',
    strengths: [
      {
        title: 'Explicit architectural paradigm named',
        detail:
          'Anchors immediately on the Saga pattern and names Kafka as the durable event ledger.',
      },
      {
        title: 'Clear trade-off analysis',
        detail:
          'Balances eventual consistency against strict 2PC latency bottlenecks without prompting.',
      },
      {
        title: 'Defined failure recovery path',
        detail:
          'Concretely articulates compensating transactions rather than abstract rollback handlers.',
      },
    ],
    coachingTips: [
      {
        index: 1,
        badge: 'Terminology',
        title: 'Vocabulary & Polish',
        description:
          'Replaced ambiguous phrasing (“manually roll it back”) with recognized distributed systems parlance (“compensating transaction”). This immediately flags you as someone who has handled production incidents.',
        stat: '+18% Terminology Calibration',
      },
      {
        index: 2,
        badge: 'Structuring',
        title: 'Mental Model Framing',
        description:
          'Structured response into an intuitive tripartite sequence: Paradigm (Saga) → Architecture (Kafka Orchestrator) → Failure Mode (Rollback Event). Never jump straight to failure handling without establishing context.',
        stat: 'Structured Answer Pattern',
      },
      {
        index: 3,
        badge: 'Executive Presence',
        title: 'Delivery & Vocal Cadence',
        description:
          'Eliminated 7 filler pauses in the initial 20 seconds. Starting with a declarative verb (“To ensure... I would implement”) projects 40% higher perceived authority in front of hiring managers.',
        stat: 'Authority Index +40%',
      },
    ],
  },
  {
    id: 'fq-1',
    number: 1,
    total: 5,
    category: 'System Design',
    recordedAt: 'Recorded 3 days ago, 11:20',
    question:
      '“How would you design a distributed cache invalidation strategy for multi-region user profiles?”',
    originalScore: 58,
    calibratedScore: 85,
    audioDuration: '02:10',
    verbatimTranscript:
      'Well, caching is hard because of TTLs. We can just put a 5 minute TTL on Redis everywhere and let it expire. Or maybe send an API call to every region to purge the key whenever someone edits their profile, but that might timeout if a region is down.',
    gaps: [
      {
        title: 'Relied purely on passive expiry',
        detail: 'Passive TTL creates stale profile reads for up to 5 minutes, failing SLA requirements.',
      },
      {
        title: 'Synchronous broadcast antipattern',
        detail: 'Direct REST calls across regions introduces cascading network latency and timeout cascades.',
      },
    ],
    improvedAnswer:
      '“I would utilize a Write-Through or Cache-Aside strategy backed by Change Data Capture (CDC) via Debezium. When a profile mutation commits in the primary region database, the CDC event publishes to a globally replicated Kafka topic, triggering asynchronous cache invalidation workers in all peripheral regions with under 100ms lag.”',
    strengths: [
      {
        title: 'Decoupled asynchronous architecture',
        detail: 'Leverages CDC and Kafka pub/sub instead of brittle synchronous point-to-point HTTP broadcasts.',
      },
      {
        title: 'Quantified latency guarantees',
        detail: 'Explicitly bounds cross-region invalidation propagation to <100ms.',
      },
    ],
    coachingTips: [
      {
        index: 1,
        badge: 'Architecture',
        title: 'CDC over Synchronous Invalidation',
        description: 'Mentioning Debezium or DynamoDB Streams signals real-world production maturity.',
        stat: '+22% System Rigor',
      },
      {
        index: 2,
        badge: 'Trade-offs',
        title: 'Eventual vs Strong Consistency',
        description: 'Acknowledge that profile pictures can tolerate 100ms eventual consistency.',
        stat: 'Trade-off Calibration',
      },
      {
        index: 3,
        badge: 'Clarity',
        title: 'Direct Solution Anchor',
        description: 'State the write path first before addressing regional cache invalidation.',
        stat: 'Pacing Optimized',
      },
    ],
  },
  {
    id: 'fq-3',
    number: 3,
    total: 5,
    category: 'Algorithms & Data Structures',
    recordedAt: 'Recorded 5 days ago, 14:15',
    question:
      '“Explain how you would find the median of a continuous stream of incoming integers.”',
    originalScore: 62,
    calibratedScore: 92,
    audioDuration: '01:30',
    verbatimTranscript:
      'We could insert each number into an array and sort it every time, which is slow like O(N log N). Or keep a sorted array with insertion sort at O(N). I think there is a heap way with min heap and max heap, but I am not 100% sure how the rebalancing works.',
    gaps: [
      {
        title: 'Hesitation on core dual-heap invariant',
        detail: 'Did not state the size invariant (diff <= 1) and value invariant (maxHeap top <= minHeap top).',
      },
      {
        title: 'Slow start with brute force',
        detail: 'Spent half the explanation detailing O(N log N) sorting before reaching the optimal approach.',
      },
    ],
    improvedAnswer:
      '“I would maintain two balanced heaps: a Max-Heap for the lower half of numbers and a Min-Heap for the upper half. We enforce two invariants: first, the size difference is at most 1; second, maxHeap.top() <= minHeap.top(). This provides O(log N) insertion time and instantaneous O(1) median retrieval.”',
    strengths: [
      {
        title: 'Crisp Invariant Formulation',
        detail: 'Directly and cleanly stated the dual heap property and time bounds upfront.',
      },
      {
        title: 'O(1) Retrieval Guarantee',
        detail: 'Explicitly contrasted logarithmic insertion with constant time median query.',
      },
    ],
    coachingTips: [
      {
        index: 1,
        badge: 'Framing',
        title: 'Lead with Invariants',
        description: 'For dual-heap and two-pointer problems, naming the mathematical invariants commands respect.',
        stat: '+25% Algorithmic Poise',
      },
      {
        index: 2,
        badge: 'Confidence',
        title: 'Avoid "I am not 100% sure"',
        description: 'Replace apologetic uncertainty with exploratory trade-off dialogue.',
        stat: 'Confidence Index +35%',
      },
      {
        index: 3,
        badge: 'Efficiency',
        title: 'Fast-path to Optimal',
        description: 'Acknowledge brute force in 10 seconds, then spend 80% of time dissecting the dual heap.',
        stat: 'Time Allocation Refined',
      },
    ],
  },
];
