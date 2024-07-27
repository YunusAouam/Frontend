import { Button, useDisclosure } from "@chakra-ui/react";

function ButtonModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return ( 
        <Button
          onClick={() => {
            onOpen()
          }}
        >
            {children}
        </Button>
     );
}

export default ButtonModal;