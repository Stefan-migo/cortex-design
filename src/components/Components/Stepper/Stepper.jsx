import { useState, Children } from 'react'
import './Stepper.css'

export function Stepper({ children, initialStep = 1, onStepChange, onFinalStepCompleted, className = '' }) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const steps = Children.toArray(children); const total = steps.length; const isLast = currentStep === total; const isComplete = currentStep > total

  const goTo = (s) => { setCurrentStep(s); if (s > total) onFinalStepCompleted?.(); else onStepChange?.(s) }

  return (
    <div className={`stepper${className ? ' ' + className : ''}`} style={{ border: '1px solid #222', borderRadius: '12px', padding: '24px', background: '#120F17' }}>
      <div className="stepper__indicators" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        {steps.map((_, i) => {
          const s = i + 1; const active = s === currentStep; const complete = currentStep > s
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div onClick={() => goTo(s)} style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: complete || active ? '#5227FF' : '#222', color: active ? '#fff' : '#a3a3a3', fontSize: '14px', fontWeight: 600, transition: 'background 0.3s' }}>
                {complete ? '✓' : active ? '●' : s}
              </div>
              {i < total - 1 && <div style={{ flex: 1, height: '2px', background: complete ? '#5227FF' : '#333', transition: 'background 0.3s' }} />}
            </div>
          )
        })}
      </div>
      <div className="stepper__content" style={{ minHeight: '120px', position: 'relative' }}>
        {!isComplete && <div key={currentStep} style={{ animation: 'stepperIn 0.3s ease' }}>{steps[currentStep - 1]}</div>}
      </div>
      {!isComplete && (
        <div className="stepper__footer" style={{ display: 'flex', justifyContent: currentStep === 1 ? 'flex-end' : 'space-between', marginTop: '24px' }}>
          {currentStep > 1 && <button onClick={() => goTo(currentStep - 1)} style={{ padding: '8px 24px', borderRadius: '8px', border: '1px solid #333', background: 'transparent', color: '#fff', cursor: 'pointer' }}>Back</button>}
          <button onClick={() => goTo(isLast ? total + 1 : currentStep + 1)} style={{ padding: '8px 24px', borderRadius: '8px', border: 'none', background: '#5227FF', color: '#fff', cursor: 'pointer' }}>{isLast ? 'Complete' : 'Continue'}</button>
        </div>
      )}
      <style>{`@keyframes stepperIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  )
}

export function Step({ children }) { return <div>{children}</div> }
