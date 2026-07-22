import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Library } from '../../pages/Library'

describe('Library', () => {
  it('renders the page title', () => {
    render(<Library onNavigate={() => {}} />)
    expect(screen.getByText('Pattern Library')).toBeInTheDocument()
  })

  it('shows component cards from the registry', () => {
    render(<Library onNavigate={() => {}} />)
    expect(screen.getByText('GlitchText')).toBeInTheDocument()
  })
})
