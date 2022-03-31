import { Avatar, Box, Button, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { Container } from '../components/container';
import { NavBar } from '../components/navBar';
import { Wrapper } from '../components/wrapper';
import { useFoodsQuery, useMeQuery, useWorkoutsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
import NextLink from 'next/link'
import { SavedFoodProfile } from '../components/profile/savedFoodProfile';
import { SavedWorkoutProfile } from '../components/profile/savedWorkoutProfile';
import { EditProfileModal } from '../components/profile/editProfileModal';
import { WeightHistory } from '../components/profile/weightHistory';
import { WeightHistoryInputModal } from '../components/profile/weightHistoryInputModal';

const Profile: React.FC<{}> = ({}) => {

    const {data, loading, error} = useMeQuery()

    if (!data?.me)
    {
        return (
            <Container height='100vh'>
                <NavBar/>
                <Wrapper variant='window'>
                    <Box
                        textAlign={'center'}
                        position={'fixed'}
                        top={'50%'}
                        left={'50%'}
                        transform={'translate(-50%, -50%)'}
                    >
                        
                        <Heading color='white'>
                            You must be logged in first
                        </Heading>
                        <NextLink href='/login'>
                            <Button mt={5} bg='purple.100'>
                                Login
                            </Button>
                        </NextLink>
                    </Box>
                </Wrapper>
            </Container>
        )
    }

    if (error)
    {   
        return (
            <Box>
                {error.message}
            </Box>
        )
    }

    if (loading)
    {
        return (
            <Box>
                loading...
            </Box>
        )
    }

    return (
        <Container height='100vh'>
            <NavBar/>
            <Wrapper variant='window'>
                {/* USER DETAILS BOX */}
                <Box 
                    borderRadius={10} 
                    border='1px' 
                    borderColor='#2B2B2B'
                    bg='#0C0E10' 
                    textAlign={'center'} 
                    mt={110} 
                    mb={8}
                    p={5}
                    width="100%" 
                    height='max-content'
                    >
                        <Box>
                            <Avatar boxSize='190px' src={data.me.avatar} name={data.me.username}/>
                        </Box>
                        <Box mt={6}>
                            {data.me.displayName ? (
                                <Heading>{data.me.displayName}</Heading>
                            ): (
                                <Heading>-</Heading>
                            )}
                            <Text fontSize={18} fontWeight={'semibold'} color='gray.500'>@{data.me.username}</Text>
                        </Box>
                        <EditProfileModal data={data}/>
                         
                </Box>

                {/* WEIGHT PROGRESS BOX */}
                <Box 
                    borderRadius={10} 
                    border='1px' 
                    borderColor='#2B2B2B'
                    bg='#0C0E10' 
                    p={5}
                    mb={8}
                    width="100%" 
                    height='max-content'
                >
                    <Box display='inline-block'>
                        <Heading size={'md'}>Weight Progress</Heading>
                        <Text fontSize={16} fontWeight={'semibold'} color='gray.500'>Goal Weight - {data.me.goalWeight}kg</Text>
                    </Box>
                    <WeightHistoryInputModal/>
                    <WeightHistory/>
                </Box>

                {/* STATISTICS BOX */}
                <Box 
                    borderRadius={10} 
                    border='1px' 
                    borderColor='#2B2B2B'
                    bg='#0C0E10' 
                    p={5}
                    mb={8}
                    width="100%" 
                    height='auto'
                    overflow='hidden'
                >
                    <Box display='inline-block' width='100%'>
                        <Heading size={'md'}>Your statistics</Heading>
                    </Box>
                    <Box mt={10}>
                        <Box 
                            width='33%' 
                            height='100px' 
                            float='left'
                            textAlign={'center'}
                            > 
                                <Heading>{data.me.totalWorkoutsLogged}</Heading>
                                <Text 
                                    fontSize={16} 
                                    fontWeight={'semibold'} 
                                    color='gray.500'>
                                        Total Workouts Logged
                                </Text>

                        </Box>
                        <Box 
                            width='33%' 
                            height='100px' 
                            float='left'
                            textAlign={'center'}
                            > 
                                <Heading>{data.me.totalMealsLogged}</Heading>
                                <Text 
                                    fontSize={16} 
                                    fontWeight={'semibold'} 
                                    color='gray.500'>
                                        Total Meals Logged
                                </Text>
                        </Box>
                        <Box 
                            width='33%' 
                            height='100px' 
                            float='left'
                            textAlign={'center'}
                            > 
                                <Heading>{data.me.totalActivitiesScheduled}</Heading>
                                <Text 
                                    fontSize={16} 
                                    fontWeight={'semibold'} 
                                    color='gray.500'>
                                        Total Activities Scheduled
                                </Text>
                        </Box>
                    </Box>
                </Box>

                {/* SAVED MEALS/WORKOUTS */}
                <Box 
                    borderRadius={10} 
                    border='1px' 
                    borderColor='#2B2B2B'
                    bg='#0C0E10' 
                    float='left'
                    p={5}
                    mb={8}
                    width="49%" 
                    height='max-content'
                >
                    <Box display='inline-block'>
                        <Heading size={'md'}>Saved Workouts</Heading>
                        <Text 
                            fontSize={16} 
                            fontWeight={'semibold'} 
                            color='gray.500'>
                                {data.me.totalWorkoutsSaved} in total
                        </Text>
                    </Box>
                    <Box float='right'display='inline-block'>
                        <NextLink href='/workout'>
                            <Button size='md' bg='purple.100' >Add</Button>
                        </NextLink>
                    </Box>
                    <Box>
                        <SavedWorkoutProfile/>
                    </Box>

                </Box>
                <Box 
                    borderRadius={10} 
                    border='1px' 
                    borderColor='#2B2B2B'
                    bg='#0C0E10' 
                    float='right'
                    p={5}
                    mb={8}
                    width="49%" 
                    height='max-content'
                >
                    <Box display='inline-block'>
                        <Heading size={'md'}>Saved Meals</Heading>
                        <Text 
                            fontSize={16} 
                            fontWeight={'semibold'} 
                            color='gray.500'>
                                {data.me.totalMealsSaved} in total
                        </Text>
                    </Box>
                    <Box float='right'display='inline-block'>
                        <NextLink href='/food'>
                            <Button size='md' bg='purple.100' >Add</Button>
                        </NextLink>
                    </Box>
                    <Box>
                        <SavedFoodProfile/>
                    </Box>
                </Box>
            </Wrapper>
        </Container>
    );
}

export default withApollo({ssr: true})(Profile)
