import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Library } from '../../pages/Library'
import { getAll } from '../../data/catalog'

describe('Library', () => {
  it('renders the page title', () => {
    render(<Library onNavigate={() => {}} />)
    expect(screen.getByText('Pattern Library')).toBeInTheDocument()
  })

  it('renders one card per catalog entry with its id', () => {
    render(<Library onNavigate={() => {}} />)
    const entries = getAll()
    entries.forEach((entry) => {
      expect(screen.getByText(entry.id)).toBeInTheDocument()
    })
  })

  it('links to the storyFile when present', () => {
    render(<Library onNavigate={() => {}} />)
    const withStory = getAll().find((e) => e.storyFile !== null)
    expect(screen.getAllByText('Open story').length).toBeGreaterThan(0)
    expect(withStory).toBeTruthy()
  })

  it('renders entries with null storyFile without a story link and without crashing', () => {
    render(<Library onNavigate={() => {}} />)
    const nullEntry = getAll().find((e) => e.storyFile === null)
    // CAT-003: null storyFile cards exist and do not throw
    if (nullEntry) {
      expect(screen.getByText(nullEntry.id)).toBeInTheDocument()
    }
    // count 'Open story' links matches number of entries with a storyFile
    const expectedLinks = getAll().filter((e) => e.storyFile !== null).length
    expect(screen.getAllByText('Open story').length).toBe(expectedLinks)
  })
})
