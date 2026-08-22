import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Layout } from '../../components/Layout/Layout'

describe('Layout', () => {
  it('renders the header with the library name', () => {
    render(<Layout><div>Content</div></Layout>)
    expect(screen.getByText('Cortex Design Library')).toBeInTheDocument()
  })

  it('has a banner header', () => {
    render(<Layout><div /></Layout>)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders children as the main content', () => {
    render(<Layout><main>Component Grid</main></Layout>)
    expect(screen.getByText('Component Grid')).toBeInTheDocument()
  })

  it('has no registry-backed sidebar', () => {
    render(<Layout><div /></Layout>)
    expect(screen.queryByRole('complementary')).toBeNull()
  })
})
