// src/components/GoogleLoginButton.js

import React, { useRef, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { signInUser, signUpUser } from '../../slices/authSlice';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const googleLoginButtonRef = useRef(null);
    const responseGoogle = async (response) => {
        setIsLoading(true);
        if(response.profileObj){
            const {name, email, imageUrl, googleId} = response.profileObj;
            const resultActionSignUp = await dispatch(signUpUser({fullname: name, email, password:googleId , isGoogleAccount: true, avatarGoogle: imageUrl}));
            if(signUpUser.fulfilled.match(resultActionSignUp)){
                const resultAction = await dispatch(signInUser({ email, password:googleId, isGoogleAccount : false}));
                if (signInUser.fulfilled.match(resultAction)) {
                    toast({
                        title: "Login succeeded!",
                        description: "You're logged in",
                        status: "success",
                        position: "top-right",
                        isClosable:true
                    });
                    navigate("/");
                } else if (signInUser.rejected.match(resultAction)) {
                    toast({
                        title: "Sign In Failed",
                        description: resultAction.payload || resultAction.error.message,
                        status: "error",
                        position: "top-right"
                    });
                }
            }else if(signUpUser.rejected.match(resultActionSignUp)){
                toast({
                    title: "Sign Up failed",
                    description:resultActionSignUp.payload || resultActionSignUp.error.message,
                    duration:4000,
                    isClosable:true,
                    status:"error",
                    position:"top-right"
                });
            }
        }
        setIsLoading(false);
    };
    const responseFailed = () => {
        toast({
            title: "Sign In with google failed",
            description:"",
            duration:4000,
            isClosable:true,
            status:"error",
            position:"top-right"
        });
    }
    const triggerGoogleLogin = () => {
        if (googleLoginButtonRef.current) {
            googleLoginButtonRef.current.click();
        }
    };
    return (
        
        <>
            {
                isLoading &&
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='lg'
                />
            }
            <GoogleLogin
                clientId="87480562921-64nlsstp2ubhue6dcgdgpaifh3qnvuc3.apps.googleusercontent.com"
                buttonText="Login with your Google account"
                onSuccess={responseGoogle}
                onFailure={responseFailed}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <button ref={googleLoginButtonRef} onClick={renderProps.onClick} style={{ display: 'none' }}>
                      Hidden Google Login Button
                    </button>
                )}
            />
            {
                !isLoading && <Button
                fontSize={"small"}
                rounded={'full'}
                bg={'grey.100'}
                color={'black'}
                border={"1px solid lightgrey"}
                gap={2}
                _hover={{
                  border:"1px solid black"
                }}
                onClick={triggerGoogleLogin}
              >
                {/* <Icon w={6} h={5} viewBox="0 0 48 48">
                  <path fill="#4285F4" d="M24 9.5c3.94 0 6.96 1.6 9.1 2.95l6.72-6.72C34.85 2.7 29.9 0 24 0 14.74 0 7.06 5.92 3.7 14.54l7.87 6.13C13.25 15.02 18.22 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24.5c0-1.53-.14-2.99-.4-4.4H24v8.34h12.82c-.5 2.55-2 4.71-4.23 6.1v5.06h6.81c4-3.68 6.3-9.1 6.3-15.1z"/>
                  <path fill="#FBBC05" d="M12.57 27.73c-.64-1.53-1-3.16-1-4.73s.36-3.2 1-4.73l-7.87-6.13C2.65 15.3 2 19.08 2 23s.65 7.7 1.7 11.13l7.87-6.13z"/>
                  <path fill="#EA4335" d="M24 48c5.9 0 10.85-1.95 14.47-5.3l-6.81-5.06c-1.9 1.33-4.27 2.16-7.66 2.16-5.78 0-10.75-4.52-12.43-10.54l-7.87 6.13C7.06 42.08 14.74 48 24 48z"/>
                </Icon> */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="GoogleG_FullColor_24px 1" clipPath="url(#clip0_218_4416)">
                  <g id="24px">
                  <path id="Vector" d="M17.25 9.2025C17.2488 8.63207 17.2012 8.06269 17.1075 7.5H9V10.5H13.5675C13.3661 11.7023 12.7376 12.7914 11.7975 13.5675V15.8175H14.64C15.5063 14.9534 16.1851 13.9201 16.6342 12.7819C17.0832 11.6438 17.2929 10.4253 17.25 9.2025Z" fill="#4285F4"/>
                  <path id="Vector_2" d="M8.81257 18C10.9644 18.0547 13.0536 17.2723 14.6401 15.8175L11.7976 13.5675C10.9102 14.1578 9.86305 14.4615 8.79757 14.4375C7.68219 14.4186 6.60183 14.0449 5.71314 13.3707C4.82445 12.6964 4.17363 11.7566 3.85507 10.6875H0.945068V13.005C1.65644 14.4913 2.77128 15.7477 4.16238 16.6309C5.55348 17.5141 7.16482 17.9885 8.81257 18Z" fill="#34A853"/>
                  <path id="Vector_3" d="M3.87001 10.7175C3.49 9.604 3.49 8.39594 3.87001 7.28247V4.96497H0.945007C0.323647 6.21929 0.000366211 7.60017 0.000366211 8.99997C0.000366211 10.3998 0.323647 11.7806 0.945007 13.035L3.87001 10.7175Z" fill="#FABB05"/>
                  <path id="Vector_4" d="M8.81257 3.56244C9.43748 3.55375 10.058 3.66853 10.6384 3.90019C11.2189 4.13186 11.7479 4.47586 12.1951 4.91244L14.7076 2.34744C13.1273 0.820889 11.0097 -0.0223831 8.81257 -5.59636e-05C7.16802 0.00867977 5.55891 0.478599 4.16813 1.35629C2.77735 2.23398 1.66069 3.48423 0.945068 4.96494L3.87007 7.28244C4.19392 6.21896 4.84701 5.28572 5.73524 4.61719C6.62347 3.94866 7.70099 3.57934 8.81257 3.56244Z" fill="#E94235"/>
                  </g>
                  </g>
                  <defs>
                  <clipPath id="clip0_218_4416">
                  <rect width="17.25" height="18" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                Register with Google
            </Button>
            }
        </>
    );
};

export default GoogleLoginButton;
