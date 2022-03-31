import { Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import { useCreateGroupMutation } from '../../generated/graphql';
import { errorMap } from '../../utils/errorMap';
import { Container } from '../container';
import { InputField } from '../inputField';
import { NavBar } from '../navBar';
import { Wrapper } from '../wrapper';

interface notInGroupProps {

}

export const NotInGroup: React.FC<notInGroupProps> = ({}) => {

    const [createGroup] = useCreateGroupMutation()
    const router = useRouter()

    return (

        <Container height='100%'>
            <NavBar/>
            <Wrapper variant='window'>
                <Box width='100%' textAlign={'center'}>
                    <Heading mt={170}>You are not currently in a group.</Heading>
                    
                    <Box mt={10} marginLeft='auto' marginRight='auto' width='50%'>
                        <Formik 
                            initialValues={{
                                name: "", 
                            }}
                            onSubmit={async (values, {setErrors}) => {
                                const response = await createGroup({
                                    variables: {
                                        name: values.name
                                    }
                                })

                                if (response.data?.createGroup.errors)
                                {
                                    setErrors(errorMap(response.data.createGroup.errors))
                                }
                                else if (response.data?.createGroup.group)
                                {
                                    router.reload()
                                }
                            }}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <Box mt={4} mb={4}>
                                        <InputField name="name" placeholder="Group Name"/>
                                    </Box>
                                    <Button mt={4} bg='purple.100' isLoading={isSubmitting} type='submit'>
                                        Create a group
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Wrapper>
        </Container>
        
    );
}