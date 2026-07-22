import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Layout } from '../../components/Layout/Layout'

describe('Layout', () => {
  it('renders the header with the library name', () => {
    render(<Layout><div>Content</div></Layout>)
    expect(screen.getByText('Cortex Design Library')).toBeInTheDocument()
  })

  it('renders the sidebar with categories', () => {
    render(<Layout><div>Content</div></Layout>)
    const sidebar = screen.getByRole('complementary')
    expect(sidebar).toHaveTextContent('All')
    expect(sidebar).toHaveTextContent('Text Animations')
    expect(sidebar).toHaveTextContent('Animations')
  })

  it('renders children as the main content', () => {
    render(<Layout><main>Component Grid</main></Layout>)
    expect(screen.getByText('Component Grid')).toBeInTheDocument()
  })

  it('has a header with navigation links', () => {
    render(<Layout><div /></Layout>)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders sidebar region as complementary', () => {
    render(<Layout><div /></Layout>)
    expect(screen.getByRole('complementary')).toBeInTheDocument()
  })
})
