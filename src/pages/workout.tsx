import { DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Button, filter, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Select, Stack, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { BiTimeFive } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';
import { Container } from '../components/container';
import { NavBar } from '../components/navBar';
import { AddWorkoutModal } from '../components/savedWorkouts/addWorkoutModal';
import { Wrapper } from '../components/wrapper';
import { useDeleteSavedWorkoutMutation, useWorkoutsQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Workout: React.FC<{}> = ({}) => {

    const initRef = useRef()

    const [filterType, setFilterType] = useState("")
    const [filterTitle, setFilterTitle] = useState("")
    const handleTypeChange = (event) => {
        setFilterType(event.target.value)
    }
    const handleTitleChange = (event) => {
        setFilterTitle(event.target.value)
    }
    
    const { data, loading, fetchMore, error, variables} = useWorkoutsQuery({
        variables: {
            limit: 10,
            cursor: null as null | string,
            type: filterType,
            title: filterTitle
        },
        notifyOnNetworkStatusChange: true,
    })
    const [deleteSavedWorkout] = useDeleteSavedWorkoutMutation()
    
    let body = null

    if (!data && !loading)
    {
        body = (
            <Box textAlign={'center'}>
                <Heading size='lg'>
                    An error has occured, please try again
                </Heading>
                <Text>
                    {error.message}
                </Text>
            </Box>
        )
    }

    return (
        <Container height='100%'>
            <NavBar/>
            <Wrapper variant='window'>
                <Box width='100%'>
                    <Box float='right' mt={2}  >
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents={'none'}
                                children={<SearchIcon color='gray.300'/>}/>
                            <Input 
                                color={'white'}
                                border='1px'
                                onChange={handleTitleChange}
                                borderColor='#2B2B2B'
                                bgColor={'gray.900'} 
                                width='400px' 
                                placeholder='Search workouts' 
                                />
                        </InputGroup>
                        <Box mt={2}>
                            <Select
                                display={'inline'}
                                width={'50%'}
                                float='right'
                                color={'white'}
                                border='1px'
                                onChange={handleTypeChange}
                                borderColor='#2B2B2B'
                                bgColor={'gray.900'}
                                placeholder='Filter by type'
                            >
                                <option>Cardio</option>
                                <option>Strength</option>
                                <option>Hypertrophy</option>
                            </Select>
                        </Box>
                    </Box>
                    <Box>
                        <Heading  size='lg' mt={120}>
                            My Workouts
                        </Heading>
                        <AddWorkoutModal/>
                    </Box>
                    {body}
                    <Box mb={5} mt={10}>
                        {!data && loading ?
                            (
                                <Box textAlign={'center'} alignItems='center'>
                                    <Text>
                                        Loading...
                                    </Text>
                                </Box>
                            ): 

                            data?.workouts?.workouts?.length === 0 ?

                            <Box textAlign={'center'} alignItems='center'>
                                <Text>
                                    Cannot find any saved workouts, either search term is not found or you have not saved any workouts.
                                </Text>
                            </Box> 

                            : (
                                <Box display={'flex'} justifyContent='center'>
                                    <Stack width={'100%'} spacing={4}> 
                                        {data?.workouts?.workouts?.map((w) => !w ? <div>Nothing here</div> : (
                                            <Box position={'relative'} borderRadius={10} border='1px' 
                                                borderColor='#2B2B2B'
                                                bg='#0C0E10' key={w.id} p={4}>
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
                                                                        deleteSavedWorkout({variables:{id: w.id}, update: (cache) => {
                                                                            cache.evict({id: 'SavedWorkout:' + w.id})
                                                                        }})
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
                                                <Text fontSize={14} fontWeight={'bold'} color='gray.500'>{w.type}</Text>
                                                <Heading size='md' mb={1}>{w.title}</Heading>
                                                {w.sets ? //if saved workout in diary is weight based
                                                    <Box> 
                                                        <Text display='inline-block' fontSize={14} color='gray.500'>
                                                            {w.sets} sets - {w.reps} reps
                                                        </Text> 
                                                        <Icon display={'inline-block'} as={FaWeightHanging} w={3} h={3} ml={4}/>
                                                        <Text display={'inline-block'} fontSize={14} color='gray.500' ml={2}>Current Weight - </Text>
                                                        <Text display={'inline-block'} fontSize={14} color='gray.500' ml={1}>{w.weight}kg</Text>
                                                    </Box>
                                                : //if saved workout in diary is cardio based
                                                    <Box>
                                                        <Icon display={'inline-block'} as={BiTimeFive} w={3} h={3}/>
                                                        <Text display={'inline-block'} fontSize={14} color='gray.500' ml={2}>Duration - {w.duration}min</Text>
                                                    </Box>
                                                }
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            )
                        }
                        {/* {data && data.workouts.hasMore ? (
                            <Flex>
                                <Button onClick={() => {
                                    fetchMore({
                                        variables: {
                                            limit: variables?.limit,
                                            cursor: data.workouts.workouts[data.workouts.workouts.length - 1].createdAt
                                        },
                                    })
                                }}
                                isLoading={loading} m='auto' my={8}>
                                    Load More
                                </Button>
                            </Flex>
                        ): null} */}
                    </Box>
                </Box>
            </Wrapper>
        </Container>
    );
}

export default withApollo({ssr: true})(Workout);