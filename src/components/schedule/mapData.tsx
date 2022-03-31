import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { DeleteActivity } from './deleteActivity';
import { scheduleColorToActivity } from '../../utils/scheduleColorToActivity'


interface mapDataProps {
    data: any[]
    day: string
}

export const MapData: React.FC<mapDataProps> = ({data, day}) => {
    return (
        <Box>
            <Heading size={'md'} mb={2}>{day}</Heading>
            {/* <Divider bg='gray.900' mb={3}/> */}
            {data.length === 0 ? <Text textAlign='center'mb={2}>Nothing saved for {day}</Text>: (
                data.map((a) =>  !a ? <div>Nothing here</div> : (
                    <Box position={'relative'} borderRadius={10} bg='gray.800' p={2} mb={4} key={a.id}>
                        <DeleteActivity activityId={a.id}/>
                        <Box 
                            bg={scheduleColorToActivity(a.type)} 
                            borderRadius={14} 
                            ml={2} mt={1} mr={3} 
                            display='inline-block' 
                            w={12} h={12}
                        />
                        <Box display='inline-block' position='absolute' top={3}>
                            <Heading size='md'>{a.title}</Heading>
                            <Text fontSize={16} fontWeight={'semibold'} color='gray.500'>{a.type} - {a.duration}min</Text>
                        </Box>
                    </Box>
                ))
            )}
            
        </Box>
    );
}