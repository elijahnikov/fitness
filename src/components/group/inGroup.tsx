import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { useGetGroupByUserQuery, useGetGroupMembersQuery, useMeQuery } from '../../generated/graphql';
import { Container } from '../container';
import { NavBar } from '../navBar';
import { Wrapper } from '../wrapper';
import { GroupActivity } from './activity/groupActivity';
import { MembersModal } from './membersModal';
import { SettingsModal } from './settingsModal';

interface inGroupProps {

}

export const InGroup: React.FC<inGroupProps> = ({}) => {

    const {data: meData} = useMeQuery()
    const {data, loading, error} = useGetGroupByUserQuery()
    const {data: membersData, loading: membersLoading, error: membersError} = useGetGroupMembersQuery({
        variables: {
            id: data?.getGroupByUser?.id
        }
    })
    
    //variables to deal with date group was created
    const options: Intl.DateTimeFormatOptions = { month: "long", day: '2-digit', year: 'numeric'};
    let createdAt = new Date(parseInt(data?.getGroupByUser?.createdAt)).toLocaleDateString('en-GB', options)
    
    return (
        <Container height='100%'>
            <NavBar/>
            <Wrapper variant='window'>
                <Box width='100%' overflow={'auto'} mt={120}>
                    <Box float='left'>
                        <Heading>{data?.getGroupByUser?.name}</Heading>
                        <Text color='gray.400'>Created on {createdAt}</Text>
                    </Box>
                    <Box float='right'>
                        <MembersModal meData={meData} membersLoading={membersLoading} membersData={membersData} groupData={data}/>
                        <SettingsModal groupData={data}/>
                    </Box>                    
                </Box>
                <Heading size='md' mt={12}>Group Activity</Heading>
                <GroupActivity/>
            </Wrapper>
        </Container>
    );
}
