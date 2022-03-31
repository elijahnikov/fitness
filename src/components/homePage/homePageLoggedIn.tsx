import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useGetFoodDiaryQuery } from '../../generated/graphql';
import { Container } from '../container';
import { NavBar } from '../navBar';
import { Wrapper } from '../wrapper';
import { FoodDiaryHome } from './foodDiaryHome'
import { ScheduleHome } from './scheduleHome';
import { WorkoutDiaryHome } from './workoutDiaryHome';

interface homePageLoggedInProps {
    data: any;
}

export const HomePageLoggedIn: React.FC<homePageLoggedInProps> = ({data}) => {

    let now = new Date()
    const {data: foodData, error, loading} = useGetFoodDiaryQuery({
        variables: {
            date: now.toISOString().split('T')[0],
            limit: 3
        },
        notifyOnNetworkStatusChange: true
    })

    let calorie = null
    let caloriesConsumed = 0
    let targetCalories = 0
    if (!loading && !foodData)
    {
        calorie = (
            <Text>
                No data found
            </Text>
        )
    }
    else if (!foodData && loading)
    {
        calorie = (
            <Text>
                Loading...
            </Text>
        )
    }
    else if (foodData && !loading)
    {
        if (foodData.getFoodDiary.foodDiary.length !== 0)
        {
            targetCalories = foodData.getFoodDiary.foodDiary[0].calorieTarget
            for (let i = 0; i < foodData.getFoodDiary.foodDiary.length; i++)
            {
                console.log(foodData.getFoodDiary.foodDiary[0].food.calories)
                caloriesConsumed += foodData.getFoodDiary.foodDiary[0].food.calories
            }
            calorie = (
                <>
                <Heading display='inline' size='md'>Calorie target: {caloriesConsumed}/</Heading>
                <Heading display='inline' size='md' color='purple.200' >{targetCalories}</Heading>
                </>
            )
        }
    }


    return (
        <Container height="100%">
            <NavBar/>
            <Wrapper variant="window">
                <Box>
                    <Box mt={120}  width='100%'>
                        <Heading textAlign='left' mb={4}>Hello, {data.username}</Heading> 
                        {calorie}
                    </Box>
                </Box>
                <Box mt={10}>
                    <Heading mb={2} ml={1} size='md'>Schedule</Heading>
                    <ScheduleHome/>
                </Box>
                <Box mt={10}>
                    <Heading mb={2} ml={1} size='md'>Workout Diary</Heading>
                    <WorkoutDiaryHome/>
                </Box>
                <Box mt={10}>
                    <Heading mb={2} ml={1} size='md'>Food Diary</Heading>
                    <FoodDiaryHome data={foodData} loading={loading} error={error}/>
                </Box>
            </Wrapper>
        </Container>
    );
}