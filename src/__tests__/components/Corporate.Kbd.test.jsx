import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Kbd } from '../../components/Corporate/Kbd/Kbd'

describe('Corporate Kbd', () => {
  it('renders the key label', () => {
    render(<Kbd>⌘ K</Kbd>)
    expect(screen.getByText('⌘ K')).toBeInTheDocument()
  })

  it('applies the default corp-kbd className', () => {
    render(<Kbd>Enter</Kbd>)
    expect(screen.getByText('Enter')).toHaveClass('corp-kbd')
  })
})
