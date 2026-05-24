import { Check } from 'lucide-react'
import { DIFF_COLORS, DIFF_LABELS } from '../constants.js'

export default function TaskCard({ task, theme, S, onComplete }) {
  const diffCol   = DIFF_COLORS[task.diff]
  const diffLabel = DIFF_LABELS[task.diff]

  return (
    <div
      style={{
        ...S.glass,
        padding: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '11px',
        opacity: task.done ? 0.55 : 1,
        transition: 'opacity 0.3s',
      }}
    >
      {/* Completion circle */}
      <button
        onClick={onComplete}
        aria-label={task.done ? 'Task complete' : `Complete task: ${task.name}`}
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: task.done
            ? `2px solid ${theme.p}`
            : '2px solid rgba(255,255,255,0.18)',
          background: task.done ? `${theme.p}20` : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: task.done ? 'default' : 'pointer',
          flexShrink: 0,
          transition: 'all 0.3s',
          boxShadow: task.done ? `0 0 10px ${theme.p}55` : 'none',
        }}
      >
        {task.done && (
          <Check
            size={15}
            style={{ color: theme.p, animation: 'checkPop 0.3s ease' }}
          />
        )}
      </button>

      {/* Icon */}
      <span style={{ fontSize: '20px', flexShrink: 0 }}>{task.icon}</span>

      {/* Name + meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: task.done ? '#64748b' : '#f1f5f9',
            fontSize: '13px',
            fontWeight: '600',
            textDecoration: task.done ? 'line-through' : 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {task.name}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '6px',
            marginTop: '3px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              color: '#64748b',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {task.cat}
          </span>
          <span style={{ fontSize: '10px', color: diffCol }}>{diffLabel}</span>
        </div>
      </div>

      {/* XP reward */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: task.done ? '#475569' : theme.p,
            fontFamily: "'Space Mono', monospace",
          }}
        >
          +{task.xp}
        </div>
        <div style={{ fontSize: '10px', color: '#475569' }}>XP</div>
      </div>
    </div>
  )
}
