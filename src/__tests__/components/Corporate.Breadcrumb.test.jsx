import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/Corporate/Breadcrumb/Breadcrumb'

describe('Corporate Breadcrumb', () => {
  it('renders a navigation landmark with the default label', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList />
      </Breadcrumb>,
    )
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
  })

  it('honors a custom aria-label on the navigation landmark', () => {
    render(
      <Breadcrumb aria-label="Project trail">
        <BreadcrumbList />
      </Breadcrumb>,
    )
    expect(screen.getByRole('navigation', { name: 'Project trail' })).toBeInTheDocument()
  })

  it('exposes the trail as an ordered list', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('marks the current page with aria-current="page"', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Docs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(screen.getByText('Docs')).toHaveAttribute('aria-current', 'page')
  })

  it('renders separator as decorative (aria-hidden)', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(screen.getByText('/')).toHaveAttribute('aria-hidden', 'true')
  })
})
