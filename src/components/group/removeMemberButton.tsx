import { SmallCloseIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { MeQuery, useKickMemberMutation, useMeQuery } from '../../generated/graphql';

interface removeMemberButtonProps {
    userMemberId: number
    creatorId: number
    meData: MeQuery
}

export const RemoveMemberButton: React.FC<removeMemberButtonProps> = ({userMemberId, creatorId, meData}) => {

    const [kickMember] = useKickMemberMutation()
    const router = useRouter()

    if (meData?.me.id !== creatorId)
    {
        return null
    }

    return (
        <Box>
            <IconButton
                size='xs'
                onClick={() => {
                    kickMember({variables: {id: userMemberId}, update: (cache) => {
                        cache.evict({id: 'GroupMembers' + userMemberId})
                    }})
                    router.reload()
                }}
                aria-label='Remove member'
                icon={<SmallCloseIcon/>}
            ></IconButton>
        </Box>
    );
}