import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '../../components/Corporate/Pagination/Pagination'

describe('Corporate Pagination', () => {
  it('renders a navigation landmark', () => {
    render(
      <Pagination>
        <PaginationContent />
      </Pagination>,
    )
    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument()
  })

  it('renders page numbers as list items with links', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" aria-current="page">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument()
  })

  it('exposes Previous and Next with accessible labels', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    )
    expect(screen.getByRole('link', { name: 'Go to previous page' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go to next page' })).toBeInTheDocument()
  })
})
