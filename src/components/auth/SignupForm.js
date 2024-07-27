import { Box, Button, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import PasswordInput from "../partials/PasswordInput";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../slices/authSlice";
import BeatLoader from "react-spinners/BeatLoader";
import GoogleLoginButton from "./GoogleLoginButton";

function SignupForm() {
    const toast = useToast();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const resultActionSignUp = await dispatch(signUpUser({fullname, email, password, isGoogleAccount:false, avatarGoogle : ""}));
        if(signUpUser.fulfilled.match(resultActionSignUp)){
            setEmail('');
            setFullname('');
            setPassword('');
            toast({
              title: "You're signed up!",
              description : resultActionSignUp.payload.message,
              duration:3000,
              isClosable:true,
              status:"success",
              position:"top-right"
          });
        }else if(signUpUser.rejected.match(resultActionSignUp)){
            toast({
                title: "Sign Up failed",
                description : resultActionSignUp.payload || resultActionSignUp.error.message,
                duration:4000,
                isClosable:true,
                status:"error",
                position:"top-right"
            });
        }
        setIsLoading(false);
    }
  return (
    <Stack
      bg={"transparent"}
      rounded={"xl"}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: "lg" }}
      fontFamily="Poppins"
    >
      <Stack spacing={4}>
        <Heading
            color={"gray.800"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "3xl" }}
            fontFamily="Poppins"
        >
          Join Craftify today
          <Text as={"span"} bg="blue.300" bgClip="text">
            !
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
            Sign up now to access <b>Craftify</b>, the ultimate AI content
            platform. Whether you're a marketer, blogger, entrepreneur, or
            creative professional, our advanced AI helps you create high-quality,
            engaging content quickly and easily.
        </Text>
      </Stack>
      <Box as={"form"} onSubmit={handleSignUp} mt={10}>
        <Stack spacing={4}>
          <Input
                value={fullname}
                onChange={(e)=>setFullname(e.target.value)}
                placeholder="Fullname"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                color: "gray.500",
                }}
          />
          <Input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="email"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                color: "gray.500",
                }}
          />
          <PasswordInput setPassword={setPassword} />
        </Stack>
        <Button
            rounded={"full"}
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
            isLoading={isLoading}
            spinner={<BeatLoader size={8} color="white" />}
        >
          Sign Up
        </Button>
      </Box>
      <GoogleLoginButton />
      form
      <img style={{position:"absolute", right:"0px", bottom:"0px", userSelect:"none", "WebkitUserDrag":"none", pointerEvents:"none"}} src="https://www.kaggle.com/static/images/login/login-box-blobs.png" />
    </Stack>
  );
}

export default SignupForm;
