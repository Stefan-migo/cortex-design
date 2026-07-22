import { useState } from 'react'
import { categories } from '../../data/registry'
import './Layout.css'

export function Layout({ children }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const handleCategory = (id) => {
    setActiveCategory(id)
    window.location.hash = id === 'all' ? '#/' : '#/' + id
  }

  return (
    <div className="layout">
      <header className="layout__header" role="banner">
        <a
          href="#/"
          className="layout__logo"
          onClick={(e) => { e.preventDefault(); handleCategory('all') }}
        >
          Cortex Design Library
        </a>
        <nav className="layout__nav">
          <a
            href="#/text-animations"
            onClick={(e) => { e.preventDefault(); handleCategory('text-animations') }}
          >
            Text Animations
          </a>
          <a
            href="#/animations"
            onClick={(e) => { e.preventDefault(); handleCategory('animations') }}
          >
            Animations
          </a>
          <a
            href="#/components"
            onClick={(e) => { e.preventDefault(); handleCategory('components') }}
          >
            Components
          </a>
          <a
            href="#/backgrounds"
            onClick={(e) => { e.preventDefault(); handleCategory('backgrounds') }}
          >
            Backgrounds
          </a>
        </nav>
      </header>

      <div className="layout__body">
        <aside className="layout__sidebar" role="complementary">
          <div className="layout__sidebar-header">
            <h3 className="layout__sidebar-title">Patterns</h3>
          </div>
          <ul className="layout__sidebar-list">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`layout__sidebar-btn${activeCategory === cat.id ? ' layout__sidebar-btn--active' : ''}`}
                  onClick={() => handleCategory(cat.id)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="layout__content">
          {children}
        </main>
      </div>
    </div>
  )
}
