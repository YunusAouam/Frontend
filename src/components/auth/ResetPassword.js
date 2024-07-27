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
import { useEffect, useState } from "react";
import { changePassword, resetPasswordComplete } from "../../slices/authSlice";
import PasswordInput from "../partials/PasswordInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
function ResetPassword() {
    const toast = useToast();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const {userId, token} = useParams();
    const [isLoading, setIsLoading] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChangePassword = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if(newPassword == confirmNewPassword){
            const resultAction = await dispatch(changePassword({newPassword, userId, token }));
            if (changePassword.fulfilled.match(resultAction)) {
                toast({
                    title: resultAction.payload.message,
                    status: "success",
                    position: "top-right"
                });
                navigate("/")
            } else if (changePassword.rejected.match(resultAction)) {
                toast({
                    title: "Change password Failed",
                    description: resultAction.payload || resultAction.error.message,
                    status: "error",
                    position: "top-right"
                });
            }
        }else{
            toast({
                title: "Password confirmation is incorrect",
                description: "try again",
                status: "error",
                position: "top-right"
            });
        }
        
    
        setIsLoading(false);
    };

    useEffect(() => {
        const handleResetPasswordComplete = async () => {  
            const resultAction = await dispatch(resetPasswordComplete({ userId, token }));
            if (resetPasswordComplete.fulfilled.match(resultAction)) {
                // toast({
                //     title: "a link has been sent to your email",
                //     description: "Check your email",
                //     status: "success",
                //     position: "top-right"
                // });
            } else if (resetPasswordComplete.rejected.match(resultAction)) {
                toast({
                    title: "Reset password Failed",
                    description: resultAction.payload || resultAction.error.message,
                    status: "error",
                    position: "top-right"
                });
            }
        }
        handleResetPasswordComplete();
    }, [userId, token, navigate]);
    return (   
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
                    Reset your password
                </Heading>
                <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                    enter a the new password
                </Text>
                </Stack>
                <Box onSubmit={handleChangePassword} as={"form"} mt={10}>
                <Stack spacing={4}>
                    <PasswordInput placeholder={"enter the new password"} setPassword={setNewPassword} />
                    <PasswordInput placeholder={"confirm your password"} setPassword={setConfirmNewPassword} />
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
    );
}

export default ResetPassword;