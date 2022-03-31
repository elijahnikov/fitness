import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label?: string;
    icon?: any;
};

export const InputField: React.FC<InputFieldProps> = ({label, size: _, ...props}) => {
    const [field, {error}] = useField(props);
    let iconTag;
    if (props.icon){
        iconTag = (
            <InputLeftElement 
                pointerEvents='none'
                children={props.icon}
                color={'gray.300'}
                fill={'gray.300'}
            />
        )
    } else {
        iconTag = null;
    }

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel 
                color='white' 
                htmlFor={field.name}>
                    {label}
            </FormLabel>
            <InputGroup>
                {iconTag}
                <Input 
                    spellCheck="false" 
                    {...field} 
                    {...props} 
                    id={field.name} 
                    color='white' 
                    border='none' 
                    bgColor={'#212731'}
                />
                {/* <Input border='none' spellCheck="false" {...field} {...props} id={field.name} color='white' bgColor={'gray.800'} borderColor={'gray.600'}/> */}
            </InputGroup>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null }
        </FormControl>
    );
}
