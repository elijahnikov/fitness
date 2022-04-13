import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Heading, Box, Button, Divider, Center, Text, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, FormLabel, FormControl, InputGroup } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { SelectControl } from 'formik-chakra-ui'
import { responsePathAsArray } from 'graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { MeDocument, MeQuery, useEditUserDetailsMutation, useMeQuery, useSignS3Mutation } from '../../generated/graphql';
import { errorMap } from '../../utils/errorMap';
import { Container } from '../container';
import { InputField } from '../inputField';
import { NumberField } from '../numberInputField';
import { Wrapper } from '../wrapper';
import Dropzone from 'react-dropzone' 
import axios from 'axios';

interface onboardingProps {

}

export const Onboarding: React.FC<onboardingProps> = ({}) => {

    const router = useRouter()
    const {data, loading} = useMeQuery()
    const [editUserDetails] = useEditUserDetailsMutation();
    const [showError, setShowError] = useState(false);
    // const [file, setFile] = useState(null)

    // const [signS3] = useSignS3Mutation()

    // const onDrop = (files) => {
    //     setFile(files[0])
    // } 
    
    // const uploadToS3 = async (file, signedRequest) => {
    //     const options = {
    //         headers: {
    //             "Content-Type": file.type
    //         }
    //     };
    //     await axios.put(signedRequest, file, options)
    // }
    
    let username = null
    if (loading)
    {
        username = null
    } 
    else if (!data?.me)
    {
        username = null
    }
    else
    {
        username = data.me.username
    }

    return (
        <Container height="100vh">
            <Heading mb={2} mt={35}>Hi {username},</Heading>
            <Heading mb={5}>Tell us about yourself</Heading>
            <Wrapper variant="small">
                <Formik 
                    initialValues={{
                        currentWeight: 0, 
                        goalWeight:  0, 
                        heightFeet:  0, 
                        heightInches:  0, 
                        age: 0, 
                        gender: "", 
                        activityLevel: "",
                    }}
                    onSubmit={async (values, {setErrors}) => {
                        // const s3Response = await signS3({
                        //     variables: {
                        //         filename: file.name,
                        //         filetype: file.type
                        //     }
                        // })
                        // const {signedRequest, url} = s3Response.data.signS3
                        // await uploadToS3(file, signedRequest)
                        const response = await editUserDetails({variables: {
                            currentWeight: values.currentWeight,
                            goalWeight: values.goalWeight,
                            heightFeet: values.heightFeet,
                            heightInches: values.heightInches,
                            age: values.age,
                            gender: values.gender,
                            activityLevel: values.activityLevel,
                            avatar: null
                        }})
                        if (response.data?.editUserDetails.errors)
                        {
                            setShowError(true)
                        }
                        else if (response.data?.editUserDetails.user)
                        {
                            setShowError(false)
                            router.reload()
                        }
                    }}
                >
                    {(formik) => (
                        <Form>
                            {/* <Box mt={4} mb={4}>  
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
                                            <Text>{file?.name ? file.name : "Drag 'n' drop some files here, or click to select files"}</Text>
                                        </Box>
                                    </div>
                                    </section>
                                )}
                                </Dropzone>
                            </Box> */}
                            <NumberField name="currentWeight" placeholder="weight(kg)" label="Current Weight"/>
                            <Box mt={4}>
                                <NumberField name="goalWeight" placeholder="weight(kg)" label="Goal Weight"/>
                            </Box>
                            <Box mt={4}>
                                <NumberField name="heightFeet" placeholder="feet" label="Height" />
                            </Box>
                            <Box mt={4}>
                                <NumberField name="heightInches" placeholder="inches" max={12}/>
                            </Box>
                            <Box mt={4}>
                                <NumberField name="age" placeholder="years" label="Age"/>
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

                            <Button mt={5} width='100%' bg={'purple.100'} color='white' isloading={formik.isSubmitting} type="submit">continue</Button>
                        </Form>
                    )}

                </Formik>
            </Wrapper>
        </Container>
    );
}