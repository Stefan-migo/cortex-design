import './Layout.css'

export function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout__header" role="banner">
        <a href="#/" className="layout__logo">
          Cortex Design Library
        </a>
      </header>

      <main className="layout__content">
        {children}
      </main>
    </div>
  )
}
