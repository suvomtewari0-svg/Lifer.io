import { Lock } from 'lucide-react'
import { RANKS, THEMES, XP_PER_LEVEL, getRank } from '../constants.js'

export default function ProfileTab({ user, theme, themeName, setThemeName, S }) {
  const rank = getRank(user.level)

  return (
    <div style={{ padding: '20px 16px 110px' }}>

      {/* Avatar */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg,${theme.p},${theme.s})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 12px', boxShadow: `0 0 28px ${theme.glow}` }}>
          ⚡
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Syne', sans-serif" }}>Hero</div>
        <div style={{ color: rank.color, fontSize: 13, fontWeight: 700, marginTop: 4 }}>
          {rank.name} · Level {user.level}
        </div>
      </div>

      {/* Theme switcher */}
      <div style={{ ...S.glass, padding: 16, marginBottom: 14 }}>
        <div style={{ ...S.label, marginBottom: 12 }}>Active Theme</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {Object.entries(THEMES).map(([name, t]) => (
            <button
              key={name}
              onClick={() => setThemeName(name)}
              title={t.label}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                background: t.p,
                border: themeName === name ? '3px solid #ffffff' : '3px solid transparent',
                cursor: 'pointer',
                boxShadow: themeName === name ? `0 0 14px ${t.p}` : 'none',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'Total XP', val: user.totalXP.toLocaleString(), col: theme.p    },
          { label: 'Streak',   val: `${user.streak}d`,             col: '#ef4444' },
          { label: 'Level',    val: user.level,                    col: rank.color },
          { label: 'Coins',    val: user.coins,                    col: '#f59e0b' },
        ].map((s) => (
          <div key={s.label} style={{ ...S.glass, padding: 15 }}>
            <div style={{ fontSize: 19, fontWeight: 800, color: s.col, fontFamily: "'Space Mono', monospace" }}>{s.val}</div>
            <div style={{ ...S.label, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* XP bar */}
      <div style={{ ...S.glass, padding: 16, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={S.label}>Level Progress</span>
          <span style={{ color: theme.p, fontSize: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
            {user.xp} / {XP_PER_LEVEL} XP
          </span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 8, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(user.xp / XP_PER_LEVEL) * 100}%`, background: `linear-gradient(90deg,${theme.p},${theme.s})`, borderRadius: 999, boxShadow: `0 0 8px ${theme.glow}`, transition: 'width 0.7s cubic-bezier(.34,1.56,.64,1)' }} />
        </div>
      </div>

      {/* Rank Journey */}
      <div style={{ ...S.glowCard, padding: 18 }}>
        <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Rank Journey</div>
        {RANKS.map((r, i) => {
          const achieved = user.level >= r.minLv
          const current  = achieved && (i === RANKS.length - 1 || user.level < RANKS[i + 1].minLv)
          return (
            <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, opacity: achieved ? 1 : 0.35 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: achieved ? r.color : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, boxShadow: current ? `0 0 12px ${r.color}` : 'none' }}>
                {achieved ? '✓' : <Lock size={12} color="#475569" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: current ? r.color : '#94a3b8', fontSize: 13, fontWeight: current ? 700 : 500 }}>{r.name}</div>
                <div style={{ color: '#475569', fontSize: 11 }}>From Level {r.minLv}</div>
              </div>
              {current && <div style={{ fontSize: 10, color: r.color, fontWeight: 700, letterSpacing: '0.5px' }}>CURRENT</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
