import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons'

import MobileNav from './partials/MobileNav'
import DesktopNav from './partials/DesktopNav'
import ModalComponent from './ModalComponents'
import SigninForm from './auth/SigninForm'
import SignupForm from './auth/SignupForm'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const auth = useSelector(state => state.auth);
  return (
    <Box w={"90%"} margin={"20px auto"} rounded={"full"}>
      <Flex
        style={{boxShadow:"0 0px 6px 0 rgba(0, 0, 0, 0.19), 0 0px 6px 0 rgba(0, 0, 0, 0.19)"}}
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'70px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        rounded={"full"}
        >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Logo
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
            {
              !auth.user ? (
                <>
                    <ModalComponent component={<SigninForm />} content={"Sign in"} />
                    <ModalComponent 
                        bg="black" 
                        color="white" 
                        fontWeight="bold"
                        fontFamily="Poppins"
                        content="Sign up"
                        _hover={{
                            boxShadow:"xl"
                        }}

                        component={<SignupForm />}
                    />
                
                </>
              ):
              <Link to={"/dashboard"}>
                  <Button bg={"black"} color={"white"} rounded={"full"} fontFamily={"Poppins"}>Dashboard</Button>
              </Link>
              
            }
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}
