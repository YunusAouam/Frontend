import {
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Hero3d } from './3d/Hero3d'
import ModalComponent from './ModalComponents'
import SignupForm from './auth/SignupForm'
import GoogleLoginButton from './auth/GoogleLoginButton'

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
      <Stack style={{backgroundImage:"url('http://localhost:3000/images/beams-home@95.jpg')", fontFamily:"Poppins"}} minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex mt={{lg:-35}} p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <br />{' '}
              <Text fontFamily={"Poppins"} color={'black'} as={'span'}>
                  The only AI content platform that does everything you need
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                  Effortless Content Creation, Powered by Advanced AI – 
                  Your All-in-One Solution for Every Need.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <GoogleLoginButton />
              <ModalComponent component={<SignupForm />} content="Register with email" />
              {/* <Button
                rounded={'full'}
                bg={"transparent"}
                color={'black'}
                _hover={{
                  bg:"#E4E4E4"
                }}>
                Register with email
              </Button> */}
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
            <Hero3d />
        </Flex>
      </Stack>
  )
}