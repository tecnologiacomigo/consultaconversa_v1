import {
  Box,
  VStack,
  Icon,
  Text,
  Heading,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import { FaWhatsapp, FaCog, FaHistory } from 'react-icons/fa'

function Sidebar({ onSelectContact }) {
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      w="64"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      p="4"
      boxShadow="sm"
    >
      <VStack spacing="6" align="stretch">
        <Box>
          <Heading size="md" mb="4" color="brand.600">
            Message Summary
          </Heading>
        </Box>

        <VStack spacing="3" align="stretch">
          <Button
            leftIcon={<Icon as={FaWhatsapp} />}
            variant="ghost"
            justifyContent="flex-start"
            colorScheme="brand"
            onClick={() => onSelectContact('5511999999999')}
          >
            Test Contact
          </Button>
          <Button
            leftIcon={<Icon as={FaHistory} />}
            variant="ghost"
            justifyContent="flex-start"
          >
            History
          </Button>
          <Button
            leftIcon={<Icon as={FaCog} />}
            variant="ghost"
            justifyContent="flex-start"
          >
            Settings
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}

export default Sidebar
