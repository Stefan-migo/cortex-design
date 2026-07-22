import { useState, useEffect } from 'react'
import { registry } from '../data/registry'
import './Library.css'

/* ── Mini live preview inside each card ── */
function CardPreview({ importFn, componentName, demoProps }) {
  const [Comp, setComp] = useState(null)

  useEffect(() => {
    let mounted = true
    setComp(null)
    importFn()
      .then((mod) => {
        if (!mounted) return
        const C = mod[componentName] || mod.default
        if (C) setComp(() => C)
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [importFn, componentName])

  if (!Comp) {
    return <span className="library__card-placeholder">Preview</span>
  }

  return <Comp {...demoProps} />
}

export function Library({ onNavigate }) {
  return (
    <div className="library">
      <h1 className="library__title">Pattern Library</h1>

      {registry.length === 0 && (
        <p className="library__empty">No components yet. Start building!</p>
      )}

      <div className="library__grid">
        {registry.map((entry) => (
          <article
            key={entry.id}
            className="library__card"
            onClick={() => onNavigate(entry.id)}
          >
            <div className="library__card-preview">
              {entry.import ? (
                <CardPreview importFn={entry.import} componentName={entry.name} demoProps={entry.demoProps || {}} />
              ) : (
                <span className="library__card-placeholder">Preview</span>
              )}
            </div>
            <div className="library__card-body">
              <h3 className="library__card-name">{entry.name}</h3>
              <p className="library__card-desc">{entry.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
