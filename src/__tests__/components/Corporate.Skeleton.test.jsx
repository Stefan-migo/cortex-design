import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton } from '../../components/Corporate/Skeleton/Skeleton'

describe('Corporate Skeleton', () => {
  it('renders the skeleton element', () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector('.corp-skeleton')).toBeInTheDocument()
  })

  it('is hidden from the accessibility tree', () => {
    render(<Skeleton />)
    expect(document.querySelector('.corp-skeleton')).toHaveAttribute('aria-hidden', 'true')
  })

  it('merges an external className', () => {
    render(<Skeleton className="extra-cls" />)
    expect(document.querySelector('.corp-skeleton')).toHaveClass('extra-cls')
  })
})
