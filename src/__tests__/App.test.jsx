import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders the library page by default', () => {
    window.location.hash = ''
    render(<App />)
    expect(screen.getByText('Cortex Design Library')).toBeInTheDocument()
    expect(screen.getByText('Pattern Library')).toBeInTheDocument()
  })
})
