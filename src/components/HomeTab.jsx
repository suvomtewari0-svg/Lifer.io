import { Plus, Flame } from 'lucide-react'
import TaskCard from './TaskCard.jsx'
import { CHALLENGES, XP_PER_LEVEL, getRank } from '../constants.js'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function HomeTab({ tasks, user, username, avatar, theme, S, onComplete, onAddTask }) {
  const doneCount  = tasks.filter((t) => t.done).length
  const totalCount = tasks.length
  const pct        = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0
  const rank       = getRank(user.level)

  return (
    <div style={{ padding: '20px 16px 110px' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={S.label}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginTop: 3, fontFamily: "'Syne', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {greeting()}, <span style={S.neon}>{username}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 12 }}>
          {/* Avatar bubble */}
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${theme.p},${theme.s})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: `0 0 10px ${theme.glow}` }}>
            {avatar}
          </div>
          {/* Streak */}
          <div style={{ ...S.glass, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Flame size={15} style={{ color: '#ef4444', filter: 'drop-shadow(0 0 6px #ef4444)' }} />
            <span style={{ fontSize: 17, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Space Mono', monospace" }}>
              {user.streak}
            </span>
          </div>
        </div>
      </div>

      {/* ── XP / Level ── */}
      <div style={{ ...S.glowCard, padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg,${theme.p},${theme.s})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, boxShadow: `0 0 14px ${theme.glow}` }}>⚡</div>
            <div>
              <div style={{ ...S.label, marginBottom: 2 }}>Level {user.level}</div>
              <div style={{ color: rank.color, fontWeight: 700, fontSize: 14 }}>{rank.name}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#f59e0b', fontSize: 14, fontWeight: 700 }}>🪙 {user.coins}</div>
            <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{user.xp} / {XP_PER_LEVEL} XP</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 8, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(user.xp / XP_PER_LEVEL) * 100}%`, background: `linear-gradient(90deg,${theme.p},${theme.s})`, borderRadius: 999, boxShadow: `0 0 8px ${theme.glow}`, transition: 'width 0.7s cubic-bezier(.34,1.56,.64,1)' }} />
        </div>
      </div>

      {/* ── Daily Progress ── */}
      <div style={{ ...S.glass, padding: 16, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14 }}>Today's Progress</span>
          <span style={{ ...S.neon, fontWeight: 700, fontFamily: "'Space Mono', monospace", fontSize: 14 }}>
            {doneCount}/{totalCount}
          </span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 999, height: 10, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg,${theme.p},${theme.s})`, borderRadius: 999, boxShadow: `0 0 10px ${theme.glow}`, transition: 'width 0.8s cubic-bezier(.34,1.56,.64,1)' }} />
        </div>
        {pct === 100 && (
          <div style={{ marginTop: 10, textAlign: 'center', color: '#f59e0b', fontSize: 12, fontWeight: 700, letterSpacing: '1px' }}>
            ✦ PERFECT DAY ACHIEVED ✦
          </div>
        )}
      </div>

      {/* ── Quick Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 22 }}>
        {[
          { label: 'Streak', val: `${user.streak}d`, icon: '🔥' },
          { label: 'Level',  val: user.level,         icon: '⚡' },
          { label: 'Score',  val: `${pct}%`,          icon: '🎯' },
        ].map((s) => (
          <div key={s.label} style={{ ...S.glass, padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 18, marginBottom: 5 }}>{s.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Space Mono', monospace" }}>{s.val}</div>
            <div style={{ ...S.label, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Weekly Challenges ── */}
      <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16, fontFamily: "'Syne', sans-serif", marginBottom: 12 }}>
        Weekly Challenges
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
        {CHALLENGES.map((ch) => (
          <div key={ch.id} style={{ ...S.glass, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{ch.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 600 }}>{ch.name}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>+{ch.xp} XP reward</div>
              </div>
              <span style={{ ...S.neon, fontSize: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
                {ch.prog}/{ch.goal}
              </span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 999, height: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(ch.prog / ch.goal) * 100}%`, background: `linear-gradient(90deg,${theme.p},${theme.s})`, borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Today's Tasks ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16, fontFamily: "'Syne', sans-serif" }}>
          Today's Tasks
        </span>
        <button onClick={onAddTask} style={{ ...S.btn, padding: '6px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Plus size={12} /> Add
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {tasks.slice(0, 7).map((t) => (
          <TaskCard key={t.id} task={t} theme={theme} S={S} onComplete={() => onComplete(t.id)} />
        ))}
      </div>
    </div>
  )
}
