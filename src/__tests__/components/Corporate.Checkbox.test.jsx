import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from '../../components/Corporate/Checkbox/Checkbox'

describe('Corporate Checkbox', () => {
  it('renders a checkbox role with the accessible name', () => {
    render(<Checkbox aria-label="Accept terms" checked={false} />)
    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' }),
    ).toBeInTheDocument()
  })

  it('exposes aria-checked mirroring the controlled checked prop', () => {
    const { rerender } = render(
      <Checkbox aria-label="Accept terms" checked={false} />,
    )
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')
    rerender(<Checkbox aria-label="Accept terms" checked={true} />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('fires onChange on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox aria-label="Accept terms" checked={false} onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('fires onChange on Space while focused', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox aria-label="Accept terms" checked={false} onChange={onChange} />)
    const box = screen.getByRole('checkbox')
    await user.tab()
    expect(box).toHaveFocus()
    await user.keyboard(' ')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('fires onChange on Enter while focused', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox aria-label="Accept terms" checked={false} onChange={onChange} />)
    await user.tab()
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
