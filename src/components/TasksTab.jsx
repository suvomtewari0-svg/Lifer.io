import { Plus } from 'lucide-react'
import TaskCard from './TaskCard.jsx'
import { CATS } from '../constants.js'

export default function TasksTab({ tasks, theme, S, filterCat, setFilterCat, onComplete, onAddTask }) {
  const filtered = filterCat === 'All' ? tasks : tasks.filter((t) => t.cat === filterCat)

  return (
    <div style={{ padding: '20px 16px 110px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', fontFamily: "'Syne', sans-serif" }}>
          My Tasks
        </div>
        <div style={{ ...S.glass, padding: '6px 12px' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>
            {tasks.length} tasks
          </span>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 18, scrollbarWidth: 'none' }}>
        {CATS.map((c) => (
          <button key={c} onClick={() => setFilterCat(c)} style={S.pill(filterCat === c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 16 }}>
        {filtered.map((t) => (
          <TaskCard key={t.id} task={t} theme={theme} S={S} onComplete={() => onComplete(t.id)} />
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#475569', fontSize: 14 }}>
            No tasks in this category yet.
          </div>
        )}
      </div>

      <button
        onClick={onAddTask}
        style={{ ...S.btn, width: '100%', padding: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
      >
        <Plus size={15} /> Add Custom Task
      </button>
    </div>
  )
}
