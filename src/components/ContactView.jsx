import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  useColorModeValue,
  Button,
  Avatar,
  Divider,
  Icon,
  Skeleton,
  Spinner,
  Center
} from '@chakra-ui/react'
import { FaWhatsapp, FaBrain, FaChartLine } from 'react-icons/fa'
import { format } from 'date-fns'

// Exportação padrão corrigida
const ContactView = ({ contact, loading }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  if (loading) {
    return (
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" />
          <Text fontSize="lg" color="gray.500">
            Analisando as mensagens e gerando o melhor resumo...
          </Text>
          <Text fontSize="sm" color="gray.400" textAlign="center">
            Isso pode levar alguns segundos enquanto processamos as informações
          </Text>
        </VStack>
      </Center>
    )
  }

  if (!contact) {
    return (
      <Center h="400px">
        <Text fontSize="lg" color="gray.500">
          Pesquise um número para ver as mensagens e o resumo
        </Text>
      </Center>
    )
  }

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <HStack spacing={4}>
          <Avatar 
            size="xl" 
            name={contact?.name} 
            src={contact?.profilePicture} 
          />
          <Box>
            <Heading size="lg">{contact?.name || contact?.id}</Heading>
            <Text color="gray.500">{contact?.status}</Text>
            <Badge colorScheme="green" mt={2}>
              <Icon as={FaWhatsapp} mr={2} />
              {contact?.presence || 'Offline'}
            </Badge>
          </Box>
        </HStack>

        <Divider />

        {contact?.summary ? (
          <Box>
            <Heading size="md" mb={4}>
              <Icon as={FaBrain} mr={2} />
              Resumo da Conversa
            </Heading>
            <Box
              p={4}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              bg="gray.50"
            >
              <Text whiteSpace="pre-line">{contact.summary}</Text>
            </Box>
          </Box>
        ) : (
          <Box>
            <Heading size="md" mb={4}>
              <Icon as={FaBrain} mr={2} />
              Resumo da Conversa
            </Heading>
            <Box
              p={4}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              bg="red.50"
            >
              <Text color="red.500">Não foi possível gerar o resumo</Text>
            </Box>
          </Box>
        )}

        <Box>
          <Heading size="md" mb={4}>
            <Icon as={FaChartLine} mr={2} />
            Conversas
          </Heading>
          <VStack align="stretch" spacing={4}>
            {contact?.messages?.map((message, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                bg={message.fromMe ? 'brand.50' : 'white'}
                ml={message.fromMe ? 'auto' : 0}
                mr={message.fromMe ? 0 : 'auto'}
                maxW="80%"
              >
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold">
                    {message.fromMe ? 'Você' : message.sender}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    {format(new Date(message.timestamp * 1000), 'PPp')}
                  </Text>
                </HStack>
                <Text>{message.text}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

// Exportação padrão adicionada
export default ContactView
