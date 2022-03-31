import { Flex } from '@chakra-ui/react'

export const Container = (props: any) => {
  
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={'#0C0E10'}
      color={'white'}
      {...props}
    />
  )
}
