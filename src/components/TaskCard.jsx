import { Check, Clock, Timer } from 'lucide-react'
import { DIFF_COLORS, DIFF_LABELS } from '../constants.js'

function formatDuration(mins) {
  if (!mins) return null
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

function formatTime(t) {
  if (!t) return null
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function TaskCard({ task, theme, S, onComplete }) {
  const diffCol   = DIFF_COLORS[task.diff]
  const diffLabel = DIFF_LABELS[task.diff]
  const duration  = formatDuration(task.duration)
  const startTime = formatTime(task.startTime)

  return (
    <div style={{ ...S.glass, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 11, opacity: task.done ? 0.55 : 1, transition: 'opacity 0.3s' }}>

      {/* Check circle */}
      <button
        onClick={onComplete}
        aria-label={task.done ? 'Task complete' : `Complete: ${task.name}`}
        style={{
          width: 34, height: 34, borderRadius: '50%',
          border: task.done ? `2px solid ${theme.p}` : '2px solid rgba(255,255,255,0.18)',
          background: task.done ? `${theme.p}20` : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: task.done ? 'default' : 'pointer', flexShrink: 0,
          transition: 'all 0.3s',
          boxShadow: task.done ? `0 0 10px ${theme.p}55` : 'none',
        }}
      >
        {task.done && <Check size={15} style={{ color: theme.p, animation: 'checkPop 0.3s ease' }} />}
      </button>

      <span style={{ fontSize: 20, flexShrink: 0 }}>{task.icon}</span>

      {/* Name + meta row */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: task.done ? '#64748b' : '#f1f5f9', fontSize: 13, fontWeight: 600, textDecoration: task.done ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {task.name}
        </div>

        {/* Tags row */}
        <div style={{ display: 'flex', gap: 5, marginTop: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, color: '#64748b', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4 }}>
            {task.cat}
          </span>
          <span style={{ fontSize: 10, color: diffCol }}>{diffLabel}</span>

          {duration && (
            <span style={{ fontSize: 10, color: '#64748b', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Timer size={9} /> {duration}
            </span>
          )}

          {startTime && (
            <span style={{ fontSize: 10, color: task.done ? '#475569' : theme.p, display: 'flex', alignItems: 'center', gap: 2, fontFamily: "'Space Mono', monospace" }}>
              <Clock size={9} /> {startTime}
            </span>
          )}
        </div>
      </div>

      {/* XP */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: task.done ? '#475569' : theme.p, fontFamily: "'Space Mono', monospace" }}>
          +{task.xp}
        </div>
        <div style={{ fontSize: 10, color: '#475569' }}>XP</div>
      </div>
    </div>
  )
}
