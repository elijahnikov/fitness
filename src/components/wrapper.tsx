import { Box } from '@chakra-ui/react';
import React from 'react'

interface wrapperProps {
    variant?: "small" | "regular" | "large" | "window"
}

export const Wrapper: React.FC<wrapperProps> = ({children, variant="regular"}) => {
    let size = null

    switch(variant){
        case "regular":
            size = "650px"
            break;
        case "small":
            size = "500px"
            break;
        case "large":
            size = "900px"
            break;
        case "window":
            size = "960px"
    }

    return (
        <Box
            minW={size}
            maxW={size}
            w="100%"
            mx="auto"
        >
            {children}
        </Box>
    );
}