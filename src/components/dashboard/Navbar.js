import { UnlockIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, Box, Button, Flex, HStack, Heading, Spacer, Text, useToast } from '@chakra-ui/react'
import React from 'react'

export default function NavBar() { 
  const toast = useToast();
  const showToast = () => {
      toast({
        title:"Logged out",
        description:"you have been logged out successfully !",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"top",
        icon:<UnlockIcon />
      });
  }
  return (
    <Flex as="nav" p="10px" mb={"40px"} alignItems="center">
        <Heading as="h1">
            Djojo Tasks
        </Heading>
        <Spacer />
        <HStack spacing="10px">
            <Avatar name='Aouam Youness' src="/img/mario.png">
                <AvatarBadge minWidth={"1.2rem"} px={"3px"} bg={"teal.500"}>
                    <Text fontSize={"xs"}>3</Text>
                </AvatarBadge>
            </Avatar>
            <Text>yunusaouam22@gmail.com</Text>
            <Button onClick={showToast}>Logout</Button>
        </HStack>
    </Flex>
  )
}
