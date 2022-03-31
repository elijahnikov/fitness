import { Box, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, Text, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { SelectControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useCreateActivityMutation } from '../../generated/graphql';
import { validateScheduleInput } from '../../utils/validate/validateScheduleInput';
import { InputField } from '../inputField';
import { NumberField } from '../numberInputField';

interface addToScheduleModalProps {

}

export const AddToScheduleModal: React.FC<addToScheduleModalProps> = ({}) => {

    const router = useRouter()
    const [showError, setShowError] = useState(false)
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [createActivity] = useCreateActivityMutation()

    return (
        <>
            <Button
                onClick={onOpen}
                mt={4}
                bg='purple.100'
                size='sm'
            >
                Add
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent bgColor={'#14181E'}>
                    <ModalHeader color='white'>Add to your Schedule</ModalHeader>
                    <ModalCloseButton color='white'/>
                    <ModalBody>
                        <Formik 
                            initialValues={{
                                title: "",
                                type: "",
                                day: "",
                                duration: 0
                            }}
                            onSubmit={async (values, {setErrors}) => {
                                if (validateScheduleInput(values))
                                {
                                    setShowError(true)
                                }
                                else
                                {
                                    const response = await createActivity({
                                        variables: {
                                            input: {
                                                title: values.title,
                                                type: values.type,
                                                day: values.day,
                                                duration: values.duration
                                            }
                                        }
                                    })
                                    if(response.errors) console.log(response.errors)
                                    onClose()
                                    router.reload()
                                }
                            }}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <Box>
                                        <FormControl name="day" id="day">
                                            <FormLabel 
                                                color='white' 
                                                htmlFor={"day"}>
                                                    Day
                                            </FormLabel>
                                            <SelectControl 
                                                id="day"
                                                borderRadius={6}
                                                selectProps={{ border: 'none', placeholder: "Select option"}} 
                                                name="day"
                                                color='white'
                                                bgColor={'#212731'}
                                            >
                                                <option>Monday</option>
                                                <option>Tuesday</option>
                                                <option>Wednesday</option>
                                                <option>Thursday</option>
                                                <option>Friday</option>
                                                <option>Saturday</option>
                                                <option>Sunday</option>
                                            </SelectControl>
                                        </FormControl>
                                    </Box>
                                    <Box mt={4}>
                                        <FormControl name="type" id="type">
                                            <FormLabel 
                                                color='white' 
                                                htmlFor={"type"}>
                                                    Type
                                            </FormLabel>
                                            <SelectControl 
                                                id="type"
                                                borderRadius={6}
                                                selectProps={{ border: 'none', placeholder: "Select option"}} 
                                                name="type"
                                                color='white'
                                                bgColor={'#212731'}
                                            >
                                                <option>Workout</option>
                                                <option>Cardio</option>
                                                <option>Meal</option>
                                            </SelectControl>
                                        </FormControl>
                                    </Box>
                                    <Box mt={4}>
                                        <InputField name='title' placeholder='name' label='Name'/>
                                    </Box>
                                    <Box mt={4} mb={6}>
                                        <NumberField name="duration" placeholder="duration" label="Duration"/>
                                    </Box>
                                    {showError ? <Text mt={4} color='red.400'>Please ensure you have completed all fields.</Text> : null}
                                    <Box float='right'>
                                        <Button bg='purple.100' mr={4} color='white' isLoading={isSubmitting} type='submit'>
                                            save
                                        </Button>
                                        <Button color='white' onClick={onClose}>
                                            close
                                        </Button>
                                    </Box>
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