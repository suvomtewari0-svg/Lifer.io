import { X, Check } from 'lucide-react'
import { useState } from 'react'

const AVATAR_OPTIONS = [
  '⚡','🔥','🎯','💎','🚀','🦁',
  '🐺','🦊','🐉','👾','🤖','🧙',
  '🥷','👑','⚔️','🌟','🏆','🎮',
]

export default function EditProfileModal({ username, avatar, theme, S, onSave, onClose }) {
  const [name,   setName]   = useState(username)
  const [picked, setPicked] = useState(avatar)

  const handleSave = () => {
    if (name.trim()) onSave(name.trim(), picked)
    onClose()
  }

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
      }}>

        {/* Title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Syne', sans-serif" }}>
            Edit Profile
          </span>
          <button onClick={onClose} aria-label="Close" style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={15} />
          </button>
        </div>

        {/* Current avatar preview */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg,${theme.p},${theme.s})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, boxShadow: `0 0 24px ${theme.glow}` }}>
            {picked}
          </div>
        </div>

        {/* Username input */}
        <div style={{ ...S.label, marginBottom: 8 }}>Username</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="Enter your name..."
          maxLength={20}
          autoFocus
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${theme.p}44`,
            borderRadius: 12, padding: '13px 15px',
            color: '#f1f5f9', fontSize: 16, fontWeight: 600,
            marginBottom: 20, outline: 'none', fontFamily: 'inherit',
          }}
        />

        {/* Avatar picker */}
        <div style={{ ...S.label, marginBottom: 10 }}>Avatar</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 24 }}>
          {AVATAR_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setPicked(emoji)}
              style={{
                height: 48, borderRadius: 12, fontSize: 24,
                border: picked === emoji ? `2px solid ${theme.p}` : '2px solid rgba(255,255,255,0.06)',
                background: picked === emoji ? `${theme.p}20` : 'rgba(255,255,255,0.04)',
                cursor: 'pointer', transition: 'all 0.15s',
                boxShadow: picked === emoji ? `0 0 10px ${theme.p}44` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          style={{ ...S.btn, width: '100%', padding: 15, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <Check size={16} /> Save Profile
        </button>
      </div>
    </div>
  )
}
