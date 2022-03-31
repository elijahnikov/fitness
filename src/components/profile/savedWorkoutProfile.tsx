import { Box, Heading, Stack, Text, Image, Divider } from '@chakra-ui/react'
import React from 'react'
import { useWorkoutsQuery } from '../../generated/graphql'

interface savedWorkoutProfileProps {

}

export const SavedWorkoutProfile: React.FC<savedWorkoutProfileProps> = ({}) => {

    const {data: workoutData, loading: workoutLoading, error: workoutError} = useWorkoutsQuery({
        variables: {
            limit: 3
        }
    })

    let workoutBody = null

    if (!workoutData?.workouts)
    {
        workoutBody = (
            <Box textAlign={'center'}>
                <Text>No workouts found</Text>
            </Box>
        )
    }

    if (workoutError)
    {
        workoutBody = (
            <Box textAlign={'center'}>
                <Text>{workoutError.message}</Text>
            </Box>
        )
    }

    if (workoutLoading)
    {
        workoutBody = (
            <Box textAlign={'center'}>
                <Text>loading...</Text>
            </Box>
        )
    }

    if (workoutData)
    {
        workoutBody = (
            <Stack width='100%' justifyContent='center'>
                {workoutData.workouts.workouts.map((w) => !w ? <div>Nothing here</div> : (
                    <Box position='relative' bg='none' border='none' key={w.id} p={4}>
                        <Box display={'inline-block'}>
                            <Text fontSize={14} fontWeight={'bold'} color='gray.500'>{w.type}</Text>
                            <Heading size='md' mb={1}>{w.title}</Heading>
                            <Box fontSize={14} fontWeight={'semibold'} color='gray.500'>
                                <Text mr={2} display='inline'>{w.sets} sets - </Text>
                                <Text mr={2} display='inline'>- {w.reps} reps</Text>
                                <Text mr={2} display='inline'>- {w.weight}kg</Text>
                            </Box>
                            
                        </Box>
                        <Divider mt={2}/>
                    </Box>
                ))}
            </Stack>
        )
    }

    return (
        <Box>
            {workoutBody}
        </Box>
    );
}