import { Box, Button, Heading, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { Container } from '../container';


export const HomePageNotLoggedIn = () => {

    const router = useRouter();

    return (
        <Container>
            <Box top='25vh' position='absolute' textAlign='center'>
                <Box alignContent='center' width='1100px' position='relative'>
                    <Heading mt={40} textAlign='center' left={0} right={0} position='absolute' mb={5}>Take control of your goals.</Heading>
                    <Heading mt={40} top={'60px'} textAlign='center' left={0} right={0} position='absolute' mb={5}>Track calories, log workouts and see your progress.</Heading>
                    <Heading mt={40} top={'120px'} textAlign='center' left={0} right={0} position='absolute' mb={5}>Stay motivated with group activities.</Heading>
                    <Button 
                        top={'600px'}
                        onClick={() => router.push('/login')} 
                        mr={8} bg={'purple.100'} _hover={{backgroundColor: "#7e38e8"}} width='150px' color={'white'}>
                        Log In
                    </Button>
                    <Button 
                        top={'600px'}
                        onClick={() => router.push('/register')}
                        bg={'#1F242E'} width='150px' color={'white'}>
                        Create Account
                    </Button>
                </Box>
            </Box>
        </Container>

    );
}