import { Box, Button, FormControl, FormLabel, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { SelectControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { useCreateWeightEntryMutation } from '../../generated/graphql';
import { NumberField } from '../numberInputField';

interface weightHistoryInputModalProps {

}

export const WeightHistoryInputModal: React.FC<weightHistoryInputModalProps> = ({}) => {

    const router = useRouter()
    const {isOpen,  onOpen, onClose} = useDisclosure()
    const [showError, setShowError] = useState(false)
    const [createWeightEntry] = useCreateWeightEntryMutation()

    return (
        <>
            <Box float='right'display='inline-block'>
                <Button onClick={onOpen} size='md' bg='purple.100' >Add</Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bgColor={'#14181E'} >
                    <ModalHeader color='white'>Add weight history entry</ModalHeader>
                    <ModalCloseButton color='white' />
                    <ModalBody>
                        <Formik 
                            initialValues={{
                                weight: 0
                            }}
                            
                            onSubmit={async (values, {setErrors}) => {
                                if (values.weight <= 0)
                                {
                                    setShowError(true)
                                }
                                else 
                                {
                                    const response = await createWeightEntry({
                                        variables: {
                                            weight: values.weight
                                        }
                                    })
                                    setShowError(false)
                                    router.reload()
                                }
                            }}
                        >
                            {(formik) => (
                            <Form>
                                <NumberField name="weight" placeholder="weight(kg)" label="Weight"/>
                                
                                {showError ? <Text mt={4} color='red.400'>Please ensure you have completed all fields.</Text> : null}

                                <Button mt={5} width='100%' bg={'purple.100'} color='white' isloading={formik.isSubmitting} type="submit">save</Button>
                            </Form>
                            )}

                        </Formik>
                    </ModalBody>

                    <ModalFooter>
                        
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}