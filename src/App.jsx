import { useState, useEffect, useRef, useCallback } from 'react'
import { Home, CheckSquare, Timer, BarChart2, Gift, User, Trophy } from 'lucide-react'

import { THEMES, INIT_TASKS, SHOP_ITEMS, XP_PER_LEVEL, CAT_ICONS, getWeekKey } from './constants.js'
import { makeStyles } from './styles.js'

import HomeTab      from './components/HomeTab.jsx'
import TasksTab     from './components/TasksTab.jsx'
import FocusTab     from './components/FocusTab.jsx'
import StatsTab     from './components/StatsTab.jsx'
import RewardsTab   from './components/RewardsTab.jsx'
import ProfileTab   from './components/ProfileTab.jsx'
import TrophiesTab  from './components/TrophiesTab.jsx'
import AddTaskModal from './components/AddTaskModal.jsx'

const NAV = [
  { id: 'home',     Icon: Home,        label: 'Home'     },
  { id: 'tasks',    Icon: CheckSquare, label: 'Tasks'    },
  { id: 'focus',    Icon: Timer,       label: 'Focus'    },
  { id: 'trophies', Icon: Trophy,      label: 'Trophies' },
  { id: 'rewards',  Icon: Gift,        label: 'Shop'     },
  { id: 'profile',  Icon: User,        label: 'Profile'  },
]

const DEFAULT_DURATION = 25 * 60  // 25 minutes in seconds

export default function App() {
  // ── State ─────────────────────────────────────────────────────
  const [tab,       setTab]       = useState('home')
  const [tasks,     setTasks]     = useState(INIT_TASKS)
  const [user,      setUser]      = useState({ xp: 275, coins: 340, streak: 7, level: 3, totalXP: 1775 })
  const [themeName, setThemeName] = useState('cyan')
  const [shopItems, setShopItems] = useState(SHOP_ITEMS)

  const [trophies, setTrophies] = useState([
    { id: 9001, name: 'Drink 8 glasses of water',   cat: 'Health',       icon: '💧', xp: 30, coins: 8,  completedAt: Date.now() - 7200000,  weekKey: getWeekKey() },
    { id: 9002, name: 'No social media before noon', cat: 'Productivity', icon: '📵', xp: 60, coins: 15, completedAt: Date.now() - 18000000, weekKey: getWeekKey() },
  ])

  // UI overlays
  const [floatXP,     setFloatXP]     = useState(null)
  const [levelAnim,   setLevelAnim]   = useState(false)
  const [perfectAnim, setPerfectAnim] = useState(false)
  const [showAdd,     setShowAdd]     = useState(false)

  // Task filter + add-task form
  const [filterCat, setFilterCat] = useState('All')
  const [newName,   setNewName]   = useState('')
  const [newCat,    setNewCat]    = useState('Productivity')
  const [newDiff,   setNewDiff]   = useState(2)

  // Focus timer
  const [focusTask,     setFocusTask]     = useState(null)
  const [focusDuration, setFocusDuration] = useState(DEFAULT_DURATION)  // selected duration
  const [focusSecs,     setFocusSecs]     = useState(DEFAULT_DURATION)  // live countdown
  const [focusOn,       setFocusOn]       = useState(false)
  const [focusDone,     setFocusDone]     = useState(false)
  const timerRef = useRef(null)

  const theme = THEMES[themeName] || THEMES.cyan
  const S     = makeStyles(theme)

  // ── XP award ──────────────────────────────────────────────────
  const awardXP = useCallback((xp, coins) => {
    setUser((u) => {
      const nx = u.xp + xp
      if (nx >= XP_PER_LEVEL) {
        setLevelAnim(true)
        setTimeout(() => setLevelAnim(false), 2600)
        return { ...u, xp: nx - XP_PER_LEVEL, level: u.level + 1, coins: u.coins + coins, totalXP: u.totalXP + xp }
      }
      return { ...u, xp: nx, coins: u.coins + coins, totalXP: u.totalXP + xp }
    })
  }, [])

  // ── Focus timer tick ──────────────────────────────────────────
  useEffect(() => {
    if (!focusOn) { clearInterval(timerRef.current); return }
    timerRef.current = setInterval(() => {
      setFocusSecs((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current)
          setFocusOn(false)
          setFocusDone(true)
          awardXP(100, 25)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [focusOn, awardXP])

  // ── Duration change (only allowed when timer is stopped) ──────
  const handleDurationChange = (secs) => {
    if (focusOn) return
    setFocusDuration(secs)
    setFocusSecs(secs)
    setFocusDone(false)
  }

  // ── Reset focus ───────────────────────────────────────────────
  const resetFocus = () => {
    setFocusOn(false)
    setFocusSecs(focusDuration)   // reset to currently selected duration
    setFocusDone(false)
  }

  // ── Complete task ─────────────────────────────────────────────
  const completeTask = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (!task || task.done) return
    const newTasks = tasks.map((t) => t.id === id ? { ...t, done: true } : t)
    setTasks(newTasks)
    setTrophies((prev) => [{
      id: Date.now(), name: task.name, cat: task.cat, icon: task.icon,
      xp: task.xp, coins: task.coins,
      completedAt: Date.now(), weekKey: getWeekKey(),
    }, ...prev])
    setFloatXP({ xp: task.xp, coins: task.coins })
    setTimeout(() => setFloatXP(null), 1800)
    awardXP(task.xp, task.coins)
    const newDone = newTasks.filter((t) => t.done).length
    if (newDone === newTasks.length) {
      setTimeout(() => { setPerfectAnim(true); setTimeout(() => setPerfectAnim(false), 3000) }, 400)
    }
  }

  // ── Add task ──────────────────────────────────────────────────
  const addTask = () => {
    if (!newName.trim()) return
    const xpMap    = { 1: 25, 2: 50, 3: 75 }
    const coinsMap = { 1: 6,  2: 12, 3: 20 }
    setTasks((ts) => [...ts, {
      id: Date.now(), name: newName.trim(), cat: newCat,
      xp: xpMap[newDiff], coins: coinsMap[newDiff],
      diff: newDiff, done: false, icon: CAT_ICONS[newCat],
    }])
    setNewName('')
    setShowAdd(false)
  }

  // ── Buy shop item ─────────────────────────────────────────────
  const buyItem = (id) => {
    const item = shopItems.find((i) => i.id === id)
    if (!item || item.unlocked || user.coins < item.cost) return
    setShopItems((s) => s.map((i) => i.id === id ? { ...i, unlocked: true } : i))
    setUser((u) => ({ ...u, coins: u.coins - item.cost }))
  }

  // ── Tab render ────────────────────────────────────────────────
  const renderTab = () => {
    switch (tab) {
      case 'home':
        return <HomeTab tasks={tasks} user={user} theme={theme} S={S} onComplete={completeTask} onAddTask={() => setShowAdd(true)} />
      case 'tasks':
        return <TasksTab tasks={tasks} theme={theme} S={S} filterCat={filterCat} setFilterCat={setFilterCat} onComplete={completeTask} onAddTask={() => setShowAdd(true)} />
      case 'focus':
        return <FocusTab tasks={tasks} theme={theme} S={S}
          focusTask={focusTask} setFocusTask={setFocusTask}
          focusSecs={focusSecs} focusOn={focusOn} setFocusOn={setFocusOn}
          focusDone={focusDone} focusDuration={focusDuration}
          onDurationChange={handleDurationChange} resetFocus={resetFocus}
        />
      case 'trophies':
        return <TrophiesTab trophies={trophies} theme={theme} S={S} />
      case 'rewards':
        return <RewardsTab user={user} theme={theme} S={S} shopItems={shopItems} onBuy={buyItem} themeName={themeName} setThemeName={setThemeName} />
      case 'profile':
        return <ProfileTab user={user} theme={theme} themeName={themeName} setThemeName={setThemeName} S={S} />
      default:
        return null
    }
  }

  return (
    <>
      <style>{`
        body { background: ${theme.bg}; }
      `}</style>

      {/*
        Outer shell — no overflow:hidden so iOS rubber-band scrolling works correctly.
        Safe-area padding is handled inside the scroll container (top) and nav (bottom).
      */}
      <div style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100dvh',
        background: theme.bg,
        position: 'relative',
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}>

        {/* Ambient glow orbs */}
        <div style={{ position: 'fixed', top: -80, right: -80, width: 260, height: 260, background: `radial-gradient(circle,${theme.p}18,transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', bottom: 120, left: -80, width: 220, height: 220, background: `radial-gradient(circle,${theme.s}10,transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />

        {/*
          Scrollable content.
          paddingTop: safe-area-inset-top  →  clears the Dynamic Island / notch.
          WebkitOverflowScrolling: touch   →  smooth momentum scrolling on iOS.
          height: 100dvh                  →  uses the visual viewport height (correct on iOS Safari).
        */}
        <div
          key={tab}
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100dvh',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: 'env(safe-area-inset-top)',
            WebkitOverflowScrolling: 'touch',
            animation: 'fadeSlide 0.28s ease',
          }}
        >
          {renderTab()}
        </div>

        {/* Floating XP toast */}
        {floatXP && (
          <div style={{ position: 'fixed', top: '42%', left: '50%', transform: 'translateX(-50%)', zIndex: 200, animation: 'floatUp 1.8s ease-out forwards', pointerEvents: 'none', textAlign: 'center' }}>
            <div style={{ background: `linear-gradient(135deg,${theme.p},${theme.s})`, borderRadius: 12, padding: '10px 22px', boxShadow: `0 0 28px ${theme.glow}` }}>
              <div style={{ color: '#000', fontSize: 18, fontWeight: 900, fontFamily: "'Space Mono', monospace" }}>+{floatXP.xp} XP</div>
              <div style={{ color: '#00000077', fontSize: 11 }}>+{floatXP.coins} coins</div>
            </div>
          </div>
        )}

        {/* Level Up overlay */}
        {levelAnim && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', animation: 'levelUp 2.6s ease-out forwards' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 56, marginBottom: 10 }}>⚡</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: theme.p, textShadow: `0 0 30px ${theme.glow}`, fontFamily: "'Syne', sans-serif" }}>LEVEL UP!</div>
              <div style={{ color: '#94a3b8', fontSize: 15, marginTop: 8 }}>Level {user.level} reached</div>
            </div>
          </div>
        )}

        {/* Perfect Day banner */}
        {perfectAnim && (
          <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 250, animation: 'perfectIn 3s ease forwards', pointerEvents: 'none', width: 280 }}>
            <div style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', borderRadius: 16, padding: '18px 24px', textAlign: 'center', boxShadow: '0 0 40px rgba(245,158,11,0.5)' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🏆</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#000', fontFamily: "'Syne', sans-serif" }}>PERFECT DAY!</div>
              <div style={{ fontSize: 12, color: '#00000088', marginTop: 3 }}>All tasks complete · Bonus XP earned</div>
            </div>
          </div>
        )}

        {/* Add Task modal */}
        {showAdd && (
          <AddTaskModal
            theme={theme} S={S}
            newName={newName} setNewName={setNewName}
            newCat={newCat}   setNewCat={setNewCat}
            newDiff={newDiff} setNewDiff={setNewDiff}
            onAdd={addTask}   onClose={() => setShowAdd(false)}
          />
        )}

        {/*
          Bottom nav.
          paddingBottom: safe-area-inset-bottom  →  lifts nav above the iPhone home indicator.
          The tab content already has 110px bottom padding which clears the nav height + home indicator.
        */}
        <nav style={{
          position: 'fixed', bottom: 0,
          left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 430,
          background: 'rgba(6,6,16,0.94)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          zIndex: 100,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
          {NAV.map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-label={label}
              aria-current={tab === id ? 'page' : undefined}
              style={{
                flex: 1, padding: '9px 0 12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <Icon size={18} style={{ color: tab === id ? theme.p : '#475569', filter: tab === id ? `drop-shadow(0 0 6px ${theme.p})` : 'none', transition: 'all 0.2s' }} />
              <span style={{ fontSize: '8.5px', fontWeight: 600, color: tab === id ? theme.p : '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', transition: 'all 0.2s' }}>
                {label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
