import { Box, Button, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { useGetWorkoutDiaryQuery } from '../../generated/graphql';
import NextLink from 'next/link'
import { scheduleColorToActivity } from '../../utils/scheduleColorToActivity';
import { FaWeightHanging } from 'react-icons/fa'
import { BiTimeFive } from 'react-icons/bi'

interface workoutDiaryHomeProps {

}

export const WorkoutDiaryHome: React.FC<workoutDiaryHomeProps> = ({}) => {

    let now = new Date()
    const options: Intl.DateTimeFormatOptions = { month: "long", day: 'numeric', year: 'numeric'};

    const {data, error, loading} = useGetWorkoutDiaryQuery({
        variables: {
            date: now.toISOString().split('T')[0],
            limit: 3
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
        <Box width={'100%'} p={4} bg='#14181E' borderRadius={10}>
            <NextLink href='/workoutDiary'>
                <Button textAlign={'center'} size='sm' float='right' bg='purple.100'>
                        See all
                </Button>
            </NextLink>
            <Heading 
                fontWeight={'normal'} 
                color="gray.300" 
                size='sm'
                >
                    Workout Diary for {now.toLocaleDateString("en-US", options)}
            </Heading>

            {!data && loading ? 
                (
                    <Box textAlign={'center'} alignItems='center'>
                        <Text>Loading...</Text>
                    </Box>
                )

                : data.getWorkoutDiary.workoutDiary.length === 0 ?

                <Box mt={4} textAlign={'center'}>
                    <Text>You have not saved any workout activities for {now.toLocaleDateString("en-US", options)}</Text>    
                    <NextLink href='/workoutDiary'>
                        <Button mt={2}>
                            Add to diary
                        </Button>    
                    </NextLink>
                </Box>

                :(
                    <Box width='100%' display='flex' justifyContent={'center'}>
                    <Stack spacing={4}>
                        {data.getWorkoutDiary.workoutDiary.map((a) => !a ? <div>Nothing here</div> : (
                            <Box minH={100} minW={600} maxW={600} position='relative' borderRadius={10} 
                            border='1px' 
                            borderColor='#2B2B2B'
                            bg='#0C0E10' key={a.id} p={4}>
                                <Text fontSize={14} fontWeight={'bold'} color='gray.500'>
                                    {a.type.toUpperCase()}
                                </Text>
                                <Text fontSize={18} fontWeight={'bold'} >
                                    {a.workout.title}
                                </Text>
                                {a.workout.sets ? //if saved workout in diary is weight based
                                    <Box> 
                                        <Text mb={4} fontSize={14} color='gray.500'>
                                            {a.workout.sets} sets - {a.workout.reps} reps
                                        </Text> 
                                        <Icon display={'inline-block'} as={FaWeightHanging} w={3} h={3}/>
                                        <Text display={'inline-block'} fontSize={14} fontWeight='semibold' color='gray.500' ml={2}>{a.weight}kg</Text>
                                    </Box>
                                : //if saved workout in diary is cardio based
                                    <Box>
                                        <Icon display={'inline-block'} as={BiTimeFive} w={3} h={3}/>
                                        <Text display={'inline-block'} fontSize={14} fontWeight='semibold' color='gray.500' ml={2}>{a.duration}min</Text>
                                    </Box>
                                }
                            </Box>
                        ))}
                    </Stack>
                </Box>
                )
            }
        </Box>
    );
}