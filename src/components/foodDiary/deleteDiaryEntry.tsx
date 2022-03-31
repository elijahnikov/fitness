import { DeleteIcon } from '@chakra-ui/icons';
import { Popover, PopoverTrigger, IconButton, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import { useDeleteFoodDiaryEntryMutation } from '../../generated/graphql';

interface deleteDiaryEntryProps {
    entryId: number
}

export const DeleteDiaryEntry: React.FC<deleteDiaryEntryProps> = ({entryId}) => {

    const initRef = useRef()
    const [deleteFoodDiaryEntry] = useDeleteFoodDiaryEntryMutation()
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
                                deleteFoodDiaryEntry({variables: {id: entryId}, update: (cache) => {
                                    cache.evict({id: 'FoodDiary' + entryId})
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