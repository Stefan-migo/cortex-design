import { render } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { TextPressure } from '../../components/TextAnimations/TextPressure'

beforeEach(() => {
  Element.prototype.getBoundingClientRect = () => ({
    width: 800,
    height: 200,
    top: 0,
    left: 0,
    bottom: 200,
    right: 800,
    x: 0,
    y: 0,
    toJSON: () => null,
  })
})

describe('TextPressure', () => {
  it('renders the text as individual characters', () => {
    const { container } = render(<TextPressure text="ABC" />)
    const spans = container.querySelectorAll('span[data-char]')
    expect(spans.length).toBe(3)
    expect(spans[0].getAttribute('data-char')).toBe('A')
    expect(spans[1].getAttribute('data-char')).toBe('B')
    expect(spans[2].getAttribute('data-char')).toBe('C')
  })

  it('renders with default text', () => {
    const { container } = render(<TextPressure />)
    const spans = container.querySelectorAll('span[data-char]')
    expect(spans.length).toBeGreaterThan(0)
  })

  it('renders each character as a span inside h1', () => {
    const { container } = render(<TextPressure text="XYZ" />)
    const h1 = container.querySelector('h1')
    expect(h1).toBeInTheDocument()
    const spans = h1.querySelectorAll('span')
    expect(spans.length).toBe(3)
  })

  it('passes className to the heading', () => {
    const { container } = render(<TextPressure className="custom-cls" />)
    const h1 = container.querySelector('h1')
    expect(h1.className).toContain('custom-cls')
  })
})
