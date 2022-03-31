import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react'
import { GetGroupByUserQuery, MeQuery, useCreateInviteMutation } from '../../generated/graphql';
import { InputField } from '../inputField';

interface inviteMembersProps {
    groupData: GetGroupByUserQuery
    meData: MeQuery
}

export const InviteMembers: React.FC<inviteMembersProps> = ({groupData, meData}) => {

    const [createInvite] = useCreateInviteMutation()
    const [showSuccess, setShowSuccess] = useState(false)

    if (meData?.me.id !== groupData.getGroupByUser.creatorId)
    {
        return <Box mb={'-20'}></Box>
    }

    return (
        <Box>
            <Formik 
                    initialValues={{username: ""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await createInvite({
                            variables: {
                                username: values.username
                            }
                        })
                        setShowSuccess(true)
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <InputField name="username" placeholder={"username"} label="Invite Member"/>
                            <Button mt={4} width='100%' bg={'purple.100'} color={'white'} isLoading={isSubmitting} type="submit">invite</Button>
                            {showSuccess ? <Text color='green.400'>Invite sent</Text> : null}
                        </Form>
                    )}

                </Formik>
        </Box>
    );
}