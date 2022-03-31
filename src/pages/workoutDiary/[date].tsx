import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import { BiTimeFive } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';
import { ChooseDateModal } from '../../components/chooseDateModal';
import { Container } from '../../components/container';
import { NavBar } from '../../components/navBar';
import { AddToDiaryModal } from '../../components/workoutDiary/addToDiaryModal';
import { Wrapper } from '../../components/wrapper';
import { useDeleteWorkoutDiaryEntryMutation, useGetWorkoutDiaryQuery } from '../../generated/graphql';
import { formatDate } from '../../utils/foodDiary/formatDate';
import { withApollo } from '../../utils/withApollo';

const WorkoutDiary: React.FC<{}> = ({}) => {

    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const options: Intl.DateTimeFormatOptions = { month: "long", day: '2-digit', year: 'numeric'};
    const now = new Date(formatDate())

    const {data, error, loading} = useGetWorkoutDiaryQuery({
        variables: {
            date: formatDate()
        }
    })
    const [deleteWorkoutDiaryEntry] = useDeleteWorkoutDiaryEntryMutation()
    const router = useRouter()
    const initRef = useRef()

    if (!data?.getWorkoutDiary)
    {
        return (
            <Container height='100vh'>
                <NavBar/>
                <Wrapper variant='window'>
                    <Box
                        position={'fixed'}
                        top={'50%'}
                        left={'50%'}
                        transform={'translate(-50%, -50%)'}
                    >
                        
                        <Heading color='white'>
                            Workout diary entry you are trying to access does not exist
                        </Heading>
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
                <Box
                    border='1px' 
                    borderColor='#2B2B2B'
                    bg='#0C0E10'
                    mb={5} 
                    borderRadius={10} 
                    p={5}
                    width='100%'
                    mt={100}
                >
                    <Box>
                        <Box textAlign={'center'}>
                            <ChooseDateModal page='workoutDiary'/>
                        </Box> 
                        <Heading mb={2} size='lg' textAlign={'center'}>
                            {days[now.getDay()]} {now.toLocaleDateString('en-US', options)}
                        </Heading>
                    </Box>
                </Box>
                <Box textAlign={'center'}>
                    <AddToDiaryModal/>
                </Box>
                <Box mb={10} mt={10}>
                    {!data && loading ?
                        (
                            <Box textAlign={'center'} alignItems='center'>
                                <Text>
                                    Loading...
                                </Text>
                            </Box>
                        ) :

                        data.getWorkoutDiary.workoutDiary.length === 0 ?

                        <Box textAlign={'center'} alignItems='center'>
                            <Text>
                                You have added any entries to your workout diary for {days[now.getDay()]} {now.toLocaleDateString('en-US', options)}
                            </Text>
                        </Box> 

                        : (
                            <Stack spacing={5}>
                                {data.getWorkoutDiary.workoutDiary.map((w) => !w ? <div>Nothing here</div> : (
                                    <Box position={'relative'} borderRadius={10} border='1px' borderColor='#2B2B2B'bg='#0C0E10' key={w.id} p={4}>
                                        <Popover 
                                            closeOnBlur={false} initialFocusRef={initRef}>
                                            {({ onClose }) => (
                                            <>
                                                <PopoverTrigger>
                                                    <IconButton
                                                        size='xs'
                                                        float={'right'}
                                                        colorScheme='gray'
                                                        aria-label='Delete'
                                                        icon={<DeleteIcon />}
                                                    />
                                                </PopoverTrigger>
                                                <Portal>
                                                    <PopoverContent>
                                                    <PopoverArrow />
                                                    <PopoverHeader color='white'>Are you sure you wish to delete?</PopoverHeader>
                                                    <PopoverBody>
                                                        <Button 
                                                            mr={4}
                                                            colorScheme='red'
                                                            onClick={() => {
                                                                deleteWorkoutDiaryEntry({variables:{id: w.id}, update: (cache) => {
                                                                    cache.evict({id: 'WorkoutDiary:' + w.id})
                                                                }})
                                                                router.reload()
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button variant='outline' onClick={onClose}>
                                                            Cancel
                                                        </Button>
                                                    </PopoverBody>
                                                    </PopoverContent>
                                                </Portal>
                                            </>
                                            )}
                                        </Popover>
                                        <Text fontSize={14} fontWeight={'bold'} color='gray.500'>{w.type.toUpperCase()}</Text>
                                        <Heading size='md' mb={1}>{w.workout.title}</Heading>
                                        {w.workout.sets ? //if saved workout in diary is weight based
                                            <>
                                            <Box> 
                                                <Text fontSize={14} color='gray.500' mb={5}>
                                                    {w.workout.sets} sets - {w.workout.reps} reps
                                                </Text> 
                                                <Icon display={'inline-block'} as={FaWeightHanging} w={3} h={3}/>
                                                <Text display={'inline-block'} fontSize={14} color='gray.500' mr={4} ml={1}>{w.weight}kg</Text>
                                                <Icon display={'inline-block'} as={BiTimeFive} w={3} h={3}/>
                                                <Text display={'inline-block'} fontSize={14} color='gray.500' ml={2}>{w.duration}min</Text>
                                            </Box>
                                            <Box>
                                                
                                            </Box>
                                            </>
                                        : //if saved workout in diary is cardio based
                                            <Box mt={5}>
                                                <Icon display={'inline-block'} as={BiTimeFive} w={3} h={3}/>
                                                <Text display={'inline-block'} fontSize={14} color='gray.500' ml={2}>{w.duration}min</Text>
                                            </Box>
                                        }
                                    </Box>
                                ))}
                            </Stack>
                        )
                    }
                </Box>
            </Wrapper>
        </Container>
    );
}

export default withApollo({ssr: true})(WorkoutDiary)