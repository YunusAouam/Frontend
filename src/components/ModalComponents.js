import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react"
import React from "react"

export default function ModalComponent(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button
          fontSize={"small"}
          rounded={"full"}
          onClick={() => {
            onOpen()
          }}
          {...props}
        >
          {props.content}
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
          />
            <ModalContent
            >
              <img style={{position:"absolute", left:"0px", top:"0px" , transform:"rotate(180deg)", userSelect:"none", "WebkitUserDrag":"none", pointerEvents:"none"}} src="https://www.kaggle.com/static/images/login/login-box-blobs.png" />
              <ModalHeader fontFamily="Poppins" ml="40px">Signup</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  {React.cloneElement(props.component, {onClose})}
              </ModalBody>
              {/* <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter> */}
            </ModalContent>
        </Modal>
      </>
    )
  }