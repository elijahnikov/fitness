import { Box, Avatar, Text, Heading, Icon } from '@chakra-ui/react'
import React from 'react'
import { BiTimeFive } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';

interface workoutActivityProps {
    activityData: any
}

export const WorkoutActivity: React.FC<workoutActivityProps> = ({activityData}) => {

    let now = new Date(parseInt(activityData.createdAt))
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: '2-digit', year: 'numeric'};

    return (
        <Box>
            <Box  width='100%' overflow={'auto'}>
                <Box float='left' width='70%'>
                    <Avatar float='left' size='xs' mr={2} src={activityData.user.avatar} name={activityData.user.username}/>
                    <Text size='sm' color='purple.200' float='left' fontWeight={'semibold'} mr={1}>
                        {activityData.user.username} 
                    </Text>
                    <Text size='sm' fontWeight={'semibold'}>
                        added to their Workout Diary
                    </Text>
                </Box>
                <Box float='right'>
                    <Text fontSize='14px' color='gray.300'>
                        {now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}{" "}{now.toLocaleDateString('en-GB', options)}
                    </Text>
                </Box>
            </Box>
            <Box ml={8} 
                mt={2} 
                width='95%' 
                position='relative' 
                borderRadius={10} 
                border='1px' 
                borderColor='#2B2B2B'
                bg='#0C0E10' 
                p={4}
                overflow='hidden'
            >   
                <Text fontSize={14} fontWeight={'bold'} color='gray.500'>{activityData.workoutDiary.type.toUpperCase()}</Text>
                <Heading size='md' mb={1}>{activityData.workoutDiary.workout.title}</Heading>
                {activityData.workoutDiary.workout.sets ? //if saved workout in diary is weight based
                    <>
                    <Box> 
                        <Text fontSize={14} color='gray.500' mb={5}>
                            {activityData.workoutDiary.workout.sets} sets - {activityData.workoutDiary.workout.reps} reps
                        </Text> 
                        <Icon display={'inline-block'} as={FaWeightHanging} w={3} h={3}/>
                        <Text display={'inline-block'} fontSize={14} color='gray.500' mr={4} ml={1}>{activityData.workoutDiary.weight}kg</Text>
                        <Icon display={'inline-block'} as={BiTimeFive} w={3} h={3}/>
                        <Text display={'inline-block'} fontSize={14} color='gray.500' ml={2}>{activityData.workoutDiary.duration}min</Text>
                    </Box>
                    <Box>
                        
                    </Box>
                    </>
                : //if saved workout in diary is cardio based
                    <Box mt={5}>
                        <Icon display={'inline-block'} as={BiTimeFive} w={3} h={3}/>
                        <Text display={'inline-block'} fontSize={14} color='gray.500' ml={2}>{activityData.workoutDiary.duration}min</Text>
                    </Box>
                }
            </Box>
        </Box>
    );
}