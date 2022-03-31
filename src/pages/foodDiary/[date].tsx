import { Container } from '../../components/container';
import React, { useState } from 'react'
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { NavBar } from '../../components/navBar';
import { withApollo } from '../../utils/withApollo';
import { Wrapper } from '../../components/wrapper';
import { getDiaryDateFromURL } from '../../utils/foodDiary/getDiaryDateFromURL';
import { useGetFoodDiaryQuery } from '../../generated/graphql';
import { formatDate } from '../../utils/foodDiary/formatDate';
import { AddToDiaryModal } from '../../components/foodDiary/addToDiaryModal';
import { MapFoodDiaryData } from '../../components/foodDiary/mapFoodDiaryData';
import { mapEntriesToType } from '../../utils/foodDiary/mapEntriesToType';
import { ChooseDateModal } from '../../components/chooseDateModal';


const FoodDiary: React.FC<{}> = ({}) => {

    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const options: Intl.DateTimeFormatOptions = { month: "long", day: '2-digit', year: 'numeric'};
    const now = new Date(formatDate())

    const {data, error, loading} = useGetFoodDiaryQuery({
        variables: {
            date: formatDate()
        }
    })


    if (!data?.getFoodDiary)
    {
        return (
            <Container height='100vh'>
                <NavBar/>
                <Wrapper variant='window'>
                    <Box
                        position={'fixed'}
                        top={'50%'}
                        left={'50%'}
                        transform={'translate(-50%, -50%)'}
                    >
                        
                        <Heading color='white'>
                            Food diary entry you are trying to access does not exist
                        </Heading>
                    </Box>
                </Wrapper>
            </Container>
        )
    }

    if (error)
    {   
        return (
            <Box>
                {error.message}
            </Box>
        )
    }

    if (loading)
    {
        return (
            <Box>
                loading...
            </Box>
        )
    }
    
    let calorieConsumed = null
    let calorieRemaining = null
    let calorieGoal = null
    if (data.getFoodDiary.foodDiary.length !== 0)
    {
        let consumed = 0
        let target = data.getFoodDiary.foodDiary[0].calorieTarget
        calorieGoal = (<Heading size='lg'>{target}</Heading>)
        for (let i = 0; i < data.getFoodDiary.foodDiary.length; i++)
        {
            consumed += data.getFoodDiary.foodDiary[i].food.calories
        }
        calorieConsumed = (<Heading size='lg'>{consumed}</Heading>)
        calorieRemaining = (
            <Heading size='lg' color={consumed > target ? 'red.400' : 'white'}>
                {target - consumed}
            </Heading>
        )
    }

    return (
        <Container height="100%">
            <NavBar/>
            <Wrapper variant='window'>
                <Box  
                    border='1px' 
                    borderColor='#2B2B2B'
                    bg='#0C0E10'
                    mb={5} 
                    borderRadius={10} 
                    p={5}
                    width='100%'
                    mt={100}
                    height='210px'
                >
                    <Box>
                        <Box textAlign={'center'}>
                            <ChooseDateModal page='foodDiary'/>
                        </Box>
                        <Heading size='lg' textAlign={'center'}>
                            {days[now.getDay()]} {now.toLocaleDateString('en-US', options)}
                        </Heading>
                    </Box>
                    <Box mt={7} width='100%' float='left'>
                        <Box textAlign={'center'} width='33%' float={'left'}>
                            {calorieConsumed ? calorieConsumed : <Heading>-</Heading>}
                            <Heading color='gray.500' size='sm'>
                                Consumed
                            </Heading>
                        </Box>
                        <Box textAlign={'center'} width='33%'float={'left'}>
                            {calorieRemaining ? calorieRemaining : <Heading>-</Heading>}
                            <Heading color='gray.500' size='sm'>
                                Remaining
                            </Heading>
                        </Box>
                        <Box textAlign={'center'} width='33%' float={'left'}>
                            {calorieGoal ? calorieGoal : <Heading>-</Heading>}
                            <Heading color='gray.500' size='sm'>
                                Goal
                            </Heading>
                        </Box>
                    </Box>
                </Box>
                <Box textAlign='center'>
                    <AddToDiaryModal/>
                </Box>
                <Box mb={10} mt={10}>
                    {!data && loading ?
                        (
                            <Box textAlign={'center'} alignItems='center'>
                                <Text>
                                    Loading...
                                </Text>
                            </Box>
                        ) : 
                        
                        data.getFoodDiary.foodDiary.length === 0 ?

                        <Box textAlign={'center'} alignItems='center'>
                            <Text>
                                You have added any entries to your food diary for {days[now.getDay()]} {now.toLocaleDateString('en-US', options)}
                            </Text>
                        </Box> 

                        : (
                            <Stack spacing={5}>  
                                <MapFoodDiaryData data={mapEntriesToType(data).breakfast} type="Breakfast"/>
                                <MapFoodDiaryData data={mapEntriesToType(data).lunch} type="Lunch"/>
                                <MapFoodDiaryData data={mapEntriesToType(data).dinner} type="Dinner"/>
                                <MapFoodDiaryData data={mapEntriesToType(data).snack} type="Snack"/>
                            </Stack>
                        )
                    }
                </Box>
            </Wrapper>  
        </Container>
    );
}

export default withApollo({ssr: true})(FoodDiary)