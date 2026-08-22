import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from '../../components/Corporate/Label/Label'

describe('Corporate Label', () => {
  it('associates with the control via htmlFor', () => {
    render(
      <div>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </div>,
    )
    const label = screen.getByText('Email')
    expect(label).toHaveAttribute('for', 'email')
  })

  it('applies the default corp-label className', () => {
    render(<Label htmlFor="name">Name</Label>)
    expect(screen.getByText('Name')).toHaveClass('corp-label')
  })

  it('merges an external className', () => {
    render(<Label htmlFor="name" className="extra-cls">Name</Label>)
    expect(screen.getByText('Name')).toHaveClass('extra-cls')
  })
})
