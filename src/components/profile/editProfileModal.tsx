
import { Box, Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel } from '@chakra-ui/react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import { SelectControl } from 'formik-chakra-ui'
import { values } from 'lodash'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { MeQuery, useEditUserDetailsMutation, useSignS3Mutation } from '../../generated/graphql'
import { validateSavedWorkoutInput } from '../../utils/validate/validateSavedWorkoutInput'
import { InputField } from '../inputField'
import { NumberField } from '../numberInputField'

interface editProfileModalProps {
    data: MeQuery
}

export const EditProfileModal: React.FC<editProfileModalProps> = ({data}) => {

    const router = useRouter()
    const [showError, setShowError] = useState(false)
    const {isOpen,  onOpen, onClose} = useDisclosure()

    const [editUserDetails] = useEditUserDetailsMutation()

    const [file, setFile] = useState(null)

    const [signS3] = useSignS3Mutation()

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
            <Box mt={8}>
                <Button 
                    size='sm' 
                    bg='purple.100'
                    onClick={onOpen}
                    >
                    Edit profile
                </Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bgColor={'#14181E'} >
                    <ModalHeader color='white'>Edit profile</ModalHeader>
                    <ModalCloseButton color='white' />
                    <ModalBody>
                        <Formik 
                            initialValues={{
                                displayName: data.me.displayName,
                                currentWeight: data.me.currentWeight,
                                goalWeight: data.me.goalWeight,
                                heightFeet: data.me.heightFeet,
                                heightInches: data.me.heightInches,
                                age: data.me.age,
                                gender: data.me.gender,
                                activityLevel: data.me.activityLevel
                            }}
                            
                            onSubmit={async (values, {setErrors}) => {
                                let url = data.me.avatar
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
                                    await uploadToS3(file, signedRequest)
                                }
                                const response = await editUserDetails({
                                    variables: {
                                        displayName: values.displayName,
                                        currentWeight: values.currentWeight,
                                        goalWeight: values.goalWeight,
                                        heightFeet: values.heightFeet,
                                        heightInches: values.heightInches,
                                        age: values.age,
                                        gender: values.gender,
                                        activityLevel: values.activityLevel,
                                        avatar: url
                                    }
                                })
                                if (response.data?.editUserDetails.errors)
                                {
                                    setShowError(true)
                                }
                                else if (response.data?.editUserDetails.user)
                                {
                                    setShowError(false)
                                    onClose()
                                    router.reload()
                                }
                                
                            }}
                        >
                            {(formik) => (
                                <Form>
                                    <Box mt={4} mb={4}>  
                                <FormLabel 
                                    color='white'>
                                        Profile Picture
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
                            <InputField name="displayName" placeholder={"display name"} label="Display Name"/>
                            <Box mt={4}>
                                <NumberField defaultValue={data.me.currentWeight} name="currentWeight" placeholder="weight(kg)" label="Current Weight"/>
                            </Box>
                            <Box mt={4}>
                                <NumberField defaultValue={data.me.goalWeight} name="goalWeight" placeholder="weight(kg)" label="Goal Weight"/>
                            </Box>
                            <Box mt={4}>
                                <NumberField defaultValue={data.me.heightFeet} name="heightFeet" placeholder="feet" label="Height" />
                            </Box>
                            <Box mt={4}>
                                <NumberField defaultValue={data.me.heightInches} name="heightInches" placeholder="inches" max={12}/>
                            </Box>
                            <Box mt={4}>
                                <NumberField defaultValue={data.me.age} name="age" placeholder="years" label="Age"/>
                            </Box>
                            <Box mt={4}>
                                <FormControl name="gender" id="gender">
                                    <FormLabel 
                                        color='white' 
                                        htmlFor={"gender"}>
                                            Gender
                                    </FormLabel>
                                    <SelectControl 
                                        id="gender"
                                        selectProps={{ borderColor: '#2B2B2B', placeholder: 'Select option'}} 
                                        name="gender"
                                        color='white'
                                        bgColor={'#212731'}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                    </SelectControl>
                                </FormControl>
                            </Box>
                            <Box mt={4}>
                                <FormControl name="activityLevel" id="activityLevel">
                                    <FormLabel 
                                        color='white' 
                                        htmlFor={"activityLevel"}>
                                            Activity Level
                                    </FormLabel>
                                    <SelectControl 
                                        id="activityLevel"
                                        selectProps={{ borderColor: '#2B2B2B', placeholder: 'Select option'}} 
                                        name="activityLevel"
                                        color='white'
                                        bgColor={'#212731'}
                                    >
                                        <option>Sedentary</option>
                                        <option>Light</option>
                                        <option>Moderate</option>
                                        <option>Very Active</option>
                                    </SelectControl>
                                </FormControl>
                            </Box>
                            
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