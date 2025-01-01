import { Box, useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { verifyDatabaseSetup } from './utils/setupVerification'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { searchContact } from './services/api'

function App() {
  const [selectedContact, setSelectedContact] = useState(null)
  const [loading, setLoading] = useState(false)
  const [setupVerified, setSetupVerified] = useState(false)
  const toast = useToast()

  useEffect(() => {
    verifySetup()
  }, [])

  const verifySetup = async () => {
    const result = await verifyDatabaseSetup()
    
    if (!result.success) {
      toast({
        title: 'Setup Error',
        description: result.error,
        status: 'error',
        duration: null,
        isClosable: true
      })
      return
    }

    setSetupVerified(true)
  }

  const handleSearch = async (phone) => {
    setLoading(true)
    try {
      const contact = await searchContact(phone)
      setSelectedContact(contact)
    } catch (error) {
      toast({
        title: 'Error searching contact',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  if (!setupVerified) {
    return (
      <Box display="flex" h="100vh" alignItems="center" justifyContent="center">
        Verificando configuração...
      </Box>
    )
  }

  return (
    <Box display="flex" h="100vh">
      <Sidebar onSelectContact={handleSearch} />
      <MainContent
        selectedContact={selectedContact}
        loading={loading}
        onSearch={handleSearch}
      />
    </Box>
  )
}

export default App
