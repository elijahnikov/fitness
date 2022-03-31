import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, Wrap } from '@chakra-ui/react';
import router, { useRouter } from 'next/router';
import React from 'react'
import { GetGroupByUserQuery, MeQuery, useDeleteGroupMutation, useLeaveGroupMutation, useMeQuery } from '../../generated/graphql';

interface settingsModalProps {
    groupData: GetGroupByUserQuery
}

export const SettingsModal: React.FC<settingsModalProps> = ({groupData}) => {

    const [deleteGroup] = useDeleteGroupMutation()
    const [leaveGroup] = useLeaveGroupMutation()
    const {data: meData} = useMeQuery()
    const router = useRouter()

    let deleteBtn = null
    let leaveBtn = null
    if (meData?.me.id !== groupData?.getGroupByUser.creatorId)
    {   
        leaveBtn = (
            <MenuItem
                onClick={async () => {
                    await leaveGroup()
                    router.reload()
                }}
            >
                Leave Group
            </MenuItem>
        )
        deleteBtn = null
    }
    else
    {
        leaveBtn = null
        deleteBtn = (
            <MenuItem onClick={async () => {
                await deleteGroup({variables: {
                    id: groupData?.getGroupByUser.id
                }})
                router.reload()
            }}>
                Leave and Delete Group
            </MenuItem>
        )
    }

    return (
        <>
            <Menu isLazy>
                <MenuButton as={Button} bg='purple.100'>
                    Settings
                </MenuButton>
                <MenuList border='1px' borderColor='#2B2B2B' bg='#0C0E10'>
                    {leaveBtn}
                    {deleteBtn}
                </MenuList>
            </Menu>
        </>
    );
}