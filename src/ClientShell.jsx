import { useState } from 'react'
import ClientSelector from './ClientSelector'
import App from './App'
import MobileTutorsApp from './MobileTutorsApp'

export default function ClientShell() {
  const [selectedClient, setSelectedClient] = useState(null)

  if (!selectedClient) {
    return <ClientSelector onSelect={setSelectedClient} />
  }

  const onBack = () => setSelectedClient(null)

  if (selectedClient === 'mobile-tutors') {
    return <MobileTutorsApp onBack={onBack} />
  }

  return <App onBack={onBack} />
}
