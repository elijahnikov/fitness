import { FormControl, FormErrorMessage, FormLabel, InputGroup, InputLeftElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type NumberInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    max?: number;
    label?: string;
    icon?: any;
    defaultValue?: number;
};

export const NumberField: React.FC<NumberInputFieldProps> = ({max, defaultValue, label, size: _, ...props}) => {
    const [field, {error}] = useField(props)
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
        <FormControl>
            <FormLabel
                color='white'
                htmlFor={field.name}
            >
                {label}
            </FormLabel>
            <InputGroup>
                {iconTag}
                <NumberInput 
                    min={0}
                    max={max}
                    defaultValue={defaultValue}
                    width={"100%"}
                    color='white' 
                    borderColor='#212731' 
                    bgColor={'#212731'}
                    borderRadius={6}
                >
                    <NumberInputField type="number" {...field} {...props} id={field.name}/>
                </NumberInput>
            </InputGroup>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null }
        </FormControl>
    );
}