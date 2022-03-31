import { Text, Image, useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Stack, Heading, Avatar } from '@chakra-ui/react';
import React from 'react'
import { GetGroupByUserQuery, GetGroupMembersQuery, MeQuery } from '../../generated/graphql';
import { InviteMembers } from './inviteMembers';
import { RemoveMemberButton } from './removeMemberButton';

interface membersModalProps {
    membersData: GetGroupMembersQuery
    membersLoading: boolean
    groupData: GetGroupByUserQuery
    meData: MeQuery
}

export const MembersModal: React.FC<membersModalProps> = ({membersData, membersLoading, groupData, meData}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    if (!membersData){
        return (
            <Box textAlign={'center'}>
                <Heading size='lg'>
                    An error has occured, please try again
                </Heading>
            </Box>
        )
    }

    return (
        <>
            <Button 
                onClick={onOpen} 
                bg='purple.100' 
                mr={4}
                >
                    Members
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bgColor={'#14181E'}>
                <ModalHeader color='white'>Members</ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody>
                    <Box mb={5}>
                        <Box mb={20}>
                            <InviteMembers groupData={groupData} meData={meData}/>
                        </Box>
                        
                        {!membersData && membersLoading ? 
                            (
                                <Box textAlign={'center'} alignItems='center'>
                                    <Text>
                                        Loading...
                                    </Text>
                                </Box>
                            ):

                            membersData.getGroupMembers.members.length === 0 ?

                            <Box textAlign={'center'} alignItems='center'>
                                <Text>Cannot find any group members</Text>
                            </Box> 

                            : (
                                <Box display='flex'>
                                    <Stack width='100%' spacing={4}>
                                        {membersData.getGroupMembers.members.map((m) => !m ? <div>Nothing here</div> : (
                                            <Box position='relative' borderRadius={10} border='1px' 
                                            borderColor='#2B2B2B'
                                            bg='#0C0E10' color='white' key={m.id} p={4}>
                                                <Box float='left' width='80%'>
                                                    <Box float='left'>
                                                        <Avatar mr={5} boxSize='60px' src={m.user.avatar} name={m.user.username}/>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='sm'>
                                                            {m.user.displayName ? m.user.displayName : m.user.username}
                                                        </Heading>
                                                        <Text> 
                                                            @{m.user.username}
                                                        </Text>
                                                    </Box>
                                                    {m.isOwner ? (
                                                        <Box>
                                                            <Text color='gray.500' fontWeight={'bold'} fontSize='12px'>OWNER</Text>
                                                        </Box>
                                                    ) : null}
                                                </Box>
                                                {m.isOwner ? null : (
                                                    <Box float='right'>
                                                        <RemoveMemberButton meData={meData} userMemberId={m.user.id} creatorId={groupData.getGroupByUser.creatorId}/>
                                                    </Box>
                                                )}
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            )
                        }
                    </Box>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}