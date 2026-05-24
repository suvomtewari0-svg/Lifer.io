import { ACHIEVEMENTS, THEMES } from '../constants.js'

export default function RewardsTab({ user, theme, S, shopItems, onBuy, themeName, setThemeName }) {
  return (
    <div style={{ padding: '20px 16px 110px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Syne', sans-serif" }}>
          Rewards
        </div>
        <div style={{ ...S.glass, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>🪙</span>
          <span style={{ color: '#f59e0b', fontWeight: 800, fontFamily: "'Space Mono', monospace" }}>{user.coins}</span>
        </div>
      </div>

      {/* Theme picker */}
      <div style={{ ...S.glowCard, padding: 16, marginBottom: 20 }}>
        <div style={{ ...S.label, marginBottom: 12 }}>App Theme</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {Object.entries(THEMES).map(([name, t]) => {
            const isActive = themeName === name
            return (
              <button
                key={name}
                onClick={() => setThemeName(name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 12,
                  border: isActive ? `2px solid ${t.p}` : '1px solid rgba(255,255,255,0.08)',
                  background: isActive ? `${t.p}15` : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                }}
              >
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: t.p, boxShadow: isActive ? `0 0 10px ${t.p}` : 'none', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: isActive ? t.p : '#f1f5f9', fontSize: 12, fontWeight: 700 }}>{t.label}</div>
                  {isActive && <div style={{ color: t.p, fontSize: 10 }}>Active</div>}
                </div>
                {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.p, boxShadow: `0 0 6px ${t.p}` }} />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Achievements</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, marginBottom: 24 }}>
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.id}
            title={a.desc}
            style={{
              ...S.glass, padding: 14, textAlign: 'center',
              opacity: a.done ? 1 : 0.38,
              border: a.done ? `1px solid ${theme.p}44` : '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6, filter: a.done ? 'none' : 'grayscale(1)' }}>{a.icon}</div>
            <div style={{ fontSize: 10, color: a.done ? '#f1f5f9' : '#64748b', fontWeight: 600, lineHeight: 1.3 }}>{a.name}</div>
          </div>
        ))}
      </div>

      {/* Shop */}
      <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Shop</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shopItems.map((item) => (
          <div
            key={item.id}
            style={{
              ...S.glass, padding: 15,
              display: 'flex', alignItems: 'center', gap: 14,
              border: item.unlocked ? `1px solid ${theme.p}44` : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)', fontSize: 22 }}>
              {item.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14 }}>{item.name}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>{item.desc}</div>
            </div>
            {item.unlocked ? (
              <div style={{ color: theme.p, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓ Owned</div>
            ) : (
              <button
                onClick={() => onBuy(item.id)}
                disabled={user.coins < item.cost}
                style={{ ...S.btn, padding: '8px 12px', fontSize: 11, opacity: user.coins >= item.cost ? 1 : 0.35, flexShrink: 0 }}
              >
                🪙 {item.cost}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
