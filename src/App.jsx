import { useState, useEffect, useRef, useCallback } from 'react'
import { Home, CheckSquare, Timer, Gift, User, Trophy } from 'lucide-react'

import { THEMES, INIT_TASKS, SHOP_ITEMS, XP_PER_LEVEL, CAT_ICONS, getWeekKey } from './constants.js'
import { makeStyles } from './styles.js'

import HomeTab          from './components/HomeTab.jsx'
import TasksTab         from './components/TasksTab.jsx'
import FocusTab         from './components/FocusTab.jsx'
import StatsTab         from './components/StatsTab.jsx'
import RewardsTab       from './components/RewardsTab.jsx'
import ProfileTab       from './components/ProfileTab.jsx'
import TrophiesTab      from './components/TrophiesTab.jsx'
import AddTaskModal     from './components/AddTaskModal.jsx'
import EditProfileModal from './components/EditProfileModal.jsx'

// ── helpers ───────────────────────────────────────────────────
function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

function msUntilTime(timeStr) {
  if (!timeStr) return -1
  const [h, m] = timeStr.split(':').map(Number)
  const now    = new Date()
  const target = new Date()
  target.setHours(h, m, 0, 0)
  const diff = target - now
  return diff > 0 ? diff : -1   // -1 means time already passed today
}

async function requestNotificationPermission() {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

function scheduleNotification(task) {
  if (!task.startTime || task.done) return null
  const ms = msUntilTime(task.startTime)
  if (ms < 0) return null
  return setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification('Lifer ⚡ — Time to start!', {
        body: task.name,
        icon: '/favicon.svg',
        badge: '/favicon.svg',
      })
    }
  }, ms)
}

const NAV = [
  { id: 'home',     Icon: Home,        label: 'Home'     },
  { id: 'tasks',    Icon: CheckSquare, label: 'Tasks'    },
  { id: 'focus',    Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: 'Focus' },
  { id: 'trophies', Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>, label: 'Trophies' },
  { id: 'rewards',  Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>, label: 'Shop' },
  { id: 'profile',  Icon: User,        label: 'Profile'  },
]

const DEFAULT_DURATION = 25 * 60

export default function App() {
  // ── Persisted state (loaded from localStorage on mount) ───────
  const [username,   setUsername]   = useState(() => load('lifer_username', 'Hero'))
  const [avatar,     setAvatar]     = useState(() => load('lifer_avatar',   '⚡'))
  const [profilePic, setProfilePic] = useState(() => load('lifer_profilePic', null))
  const [themeName,  setThemeName]  = useState(() => load('lifer_theme',    'cyan'))
  const [user,       setUser]       = useState(() => load('lifer_user',     { xp: 275, coins: 340, streak: 7, level: 3, totalXP: 1775 }))
  const [tasks,      setTasks]      = useState(() => load('lifer_tasks',    INIT_TASKS))
  const [trophies,   setTrophies]   = useState(() => load('lifer_trophies', [
    { id: 9001, name: 'Drink 8 glasses of water',   cat: 'Health',       icon: '💧', xp: 30, coins: 8,  completedAt: Date.now() - 7200000,  weekKey: getWeekKey() },
    { id: 9002, name: 'No social media before noon', cat: 'Productivity', icon: '📵', xp: 60, coins: 15, completedAt: Date.now() - 18000000, weekKey: getWeekKey() },
  ]))
  const [shopItems,  setShopItems]  = useState(() => load('lifer_shopItems', SHOP_ITEMS))

  // ── Persist to localStorage whenever state changes ─────────────
  useEffect(() => { save('lifer_username',   username)   }, [username])
  useEffect(() => { save('lifer_avatar',     avatar)     }, [avatar])
  useEffect(() => { save('lifer_profilePic', profilePic) }, [profilePic])
  useEffect(() => { save('lifer_theme',      themeName)  }, [themeName])
  useEffect(() => { save('lifer_user',       user)       }, [user])
  useEffect(() => { save('lifer_tasks',      tasks)      }, [tasks])
  useEffect(() => { save('lifer_trophies',   trophies)   }, [trophies])
  useEffect(() => { save('lifer_shopItems',  shopItems)  }, [shopItems])

  // ── Schedule notifications for all tasks with future times ────
  // Runs on mount and whenever tasks change
  const notifTimers = useRef({})
  useEffect(() => {
    // Clear old timers
    Object.values(notifTimers.current).forEach(clearTimeout)
    notifTimers.current = {}
    // Re-schedule
    tasks.forEach(task => {
      if (task.startTime && !task.done) {
        const id = scheduleNotification(task)
        if (id) notifTimers.current[task.id] = id
      }
    })
    return () => Object.values(notifTimers.current).forEach(clearTimeout)
  }, [tasks])

  // ── UI state ───────────────────────────────────────────────────
  const [tab,             setTab]             = useState('home')
  const [showAdd,         setShowAdd]         = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [floatXP,         setFloatXP]         = useState(null)
  const [levelAnim,       setLevelAnim]       = useState(false)
  const [perfectAnim,     setPerfectAnim]     = useState(false)

  // Add-task form
  const [filterCat,    setFilterCat]    = useState('All')
  const [newName,      setNewName]      = useState('')
  const [newCat,       setNewCat]       = useState('Productivity')
  const [newDiff,      setNewDiff]      = useState(2)
  const [newDuration,  setNewDuration]  = useState(null)
  const [newStartTime, setNewStartTime] = useState('')

  // Focus timer
  const [focusTask,     setFocusTask]     = useState(null)
  const [focusDuration, setFocusDuration] = useState(DEFAULT_DURATION)
  const [focusSecs,     setFocusSecs]     = useState(DEFAULT_DURATION)
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

  // ── Focus timer ───────────────────────────────────────────────
  useEffect(() => {
    if (!focusOn) { clearInterval(timerRef.current); return }
    timerRef.current = setInterval(() => {
      setFocusSecs((s) => {
        if (s <= 1) { clearInterval(timerRef.current); setFocusOn(false); setFocusDone(true); awardXP(100, 25); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [focusOn, awardXP])

  const handleDurationChange = (secs) => {
    if (focusOn) return
    setFocusDuration(secs); setFocusSecs(secs); setFocusDone(false)
  }
  const resetFocus = () => { setFocusOn(false); setFocusSecs(focusDuration); setFocusDone(false) }

  // ── Complete task ─────────────────────────────────────────────
  const completeTask = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (!task || task.done) return
    const newTasks = tasks.map((t) => t.id === id ? { ...t, done: true } : t)
    setTasks(newTasks)
    setTrophies((prev) => [{ id: Date.now(), name: task.name, cat: task.cat, icon: task.icon, xp: task.xp, coins: task.coins, completedAt: Date.now(), weekKey: getWeekKey() }, ...prev])
    setFloatXP({ xp: task.xp, coins: task.coins })
    setTimeout(() => setFloatXP(null), 1800)
    awardXP(task.xp, task.coins)
    const newDone = newTasks.filter((t) => t.done).length
    if (newDone === newTasks.length) {
      setTimeout(() => { setPerfectAnim(true); setTimeout(() => setPerfectAnim(false), 3000) }, 400)
    }
  }

  // ── Add task ──────────────────────────────────────────────────
  const addTask = async () => {
    if (!newName.trim()) return
    const xpMap = { 1: 25, 2: 50, 3: 75 }
    const coinsMap = { 1: 6, 2: 12, 3: 20 }
    const task = {
      id: Date.now(), name: newName.trim(), cat: newCat,
      xp: xpMap[newDiff], coins: coinsMap[newDiff],
      diff: newDiff, done: false, icon: CAT_ICONS[newCat],
      duration: newDuration || null,
      startTime: newStartTime || null,
    }
    // Request notification permission if a start time was set
    if (newStartTime) await requestNotificationPermission()
    setTasks((ts) => [...ts, task])
    setNewName(''); setNewDuration(null); setNewStartTime(''); setShowAdd(false)
  }

  // ── Buy item ──────────────────────────────────────────────────
  const buyItem = (id) => {
    const item = shopItems.find((i) => i.id === id)
    if (!item || item.unlocked || user.coins < item.cost) return
    setShopItems((s) => s.map((i) => i.id === id ? { ...i, unlocked: true } : i))
    setUser((u) => ({ ...u, coins: u.coins - item.cost }))
  }

  // ── Save profile ──────────────────────────────────────────────
  const saveProfile = (name, emoji, pic) => {
    setUsername(name); setAvatar(emoji); setProfilePic(pic)
  }

  // ── Tab render ────────────────────────────────────────────────
  const renderTab = () => {
    switch (tab) {
      case 'home':     return <HomeTab tasks={tasks} user={user} username={username} avatar={avatar} profilePic={profilePic} theme={theme} S={S} onComplete={completeTask} onAddTask={() => setShowAdd(true)} />
      case 'tasks':    return <TasksTab tasks={tasks} theme={theme} S={S} filterCat={filterCat} setFilterCat={setFilterCat} onComplete={completeTask} onAddTask={() => setShowAdd(true)} />
      case 'focus':    return <FocusTab tasks={tasks} theme={theme} S={S} focusTask={focusTask} setFocusTask={setFocusTask} focusSecs={focusSecs} focusOn={focusOn} setFocusOn={setFocusOn} focusDone={focusDone} focusDuration={focusDuration} onDurationChange={handleDurationChange} resetFocus={resetFocus} />
      case 'trophies': return <TrophiesTab trophies={trophies} theme={theme} S={S} />
      case 'rewards':  return <RewardsTab user={user} theme={theme} S={S} shopItems={shopItems} onBuy={buyItem} themeName={themeName} setThemeName={setThemeName} />
      case 'profile':  return <ProfileTab user={user} username={username} avatar={avatar} profilePic={profilePic} theme={theme} themeName={themeName} setThemeName={setThemeName} S={S} onEditProfile={() => setShowEditProfile(true)} />
      default:         return null
    }
  }

  return (
    <>
      <style>{`body { background: ${theme.bg}; }`}</style>

      <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100dvh', background: theme.bg, position: 'relative', fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>

        <div style={{ position: 'fixed', top: -80, right: -80, width: 260, height: 260, background: `radial-gradient(circle,${theme.p}18,transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', bottom: 120, left: -80, width: 220, height: 220, background: `radial-gradient(circle,${theme.s}10,transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />

        <div key={tab} style={{ position: 'relative', zIndex: 1, height: '100dvh', overflowY: 'auto', overflowX: 'hidden', paddingTop: 'env(safe-area-inset-top)', WebkitOverflowScrolling: 'touch', animation: 'fadeSlide 0.28s ease' }}>
          {renderTab()}
        </div>

        {/* Floating XP */}
        {floatXP && (
          <div style={{ position: 'fixed', top: '42%', left: '50%', transform: 'translateX(-50%)', zIndex: 200, animation: 'floatUp 1.8s ease-out forwards', pointerEvents: 'none', textAlign: 'center' }}>
            <div style={{ background: `linear-gradient(135deg,${theme.p},${theme.s})`, borderRadius: 12, padding: '10px 22px', boxShadow: `0 0 28px ${theme.glow}` }}>
              <div style={{ color: '#000', fontSize: 18, fontWeight: 900, fontFamily: "'Space Mono', monospace" }}>+{floatXP.xp} XP</div>
              <div style={{ color: '#00000077', fontSize: 11 }}>+{floatXP.coins} coins</div>
            </div>
          </div>
        )}

        {/* Level Up */}
        {levelAnim && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', animation: 'levelUp 2.6s ease-out forwards' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg,${theme.p},${theme.s})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 12px', overflow: 'hidden', boxShadow: `0 0 28px ${theme.glow}` }}>
                {profilePic ? <img src={profilePic} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : avatar}
              </div>
              <div style={{ fontSize: 34, fontWeight: 900, color: theme.p, textShadow: `0 0 30px ${theme.glow}`, fontFamily: "'Syne', sans-serif" }}>LEVEL UP!</div>
              <div style={{ color: '#94a3b8', fontSize: 15, marginTop: 8 }}>Level {user.level} reached</div>
            </div>
          </div>
        )}

        {/* Perfect Day */}
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
            newName={newName}           setNewName={setNewName}
            newCat={newCat}             setNewCat={setNewCat}
            newDiff={newDiff}           setNewDiff={setNewDiff}
            newDuration={newDuration}   setNewDuration={setNewDuration}
            newStartTime={newStartTime} setNewStartTime={setNewStartTime}
            onAdd={addTask} onClose={() => setShowAdd(false)}
          />
        )}

        {/* Edit Profile modal */}
        {showEditProfile && (
          <EditProfileModal
            theme={theme} S={S}
            username={username} avatar={avatar} profilePic={profilePic}
            onSave={saveProfile} onClose={() => setShowEditProfile(false)}
          />
        )}

        {/* Bottom nav */}
        <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: 'rgba(6,6,16,0.94)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', zIndex: 100, paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {NAV.map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setTab(id)} aria-label={label} aria-current={tab === id ? 'page' : undefined} style={{ flex: 1, padding: '9px 0 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer' }}>
              <span style={{ color: tab === id ? theme.p : '#475569', filter: tab === id ? `drop-shadow(0 0 6px ${theme.p})` : 'none', transition: 'all 0.2s', display: 'flex' }}>
                <Icon size={18} />
              </span>
              <span style={{ fontSize: '8.5px', fontWeight: 600, color: tab === id ? theme.p : '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', transition: 'all 0.2s' }}>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
