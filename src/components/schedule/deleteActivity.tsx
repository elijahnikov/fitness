import { DeleteIcon } from '@chakra-ui/icons';
import { Popover, PopoverTrigger, IconButton, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import { useDeleteActivityMutation } from '../../generated/graphql';

interface deleteActivityProps {
    activityId: number
}

export const DeleteActivity: React.FC<deleteActivityProps> = ({activityId}) => {

    const initRef = useRef()
    const [deleteActivity] = useDeleteActivityMutation()
    const router = useRouter()

    return (
        <Popover 
            closeOnBlur={false} initialFocusRef={initRef}>
            {({ onClose }) => (
            <>
                <PopoverTrigger>
                    <IconButton
                        size='xs'
                        float={'right'}
                        colorScheme='gray'
                        aria-label='Delete'
                        icon={<DeleteIcon />}
                    />
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader color='white'>Are you sure you wish to delete?</PopoverHeader>
                    <PopoverBody>
                        <Button 
                            mr={4}
                            colorScheme='red'
                            onClick={() => {
                                deleteActivity({variables: {id: activityId}, update: (cache) => {
                                    cache.evict({id: 'Schedule' + activityId})
                                }})
                                router.reload()
                            }}
                        >
                            Delete
                        </Button>
                        <Button variant='outline' onClick={onClose}>
                            Cancel
                        </Button>
                    </PopoverBody>
                    </PopoverContent>
                </Portal>
            </>
            )}
        </Popover>
    );
}