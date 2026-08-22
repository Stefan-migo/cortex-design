import { getAll } from '../data/catalog'
import './Library.css'

export function Library({ onNavigate }) {
  const entries = getAll()

  return (
    <div className="library">
      <h1 className="library__title">Pattern Library</h1>

      {entries.length === 0 && (
        <p className="library__empty">No components yet. Start building!</p>
      )}

      <div className="library__grid">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="library__card"
            onClick={() => onNavigate(entry.id)}
          >
            <div className="library__card-preview">
              <span className="library__card-placeholder">Preview</span>
            </div>
            <div className="library__card-body">
              <h3 className="library__card-name">{entry.id}</h3>
              {entry.storyFile ? (
                <a
                  className="library__card-link"
                  href={entry.storyFile}
                  onClick={(e) => e.stopPropagation()}
                >
                  Open story
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
