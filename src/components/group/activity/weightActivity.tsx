import { Box, Avatar, Heading, Text, Icon } from '@chakra-ui/react';
import React from 'react'
import { ImArrowUp, ImArrowDown} from 'react-icons/im'

interface weightActivityProps {
    activityData: any
}

export const WeightActivity: React.FC<weightActivityProps> = ({activityData}) => {

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
                        added to their Weight History
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
                <Box mb={2} float='left' width='100%'>
                    <Heading size='sm' color='gray.500' fontWeight={'semibold'}>New weight:</Heading>
                    <Heading size={'lg'} float='left' color='purple.200'>{activityData.weightHistory.weight}kg</Heading>
                </Box>
                <Box>
                    {activityData.weightHistory.weight > activityData.weightHistory.previousWeight ? 
                        <Box>
                            <Icon display={'inline'} mr={1} color='green.400' as={ImArrowUp}/>
                            <Text display={'inline'} fontWeight={'semibold'} >Up from {""}</Text> 
                            <Heading display={'inline'} size={'md'}>{activityData.weightHistory.previousWeight}kg</Heading>
                        </Box>
                    : 
                        <Box>
                            <Icon display={'inline'} mr={1} color='red.400' as={ImArrowDown}/>
                            <Text display={'inline'} fontWeight={'semibold'}>Down from {""}</Text>
                            <Heading display={'inline'} size={'md'}>{activityData.weightHistory.previousWeight}kg</Heading>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
        
    );
}