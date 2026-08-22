import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NativeSelect } from '../../components/Corporate/NativeSelect/NativeSelect'

describe('Corporate NativeSelect', () => {
  it('renders a combobox role', () => {
    render(
      <NativeSelect defaultValue="apple" aria-label="Fruit">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </NativeSelect>,
    )
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument()
  })

  it('applies the default corp-select className', () => {
    render(
      <NativeSelect aria-label="Fruit">
        <option>Apple</option>
      </NativeSelect>,
    )
    expect(screen.getByRole('combobox')).toHaveClass('corp-select')
  })

  it('renders a native select element', () => {
    render(
      <NativeSelect aria-label="Fruit">
        <option>Apple</option>
      </NativeSelect>,
    )
    expect(screen.getByRole('combobox')).toBeInstanceOf(HTMLSelectElement)
  })

  it('renders the provided options', () => {
    render(
      <NativeSelect aria-label="Fruit">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </NativeSelect>,
    )
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
  })
})
