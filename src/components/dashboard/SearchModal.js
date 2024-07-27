import { HamburgerIcon, Search2Icon } from '@chakra-ui/icons'
import { Box, Button, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { ArrowDownLeftIcon, ChartPieIcon, ShareIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Input } from 'postcss'

const SearchModal = () => {
  const [tasks, setTasks] = useState([
    {
    taskName: "header",
    description:"header is completed"
    },
    {
    taskName: "main",
    description:"main is completed"
    },
    {
    taskName: "footer",
    description:"footer is completed"
    }
]);
  const SearchColoring = ( text ) => {
      const regex = new RegExp(`(${searchValue})`, 'gi');
      const parts = text.split(regex);
      return (
        <span>
          {parts.map((part, index) =>
            part.match(regex) ? (
              <span className='text-blue-600 underline' key={index}>{part}</span> // Apply a <mark> element for the matching part
            ) : (
              part
            )
          )}
        </span>
      );
  };
  const [isHidden, setIsHidden] = useState(true);
  const [searchValue, setSearchValue] = useState(null);
  let value = new RegExp(searchValue, 'ig');
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  );

  useEffect(() => {
      if(!searchValue){
          setIsHidden(true);
      }else{
          setIsHidden(false);
          // if(tasksTemprory.length === 0){
          //     setIsHidden(true)
          // }

      }
  }, [searchValue]);
  const { isOpen, onOpen:OnOpenModal, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />);
  return (
    <>
      
      <Modal  isOpen={isOpen} size={{base:"md",lg:"3xl"}} onClose={()=>{
        onClose()
        setIsHidden(true)
        setSearchValue("")
      }}>
        {overlay}
        <ModalContent >
          <ModalHeader>
              <InputGroup>
                <InputLeftElement>
                    <Search2Icon />
                </InputLeftElement>
                <Input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='search for anything' />
              </InputGroup>
          </ModalHeader>
          <Divider hidden={isHidden} borderColor={"gray.400"} />
          {/* <ModalCloseButton /> */}
          <ModalBody maxHeight="500px" hidden={isHidden} overflow={"auto"}>
              {/* {
                tasksTemprory.map((task)=>{
                  return(
                    <Link key={task.title} onClick={()=>{
                        onClose()
                        setIsHidden(true)
                        setSearchValue("")
                    }} to={"/dashboard/profile"}>
                      <Flex justifyContent={"space-between"} px={"4"} borderRadius={"md"} _hover={{bg:"cyan.400",color:"whitesmoke"}}>
                          
                          <Box fontFamily={"sans-serif"} p={"4"} display="flex" alignItems={"center"} gap={"4"}>
                              <HamburgerIcon height={"50"} width={"30px"} />
                              <Box>
                                  <Heading className='font-sans' fontSize={"x-large"}>
                                        {SearchColoring(task.title)}
                                  </Heading>
                                  <Text>{SearchColoring(task.description)}</Text>
                              </Box>
                          </Box>
                          <ArrowDownLeftIcon width={"30px"} />
                      </Flex>
                    </Link>  
                  )
                })
              } */}
          </ModalBody>
          <ModalFooter hidden>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button 
        onClick={() => {
          setOverlay(<OverlayOne />)
          OnOpenModal()
        }}>
          <Search2Icon />
      </Button>
    </>
  )
}
export default SearchModal;
