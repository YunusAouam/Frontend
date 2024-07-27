import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useToast,
  } from "@chakra-ui/react";
import { useState } from "react";
import { resetPassword } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import Header from '../Header';

function ForgotPassword() {
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const dispatch = useDispatch();
    const handleResetPassword = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        
        const resultAction = await dispatch(resetPassword({ email }));
    
        if (resetPassword.fulfilled.match(resultAction)) {
            toast({
                title: "a link has been sent to your email",
                description: "Check your email",
                status: "success",
                position: "top-right"
            });
            // setTimeout(() => {
            //     window.location.href = "/dashboard";
            // }, 500);
        } else if (resetPassword.rejected.match(resultAction)) {
            toast({
                title: "Reset password Failed",
                description: resultAction.payload || resultAction.error.message,
                status: "error",
                position: "top-right"
            });
        }
    
        setIsLoading(false);
    };
    return (   
        <> 
        <Header />
        <Flex justifyContent={"center"} >
            <Stack
                border={"1px solid lightgrey"}
                position="relative"
                overflow="hidden"
                bg={"transparent"}
                rounded={"xl"}
                p={{ base: 4, sm: 6, md: 8 }}
                spacing={{ base: 8 }}
                w={"md"}
                fontFamily="Poppins"
            >
                <Stack spacing={4}>
                <Heading
                    color={"gray.800"}
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl", md: "3xl" }}
                    fontFamily="Poppins"
                >
                    You forgot ur password
                </Heading>
                <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                    We will email you a link to reset your password.
                </Text>
                </Stack>
                <Box as={"form"} onSubmit={handleResetPassword} mt={10}>
                <Stack spacing={4}>
                    <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                        color: "gray.500",
                    }}
                    />
                </Stack>
                <Button
                    type="submit"
                    fontFamily={"heading"}
                    mt={8}
                    w={"full"}
                    bg="blue.300"
                    color={"white"}
                    _hover={{
                    bgGradient: "blue.200",
                    boxShadow: "xl",
                    }}
                    // disabled={isLoading && true}
                >
                    Reset password
                </Button>
                </Box>
                form
                <img
                style={{
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                    userSelect: "none",
                    WebkitUserDrag: "none",
                    pointerEvents: "none",
                    objectFit: "contain",
                }}
                src="https://www.kaggle.com/static/images/login/login-box-blobs.png"
                />
            </Stack>
        </Flex>   
        </>
    );
}

export default ForgotPassword;