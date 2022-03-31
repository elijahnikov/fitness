import { useDisclosure, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, FormControl, FormLabel, NumberInputField, ModalFooter } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { SelectControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useNewWorkoutDiaryEntryMutation, useWorkoutsQuery } from '../../generated/graphql';
import { validateWorkoutDiaryInput } from '../../utils/validate/validateDiaryInput';
import { NumberField } from '../numberInputField';

interface addToDiaryModalProps {

}

export const AddToDiaryModal: React.FC<addToDiaryModalProps> = ({}) => {

    const {data, loading, error} = useWorkoutsQuery({
        variables: {
            limit: null as number | null
        }
    })

    const [newWorkoutDiaryEntry] = useNewWorkoutDiaryEntryMutation()

    const router = useRouter()
    const [showError, setShowError] = useState(false)
    const {isOpen, onOpen, onClose} = useDisclosure()

    let body = null

    if (!data?.workouts)
    {
        body = (
            <Text>
                No workouts found.
            </Text>
        )
    }

    if (error)
    {
        body = (
            <Text>
                {error.message}
            </Text>
        )
    }

    if (loading)
    {
        body = (
            <Text>
                loading...
            </Text>
        )
    }

    return (
        <>
            <Button
                onClick={onOpen}
                width='100px'
                bg='purple.100'
                size='sm'>
                    Add
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bgColor={'#14181E'}>
                <ModalHeader color='white'>Add to your Workout Diary</ModalHeader>
                <ModalCloseButton color='white'/>
                <ModalBody>
                    {body}
                    <Formik
                        initialValues={{
                            type: "",
                            weight: 0,
                            duration: 0,
                            workoutId: 0
                        }}
                        onSubmit={async (values, {setErrors}) => {
                            if (validateWorkoutDiaryInput(values.type, values.workoutId.valueOf()))
                            {
                                setShowError(true)
                            }
                            else
                            {
                                const response = await newWorkoutDiaryEntry({
                                    variables: {
                                        input: {
                                            type: values.type,
                                            workoutId: parseInt(values.workoutId.valueOf().toString()),
                                            duration: values.duration,
                                            weight: values.weight
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
                                            <option>Strength</option>
                                            <option>Cardio</option>
                                            <option>Hypertrophy</option>
                                        </SelectControl>
                                    </FormControl>
                                </Box>
                                <Box mt={4}>
                                    <FormControl name="workoutId" id="workoutId">
                                        <FormLabel 
                                            color='white' 
                                            htmlFor={"workoutId"}>
                                                Workout
                                        </FormLabel>
                                        <SelectControl 
                                            id="workoutId"
                                            borderRadius={6}
                                            selectProps={{ border: 'none', placeholder: "Select option"}} 
                                            name="workoutId"
                                            color='white'
                                            bgColor={'#212731'}
                                        >               

                                            {!data && loading ? null : 
                                                data.workouts.workouts.length === 0 ? null :(
                                                    data.workouts.workouts.map((w) => !w ? <div>Nothing here</div> : (
                                                        <option value={w.id} key={w.id}>{w.title}</option>
                                                    ))
                                                )
                                            }                             
                                        </SelectControl>
                                    </FormControl>
                                </Box>
                                <Box mt={4}>
                                    <NumberField name='duration' placeholder='duration' label='Duration'/>
                                </Box>
                                <Box mb={4} mt={4}>
                                    <NumberField name='weight' placeholder='weight' label='Weight'/>
                                </Box>
                                {showError ? <Text mt={4} color='red.400'>Please ensure you have completed all fields.</Text> : null}
                                <Box float='right'>
                                    <Button bg={'purple.100'} mr={4} color={'white'} isLoading={isSubmitting} type="submit">save</Button>
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