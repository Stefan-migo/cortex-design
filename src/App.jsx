import { useMemo } from 'react'
import { useHashRoute } from './hooks/useHashRoute'
import { Layout } from './components/Layout/Layout'
import { Library } from './pages/Library'
import { ComponentDetail } from './pages/ComponentDetail'
import { getById } from './data/registry'
import './App.css'

export default function App() {
  const { route, navigate } = useHashRoute()

  /* route examples:
     'home'                              → Library
     '/text-animations'                  → Library (filtered by category)
     '/components/glitch-text'           → ComponentDetail for glitch-text
  */
  const parts = route.split('/').filter(Boolean)
  const isComponentRoute = parts.length >= 2 && parts[0] === 'components'
  const componentId = isComponentRoute ? parts[1] : null
  const component = useMemo(() => (componentId ? getById(componentId) : null), [componentId])

  const handleBack = () => navigate('/')

  return (
    <Layout>
      {isComponentRoute ? (
        <ComponentDetail component={component} onBack={handleBack} />
      ) : (
        <Library onNavigate={(id) => navigate('/components/' + id)} />
      )}
    </Layout>
  )
}
