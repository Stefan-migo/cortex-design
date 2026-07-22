import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { GlitchText } from '../../components/TextAnimations/GlitchText'

describe('GlitchText', () => {
  it('renders the text content', () => {
    render(<GlitchText>Hello World</GlitchText>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders with default text', () => {
    render(<GlitchText>Glitch</GlitchText>)
    expect(screen.getByText('Glitch')).toBeInTheDocument()
  })

  it('sets the data-text attribute matching children', () => {
    render(<GlitchText>Test</GlitchText>)
    const el = screen.getByText('Test')
    expect(el.getAttribute('data-text')).toBe('Test')
  })

  it('applies className prop', () => {
    render(<GlitchText className="custom">X</GlitchText>)
    const el = screen.getByText('X')
    expect(el.className).toContain('custom')
  })

  it('disables shadows when enableShadows is false', () => {
    render(<GlitchText enableShadows={false}>X</GlitchText>)
    const el = screen.getByText('X')
    expect(el.style.getPropertyValue('--after-shadow')).toBe('none')
    expect(el.style.getPropertyValue('--before-shadow')).toBe('none')
  })

  it('adds hover class when enableOnHover is true', () => {
    render(<GlitchText enableOnHover>X</GlitchText>)
    const el = screen.getByText('X')
    expect(el.className).toContain('enable-on-hover')
  })
})
