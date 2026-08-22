import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Progress } from '../../components/Corporate/Progress/Progress'

const getBar = (view) => view.container.firstChild

describe('Corporate Progress', () => {
  it('renders role=progressbar with value, min, and max', () => {
    const view = render(<Progress value={40} min={0} max={100} />)
    const bar = getBar(view)
    expect(bar).toHaveAttribute('role', 'progressbar')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
    expect(bar).toHaveAttribute('aria-valuenow', '40')
  })

  it('defaults to a 0..100 range', () => {
    const view = render(<Progress value={25} />)
    const bar = getBar(view)
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
    expect(bar).toHaveAttribute('aria-valuenow', '25')
  })

  it('clamps value to the [min, max] range', () => {
    const view = render(<Progress value={150} min={0} max={100} />)
    expect(getBar(view)).toHaveAttribute('aria-valuenow', '100')
    const view2 = render(<Progress value={-5} min={0} max={100} />)
    expect(getBar(view2).firstChild).toBeTruthy()
    expect(view2.container.firstChild).toHaveAttribute('aria-valuenow', '0')
  })

  it('drives width fraction via the --corp-value custom property', () => {
    const view = render(<Progress value={40} min={0} max={100} />)
    expect(getBar(view)).toHaveStyle({ '--corp-value': '40%' })
  })

  it('maps a custom range onto the width fraction', () => {
    const view = render(<Progress value={25} min={0} max={200} />)
    expect(getBar(view)).toHaveStyle({ '--corp-value': '12.5%' })
    expect(getBar(view)).toHaveAttribute('aria-valuenow', '25')
  })

  it('supports aria-label and aria-valuetext', () => {
    const view = render(
      <Progress value={25} min={0} max={200} aria-label="Quota used" aria-valuetext="25 of 200 GB used" />,
    )
    const bar = getBar(view)
    expect(bar).toHaveAttribute('aria-label', 'Quota used')
    expect(bar).toHaveAttribute('aria-valuetext', '25 of 200 GB used')
  })
})
