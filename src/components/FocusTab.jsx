const RADIUS = 88
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const DURATION_PRESETS = [
  { label: '5m',  secs: 5  * 60 },
  { label: '10m', secs: 10 * 60 },
  { label: '15m', secs: 15 * 60 },
  { label: '20m', secs: 20 * 60 },
  { label: '25m', secs: 25 * 60 },
  { label: '30m', secs: 30 * 60 },
  { label: '45m', secs: 45 * 60 },
  { label: '60m', secs: 60 * 60 },
]

export default function FocusTab({
  tasks, theme, S,
  focusTask, setFocusTask,
  focusSecs, focusOn, setFocusOn,
  focusDone, focusDuration,
  onDurationChange, resetFocus,
}) {
  const focusM    = Math.floor(focusSecs / 60)
  const focusS    = focusSecs % 60
  const focusProg = focusDuration > 0 ? 1 - focusSecs / focusDuration : 0
  const offset    = CIRCUMFERENCE - focusProg * CIRCUMFERENCE
  const durationLabel = DURATION_PRESETS.find(d => d.secs === focusDuration)?.label
    || `${Math.round(focusDuration / 60)}m`

  return (
    <div style={{ padding: '20px 16px 110px' }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 5, fontFamily: "'Syne', sans-serif" }}>
        Focus Mode
      </div>
      <div style={{ color: '#64748b', fontSize: 13, marginBottom: 22 }}>
        Deep work. Bonus XP. Zero distractions.
      </div>

      {/* ── Duration picker ── */}
      <div style={{ ...S.glass, padding: 16, marginBottom: 16 }}>
        <div style={{ ...S.label, marginBottom: 10 }}>Session duration</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {DURATION_PRESETS.map((d) => {
            const active = focusDuration === d.secs
            return (
              <button
                key={d.secs}
                onClick={() => !focusOn && onDurationChange(d.secs)}
                disabled={focusOn}
                style={{
                  padding: '7px 14px',
                  borderRadius: 999,
                  border: active ? `1px solid ${theme.p}` : '1px solid rgba(255,255,255,0.1)',
                  background: active ? `${theme.p}22` : 'rgba(255,255,255,0.04)',
                  color: active ? theme.p : '#94a3b8',
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "'Space Mono', monospace",
                  cursor: focusOn ? 'default' : 'pointer',
                  opacity: focusOn && !active ? 0.4 : 1,
                  transition: 'all 0.18s',
                  boxShadow: active ? `0 0 10px ${theme.p}44` : 'none',
                }}
              >
                {d.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Task selector ── */}
      <div style={{ ...S.glass, padding: 16, marginBottom: 20 }}>
        <div style={{ ...S.label, marginBottom: 10 }}>Focusing on</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tasks.filter((t) => !t.done).slice(0, 4).map((t) => (
            <button
              key={t.id}
              onClick={() => !focusOn && setFocusTask(t)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10,
                border: focusTask?.id === t.id ? `1px solid ${theme.p}` : '1px solid rgba(255,255,255,0.06)',
                background: focusTask?.id === t.id ? `${theme.p}15` : 'rgba(255,255,255,0.03)',
                cursor: focusOn ? 'default' : 'pointer',
                textAlign: 'left', transition: 'all 0.2s', width: '100%',
              }}
            >
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              <span style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 500, flex: 1 }}>{t.name}</span>
              {focusTask?.id === t.id && <span style={{ color: theme.p, fontSize: 12 }}>✓</span>}
            </button>
          ))}
          {tasks.filter((t) => !t.done).length === 0 && (
            <div style={{ textAlign: 'center', color: '#475569', fontSize: 13, padding: 12 }}>
              All tasks complete! 🎉
            </div>
          )}
        </div>
      </div>

      {/* ── Timer ring ── */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
        <div style={{ position: 'relative', width: 212, height: 212 }}>
          <svg width="212" height="212" style={{ transform: 'rotate(-90deg)' }} aria-hidden="true">
            <circle cx="106" cy="106" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
            <circle cx="106" cy="106" r={RADIUS} fill="none" stroke={theme.p} strokeWidth="7"
              strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset} strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 8px ${theme.p})`, transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: "'Space Mono', monospace", ...S.neon, lineHeight: 1 }}>
              {String(focusM).padStart(2, '0')}:{String(focusS).padStart(2, '0')}
            </div>
            <div style={{ color: '#64748b', fontSize: 11, marginTop: 5, letterSpacing: '1px' }}>
              {focusOn ? 'RUNNING' : focusDone ? 'COMPLETE' : 'READY'}
            </div>
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      {focusDone ? (
        <div style={{ ...S.glowCard, padding: 20, marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 30, marginBottom: 8 }}>🏆</div>
          <div style={{ color: '#f59e0b', fontSize: 17, fontWeight: 800, marginBottom: 4 }}>Session Complete!</div>
          <div style={{ color: '#94a3b8', fontSize: 12 }}>+100 XP · +25 Coins bonus earned</div>
          <button onClick={resetFocus} style={{ ...S.btn, padding: '10px 24px', marginTop: 14 }}>
            New Session
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <button
            onClick={() => setFocusOn((r) => !r)}
            disabled={!focusTask}
            style={{ ...S.btn, flex: 2, padding: 15, fontSize: 15, opacity: focusTask ? 1 : 0.35 }}
          >
            {focusOn ? '⏸ Pause' : '▶ Start Focus'}
          </button>
          <button onClick={resetFocus} style={{ ...S.ghost, flex: 1, padding: 15, fontSize: 13 }}>
            Reset
          </button>
        </div>
      )}

      {/* ── Info strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { val: '+100',        sub: 'BONUS XP', col: theme.p   },
          { val: durationLabel, sub: 'SESSION',  col: '#22c55e' },
          { val: '🎵',          sub: 'LO-FI',    col: '#f1f5f9' },
        ].map((s) => (
          <div key={s.sub} style={{ ...S.glass, padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: s.col, fontFamily: "'Space Mono', monospace" }}>{s.val}</div>
            <div style={{ ...S.label, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
