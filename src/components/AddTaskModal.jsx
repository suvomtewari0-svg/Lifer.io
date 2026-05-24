import { X } from 'lucide-react'
import { CAT_ICONS } from '../constants.js'

const DIFF_OPTIONS = [
  { v: 1, l: 'Easy',   xp: 25 },
  { v: 2, l: 'Medium', xp: 50 },
  { v: 3, l: 'Hard',   xp: 75 },
]

export default function AddTaskModal({ theme, S, newName, setNewName, newCat, setNewCat, newDiff, setNewDiff, onAdd, onClose }) {
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
      <div style={{ width: '100%', background: '#0f1020', borderRadius: '24px 24px 0 0', padding: '24px 20px 44px', border: `1px solid ${theme.p}30` }}>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Syne', sans-serif" }}>
            New Task
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}
          >
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
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '13px 15px', color: '#f1f5f9', fontSize: 14, marginBottom: 16, outline: 'none', fontFamily: 'inherit' }}
        />

        {/* Category */}
        <div style={{ ...S.label, marginBottom: 8 }}>Category</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 16 }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setNewCat(c)} style={S.pill(newCat === c)}>
              {CAT_ICONS[c]} {c}
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div style={{ ...S.label, marginBottom: 8 }}>Difficulty</div>
        <div style={{ display: 'flex', gap: 9, marginBottom: 22 }}>
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

        <button onClick={onAdd} style={{ ...S.btn, width: '100%', padding: 15, fontSize: 15 }}>
          Add Task
        </button>
      </div>
    </div>
  )
}
