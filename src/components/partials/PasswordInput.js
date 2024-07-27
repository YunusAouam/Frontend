import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"

export default function PasswordInput({setPassword, placeholder}) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <InputGroup size='md'>
            <Input
            onChange={(e)=>setPassword(e.target.value)}
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder={placeholder}
            />
            <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
            </Button>
            </InputRightElement>
        </InputGroup>
    )
}