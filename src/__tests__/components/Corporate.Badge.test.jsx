import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from '../../components/Corporate/Badge/Badge'

describe('Corporate Badge', () => {
  it('renders its accessible text content', () => {
    render(<Badge>New release</Badge>)
    expect(screen.getByText('New release')).toBeInTheDocument()
  })

  it('applies the default badge className', () => {
    render(<Badge>Version</Badge>)
    expect(screen.getByText('Version')).toHaveClass('corp-badge')
  })

  it('maps the variant prop to a modifier class', () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline')).toHaveClass('corp-badge--outline')
  })

  it('merges an external className', () => {
    render(<Badge className="extra-cls">Tag</Badge>)
    expect(screen.getByText('Tag')).toHaveClass('extra-cls')
  })
})
