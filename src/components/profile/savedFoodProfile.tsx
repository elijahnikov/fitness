import { Box, Heading, Stack, Text, Image, Divider } from '@chakra-ui/react'
import React from 'react'
import { useFoodsQuery } from '../../generated/graphql'

interface savedFoodProfileProps {

}

export const SavedFoodProfile: React.FC<savedFoodProfileProps> = ({}) => {

    const {data: foodData, loading: foodLoading, error: foodError} = useFoodsQuery({
        variables: {
            limit: 3
        }
    })

    let foodBody = null

    if (!foodData?.foods)
    {
        foodBody = (
            <Box textAlign={'center'}>
                <Text>No foods found</Text>
            </Box>
        )
    }

    if (foodError)
    {
        foodBody = (
            <Box textAlign={'center'}>
                <Text>{foodError.message}</Text>
            </Box>
        )
    }

    if (foodLoading)
    {
        foodBody = (
            <Box textAlign={'center'}>
                <Text>loading...</Text>
            </Box>
        )
    }

    if (foodData)
    {
        foodBody = (
            <Stack width='100%' justifyContent='center'>
                {foodData.foods.foods.map((f) => !f ? <div>Nothing here</div> : (
                    <Box position='relative' bg='none' border='none' key={f.id} p={4}>
                        {f.pictureUrl ? (
                            <Box display={'inline-block'}>
                                <Image borderRadius='full' mr={5} boxSize='60px' src={f.pictureUrl}/>
                            </Box>
                        ) : null}
                        <Box display={'inline-block'}>
                            <Text fontSize={14} fontWeight={'bold'} color='gray.500'>{f.type}</Text>
                            <Heading size='md' mb={1}>{f.title}</Heading>
                            <Box fontSize={14} fontWeight={'semibold'} color='gray.500'>
                                <Text mr={2} display='inline'>{f.serving} serving</Text>
                                <Text mr={2} display='inline'>- {f.calories} calories</Text>
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
            {foodBody}
        </Box>
    );
}