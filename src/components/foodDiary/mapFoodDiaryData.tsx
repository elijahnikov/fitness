import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { DeleteDiaryEntry } from './deleteDiaryEntry';

interface mapDataProps {
    data: any[]
    type: string
}

export const MapFoodDiaryData: React.FC<mapDataProps> = ({data, type}) => {
    return (
        <Box>
            <Heading size={'md'} mb={2}>{type}</Heading>
            {/* <Divider bg='gray.900' mb={3}/> */}
            {data.length === 0 ? <Text textAlign='center'mb={2}>-</Text>: (
                data.map((f) =>  !f ? <div>Nothing here</div> : (
                    <Box 
                        position={'relative'} 
                        borderRadius={10} 
                        border='1px' 
                        borderColor='#2B2B2B'
                        bg='#0C0E10' 
                        p={2} mb={4} key={f.id}
                    >
                        <DeleteDiaryEntry entryId={f.id}/>
                        <Box display='inline-block'  top={3}>
                            <Heading size='md'>{f.food.title}</Heading>
                            <Text fontSize={16} fontWeight={'semibold'} color='gray.500'>{f.type}</Text>
                        </Box>
                    </Box>
                ))
            )}
            
        </Box>
    );
}