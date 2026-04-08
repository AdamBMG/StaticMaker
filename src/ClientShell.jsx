import { useState } from 'react'
import ClientSelector from './ClientSelector'
import App from './App'

export default function ClientShell() {
  const [selectedClient, setSelectedClient] = useState(null)

  if (!selectedClient) {
    return <ClientSelector onSelect={setSelectedClient} />
  }

  return <App onBack={() => setSelectedClient(null)} />
}
