import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Divider, Flex, FormErrorIcon, HStack, Heading, SimpleGrid, Text, useStyleConfig } from "@chakra-ui/react";
// import { ButtonColorMode } from "../components/buttonColorMode";
import { useLoaderData } from "react-router-dom";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";

export default function Dashboard() { 

  return (
    // <Container as="section">
    //   <ButtonColorMode />
    //   <Heading>
    //     chakra UI component
    //   </Heading>
    //   <Box sx={stylesBox}>
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quos dicta eligendi a optio necessitatibus sed inventore labore? Laborum sapiente sed accusamus pariatur in similique eius minima eos cupiditate eaque!
    //   </Box>
    // </Container>
    <>
        <Flex flexDirection={{base:"column", md:"row", lg:"row"}} gap={5} p={5} h={"100%"}>
            <Box flex={1} display={"flex"} flexDirection={"column"} rounded={"md"} border={"1px solid lightgrey"} p={5} h={{base:"350", md:"450", lg:"450", xl:"800"}}>
                <img className="m-auto" width={560} height={700} src="/images/AiWriter.png" alt="" />
                <Text fontFamily={"Poppins"} fontWeight={"bold"} align={"center"}>AI Writer</Text>
                <Text as={'p'} fontFamily={"Poppins"} color={"gray.400"} align={"center"}>Generate text based on your content type and use case</Text>
                <Button mt={"20px"} fontFamily={"Poppins"} type='button' bg="cyan.400" color="white" _hover={{bg:"cyan.500"}}>Generate Text</Button>
            </Box>
            <Box flex={1} display={"flex"} flexDirection={"column"} rounded={"md"} border={"1px solid lightgrey"} p={5} h={{base:"350", md:"450", lg:"450", xl:"800"}}>
                <img className="m-auto" width={300} height={300} src="/images/image-upload-landing-page.png" alt="" />
                <Text fontFamily={"Poppins"} fontWeight={"bold"} align={"center"}>AI Images</Text>
                <Text as={'p'} fontFamily={"Poppins"} color={"gray.400"} align={"center"}>Generate Images based on a description and desired style</Text>
                <Button mt={"20px"} fontFamily={"Poppins"} type='button' bg="cyan.400" color="white" _hover={{bg:"cyan.500"}}>Generate Image</Button>
            </Box>
            <Box flex={1} display={"flex"} flexDirection={"column"} rounded={"md"} border={"1px solid lightgrey"} p={5} h={{base:"350", md:"450", lg:"450", xl:"800"}}>
                <img className="m-auto" width={300} height={300} src="/images/image-upload-landing-page.png" alt="" />
                <Text fontFamily={"Poppins"} fontWeight={"bold"} align={"center"}>AI grammar corrector</Text>
                <Text as={'p'} fontFamily={"Poppins"} color={"gray.400"} align={"center"}>Correct your grammatical errors using AI</Text>
                <Button mt={"20px"} fontFamily={"Poppins"} type='button' bg="cyan.400" color="white" _hover={{bg:"cyan.500"}}>Grammar Correction </Button>
            </Box>
        </Flex>
    </>
  )
}