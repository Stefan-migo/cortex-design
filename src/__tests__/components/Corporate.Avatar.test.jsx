import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from '../../components/Corporate/Avatar/Avatar'

describe('Corporate Avatar', () => {
  it('renders an img role with the accessible name when src is set', () => {
    render(<Avatar src="https://example.com/a.png" alt="Jordan Doyle" />)
    expect(screen.getByRole('img', { name: 'Jordan Doyle' })).toBeInTheDocument()
  })

  it('renders a fallback with initials as the accessible name without src', () => {
    render(<Avatar initials="JD" alt="Jordan Doyle" />)
    expect(screen.getByRole('img', { name: 'Jordan Doyle' })).toBeInTheDocument()
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('uses initials as the accessible name when alt is omitted', () => {
    render(<Avatar initials="JD" />)
    expect(screen.getByRole('img', { name: 'JD' })).toBeInTheDocument()
  })

  it('applies the default corp-avatar className', () => {
    render(<Avatar initials="JD" alt="Jordan Doyle" />)
    expect(screen.getByRole('img')).toHaveClass('corp-avatar')
  })
})
