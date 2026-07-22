import { useState, useEffect, useCallback, useMemo } from 'react'
import { getComponentSource } from '../data/sources'
import { ControlsPanel } from '../components/ControlsPanel'
import './ComponentDetail.css'

const TABS = ['JSX', 'CSS', 'Usage', 'Prompt']

/* ── Lazy-load and render the actual component with current props ── */
function LivePreview({ importFn, componentName, props }) {
  const [Comp, setComp] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setComp(null)
    setError(null)
    importFn()
      .then((mod) => {
        if (!mounted) return
        const C = mod[componentName] || mod.default
        if (C) setComp(() => C)
        else setError(`Export "${componentName}" not found`)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message)
      })
    return () => { mounted = false }
  }, [importFn, componentName])

  if (error) return <p className="component-detail__error">Error: {error}</p>
  if (!Comp) return <div className="component-detail__loading"><span className="spinner" /></div>
  return (
    <div className="component-detail__live">
      <Comp {...props} />
    </div>
  )
}

/* ── Generate JSX usage code from component name + current props ── */
function generateUsageCode(name, controls, values) {
  if (!controls || controls.length === 0) return `<${name} />`
  const propStrings = []
  controls.forEach((c) => {
    const val = values[c.name]
    const def = c.default
    /* skip props that match the default */
    if (val === def) return
    if (typeof val === 'string') propStrings.push(`  ${c.name}="${val}"`)
    else if (typeof val === 'boolean') propStrings.push(`  ${c.name}={${val}}`)
    else propStrings.push(`  ${c.name}={${val}}`)
  })

  /* children/text props are rendered as children instead of props */
  const textKey = controls.find((c) => c.name === 'children' || c.name === 'text')
  const textValue = textKey ? values[textKey] : null

  if (textValue && propStrings.length === 0) {
    return `<${name}>\n  ${textValue}\n</${name}>`
  }
  if (textValue) {
    return `<${name}>\n${propStrings.join('\n')}\n  ${textValue}\n</${name}>`
  }
  if (propStrings.length === 0) {
    return `<${name} />`
  }
  return `<${name}\n${propStrings.join('\n')}\n/>`
}

export function ComponentDetail({ component, onBack }) {
  const [activeTab, setActiveTab] = useState('JSX')
  const [copied, setCopied] = useState(false)
  const [sources, setSources] = useState(null)

  /* ── Initialize control values from defaults ── */
  const [controlValues, setControlValues] = useState({})

  useEffect(() => {
    if (component?.controls) {
      const initial = {}
      component.controls.forEach((c) => { initial[c.name] = c.default })
      setControlValues(initial)
    }
  }, [component])

  /* ── Load source code ── */
  useEffect(() => {
    if (component) setSources(getComponentSource(component.id))
  }, [component])

  const handleControlChange = useCallback((name, value) => {
    setControlValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  /* ── Content for each tab ── */
  const getCodeForTab = useCallback((tab) => {
    if (tab === 'JSX') return sources?.jsx || '// JSX source not available'
    if (tab === 'CSS') return sources?.css || '/* CSS source not available */'
    if (tab === 'Usage') return generateUsageCode(component?.name || 'Component', component?.controls, controlValues)
    if (tab === 'Prompt') return component?.prompt || '// No prompt available'
    return ''
  }, [sources, component, controlValues])

  const handleCopy = useCallback(() => {
    const code = getCodeForTab(activeTab)
    if (!code) return
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
      .catch((err) => {
        /* fallback for non-HTTPS or restricted contexts */
        console.error('Copy failed:', err)
        const textarea = document.createElement('textarea')
        textarea.value = code
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
  }, [activeTab, getCodeForTab])

  if (!component) {
    return (
      <div className="component-detail">
        <div className="component-detail__topbar">
          <button className="component-detail__back" onClick={onBack}>&larr; Back</button>
        </div>
        <div className="component-detail__body">
          <div className="component-detail__preview" data-testid="preview-area">
            <p className="component-detail__empty">Select a component to view its details.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="component-detail">
      {/* ── Top bar ── */}
      <div className="component-detail__topbar">
        <button className="component-detail__back" onClick={onBack}>&larr; Back</button>
        <div className="component-detail__meta">
          <h1 className="component-detail__name">{component.name}</h1>
          <span className="component-detail__category">{component.category}</span>
          {component.tags?.map((t) => <span key={t} className="component-detail__tag">{t}</span>)}
        </div>
      </div>

      <div className="component-detail__body">
        {/* ── Live preview area ── */}
        <div className="component-detail__preview" data-testid="preview-area">
          <div className="component-detail__demo">
            <LivePreview
              key={component.id + JSON.stringify(controlValues)}
              importFn={component.import}
              componentName={component.name}
              props={controlValues}
            />
          </div>
        </div>

        {/* ── Right panel: About + Controls ── */}
        <aside className="component-detail__info">
          <div className="component-detail__info-section">
            <h3 className="component-detail__info-title">About</h3>
            <p className="component-detail__description">{component.description}</p>
            <span className="component-detail__source">Source: {component.source}</span>
          </div>

          <ControlsPanel
            controls={component.controls}
            values={controlValues}
            onChange={handleControlChange}
          />
        </aside>
      </div>

      {/* ── Code section ── */}
      <div className="component-detail__code-section">
        <div className="component-detail__tabs" role="tablist" aria-label="Code languages">
          {TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`component-detail__tab${activeTab === tab ? ' component-detail__tab--active' : ''}`}
              onClick={() => { setActiveTab(tab); setCopied(false) }}
            >
              {tab}
            </button>
          ))}
          <div className="component-detail__code-actions">
            <button className="component-detail__copy-btn" onClick={handleCopy} aria-label="Copy code">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="component-detail__code-content" role="tabpanel">
          {activeTab === 'Prompt' ? (
            <div className="component-detail__prompt">{getCodeForTab('Prompt')}</div>
          ) : (
            <pre className="component-detail__code-pre"><code>{getCodeForTab(activeTab)}</code></pre>
          )}
        </div>
      </div>
    </div>
  )
}
