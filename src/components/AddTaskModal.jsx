import { X } from 'lucide-react'
import { CAT_ICONS } from '../constants.js'

const DIFF_OPTIONS = [
  { v: 1, l: 'Easy',   xp: 25 },
  { v: 2, l: 'Medium', xp: 50 },
  { v: 3, l: 'Hard',   xp: 75 },
]

const DURATION_OPTIONS = [
  { label: '5 min',  value: 5   },
  { label: '20 min', value: 20  },
  { label: '30 min', value: 30  },
  { label: '40 min', value: 40  },
  { label: '1 hr',   value: 60  },
  { label: '1h 30m', value: 90  },
  { label: '2 hrs',  value: 120 },
]

export default function AddTaskModal({
  theme, S,
  newName, setNewName,
  newCat, setNewCat,
  newDiff, setNewDiff,
  newDuration, setNewDuration,
  newStartTime, setNewStartTime,
  onAdd, onClose,
}) {
  const cats = Object.keys(CAT_ICONS)

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'flex-end',
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div style={{
        width: '100%', background: '#0f1020',
        borderRadius: '24px 24px 0 0',
        padding: '24px 20px 44px',
        border: `1px solid ${theme.p}30`,
        maxHeight: '92dvh', overflowY: 'auto',
      }}>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Syne', sans-serif" }}>
            New Task
          </span>
          <button onClick={onClose} aria-label="Close" style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={15} />
          </button>
        </div>

        {/* Name */}
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          placeholder="Task name..."
          autoFocus
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '13px 15px', color: '#f1f5f9', fontSize: 14, marginBottom: 18, outline: 'none', fontFamily: 'inherit' }}
        />

        {/* Category */}
        <div style={{ ...S.label, marginBottom: 8 }}>Category</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 18 }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setNewCat(c)} style={S.pill(newCat === c)}>
              {CAT_ICONS[c]} {c}
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div style={{ ...S.label, marginBottom: 8 }}>Difficulty</div>
        <div style={{ display: 'flex', gap: 9, marginBottom: 18 }}>
          {DIFF_OPTIONS.map((d) => (
            <button
              key={d.v}
              onClick={() => setNewDiff(d.v)}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 10,
                border: newDiff === d.v ? `1px solid ${theme.p}` : '1px solid rgba(255,255,255,0.08)',
                background: newDiff === d.v ? `${theme.p}20` : 'rgba(255,255,255,0.03)',
                color: newDiff === d.v ? theme.p : '#64748b',
                fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
              }}
            >
              <div>{d.l}</div>
              <div style={{ fontSize: 10, marginTop: 2, opacity: 0.7 }}>+{d.xp} XP</div>
            </button>
          ))}
        </div>

        {/* Duration */}
        <div style={{ ...S.label, marginBottom: 8 }}>Duration</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 18 }}>
          {DURATION_OPTIONS.map((d) => (
            <button
              key={d.value}
              onClick={() => setNewDuration(newDuration === d.value ? null : d.value)}
              style={{
                padding: '6px 12px', borderRadius: 999,
                border: newDuration === d.value ? `1px solid ${theme.p}` : '1px solid rgba(255,255,255,0.1)',
                background: newDuration === d.value ? `${theme.p}20` : 'rgba(255,255,255,0.04)',
                color: newDuration === d.value ? theme.p : '#94a3b8',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s',
                boxShadow: newDuration === d.value ? `0 0 8px ${theme.p}44` : 'none',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Start Time */}
        <div style={{ ...S.label, marginBottom: 8 }}>Start Time (optional)</div>
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="time"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                border: newStartTime ? `1px solid ${theme.p}` : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: '12px 15px',
                color: newStartTime ? theme.p : '#64748b',
                fontSize: 15, fontWeight: 700,
                outline: 'none', fontFamily: "'Space Mono', monospace",
                colorScheme: 'dark',
              }}
            />
            {newStartTime && (
              <button
                onClick={() => setNewStartTime('')}
                style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer', flexShrink: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>
          {newStartTime && (
            <div style={{ color: '#64748b', fontSize: 11, marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
              🔔 You'll get a notification at {formatTime(newStartTime)}
            </div>
          )}
        </div>

        <button onClick={onAdd} style={{ ...S.btn, width: '100%', padding: 15, fontSize: 15 }}>
          Add Task
        </button>
      </div>
    </div>
  )
}

function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}
