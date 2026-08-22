import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ComponentDetail } from '../../pages/ComponentDetail'
import { getAll } from '../../data/catalog'

const entry = getAll().find((e) => e.id === 'glitch-text')
const nullStory = getAll().find((e) => e.storyFile === null)

describe('ComponentDetail', () => {
  it('shows not-found state when no entry is provided', () => {
    render(<ComponentDetail entry={null} onBack={() => {}} />)
    expect(screen.getByText('Component not found.')).toBeInTheDocument()
  })

  it('renders the entry id and its metadata', () => {
    render(<ComponentDetail entry={entry} onBack={() => {}} />)
    expect(screen.getByText(entry.id)).toBeInTheDocument()
    expect(screen.getByText('Visual context')).toBeInTheDocument()
    expect(screen.getByText('Mood')).toBeInTheDocument()
    entry.visualContext.forEach((ctx) => expect(screen.getByText(ctx)).toBeInTheDocument())
    entry.moodTags.forEach((tag) => expect(screen.getByText(tag)).toBeInTheDocument())
  })

  it('renders adaptation rule variants', () => {
    render(<ComponentDetail entry={entry} onBack={() => {}} />)
    expect(screen.getByText('Adaptation rules')).toBeInTheDocument()
    const variants = Object.keys(entry.adaptationRules.variants)
    variants.forEach((v) => expect(screen.getByText(v)).toBeInTheDocument())
  })

  it('links to the storyFile when present', () => {
    render(<ComponentDetail entry={entry} onBack={() => {}} />)
    const link = screen.getByRole('link', { name: 'Open story' })
    expect(link.getAttribute('href')).toBe(entry.storyFile)
  })

  it('does not render a story link when storyFile is null', () => {
    render(<ComponentDetail entry={nullStory} onBack={() => {}} />)
    expect(screen.queryByRole('link', { name: 'Open story' })).toBeNull()
  })

  it('calls onBack when back button is clicked', () => {
    let called = false
    render(<ComponentDetail entry={entry} onBack={() => { called = true }} />)
    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(called).toBe(true)
  })
})
