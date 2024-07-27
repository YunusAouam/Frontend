import { Button, useColorMode } from '@chakra-ui/react';
import React from 'react'

export const ButtonColorMode = () => {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
      {/* Rest of your component */}
    </>
  )
}
