/**
 * Returns a theme-aware style object map.
 * Pass in the active theme object (from THEMES[name]).
 */
export function makeStyles(theme) {
  return {
    glass: {
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
    },
    glowCard: {
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: `1px solid ${theme.p}30`,
      borderRadius: '16px',
    },
    btn: {
      background: `linear-gradient(135deg, ${theme.p}, ${theme.s})`,
      border: 'none',
      borderRadius: '12px',
      color: '#000',
      fontWeight: '700',
      cursor: 'pointer',
      fontSize: '14px',
    },
    ghost: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '10px',
      color: '#94a3b8',
      cursor: 'pointer',
    },
    neon: {
      color: theme.p,
      textShadow: `0 0 16px ${theme.glow}`,
    },
    label: {
      color: '#64748b',
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      fontFamily: "'Space Mono', monospace",
    },
    pill: (active) => ({
      padding: '6px 14px',
      borderRadius: '999px',
      border: active ? `1px solid ${theme.p}` : '1px solid rgba(255,255,255,0.1)',
      background: active ? `${theme.p}20` : 'rgba(255,255,255,0.04)',
      color: active ? theme.p : '#94a3b8',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
    }),
  }
}
