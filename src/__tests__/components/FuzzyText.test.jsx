import { render } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { FuzzyText } from '../../components/TextAnimations/FuzzyText'

beforeEach(() => {
  // Mock canvas context for jsdom
  HTMLCanvasElement.prototype.getContext = () => ({
    canvas: { width: 0, height: 0 },
    clearRect: () => {},
    fillText: () => {},
    measureText: () => ({ width: 100 }),
    save: () => {},
    restore: () => {},
    translate: () => {},
    fillStyle: '',
    font: '',
  })
  // Mock font loading
  document.fonts = {
    load: () => Promise.resolve(),
    ready: Promise.resolve(),
    check: () => true,
  }
})

describe('FuzzyText', () => {
  it('renders a canvas element', () => {
    const { container } = render(<FuzzyText>Hello</FuzzyText>)
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('applies className to the canvas', () => {
    const { container } = render(<FuzzyText className="fuzzy-cls">X</FuzzyText>)
    const canvas = container.querySelector('canvas')
    expect(canvas.className).toContain('fuzzy-cls')
  })

  it('sets canvas width and height', () => {
    const { container } = render(<FuzzyText>Hello</FuzzyText>)
    const canvas = container.querySelector('canvas')
    expect(canvas.width).toBeGreaterThan(0)
    expect(canvas.height).toBeGreaterThan(0)
  })

  it('cleans up on unmount (no errors)', () => {
    const { unmount } = render(<FuzzyText>Hello</FuzzyText>)
    expect(() => unmount()).not.toThrow()
  })
})
