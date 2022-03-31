import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { GetFoodDiaryQuery, useGetFoodDiaryQuery } from '../../generated/graphql';
import NextLink from 'next/link'
import { ApolloError } from '@apollo/client';

interface foodDiaryHomeProps {
    data: GetFoodDiaryQuery,
    loading: boolean,
    error: ApolloError
}

export const FoodDiaryHome: React.FC<foodDiaryHomeProps> = ({data, loading, error}) => {
    
    let now = new Date()
    const options: Intl.DateTimeFormatOptions = { month: "long", day: 'numeric', year: 'numeric'};

    // const {data, error, loading} = useGetFoodDiaryQuery({
    //     variables: {
    //         date: now.toISOString().split('T')[0],
    //         limit: 3
    //     },
    //     notifyOnNetworkStatusChange: true
    // })

    if (!loading && !data)
    {
        return (
        <div>
            <div>Oops! No data found, please refresh.</div>
            <div>{error.message}</div>
        </div>
        )
    }

    return (
        <Box width={'100%'} p={4} bg='#14181E' borderRadius={10}>
            <NextLink href='/foodDiary'>
                <Button textAlign={'center'} size='sm' float='right' bg='purple.100'>
                        See all
                </Button>
            </NextLink>
            <Heading 
                fontWeight={'normal'} 
                color="gray.300" 
                size='sm'
                >
                    Food Diary for {now.toLocaleDateString("en-US", options)}
            </Heading>

            {!data && loading ?
            
                (
                    <Box textAlign={'center'} alignItems='center'>
                        <Text>Loading...</Text>
                    </Box>
                )    

                : data.getFoodDiary.foodDiary.length === 0 ?
                
                <Box mt={4} textAlign={'center'}>
                    <Text>You have not saved any food activities for {now.toLocaleDateString("en-US", options)}</Text>    
                    <NextLink href='/foodDiary'>
                        <Button mt={2}>
                            Add to diary
                        </Button>    
                    </NextLink>
                </Box>

                :(
                    <Box width='100%' display='flex' justifyContent={'center'}>
                        <Stack spacing={4}>
                            {data.getFoodDiary.foodDiary.map((a) => !a ? <div>Nothing here</div> : (
                                <Box minH={100} minW={600} maxW={600} position='relative' borderRadius={10} bg='gray.800' key={a.id} p={4}>
                                    <Text fontSize={14} fontWeight={'bold'} color='gray.500'>
                                        {a.type.toUpperCase()}
                                    </Text>
                                    <Text fontSize={18} fontWeight={'bold'} >
                                        {a.food.title}
                                    </Text>
                                    <Box display='inline'>                                        
                                        <Text display='inline-block' fontSize={14} color='gray.500'>
                                            {a.food.serving} serving - {a.food.calories} calories
                                        </Text> 
                                        <Box display='inline-block' height='3' width='3' ml={2}borderRadius={4} bg='green.400'/>
                                        <Text fontSize={14} color='gray.500' ml={1} display={'inline-block'}>{a.food.protein}g Protein</Text>
                                        <Box display='inline-block' height='3' width='3' ml={2}borderRadius={4} bg='orange.200'/>
                                        <Text fontSize={14} color='gray.500' ml={1} display={'inline-block'}>{a.food.carbs}g Carbs</Text>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                )

            }
        </Box>
    );
}