// ── Theme definitions ──────────────────────────────────────────
export const THEMES = {
  cyan: {
    p: '#00e5ff', s: '#0891b2',
    glow: 'rgba(0,229,255,0.25)',
    bg: '#060610', card: '#0d0d1f',
    label: 'Cyber Cyan',
  },
  violet: {
    p: '#a855f7', s: '#7c3aed',
    glow: 'rgba(168,85,247,0.25)',
    bg: '#08060f', card: '#100d1a',
    label: 'Void',
  },
  green: {
    p: '#22c55e', s: '#16a34a',
    glow: 'rgba(34,197,94,0.25)',
    bg: '#060f08', card: '#0b1410',
    label: 'Forest',
  },
  gold: {
    p: '#f59e0b', s: '#d97706',
    glow: 'rgba(245,158,11,0.25)',
    bg: '#0f0b05', card: '#1a1205',
    label: 'Legendary',
  },
  rose: {
    p: '#f43f5e', s: '#e11d48',
    glow: 'rgba(244,63,94,0.25)',
    bg: '#0f0608', card: '#1a0c10',
    label: 'Rose',
  },
}

// ── Rank tiers ─────────────────────────────────────────────────
export const RANKS = [
  { name: 'Novice',      color: '#64748b', minLv: 1  },
  { name: 'Disciplined', color: '#22c55e', minLv: 5  },
  { name: 'Focused',     color: '#3b82f6', minLv: 10 },
  { name: 'Elite',       color: '#a855f7', minLv: 20 },
  { name: 'Legendary',   color: '#f59e0b', minLv: 30 },
]

export const XP_PER_LEVEL = 500

export const getRank = (level) =>
  [...RANKS].reverse().find((r) => level >= r.minLv) || RANKS[0]

// ── Category meta ──────────────────────────────────────────────
export const CATS = ['All', 'Fitness', 'Health', 'School', 'Productivity', 'Mindfulness']

export const CAT_ICONS = {
  Fitness:     '💪',
  Health:      '❤️',
  School:      '📚',
  Productivity:'⚡',
  Mindfulness: '🧘',
}

export const CAT_COLORS = {
  Fitness:     '#ef4444',
  Health:      '#22c55e',
  School:      '#3b82f6',
  Productivity:'#f59e0b',
  Mindfulness: '#a855f7',
}

// ── Default tasks ──────────────────────────────────────────────
export const INIT_TASKS = [
  { id: 1,  name: 'Make your bed',              cat: 'Health',       xp: 20, coins: 5,  diff: 1, done: false, icon: '🛏️' },
  { id: 2,  name: 'Go to the gym',              cat: 'Fitness',      xp: 80, coins: 20, diff: 3, done: false, icon: '💪' },
  { id: 3,  name: 'Drink 8 glasses of water',   cat: 'Health',       xp: 30, coins: 8,  diff: 1, done: true,  icon: '💧' },
  { id: 4,  name: 'Read for 20 minutes',         cat: 'Mindfulness',  xp: 40, coins: 10, diff: 2, done: false, icon: '📖' },
  { id: 5,  name: 'Meditate',                   cat: 'Mindfulness',  xp: 50, coins: 12, diff: 2, done: false, icon: '🧘' },
  { id: 6,  name: 'Go for a walk outside',      cat: 'Fitness',      xp: 40, coins: 10, diff: 1, done: false, icon: '🚶' },
  { id: 7,  name: 'Study for 1 hour',           cat: 'School',       xp: 70, coins: 18, diff: 3, done: false, icon: '📚' },
  { id: 8,  name: 'No social media before noon', cat: 'Productivity', xp: 60, coins: 15, diff: 3, done: true,  icon: '📵' },
  { id: 9,  name: 'Sleep before midnight',       cat: 'Health',       xp: 50, coins: 12, diff: 2, done: false, icon: '🌙' },
  { id: 10, name: "Plan tomorrow's tasks",       cat: 'Productivity', xp: 35, coins: 9,  diff: 1, done: false, icon: '📋' },
]

// ── Shop items ─────────────────────────────────────────────────
export const SHOP_ITEMS = [
  { id: 'b_fire',   name: 'Fire Starter',  type: 'badge',  cost: 150, desc: '7-day streak badge', icon: '🔥', unlocked: false },
  { id: 'b_elite',  name: 'Elite Badge',   type: 'badge',  cost: 300, desc: 'Show your rank',     icon: '⚡', unlocked: false },
  { id: 'b_scholar',name: 'Scholar',       type: 'badge',  cost: 200, desc: '10 study tasks',     icon: '🎓', unlocked: false },
  { id: 'a_robot',  name: 'Cyber Avatar',  type: 'avatar', cost: 400, desc: 'Futuristic style',   icon: '🤖', unlocked: false },
  { id: 'a_ninja',  name: 'Ninja Avatar',  type: 'avatar', cost: 300, desc: 'Stealth mode',       icon: '🥷', unlocked: false },
  { id: 'a_wizard', name: 'Wizard Avatar', type: 'avatar', cost: 500, desc: 'Ancient wisdom',     icon: '🧙', unlocked: false },
]

// ── Achievements ───────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { id: 1, name: 'First Step',   desc: 'Complete your first task', icon: '👟', done: true  },
  { id: 2, name: 'On Fire',      desc: '7-day streak',             icon: '🔥', done: true  },
  { id: 3, name: 'Scholar',      desc: '10 study tasks done',      icon: '🎓', done: false },
  { id: 4, name: 'Iron Will',    desc: '30-day streak',            icon: '⚔️', done: false },
  { id: 5, name: 'Perfect Week', desc: '100% complete for 7 days', icon: '💎', done: false },
  { id: 6, name: 'Legendary',    desc: 'Reach level 30',           icon: '👑', done: false },
]

// ── Weekly challenges ──────────────────────────────────────────
export const CHALLENGES = [
  { id: 1, name: '3-Day Focus Streak',  icon: '🎯', prog: 2, goal: 3, xp: 150 },
  { id: 2, name: 'Fitness Week',        icon: '🏋️', prog: 4, goal: 7, xp: 300 },
  { id: 3, name: 'Mind & Body Balance', icon: '🌿', prog: 1, goal: 5, xp: 200 },
]

// ── Stats chart data ───────────────────────────────────────────
export const WEEKLY_DATA = [
  { day: 'Mon', t: 7 },
  { day: 'Tue', t: 5 },
  { day: 'Wed', t: 8 },
  { day: 'Thu', t: 6 },
  { day: 'Fri', t: 4 },
  { day: 'Sat', t: 7 },
  { day: 'Sun', t: 3 },
]

// ── Difficulty helpers ─────────────────────────────────────────
export const DIFF_COLORS = ['', '#22c55e', '#f59e0b', '#ef4444']
export const DIFF_LABELS = ['', 'Easy',    'Medium',  'Hard']

// ── Week helpers (used by TrophiesTab) ────────────────────────
export function getWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}
