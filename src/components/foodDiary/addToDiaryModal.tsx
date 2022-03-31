import { Box, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { SelectControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useFoodsQuery, useNewFoodDiaryEntryMutation } from '../../generated/graphql';
import { validateDiaryInput } from '../../utils/validate/validateDiaryInput';

interface addToDiaryModalProps {

}

export const AddToDiaryModal: React.FC<addToDiaryModalProps> = ({}) => {

    const {data, loading, error} = useFoodsQuery({
        variables: {
            limit: null as number | null
        }
    })

    const [newFoodDiaryEntry] = useNewFoodDiaryEntryMutation()

    const router = useRouter()
    const [showError, setShowError] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    let body = null

    if (!data?.foods)
    {
        body = (
            <Text>
                No foods found.
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
                <ModalHeader color='white'>Add to your Food Diary</ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody>
                    {body}
                    <Formik 
                        initialValues={{
                            type:  "", 
                            foodId: 0
                        }}
                        onSubmit={async (values, {setErrors}) => {
                            if (validateDiaryInput(values.type, values.foodId.valueOf()))
                            {
                                setShowError(true)
                            }
                            else
                            {
                                const response = await newFoodDiaryEntry({
                                    variables: {
                                        input: {
                                            type: values.type,
                                            foodId: parseInt(values.foodId.valueOf().toString())
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
                                            <option>Breakfast</option>
                                            <option>Lunch</option>
                                            <option>Dinner</option>
                                            <option>Snack</option>
                                        </SelectControl>
                                    </FormControl>
                                </Box>
                                <Box mb={5} mt={4}>
                                    <FormControl name="foodId" id="foodId">
                                        <FormLabel 
                                            color='white' 
                                            htmlFor={"foodId"}>
                                                Food
                                        </FormLabel>
                                        <SelectControl 
                                            id="foodId"
                                            borderRadius={6}
                                            selectProps={{ border: 'none', placeholder: "Select option"}} 
                                            name="foodId"
                                            color='white'
                                            bgColor={'#212731'}
                                        >               

                                            {!data && loading ? null : 
                                                data.foods.foods.length === 0 ? null :(
                                                    data.foods.foods.map((f) => !f ? <div>Nothing here</div> : (
                                                        <option value={f.id} key={f.id}>{f.title}</option>
                                                    ))
                                                )
                                            }                             
                                        </SelectControl>
                                    </FormControl>
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