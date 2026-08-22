import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Tooltip, TooltipTrigger, TooltipContent } from '../../components/Corporate/Tooltip/Tooltip'

const renderTooltip = () =>
  render(
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>Helpful hint</TooltipContent>
    </Tooltip>,
  )

describe('Corporate Tooltip', () => {
  it('is hidden by default (no tooltip role in the document)', () => {
    renderTooltip()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows role=tooltip on focus and wires aria-describedby to the trigger', async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.tab()
    const trigger = screen.getByRole('button', { name: 'Hover me' })
    expect(trigger).toHaveFocus()
    const tip = screen.getByRole('tooltip')
    expect(tip).toHaveTextContent('Helpful hint')
    expect(tip).toHaveAttribute('id')
    expect(trigger).toHaveAttribute('aria-describedby', tip.id)
  })

  it('shows on pointerenter and hides on pointerleave', async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.hover(screen.getByRole('button', { name: 'Hover me' }))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    await user.unhover(screen.getByRole('button', { name: 'Hover me' }))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows on focus and hides on blur', async () => {
    const user = userEvent.setup()
    renderTooltip()
    const trigger = screen.getByRole('button', { name: 'Hover me' })
    await user.tab()
    expect(trigger).toHaveFocus()
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    await user.tab() // moves focus off the trigger
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('hides on Escape while focused', async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.tab()
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
