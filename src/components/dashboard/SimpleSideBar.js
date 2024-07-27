import React, { ReactNode, useEffect, useState } from 'react';
import '../css/sideBar.css';
import axios from 'axios';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  // BoxProps,
  // FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
  ModalOverlay,
  Modal,
  Input,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,Divider,FormLabel, color, Badge
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
// import { IconType } from 'react-icons';

import { ReactText } from 'react';
import { Form, Link, NavLink } from 'react-router-dom';
import { ChevronDownIcon, MoonIcon, PhoneIcon, SunIcon } from '@chakra-ui/icons';
import SelectComponent from './SelectComponent';
import SearchModal from './SearchModal';
import { useDispatch, useSelector } from 'react-redux';
import { EyeIcon } from '@heroicons/react/24/outline';
// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }
const LinkItems = [
  { name: 'Home', icon: FiHome, href:"/dashboard" },
  { name: 'Image generation', icon: FiTrendingUp ,href:"/dashboard/projects" },
  { name: 'Text generation', icon: FiTrendingUp ,href:"/dashboard/projects" },
  { name: 'Grammar correction', icon: FiStar  ,href:"/dashboard/chat"},
  { name: 'Profil', icon: FiCompass  ,href:"/dashboard/profile"},
  { name: 'Settings', icon: FiSettings  ,href:"/dashboard/edit"},
];

export default function SidebarWithHeader({
  children,
}
) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

// interface SidebarProps extends BoxProps {
//   onClose: () => void;
// }

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem href={link.href} key={link.name} icon={link.icon}>
            {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

// interface NavItemProps extends FlexProps {
//   icon: IconType;
//   children: ReactText;
// }
const NavItem = ({ icon, children, href,...rest }) => {
  return (
    <NavLink style={{fontFamily:"Poppins", fontSize:"15px",textWrap:"nowrap"}} id="aaa" end="/" className="hover:bg-cyan-400 hover:text-white flex items-center p-4 mx-4 my-1 rounded-md cursor-pointer" to={href} _focus={{ boxShadow: 'none' }}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
    </NavLink>
  );
};

// interface MobileProps extends FlexProps {
//   onOpen: () => void;
// }
const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const signOut = () => {
      localStorage.removeItem('user')
      window.location.href = "/"
  }
  // useEffect(() => {
  //   try {
  //   } catch (error) {
  //     window.location.href="/";
  //   }
  // }, []);
  // socket.on('notif' , (notification) => {
  //     // setNotif([...notif, notification]);
  //     console.log(notif);
  // });
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />)
  return (
    <>
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>
      <Box display={{base:"none" , lg:"flex"}} gap={"4"}>   
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
              borderRadius='md'
              borderWidth='1px'
              fontSize="md"
              _hover={{ bg: 'gray.100' }}
              _expanded={{ bg: 'cyan.400',color:"white" }}
              _focus={{ boxShadow: 'outline' }}
            >
              Projects <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem 
          onClick={() => {
            setOverlay(<OverlayOne />)
          }}>New Project</MenuItem>
              <Link to={"/dashboard/projects"}>
                  <MenuItem>Show Projects</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem>Open...</MenuItem>
              <MenuItem>Save File</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition='all 0.2s'
              borderRadius='md'
              borderWidth='1px'
              fontSize="md"
              _hover={{ bg: 'gray.100' }}
              _expanded={{ bg: 'cyan.400',color:"white" }}
              _focus={{ boxShadow: 'outline' }}
            >
              Teams <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>Create team</MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuDivider />
              <MenuItem>Open...</MenuItem>
              <MenuItem>Save File</MenuItem>
            </MenuList>
          </Menu> 
      </Box>        
      <HStack spacing={{ base: '4', md: '6' }}>
        <Button
          onClick={() => {
            setOverlay(<OverlayOne />)
          }} type='button' bg="cyan.400" display={{ base: 'none', md: 'flex'}} color="white" _hover={{bg:"cyan.500"}}>Create</Button>
        <SearchModal />
        <Button size='md' onClick={toggleColorMode}>
            { colorMode === "dark" ? <SunIcon color="white" /> :<MoonIcon /> }
        </Button>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: 'none' }}
            >
              {/* <IconButton
                size="md"
                variant="ghost"
                aria-label="open menu"
                icon={}
              /> */}
              <Box display={"flex"}>
                <FiBell fontSize={"20px"}/>
                <Badge translateY={"20px"} variant='solid' borderRadius={"50%"} width={5} colorScheme='green'>
                    {10}
                </Badge>
              </Box>
          </MenuButton>
          <MenuList
            p={3}
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}>
              {/* {
                  notif.slice(0, 5).map((noti, index)=>{
                          return (<Link key={noti._id} to={"/dashboard/profile"}
                          >
                          <HStack
                            p={3}
                            borderRadius={5}
                            _hover={{
                              bg:colorMode ==="dark" ? "gray.500":"gray.200",
                            }}
                          >
                            <Avatar
                              bg={"purple"}
                              color={"white"}
                              name={auth && auth.user.fullname}
                              size={'sm'}
                              src={
                                auth && auth.user.avatar
                              }
                            />
                            <VStack
                              display={{ base: 'none', md: 'flex' }}
                              alignItems="flex-start"
                              spacing="1px"
                              ml="2">
                              <Text fontWeight={'bold'} fontSize="sm">
                                {noti.type}
                              </Text>
                              <Text fontSize="xs" color="gray.600">
                                {noti.message}
                              </Text>
                            </VStack>
                          </HStack>
                        </Link>)
                  })
              } */}
              <Button mt={5} width={"100%"}>
                  <EyeIcon width={25} className='mx-3' height={25} />
                  Show more
              </Button>
          </MenuList>
        </Menu>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  bg={"purple"}
                  color={"white"}
                  name={auth && auth.user.fullname}
                  size={'sm'}
                  src={
                    auth && auth.user.avatar
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">
                    {auth && auth.user.fullname}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {auth && auth.user.role}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <Link to={"/dashboard/profile"}>
                  <MenuItem>
                      Profile
                  </MenuItem>
              </Link>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
    </>
  );
};