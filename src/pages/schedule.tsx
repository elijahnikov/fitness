import { Box, Heading, Stack, Text} from '@chakra-ui/react';
import React from 'react'
import { Container } from '../components/container';
import { NavBar } from '../components/navBar';
import { AddToScheduleModal } from '../components/schedule/addToScheduleModal';
import { Wrapper } from '../components/wrapper';
import { useActivitiesByUserQuery } from '../generated/graphql';
import { mapScheduleToDays } from '../utils/schedule/mapScheduleToDays';
import { withApollo } from '../utils/withApollo';
import { MapData } from '../components/schedule/mapData';

const Schedule: React.FC<{}> = ({}) => {
    
    const {data, loading, error} = useActivitiesByUserQuery()

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
                <Box>
                    <Box>
                        <Heading  size='lg' mt={120}>
                            Schedule
                        </Heading>
                        <AddToScheduleModal/>
                    </Box>
                    {body}
                    <Box mb={10} mt={10}>
                        {!data && loading ?
                            (
                                <Box textAlign={'center'} alignItems='center'>
                                    <Text>
                                        Loading...
                                    </Text>
                                </Box>
                            ) : 
                            
                            data.activitiesByUser.activities.length === 0 ?

                            <Box textAlign={'center'} alignItems='center'>
                                <Text>
                                    You have not scheduled any activities.
                                </Text>
                            </Box> 

                            : (
                                <Stack spacing={5}>  
                                    <MapData data={mapScheduleToDays(data).mondayData} day="Monday"/>
                                    <MapData data={mapScheduleToDays(data).tuesdayData} day="Tuesday"/>
                                    <MapData data={mapScheduleToDays(data).wednesdayData} day="Wednesday"/>
                                    <MapData data={mapScheduleToDays(data).thursdayData} day="Thursday"/>
                                    <MapData data={mapScheduleToDays(data).fridayData} day="Friday"/>
                                    <MapData data={mapScheduleToDays(data).saturdayData} day="Saturday"/>
                                    <MapData data={mapScheduleToDays(data).sundayData} day="Sunday"/>
                                </Stack>
                            )
                        }
                    </Box>
                </Box>
            </Wrapper>
        </Container>
    );
}

export default withApollo({ssr: true})(Schedule);