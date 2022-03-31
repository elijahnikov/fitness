import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { useActivitiesQuery } from '../../../generated/graphql';
import { FoodActivity } from './foodActivity';
import { WeightActivity } from './weightActivity';
import { WorkoutActivity } from './workoutActivity';

interface groupActivityProps {

}

export const GroupActivity: React.FC<groupActivityProps> = ({}) => {

    const {data, loading, error, variables, fetchMore} = useActivitiesQuery({
        variables: {
            cursor: null as null | string,
            limit: 10
        }
    })

    if (!data && !loading)
    {
        <Box mt={20} textAlign={'center'} width='100%'>
            <Heading size='md'>An error has occured, please try again.</Heading>
            <Text>{error.message}</Text>
        </Box>
    }

    console.log(data)

    return (
        
        <Box mt={5} mb={10}>
            {!data && loading ? 
                (
                    <Box mt={20} textAlign={'center'} width='100%'>
                        <Heading size='md'>Loading...</Heading>
                    </Box>
                ):

                data.activities.activities.length === 0 ?
                
                <Box mt={20} textAlign={'center'} width='100%'>
                    <Heading size='md'>No activities have occured yet.</Heading>
                    <Text>Group activities are submitted when users add to their food diary, workout diary or weight history.</Text>
                </Box>

                : (
                    <Box display='flex' justifyContent={'center'}>
                        <Stack width='100%' spacing={8}>
                            {data.activities.activities.map((a) => !a ? <div>Nothing here</div> : (
                                <Box 
                                    position='relative' 
                                    borderRadius={10} 
                                    border='1px' 
                                    borderColor='#2B2B2B'
                                    bg='#0C0E10' 
                                    key={a.id} 
                                    p={4}
                                >   
                                    {a.foodDiary ? <FoodActivity activityData={a}/> : null}
                                    {a.workoutDiary ? <WorkoutActivity activityData={a}/> : null}
                                    {a.weightHistory ? <WeightActivity activityData={a}/> : null}
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                )
                
            }
        </Box>
    );
}