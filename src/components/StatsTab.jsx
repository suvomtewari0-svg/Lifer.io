import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { WEEKLY_DATA } from '../constants.js'

const CAT_BARS = [
  { cat: 'Fitness',      pct: 80, col: '#ef4444' },
  { cat: 'Health',       pct: 65, col: '#22c55e' },
  { cat: 'Mindfulness',  pct: 55, col: '#a855f7' },
  { cat: 'School',       pct: 40, col: '#3b82f6' },
  { cat: 'Productivity', pct: 70, col: '#f59e0b' },
]

export default function StatsTab({ user, theme, S }) {
  return (
    <div style={{ padding: '20px 16px 110px' }}>
      <div
        style={{
          fontSize: '22px',
          fontWeight: '800',
          color: '#f1f5f9',
          marginBottom: '20px',
          fontFamily: "'Syne', sans-serif",
        }}
      >
        Statistics
      </div>

      {/* Productivity Score */}
      <div
        style={{
          ...S.glowCard,
          padding: '20px',
          marginBottom: '14px',
          textAlign: 'center',
        }}
      >
        <div style={{ ...S.label, marginBottom: '8px' }}>
          Productivity Score
        </div>
        <div
          style={{
            fontSize: '60px',
            fontWeight: '900',
            ...S.neon,
            fontFamily: "'Space Mono', monospace",
            lineHeight: 1,
          }}
        >
          74
        </div>
        <div style={{ color: '#22c55e', fontSize: '12px', marginTop: '8px' }}>
          ↑ 12 pts from last week
        </div>
      </div>

      {/* Weekly Bar Chart */}
      <div style={{ ...S.glass, padding: '18px', marginBottom: '14px' }}>
        <div
          style={{
            color: '#f1f5f9',
            fontWeight: '700',
            fontSize: '14px',
            marginBottom: '14px',
          }}
        >
          Weekly Completion
        </div>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={WEEKLY_DATA} barSize={20}>
            <XAxis
              dataKey="day"
              tick={{ fill: '#475569', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: '#1e293b',
                border: `1px solid ${theme.p}33`,
                borderRadius: '8px',
                color: '#f1f5f9',
                fontSize: '12px',
              }}
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              formatter={(val) => [`${val} tasks`, 'Completed']}
            />
            <Bar
              dataKey="t"
              fill={theme.p}
              radius={[6, 6, 0, 0]}
              style={{ filter: `drop-shadow(0 0 4px ${theme.p}88)` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stat tiles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '14px',
        }}
      >
        {[
          { label: 'Total XP',       val: user.totalXP.toLocaleString(), icon: '⚡', col: theme.p    },
          { label: 'Coins Earned',   val: '1,240',                        icon: '🪙', col: '#f59e0b' },
          { label: 'Best Streak',    val: '12 days',                      icon: '🔥', col: '#ef4444' },
          { label: 'Hours Improved', val: '47h',                          icon: '⏱️', col: '#22c55e' },
        ].map((s) => (
          <div key={s.label} style={{ ...S.glass, padding: '15px' }}>
            <div style={{ fontSize: '20px', marginBottom: '7px' }}>{s.icon}</div>
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
            <div style={{ ...S.label, marginTop: '3px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div style={{ ...S.glass, padding: '18px' }}>
        <div
          style={{
            color: '#f1f5f9',
            fontWeight: '700',
            fontSize: '14px',
            marginBottom: '14px',
          }}
        >
          Category Breakdown
        </div>
        {CAT_BARS.map((b) => (
          <div key={b.cat} style={{ marginBottom: '12px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '5px',
              }}
            >
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                {b.cat}
              </span>
              <span
                style={{
                  fontSize: '12px',
                  color: b.col,
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: '700',
                }}
              >
                {b.pct}%
              </span>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '999px',
                height: '5px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${b.pct}%`,
                  background: b.col,
                  borderRadius: '999px',
                  boxShadow: `0 0 7px ${b.col}88`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
