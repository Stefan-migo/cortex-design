import { useState, useEffect, useCallback } from 'react'

export function useHashRoute() {
  const getRoute = () => {
    const hash = window.location.hash.slice(1)
    return hash || 'home'
  }

  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((path) => {
    window.location.hash = '#' + path
  }, [])

  return { route, navigate }
}
