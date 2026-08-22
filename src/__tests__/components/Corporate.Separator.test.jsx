import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Separator } from '../../components/Corporate/Separator/Separator'

describe('Corporate Separator', () => {
  it('renders a separator role', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('defaults aria-orientation to horizontal', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('maps the orientation prop to aria-orientation and a modifier class', () => {
    render(<Separator orientation="vertical" />)
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
    expect(screen.getByRole('separator')).toHaveClass('corp-separator--vertical')
  })
})
