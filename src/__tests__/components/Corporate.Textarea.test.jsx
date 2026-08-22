import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Textarea } from '../../components/Corporate/Textarea/Textarea'

describe('Corporate Textarea', () => {
  it('renders a textbox role with the accessible name', () => {
    render(<Textarea aria-label="Message" />)
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeInTheDocument()
  })

  it('applies the default corp-textarea className', () => {
    render(<Textarea aria-label="Message" />)
    expect(screen.getByRole('textbox')).toHaveClass('corp-textarea')
  })

  it('renders a textarea element', () => {
    render(<Textarea aria-label="Message" />)
    expect(screen.getByRole('textbox')).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('merges an external className', () => {
    render(<Textarea className="extra-cls" aria-label="Message" />)
    expect(screen.getByRole('textbox')).toHaveClass('extra-cls')
  })
})
