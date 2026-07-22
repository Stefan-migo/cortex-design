import './ControlsPanel.css'

export function ControlsPanel({ controls, values, onChange }) {
  if (!controls || controls.length === 0) return null

  return (
    <div className="controls-panel">
      <h3 className="controls-panel__title">Customize</h3>
      <div className="controls-panel__list">
        {controls.map((control) => (
          <div key={control.name} className="controls-panel__item">
            <label className="controls-panel__label">
              <span>{control.label}</span>
              {control.type === 'range' && (
                <span className="controls-panel__value">{values[control.name]}</span>
              )}
            </label>
            <ControlInput control={control} value={values[control.name]} onChange={(v) => onChange(control.name, v)} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ControlInput({ control, value, onChange }) {
  switch (control.type) {
    case 'toggle':
      return (
        <label className="controls-panel__toggle">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="controls-panel__toggle-track">
            <span className="controls-panel__toggle-knob" />
          </span>
        </label>
      )

    case 'range':
      return (
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step || 1}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="controls-panel__range"
        />
      )

    case 'select':
      return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="controls-panel__select"
        >
          {control.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )

    case 'text':
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="controls-panel__text"
        />
      )

    default:
      return null
  }
}
