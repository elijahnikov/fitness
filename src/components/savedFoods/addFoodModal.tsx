import { 
    useDisclosure, 
    Button, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter, 
    Box, 
    FormControl, 
    FormLabel,
    Text} 
from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import { SelectControl } from 'formik-chakra-ui';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useCreateSavedFoodMutation, useSignS3Mutation } from '../../generated/graphql';
import { validateSavedFoodInput } from '../../utils/validate/validateSavedFoodInput';
import { InputField } from '../inputField';
import { NumberField } from '../numberInputField';
import Dropzone from 'react-dropzone'
import axios from 'axios';

interface addFoodModalProps {

}

export const AddFoodModal: React.FC<addFoodModalProps> = ({}) => {

    const router = useRouter()
    const [showError, setShowError] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [createSavedFood] = useCreateSavedFoodMutation();

    const [signS3] = useSignS3Mutation()
    const [file, setFile] = useState(null)
    const onDrop = (files) => {
        setFile(files[0])
    }

    const uploadToS3 = async (file, signedRequest) => {
        const options = {
            headers: {
                "Content-Type": file.type
            }
        };
        await axios.put(signedRequest, file, options)
    }

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
                <ModalContent bgColor={'#14181E'}>
                <ModalHeader color='white'>Add to Saved Food</ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody>
                    <Formik 
                        initialValues={{
                            title: "", 
                            type:  "", 
                            serving:  0, 
                            calories:  0, 
                            protein: 0, 
                            carbs: 0, 
                            fat: 0
                        }}
                        onSubmit={async (values, {setErrors}) => {
                            if (validateSavedFoodInput(values))
                            {
                                setShowError(true)
                            }
                            else 
                            {   
                                let url = ''
                                if (file)
                                {
                                    const s3Response = await signS3({
                                        variables: {
                                            filename: file.name,
                                            filetype: file.type
                                        }
                                    })
                                    const {signedRequest} = s3Response.data.signS3
                                    url = s3Response.data.signS3.url
                                    console.log(signedRequest)
                                    console.log(url)
                                    await uploadToS3(file, signedRequest)
                                }
                                const response = await createSavedFood({
                                    variables: {
                                        input: {
                                            title: values.title,
                                            type: values.type,
                                            serving: values.serving,
                                            calories: values.calories,
                                            protein: values.protein,
                                            carbs: values.carbs,
                                            fat: values.fat,
                                            pictureUrl: url
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
                                <Box mt={4}>
                                    <NumberField name="serving" placeholder="servings" label="Servings"/>
                                </Box>
                                <Box mt={4}>
                                    <NumberField name="calories" placeholder="calories" label="Calories"/>
                                </Box>
                                <Box mt={4}>
                                    <NumberField name="protein" placeholder="protein" label="Protein"/>
                                </Box>
                                <Box mt={4}>
                                    <NumberField name="carbs" placeholder="carbs" label="Carbs"/>
                                </Box>
                                <Box mt={4}>
                                    <NumberField name="fat" placeholder="fat" label="Fat"/>
                                </Box>
                                <Box mt={4} mb={6}>  
                                    <FormLabel 
                                        color='white'>
                                            Picture
                                    </FormLabel>  
                                    <Dropzone onDrop={onDrop}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Box p={3} textAlign={'center'} height='50px' borderRadius={'5px'} bgColor={'#212731'}>
                                                <Text color='white'>{file?.name ? file.name : "Drag 'n' drop some files here, or click to select files"}</Text>
                                            </Box>
                                        </div>
                                        </section>
                                    )}
                                    </Dropzone>
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
  )
}