import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Heading, Box, Button, Divider, Center, Text, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import NextLink from 'next/link';
import { InputField } from "../components/inputField";
import { Wrapper } from "../components/wrapper";
import { Container }  from '../components/container' 
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { errorMap } from "../utils/errorMap";

const Register: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [register] = useRegisterMutation();

    return (
        <Container height="100vh">
            <Heading mb={10} mt={20}>Register</Heading>
            <Wrapper variant="small">
                <Formik 
                    initialValues={{username: "", password: "", email: ""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await register({variables: values, 
                            update: (cache, {data}) => {
                                //update the cache with logged in user
                                //as user is automatically logged in after registration
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: "Query",
                                        me: data?.register.user
                                    }
                                })
                            }
                        })
                        if (response.data?.register.errors)
                        {
                            //map errors to input fields if applicable
                            setErrors(errorMap(response.data.register.errors));
                        } else if (response.data?.register.user)
                        {
                            router.push("/");
                        }
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <InputField name="username" placeholder="username" label="Username"/>
                            <Box mt={4}>
                                <InputField icon={<EmailIcon color="gray.300"/>} name="email" placeholder="email" label="E-mail"/>
                            </Box>
                            <Box mt={4}>
                                <InputField icon={<LockIcon color="gray.300"/>} name="password" placeholder="password" label="Password" type="password"/>
                            </Box>
                            <Button mt={7} width='100%' bg={'purple.100'} color='white' isLoading={isSubmitting} type="submit">register</Button>
                        </Form>
                    )}

                </Formik>
                <Divider mt={6}/>
                <Center mt={3} fontSize={"14px"}>
                    <Text color={"white"}>
                        Already have an account?{" "}
                        <NextLink href='/login'>
                            <Link color={'purple.200'}>Login here</Link>
                        </NextLink>
                    </Text>
                </Center>
            </Wrapper>
        </Container>
    );
}

export default withApollo({ ssr: false })(Register);