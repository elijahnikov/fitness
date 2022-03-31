import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateFromPicker } from '../utils/foodDiary/formatDate';

interface chooseDateModalProps {
    page: string
}

export const ChooseDateModal: React.FC<chooseDateModalProps> = ({page}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const router = useRouter()

    const handleChange = (date) => {
        onClose()
        setSelectedDate(date)
        router.push(`/${page}/${formatDateFromPicker(date)}`)
    }

    return (
        <>
            <Button 
                onClick={onOpen}
                mb={5}
                size='xs'>
                    Choose date
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent mt={130} bgColor={'#14181E'}>
                <ModalHeader color='white'>Choose date</ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={selectedDate} 
                        onChange={handleChange}
                    />
                </ModalBody>

                <ModalFooter>
                    
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
        
    );
}