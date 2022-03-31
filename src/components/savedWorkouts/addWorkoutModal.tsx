import { Box, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { SelectControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useCreatedSavedWorkoutMutation } from '../../generated/graphql';
import { validateSavedWorkoutInput } from '../../utils/validate/validateSavedWorkoutInput';
import { InputField } from '../inputField';
import { NumberField } from '../numberInputField';

interface addWorkoutModalProps {

}

export const AddWorkoutModal: React.FC<addWorkoutModalProps> = ({}) => {

    const router = useRouter()
    const [showError, setShowError] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [createSavedWorkout] = useCreatedSavedWorkoutMutation()
    
    return (
        <>
            <Button 
                onClick={onOpen}
                mt={4} 
                bg='purple.100' 
                size='sm'>
                    Add
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bgColor={'#14181E'} >
                    <ModalHeader color='white'>Add to Saved Workouts</ModalHeader>
                    <ModalCloseButton color='white' />
                    <ModalBody>
                        <Formik 
                            initialValues={{
                                title: "",
                                type: "",
                                sets: "",
                                reps: "",
                                weight: 0,
                                duration: 0
                            }}
                            onSubmit={async (values, {setErrors}) => {
                                if (validateSavedWorkoutInput(values))
                                {
                                    setShowError(true)
                                }
                                else 
                                {
                                    const response = await createSavedWorkout({
                                        variables: {
                                            input: {
                                                title: values.title,
                                                type: values.type,
                                                sets: values.sets,
                                                reps: values.reps,
                                                weight: values.weight,
                                                duration: values.duration
                                            }
                                        }
                                    })
                                    if (response.errors) console.log(response.errors)
                                    router.reload()
                                }
                            }}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <InputField name="title" placeholder={"title"} label="Title"/>
                                    <Box mt={4}>
                                        <InputField name="type" placeholder={"type (strength, cardio, hypertrophy etc.)"} label="Type"/>
                                    </Box>
                                    <Box mt={4}>
                                        <InputField name="sets" placeholder={"sets"} label="Sets"/>
                                    </Box>
                                    <Box mt={4}>
                                        <InputField name="reps" placeholder={"reps"} label="Reps"/>
                                    </Box>
                                    <Box mt={4}>
                                        <NumberField name="weight" placeholder="weight" label="Weight"/>
                                    </Box>
                                    <Box mt={4} mb={6}>
                                        <NumberField name="duration" placeholder="duration" label="Duration"/>
                                    </Box>
                                    {showError ? <Text mt={4} color='red.400'>Please ensure you have completed all fields.</Text> : null}
                                    <Box float='right'>
                                        <Button bg={'purple.100'} mr={4} color={'white'} isLoading={isSubmitting} type="submit">
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