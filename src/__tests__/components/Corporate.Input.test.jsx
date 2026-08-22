import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Input } from '../../components/Corporate/Input/Input'

describe('Corporate Input', () => {
  it('renders a textbox role with the accessible name', () => {
    render(<Input aria-label="Email" />)
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
  })

  it('applies the default corp-input className', () => {
    render(<Input aria-label="Email" />)
    expect(screen.getByRole('textbox')).toHaveClass('corp-input')
  })

  it('merges an external className', () => {
    render(<Input className="extra-cls" aria-label="Email" />)
    expect(screen.getByRole('textbox')).toHaveClass('extra-cls')
  })
})
