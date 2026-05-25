import { X, Check, Camera } from 'lucide-react'
import { useState, useRef } from 'react'

const AVATAR_OPTIONS = [
  '⚡','🔥','🎯','💎','🚀','🦁',
  '🐺','🦊','🐉','👾','🤖','🧙',
  '🥷','👑','⚔️','🌟','🏆','🎮',
]

export default function EditProfileModal({ username, avatar, profilePic, theme, S, onSave, onClose }) {
  const [name,    setName]    = useState(username)
  const [picked,  setPicked]  = useState(avatar)
  const [picData, setPicData] = useState(profilePic || null)
  const fileRef = useRef()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    // Resize + compress to keep localStorage size reasonable
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX = 300
        const ratio = Math.min(MAX / img.width, MAX / img.height)
        canvas.width  = img.width  * ratio
        canvas.height = img.height * ratio
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        setPicData(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (name.trim()) onSave(name.trim(), picked, picData)
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
        maxHeight: '92dvh', overflowY: 'auto',
      }}>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Syne', sans-serif" }}>
            Edit Profile
          </span>
          <button onClick={onClose} aria-label="Close" style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={15} />
          </button>
        </div>

        {/* Profile picture */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              width: 90, height: 90, borderRadius: '50%',
              background: `linear-gradient(135deg,${theme.p},${theme.s})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, overflow: 'hidden',
              boxShadow: `0 0 24px ${theme.glow}`,
            }}>
              {picData
                ? <img src={picData} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="profile" />
                : picked
              }
            </div>

            {/* Camera button */}
            <button
              onClick={() => fileRef.current.click()}
              style={{
                position: 'absolute', bottom: 0, right: -4,
                width: 30, height: 30, borderRadius: '50%',
                background: `linear-gradient(135deg,${theme.p},${theme.s})`,
                border: '2px solid #0f1020',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: `0 0 8px ${theme.glow}`,
              }}
            >
              <Camera size={14} style={{ color: '#000' }} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </div>
        </div>

        {/* Tap to upload hint */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <button
            onClick={() => fileRef.current.click()}
            style={{ background: 'none', border: 'none', color: theme.p, fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
          >
            {picData ? 'Change photo' : 'Upload a photo'}
          </button>
          {picData && (
            <button
              onClick={() => setPicData(null)}
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 13, cursor: 'pointer', marginLeft: 12 }}
            >
              Remove
            </button>
          )}
        </div>

        {/* Username */}
        <div style={{ ...S.label, marginBottom: 8 }}>Username</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="Enter your name..."
          maxLength={20}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${theme.p}44`,
            borderRadius: 12, padding: '13px 15px',
            color: '#f1f5f9', fontSize: 16, fontWeight: 600,
            marginBottom: 20, outline: 'none', fontFamily: 'inherit',
          }}
        />

        {/* Avatar emoji (shown when no photo) */}
        {!picData && (
          <>
            <div style={{ ...S.label, marginBottom: 10 }}>Or pick an emoji avatar</div>
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
          </>
        )}

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
