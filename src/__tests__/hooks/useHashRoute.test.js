import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useHashRoute } from '../../hooks/useHashRoute'

describe('useHashRoute', () => {
  it('returns "home" when there is no hash', () => {
    window.location.hash = ''
    const { result } = renderHook(() => useHashRoute())
    expect(result.current.route).toBe('home')
  })

  it('returns the hash path as the route', () => {
    window.location.hash = '#/text-animations'
    const { result } = renderHook(() => useHashRoute())
    expect(result.current.route).toBe('/text-animations')
  })

  it('handles nested component routes', () => {
    window.location.hash = '#/animations/strands'
    const { result } = renderHook(() => useHashRoute())
    expect(result.current.route).toBe('/animations/strands')
  })

  it('updates when hash changes', () => {
    window.location.hash = ''
    const { result } = renderHook(() => useHashRoute())
    expect(result.current.route).toBe('home')

    act(() => {
      window.location.hash = '#/text-animations'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(result.current.route).toBe('/text-animations')
  })

  it('returns navigate function that updates hash', () => {
    const { result } = renderHook(() => useHashRoute())

    act(() => {
      result.current.navigate('/animations/strands')
    })

    expect(window.location.hash).toBe('#/animations/strands')
  })
})
