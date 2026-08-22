import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'
import { getAll } from '../data/catalog'

describe('App', () => {
  it('renders the library grid from the catalog by default', () => {
    window.location.hash = ''
    render(<App />)
    expect(screen.getByText('Cortex Design Library')).toBeInTheDocument()
    expect(screen.getByText('Pattern Library')).toBeInTheDocument()
    const first = getAll()[0]
    if (first) {
      expect(screen.getByText(first.id)).toBeInTheDocument()
    }
  })

  it('navigates to a component detail route', () => {
    const entry = getAll().find((e) => e.storyFile !== null)
    window.location.hash = `#/components/${entry.id}`
    render(<App />)
    expect(screen.getByText(entry.id)).toBeInTheDocument()
    expect(screen.getByText('Visual context')).toBeInTheDocument()
  })

  it('shows not-found state for an unknown component route', () => {
    window.location.hash = '#/components/does-not-exist'
    render(<App />)
    expect(screen.getByText('Component not found.')).toBeInTheDocument()
  })
})
