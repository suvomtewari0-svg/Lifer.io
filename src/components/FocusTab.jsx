const RADIUS = 88
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function FocusTab({
  tasks,
  theme,
  S,
  focusTask,
  setFocusTask,
  focusSecs,
  focusOn,
  setFocusOn,
  focusDone,
  resetFocus,
}) {
  const focusM    = Math.floor(focusSecs / 60)
  const focusS    = focusSecs % 60
  const focusProg = 1 - focusSecs / (25 * 60)
  const offset    = CIRCUMFERENCE - focusProg * CIRCUMFERENCE

  return (
    <div style={{ padding: '20px 16px 110px' }}>
      <div
        style={{
          fontSize: '22px',
          fontWeight: '800',
          color: '#f1f5f9',
          marginBottom: '5px',
          fontFamily: "'Syne', sans-serif",
        }}
      >
        Focus Mode
      </div>
      <div
        style={{ color: '#64748b', fontSize: '13px', marginBottom: '22px' }}
      >
        Deep work. Bonus XP. Zero distractions.
      </div>

      {/* Task selector */}
      <div style={{ ...S.glass, padding: '16px', marginBottom: '20px' }}>
        <div style={{ ...S.label, marginBottom: '10px' }}>Focusing on</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tasks
            .filter((t) => !t.done)
            .slice(0, 5)
            .map((t) => (
              <button
                key={t.id}
                onClick={() => !focusOn && setFocusTask(t)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border:
                    focusTask?.id === t.id
                      ? `1px solid ${theme.p}`
                      : '1px solid rgba(255,255,255,0.06)',
                  background:
                    focusTask?.id === t.id
                      ? `${theme.p}15`
                      : 'rgba(255,255,255,0.03)',
                  cursor: focusOn ? 'default' : 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: '18px' }}>{t.icon}</span>
                <span
                  style={{
                    color: '#f1f5f9',
                    fontSize: '13px',
                    fontWeight: '500',
                    flex: 1,
                  }}
                >
                  {t.name}
                </span>
                {focusTask?.id === t.id && (
                  <span style={{ color: theme.p, fontSize: '12px' }}>✓</span>
                )}
              </button>
            ))}
          {tasks.filter((t) => !t.done).length === 0 && (
            <div
              style={{
                textAlign: 'center',
                color: '#475569',
                fontSize: '13px',
                padding: '12px',
              }}
            >
              All tasks complete! 🎉
            </div>
          )}
        </div>
      </div>

      {/* Timer Ring */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '22px',
        }}
      >
        <div style={{ position: 'relative', width: '212px', height: '212px' }}>
          <svg
            width="212"
            height="212"
            style={{ transform: 'rotate(-90deg)' }}
            aria-hidden="true"
          >
            <circle
              cx="106"
              cy="106"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="7"
            />
            <circle
              cx="106"
              cy="106"
              r={RADIUS}
              fill="none"
              stroke={theme.p}
              strokeWidth="7"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{
                filter: `drop-shadow(0 0 8px ${theme.p})`,
                transition: 'stroke-dashoffset 0.5s ease',
              }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '40px',
                fontWeight: '800',
                fontFamily: "'Space Mono', monospace",
                ...S.neon,
                lineHeight: 1,
              }}
            >
              {String(focusM).padStart(2, '0')}:{String(focusS).padStart(2, '0')}
            </div>
            <div
              style={{
                color: '#64748b',
                fontSize: '11px',
                marginTop: '5px',
                letterSpacing: '1px',
              }}
            >
              {focusOn ? 'RUNNING' : focusDone ? 'COMPLETE' : 'READY'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {focusDone ? (
        <div
          style={{
            ...S.glowCard,
            padding: '20px',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '30px', marginBottom: '8px' }}>🏆</div>
          <div
            style={{
              color: '#f59e0b',
              fontSize: '17px',
              fontWeight: '800',
              marginBottom: '4px',
            }}
          >
            Session Complete!
          </div>
          <div style={{ color: '#94a3b8', fontSize: '12px' }}>
            +100 XP · +25 Coins bonus earned
          </div>
          <button
            onClick={resetFocus}
            style={{ ...S.btn, padding: '10px 24px', marginTop: '14px' }}
          >
            New Session
          </button>
        </div>
      ) : (
        <div
          style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}
        >
          <button
            onClick={() => setFocusOn((r) => !r)}
            disabled={!focusTask}
            style={{
              ...S.btn,
              flex: 2,
              padding: '15px',
              fontSize: '15px',
              opacity: focusTask ? 1 : 0.35,
            }}
          >
            {focusOn ? '⏸ Pause' : '▶ Start Focus'}
          </button>
          <button
            onClick={resetFocus}
            style={{
              ...S.ghost,
              flex: 1,
              padding: '15px',
              fontSize: '13px',
            }}
          >
            Reset
          </button>
        </div>
      )}

      {/* Info strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '10px',
        }}
      >
        {[
          { val: '+100', sub: 'BONUS XP',  col: theme.p     },
          { val: '25m',  sub: 'SESSION',   col: '#22c55e'   },
          { val: '🎵',   sub: 'LO-FI',     col: '#f1f5f9'   },
        ].map((s) => (
          <div
            key={s.sub}
            style={{ ...S.glass, padding: '14px', textAlign: 'center' }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: '800',
                color: s.col,
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {s.val}
            </div>
            <div style={{ ...S.label, marginTop: '4px' }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
