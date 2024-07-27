import { Box, Button, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom';
import {CheckCircleIcon, CheckIcon, InfoIcon} from '@chakra-ui/icons';
import NotFound from '../NotFound';
import Header from '../Header';
export default function EmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
        try {
            const {data} = await axios.get(`/${params.id}/verify/${params.token}`);
            console.log(data.message);
            setValidUrl(true);
        } catch (error) {
            console.log(error);
            setValidUrl(false);
        }
    }
    verifyEmailUrl();
  },[params]);
  return (
    <Fragment>
        <Header />
        {
            validUrl ? (<Box textAlign="center" py={10} px={6}>
                <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                  Email verified successfully!
                </Heading>
                <Text color={'gray.500'}>
                    Sign in now to access <b>Craftify</b>
                </Text>
                <Button mt={3}>Sign in</Button>
              </Box>

            ) : (<NotFound />)
        }
    </Fragment>
  )
}
