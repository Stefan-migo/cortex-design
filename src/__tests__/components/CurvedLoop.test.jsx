import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { CurvedLoop } from '../../components/TextAnimations/CurvedLoop'

beforeEach(() => {
  // jsdom doesn't implement getComputedTextLength for SVG text elements
  SVGElement.prototype.getComputedTextLength = () => 100
})

describe('CurvedLoop', () => {
  it('renders SVG element', () => {
    const { container } = render(<CurvedLoop marqueeText="Test Text" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders the marquee text', () => {
    render(<CurvedLoop marqueeText="Hello Loop" />)
    const matches = screen.getAllByText(/Hello Loop/)
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('accepts className prop', () => {
    const { container } = render(<CurvedLoop marqueeText="X" className="custom-class" />)
    const wrapper = container.firstChild
    expect(wrapper.className).toContain('custom-class')
  })

  it('renders textPath with correct href', () => {
    const { container } = render(<CurvedLoop marqueeText="Test" />)
    const textPath = container.querySelector('textPath')
    expect(textPath).toBeInTheDocument()
    expect(textPath.getAttribute('href')).toMatch(/^#curve-path-/)
  })
})
