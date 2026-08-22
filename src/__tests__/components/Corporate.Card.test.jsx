import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '../../components/Corporate/Card/Card'

describe('Corporate Card', () => {
  it('renders a heading with the accessible name from CardTitle', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Project stats</CardTitle>
        </CardHeader>
        <CardContent>42 active</CardContent>
      </Card>
    )
    expect(screen.getByRole('heading', { name: 'Project stats' })).toBeInTheDocument()
  })

  it('applies the default card className to the root', () => {
    render(<Card>Content</Card>)
    expect(screen.getByText('Content')).toHaveClass('corp-card')
  })

  it('renders header, footer and content slots', () => {
    render(
      <Card>
        <CardHeader>Head</CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Foot</CardFooter>
      </Card>
    )
    expect(screen.getByText('Head')).toHaveClass('corp-card__header')
    expect(screen.getByText('Body')).toHaveClass('corp-card__content')
    expect(screen.getByText('Foot')).toHaveClass('corp-card__footer')
  })

  it('merges an external className on the root', () => {
    render(<Card className="extra-cls">Card</Card>)
    expect(screen.getByText('Card')).toHaveClass('extra-cls')
  })
})
