import { Box, Button, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { useActivitiesByUserByDayQuery, useActivitiesByUserQuery } from '../../generated/graphql';
import NextLink from 'next/link'
import { scheduleColorToActivity } from '../../utils/scheduleColorToActivity';

interface scheduleHomeProps {

}

export const ScheduleHome: React.FC<scheduleHomeProps> = ({}) => {

    let now = new Date()
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const {data, error, loading} = useActivitiesByUserByDayQuery({
        variables: {
            day: days[now.getDay()]
        },
        notifyOnNetworkStatusChange: true
    })

    if (!loading && !data)
    {
        return (
        <div>
            <div>Oops! No data found, please refresh.</div>
            <div>{error.message}</div>
        </div>
        )
    }

    return (
        <Box width={'100%'} height={180} p={4} bg='#14181E' borderRadius={10}>
            <NextLink href='/schedule'>
                <Button textAlign={'center'} size='sm' bg='purple.100' float='right'>
                        See all
                </Button>
            </NextLink>
            <Heading 
                fontWeight={'normal'} 
                color="gray.300" 
                size='sm'
                >
                    Your schedule for {days[now.getDay()]}
            </Heading>
            
            {!data && loading ? 

                ( //if no data and loading is true
                <Box textAlign={'center'} alignItems='center'>
                    <Text>Loading...</Text>
                </Box> 
                ) 

                : data.getActivityByUserByDay.activities.length === 0 ? //if no data is found

                <Box mt={4} textAlign={'center'}>
                    <Text>You have not set an activity for {days[now.getDay()]}</Text>
                    <NextLink href='/schedule'>
                        <Button mt={2}>
                            Create activity
                        </Button>
                    </NextLink>
                </Box> 

                :( //data is found
                <Box mt={7} width='100%' display='flex' justifyContent={'center'}>
                    <HStack spacing={4}>
                        {data.getActivityByUserByDay.activities.map((a) => !a ? <div>Nothing here</div> : (
                            <Box position='relative' ml={2} minW={'250px'} borderRadius={10} bg='gray.800' key={a.id} p={0}>
                                <Heading  pl={4} pt={4}size='sm'>{a.title}</Heading>
                                <Text fontSize={14} pl={4} mb={5} color='gray.400'>{a.type} - {a.duration}min</Text>
                                <Box height={2} borderBottomRadius={4}  width='100%' bg={scheduleColorToActivity(a.type)} position={'absolute'} bottom={0}/>
                            </Box>
                            
                        ))}
                    </HStack>
                </Box>
                )}
        </Box>
    );
}