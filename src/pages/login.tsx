import React from 'react'
import {Form, Formik} from 'formik';
import { Text, Box, Button, Heading, Divider, Link, Center } from '@chakra-ui/react';
import { Wrapper } from '../components/wrapper';
import { InputField } from '../components/inputField';
import { Container } from '../components/container';
import { useRouter } from 'next/router';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { NavBar } from '../components/navBar';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { errorMap } from '../utils/errorMap';
import { withApollo } from '../utils/withApollo';

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [login] = useLoginMutation();
    
    return (
        <Container height="100vh">
            <Heading mb={10} mt={20}>Log In</Heading>
            <Wrapper variant="small">
                <Formik 
                    initialValues={{email: "", password: ""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await login({variables: values,
                            update: (cache, {data}) => {
                                //update the cache with logged in user
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data?.login.user,
                                    }
                                })
                            }
                        })

                        if (response.data?.login.errors)
                        {
                            //set errors if applicable
                            setErrors(errorMap(response.data.login.errors))
                        }
                        else if (response.data?.login.user)
                        {
                            //if user was redirected to login from specific page, redirect back to 
                            //said page after login success
                            //if not, redirect to home page
                            if (typeof router.query.next === 'string')
                            {
                                router.push(router.query.next)
                            }
                            else {
                                router.push('/')
                            }
                        }
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <InputField icon={<EmailIcon color="gray.300"/>} name="email" placeholder={"email"} label="E-mail"/>
                            <Box mt={4}>
                                <InputField icon={<LockIcon color="gray.300"/> } name="password" placeholder="password" label="Password" type="password"/>
                            </Box>
                            <Button mt={7} width='100%' bg={'purple.100'} color={'white'} isLoading={isSubmitting} type="submit">login</Button>
                        </Form>
                    )}

                </Formik>
                <Divider mt={6}/>
                <Center textAlign={'center'} mt={3} fontSize={"14px"}>
                    <Box>
                        <Text>
                            Don't have an account?{" "}
                            <NextLink href='/register'>
                                <Link color='purple.200'>Register here</Link>
                            </NextLink>
                        </Text>
                        <Text mt={1}>
                            Forgot password?{" "}
                            <NextLink href='/forgot-password'>
                                <Link color='purple.200'>Reset</Link>
                            </NextLink>
                        </Text>
                    </Box>
                </Center>
            </Wrapper>
        </Container>
    );
}

export default withApollo({ssr: false})(Login)