import { Avatar, Box, Divider, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { ActivitiesQuery, FoodDiary } from '../../../generated/graphql';

interface foodActivityProps {
    activityData: any
}

export const FoodActivity: React.FC<foodActivityProps> = ({activityData}) => {

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
                        added to their Food Diary
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
                <Box float='left'>
                    <Heading size='sm' color='gray.500' fontWeight={'semibold'}>{activityData.foodDiary.type}</Heading>                
                    <Heading size='lg'>{activityData.foodDiary.food.title}</Heading>
                    <Box fontSize={14} fontWeight={'semibold'} color='gray.500'>
                        <Text mr={2} display='inline'>{activityData.foodDiary.food.serving} serving</Text>
                        <Text mr={2} display='inline'>- {activityData.foodDiary.food.calories} calories</Text>
                        <Box display='inline-block' height='3' width='3' mr={1}borderRadius={4} bg='green.400'/>
                        <Text mr={2} display='inline'>{activityData.foodDiary.food.protein}g Protein</Text>
                        <Box display='inline-block' height='3' width='3' mr={1}borderRadius={4} bg='orange.200'/>
                        <Text mr={2} display='inline'>{activityData.foodDiary.food.carbs}g Carbs</Text>
                        <Box display='inline-block' height='3' width='3' mr={1}borderRadius={4} bg='red.400'/>
                        <Text display='inline'>{activityData.foodDiary.food.fat}g Fat</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
        
    );
}
