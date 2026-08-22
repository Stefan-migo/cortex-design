import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '../../components/Corporate/Button/Button'

describe('Corporate Button', () => {
  it('renders a button role with the accessible name', () => {
    render(<Button>Save changes</Button>)
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
  })

  it('applies the default button className', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveClass('corp-button')
  })

  it('maps the variant prop to a modifier class', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button', { name: 'Outline' })).toHaveClass('corp-button--outline')
  })

  it('merges an external className', () => {
    render(<Button className="extra-cls">Click</Button>)
    expect(screen.getByRole('button', { name: 'Click' })).toHaveClass('extra-cls')
  })
})
