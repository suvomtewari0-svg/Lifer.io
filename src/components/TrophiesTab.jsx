import { Trophy } from 'lucide-react'
import { getWeekKey, CAT_COLORS } from '../constants.js'

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function groupByWeek(trophies) {
  const groups = {}
  trophies.forEach((t) => {
    const k = t.weekKey
    if (!groups[k]) groups[k] = []
    groups[k].push(t)
  })
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
}

function weekLabel(key) {
  const currentKey = getWeekKey()
  if (key === currentKey) return 'This Week'
  const d = new Date()
  d.setDate(d.getDate() - 7)
  if (key === getWeekKey(d)) return 'Last Week'
  const [year, wPart] = key.split('-')
  return `${year} · Week ${parseInt(wPart.replace('W', ''), 10)}`
}

export default function TrophiesTab({ trophies, theme, S }) {
  const grouped = groupByWeek(trophies)

  return (
    <div style={{ padding: '20px 16px 110px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Syne', sans-serif" }}>
            Trophies
          </div>
          <div style={{ color: '#64748b', fontSize: 13, marginTop: 3 }}>
            {trophies.length} task{trophies.length !== 1 ? 's' : ''} completed
          </div>
        </div>
        <div style={{ ...S.glass, padding: '8px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Space Mono', monospace" }}>
            {trophies.length}
          </div>
          <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>total</div>
        </div>
      </div>

      {/* This week summary */}
      {trophies.filter((t) => t.weekKey === getWeekKey()).length > 0 && (
        <div style={{ ...S.glowCard, padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 32 }}>🏆</div>
          <div>
            <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14 }}>
              {trophies.filter((t) => t.weekKey === getWeekKey()).length} trophies this week
            </div>
            <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>Keep the streak going!</div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {trophies.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>🏆</div>
          <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>No trophies yet</div>
          <div style={{ color: '#475569', fontSize: 13 }}>Complete tasks to earn your first trophy.</div>
        </div>
      )}

      {/* Grouped list */}
      {grouped.map(([weekKey, items]) => (
        <div key={weekKey} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: "'Space Mono', monospace", whiteSpace: 'nowrap' }}>
              {weekLabel(weekKey)}
            </span>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {items.map((trophy) => (
              <TrophyCard key={trophy.id} trophy={trophy} theme={theme} S={S} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TrophyCard({ trophy, theme, S }) {
  const catColor = CAT_COLORS[trophy.cat] || '#64748b'

  return (
    <div style={{ ...S.glass, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, position: 'relative', overflow: 'hidden' }}>
      {/* Left accent */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: catColor, borderRadius: '16px 0 0 16px' }} />

      {/* Icon */}
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${catColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, border: `1px solid ${catColor}30` }}>
        {trophy.icon}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {trophy.name}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: catColor, background: `${catColor}15`, padding: '2px 7px', borderRadius: 4, fontWeight: 600 }}>
            {trophy.cat}
          </span>
          <span style={{ fontSize: 10, color: '#475569' }}>{formatDate(trophy.completedAt)}</span>
        </div>
      </div>

      {/* XP badge */}
      <div style={{ background: `${theme.p}18`, border: `1px solid ${theme.p}40`, borderRadius: 8, padding: '4px 10px', textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: theme.p, fontFamily: "'Space Mono', monospace" }}>+{trophy.xp}</div>
        <div style={{ fontSize: 9, color: '#475569' }}>XP</div>
      </div>
    </div>
  )
}
