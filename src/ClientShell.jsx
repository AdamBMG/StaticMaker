import { useState, useEffect, useCallback } from 'react'
import ClientSelector from './ClientSelector'
import App from './App'
import MobileTutorsApp from './MobileTutorsApp'

export default function ClientShell() {
  const [selectedClient, setSelectedClient] = useState(null)

  // On mount, check if URL has a client hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) setSelectedClient(hash)
  }, [])

  // Listen for browser back/forward
  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace('#', '')
      setSelectedClient(hash || null)
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const selectClient = useCallback((id) => {
    setSelectedClient(id)
    window.history.pushState(null, '', '#' + id)
  }, [])

  const goBack = useCallback(() => {
    setSelectedClient(null)
    window.history.pushState(null, '', window.location.pathname)
  }, [])

  if (!selectedClient) {
    return <ClientSelector onSelect={selectClient} />
  }

  if (selectedClient === 'mobile-tutors') {
    return <MobileTutorsApp onBack={goBack} />
  }

  return <App onBack={goBack} />
}
