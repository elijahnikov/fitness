import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { useGetWeightHistoryByUserQuery } from '../../generated/graphql';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

interface weightHistoryProps {

}

export const WeightHistory: React.FC<weightHistoryProps> = ({}) => {

    const {data, loading, error} = useGetWeightHistoryByUserQuery()

    let weightHistoryBody = null

    if (!data && !loading)
    {
        weightHistoryBody = (
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

    // let labels = []
    let dataset = []
    let datasetEntry = {}
    let now = null
    const options: Intl.DateTimeFormatOptions = { month: "long", day: '2-digit', year: 'numeric'};
    for (let i = 0; i < data?.getWeightHistoryByUser.weightHistory.length; i++)
    {
        now = new Date(parseInt(data?.getWeightHistoryByUser.weightHistory[i].createdAt))
        // labels.push(now.toLocaleDateString('en-US', options))
        // dataset.push(data?.getWeightHistoryByUser.weightHistory[i].weight)
        // datasetEntry[now.toLocaleDateString('en-US', options)] = data?.getWeightHistoryByUser.weightHistory[i].weight
        datasetEntry['name'] = now.toLocaleDateString('en-GB')
        datasetEntry['value'] = data?.getWeightHistoryByUser.weightHistory[i].weight
        dataset.push(datasetEntry)
        datasetEntry = {}
    }

    // console.table(labels)
    // console.log(dataset)
    
    return (
        <Box width='100%'>
            {!data && loading ? 
                (
                    <Box textAlign={'center'} alignItems='center'>
                        <Text>
                            Loading...
                        </Text>
                    </Box>
                ):

                data.getWeightHistoryByUser.weightHistory.length === 0 ?

                <Box textAlign={'center'} alignItems='center'>
                    <Text>
                        Cannot find any weight history, please input new weight history.
                    </Text>
                </Box> 

                :(
                    <Box display={'flex'} mt={5} justifyContent='center'>
                        <LineChart width={900} height={300} data={dataset}>
                            <Line type='monotone' dataKey={'value'} stroke='#772CE8'/>
                            {/* <CartesianGrid stroke='#ccc'/> */}
                            <XAxis dataKey={'name'}/>
                            <YAxis/>
                        </LineChart>
                    </Box>
                )
            }
        </Box>
    );
}