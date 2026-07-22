import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ComponentDetail } from '../../pages/ComponentDetail'

const mockComponent = {
  id: 'glitch-text',
  name: 'GlitchText',
  category: 'text-animations',
  description: 'CSS-only glitch text effect.',
  tags: ['css', 'glitch', 'text'],
  source: 'react-bits',
  import: () => Promise.resolve({ GlitchText: () => null }),
  controls: [
    { name: 'children', label: 'Text', type: 'text', default: 'Hello' },
    { name: 'speed', label: 'Speed', type: 'range', min: 0.1, max: 2, step: 0.1, default: 0.5 },
    { name: 'enableShadows', label: 'Shadows', type: 'toggle', default: true },
    { name: 'enableOnHover', label: 'On Hover', type: 'toggle', default: false },
  ],
}

describe('ComponentDetail', () => {
  it('shows placeholder when no component is selected', () => {
    render(<ComponentDetail onBack={() => {}} />)
    expect(screen.getByText(/Select a component/i)).toBeInTheDocument()
  })

  it('renders the component name and category', () => {
    render(<ComponentDetail component={mockComponent} onBack={() => {}} />)
    expect(screen.getByText('GlitchText')).toBeInTheDocument()
    expect(screen.getByText('text-animations')).toBeInTheDocument()
  })

  it('renders the back button', () => {
    render(<ComponentDetail onBack={() => {}} />)
    expect(screen.getByText(/Back/i)).toBeInTheDocument()
  })

  it('shows a live preview area', () => {
    render(<ComponentDetail component={mockComponent} onBack={() => {}} />)
    expect(screen.getByTestId('preview-area')).toBeInTheDocument()
  })

  it('renders component tags', () => {
    render(<ComponentDetail component={mockComponent} onBack={() => {}} />)
    mockComponent.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })

  it('shows JSX tab as active by default', () => {
    render(<ComponentDetail component={mockComponent} onBack={() => {}} />)
    const jsxTab = screen.getByRole('tab', { name: /JSX/i })
    expect(jsxTab).toHaveAttribute('aria-selected', 'true')
  })

  it('shows all tabs including Usage', () => {
    render(<ComponentDetail component={mockComponent} onBack={() => {}} />)
    expect(screen.getByRole('tab', { name: /JSX/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /CSS/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Usage/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Prompt/i })).toBeInTheDocument()
  })

  it('switches to Usage tab and shows generated code', () => {
    render(<ComponentDetail component={mockComponent} onBack={() => {}} />)
    const usageTab = screen.getByRole('tab', { name: /Usage/i })
    fireEvent.click(usageTab)
    expect(usageTab).toHaveAttribute('aria-selected', 'true')
    const matches = screen.getAllByText(/GlitchText/)
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('renders a copy button', () => {
    render(<ComponentDetail component={mockComponent} onBack={() => {}} />)
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    let called = false
    render(<ComponentDetail onBack={() => { called = true }} />)
    fireEvent.click(screen.getByText(/Back/i))
    expect(called).toBe(true)
  })

  it('renders control labels', () => {
    render(<ComponentDetail component={mockComponent} onBack={() => {}} />)
    expect(screen.getByText('Speed')).toBeInTheDocument()
    expect(screen.getByText('Shadows')).toBeInTheDocument()
  })
})
