import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../slices/authSlice";
import PasswordInput from "../partials/PasswordInput";
import {Link, useNavigate} from 'react-router-dom';
import GoogleLoginButton from "./GoogleLoginButton";
import BeatLoader from 'react-spinners/BeatLoader';

function SigninForm({onClose}) {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate()
    const handleSignIn = async (e) => {
      setIsLoading(true);
      e.preventDefault();
      const resultAction = await dispatch(signInUser({ email, password, isGoogleAccount : false }));
      if (signInUser.fulfilled.match(resultAction)) {
          toast({
              title: "Login succeeded!",
              description: "You're logged in",
              status: "success",
              position: "top-right",
              isClosable:true
          });
          navigate('/');
      } else if (signInUser.rejected.match(resultAction)) {
          toast({
              title: "Sign In Failed",
              description: resultAction.payload || resultAction.error.message,
              status: "error",
              position: "top-right"
          });
      }
      setIsLoading(false);
    };
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
          Join <b>Craftify</b> - The Ultimate AI Content Platform
          <Text as={"span"} bg="blue.300" bgClip="text">
            !
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Sign up now to create high-quality, engaging content effortlessly.
          Perfect for marketers, bloggers, entrepreneurs, and creatives.
        </Text>
      </Stack>
      <Box as={"form"} onSubmit={handleSignIn} mt={10}>
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
          <PasswordInput setPassword={setPassword} />
          <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'end'}
                justify={'flex-end'}>
                <Link onClick={() => {
                    onClose();
                }} to={"/forgot-password"} className="text-blue-400 hover:underline">Forgot password</Link>
          </Stack>
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
          rounded={"full"}
          isLoading={isLoading} 
          spinner={<BeatLoader  size={8} color='white' />}
        >
          Sign In
        </Button>
      </Box>
      <GoogleLoginButton />
      form
      <img
        style={{
          position: "absolute",
          right: "0px",
          bottom: "0px",
          userSelect: "none",
          WebkitUserDrag: "none",
          pointerEvents: "none",
        }}
        src="https://www.kaggle.com/static/images/login/login-box-blobs.png"
      />
    </Stack>
  );
}

export default SigninForm;
