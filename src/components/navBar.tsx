import { Avatar, Box, Flex, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, Wrap } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import NextLink from 'next/link'
import { useAcceptResponseMutation, useDeclineResponseMutation, useGetInvitesQuery, useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useApolloClient } from '@apollo/client';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';

interface navBarProps {

}

export const NavBar: React.FC<navBarProps> = ({}) => {
    const router = useRouter()
    const apolloClient = useApolloClient()
    const [logout, {loading: logoutLoading}] = useLogoutMutation()
    const {data, loading} = useMeQuery()
    const {data: inviteData, loading: inviteLoading} = useGetInvitesQuery()

    const [acceptInvite] = useAcceptResponseMutation()
    const [declineInvite] = useDeclineResponseMutation()

    const { isOpen, onOpen, onClose } = useDisclosure()

    let now = new Date()
    let dateNow = now.toISOString().split('T')[0]

    let body = null

    if (loading)//data loading
    {
        body = null
    }
    else if (!data?.me)//if user is not logged in
    {
        body = null
    }
    else //if user is logged in
    {
        body = (
            <>
            <Flex alignItems={'center'}>
                <Flex>
                    <NextLink href={'/foodDiary/[date]'} as={`/foodDiary/${dateNow.replace(/-/g,'')}`}>
                        <a target="_self">
                            <Text mr={8} fontWeight={'bold'}>Food Diary</Text>
                        </a>
                    </NextLink>
                    <NextLink href={'/workoutDiary/[date]'} as={`/workoutDiary/${dateNow.replace(/-/g, '')}`}>
                        <a target="_self">
                            <Text mr={8} fontWeight={'bold'}>Workout Diary</Text>
                        </a>
                    </NextLink>
                    <NextLink href={'/food'}>
                        <a target="_self">
                            <Text mr={8} fontWeight={'bold'}>My Food</Text>
                        </a>
                    </NextLink>
                    <NextLink href={'/workout'}>
                        <a target="_self">
                            <Text mr={8} fontWeight={'bold'}>My Workouts</Text>
                        </a>
                    </NextLink>                        
                    <NextLink href={'/schedule'}>
                        <a target="_self">
                            <Text mr={8} fontWeight={'bold'}>Schedule</Text>
                        </a>
                    </NextLink>
                    <NextLink href={'/group'}>
                        <a target="_self">
                            <Text mr={8} fontWeight={'bold'}>Group</Text>
                        </a>
                    </NextLink>
                </Flex>
                <Menu isLazy>
                    <MenuButton pr={5} ml={8}>
                        <Wrap>
                            <Avatar size='xs' src={data?.me?.avatar} name={data.me.username}/>
                            <Text fontWeight={'bold'} ml={5}>{data.me.username}</Text>    
                        </Wrap>    
                    </MenuButton>
                    <MenuList border='1px' borderColor='#2B2B2B' bg='#0C0E10'>
                        <MenuItem
                            onClick={() => {
                                router.push('/profile');
                            }}>
                            <Avatar mr={2} size='lg' display={'inline-block'} src={data?.me?.avatar} name={data.me.username}/>
                            Profile
                        </MenuItem>
                        <MenuItem
                            onClick={onOpen}
                            >
                            {inviteData?.getInvites?.invites.length > 0 ? (
                                <Avatar 
                                    mr={2} 
                                    size='xs'
                                    src={null} 
                                    name={inviteData?.getInvites?.invites.length.toString()} bg='red.400'
                                />
                            ) : null}
                            Group Invites
                        </MenuItem>
                        <MenuItem 
                            onClick={async () => {
                                await logout();
                                await apolloClient.resetStore();
                                router.push('/');
                            }}
                            isloading={logoutLoading ? true: undefined}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bgColor={'#14181E'}>
                <ModalHeader color='white'>Group Invites</ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody>
                    {!inviteData && inviteLoading ? 
                        (
                            <Box textAlign={'center'} alignItems='center'>
                                <Text>
                                    Loading...
                                </Text>
                            </Box>
                        ):

                        inviteData.getInvites.invites.length === 0 ?

                        <Box color='white' textAlign={'center'} alignItems='center'>
                            <Text>You do not currently have any invites.</Text>
                        </Box> 

                        : (
                            <Box display='flex'>
                                <Stack width='100%' spacing={4}>
                                    {inviteData.getInvites.invites.map((i) => !i ? <div>Nothing here</div> : (
                                        <Box position='relative' borderRadius={10} border='1px' 
                                        borderColor='#2B2B2B'
                                        bg='#0C0E10' color='white' key={i.id} p={4}>
                                            <Box float='left'>
                                                <Text color='white'>
                                                    {i.group.name}
                                                </Text>
                                                <Text fontSize={'16px'} color='gray.400'>
                                                    Invite sent {new Date(parseInt(i.createdAt)).toLocaleDateString('en-GB')}
                                                </Text>
                                            </Box>
                                            <Box float='right'>
                                                <IconButton 
                                                    size='xs' 
                                                    aria-label='Accept invite' 
                                                    icon={<CheckIcon/>}
                                                    onClick={ async () => {
                                                        await acceptInvite()
                                                        router.reload()
                                                    }}
                                                />
                                                <IconButton 
                                                    size='xs' 
                                                    ml={2} 
                                                    aria-label='Decline invite' 
                                                    icon={<SmallCloseIcon/>}
                                                    onClick={ async () => {
                                                        await declineInvite()
                                                        router.reload()
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        )
}
                </ModalBody>
                <ModalFooter/>
                </ModalContent>
            </Modal>
        </>
            
        )
    }
    

    return (
        <Flex 
            bg={'black'} 
            position={"fixed"} 
            zIndex={"100"}
            height={"70px"}
            display={"flex"}
            align={"center"}
            width={1000}
            mt={0}
        >
            <Box align="center" display={"flex"}>
                {/* ADD LOGO */}
            </Box>
            <Flex
                m={"auto"}
                align={"center"}
                flex={1}
            >
                <a href="/">
                    <Text 
                        textDecoration={"none"} 
                        fontWeight={"bold"}
                        fontSize={20} 
                        color={'purple.200'} 
                        ml={5}
                    >
                        FitnessApp
                    </Text>
                </a>
                <Box ml={'auto'} alignItems='center'>
                    {body}
                </Box>
            </Flex>
        </Flex>
    );
}