import React, { useEffect, useRef, useState } from 'react'
import { Container } from '../components/container';
import { Wrapper } from '../components/wrapper';
import { NavBar } from '../components/navBar';
import { withApollo } from '../utils/withApollo';
import { Image, Box, Button, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Select, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import { useDeleteSavedFoodMutation, useFoodsQuery, } from '../generated/graphql';
import { AddFoodModal } from '../components/savedFoods/addFoodModal';

const Food: React.FC<{}> = ({}) => {

    const initRef = useRef()
    const [filterType, setFilterType] = useState("")
    const [filterTitle, setFilterTitle] = useState("")
    const handleTypeChange = (event) => {
        setFilterType(event.target.value)
    }
    const handleTitleChange = (event) => {
        setFilterTitle(event.target.value)
    }
    
    const { data, loading, fetchMore, error, variables} = useFoodsQuery({
        variables: {
            limit: 10,
            type: filterType,
            title: filterTitle
        },
    })
    const [deleteSavedFood] = useDeleteSavedFoodMutation();

    let body = null

    if (!data && !loading){
        body = (
            <Box textAlign={'center'}>
                <Heading size='lg'>
                    An error has occured, please try again
                </Heading>
                <Text>
                    {error.message}
                </Text>
            </Box>
        )
    }

    return (
        <Container height="100%">
            <NavBar/>
            <Wrapper variant="window">
                <Box width='100%'>
                    <Box float='right' mt={2}  >
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents={'none'}
                                children={<SearchIcon color='gray.300'/>}/>
                            <Input 
                                color={'white'}
                                border='1px'
                                onChange={handleTitleChange}
                                borderColor='#2B2B2B'
                                bgColor={'gray.900'} 
                                width='400px' 
                                placeholder='Search food' 
                                />
                        </InputGroup>
                        <Box mt={2}>
                            <Select
                                display={'inline'}
                                width={'50%'}
                                float='right'
                                color={'white'}
                                border='1px'
                                onChange={handleTypeChange}
                                borderColor='#2B2B2B'
                                bgColor={'gray.900'}
                                placeholder='Filter by type'
                            >
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Snack</option>
                            </Select>
                        </Box>
                        
                    </Box>
                    <Box>
                        <Heading  size='lg' mt={120}>
                            My Food
                        </Heading>
                        <AddFoodModal/>
                    </Box>
                </Box>
                <Box mb={5} mt={10}>
                    {!data && loading ? 
                        (
                            <Box textAlign={'center'} alignItems='center'>
                                <Text>
                                    Loading...
                                </Text>
                            </Box>
                        ):

                        data.foods.foods.length === 0 ?

                        <Box textAlign={'center'} alignItems='center'>
                            <Text>Cannot find any saved food, either search term is not found or you have not saved any food.</Text>
                        </Box> 

                        :(
                            <Box display='flex' justifyContent={'center'}>
                                <Stack width='100%'spacing={4}>
                                    {data.foods.foods.map((f) => !f ? <div>Nothing here</div> : (
                                        <Box position='relative' borderRadius={10} border='1px' 
                                            borderColor='#2B2B2B'
                                            bg='#0C0E10' key={f.id} p={4}>
                                            <Popover 
                                                closeOnBlur={false} initialFocusRef={initRef}>
                                                {({ onClose }) => (
                                                <>
                                                    <PopoverTrigger>
                                                        <IconButton
                                                            size='xs'
                                                            float={'right'}
                                                            colorScheme='gray'
                                                            aria-label='Delete'
                                                            icon={<DeleteIcon />}
                                                        />
                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverHeader color='white'>Are you sure you wish to delete?</PopoverHeader>
                                                        <PopoverBody>
                                                            <Button 
                                                                mr={4}
                                                                colorScheme='red'
                                                                onClick={() => {
                                                                    deleteSavedFood({variables:{id: f.id}, update: (cache) => {
                                                                        cache.evict({id: 'SavedFood:' + f.id})
                                                                    }})
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                            <Button variant='outline' onClick={onClose}>
                                                                Cancel
                                                            </Button>
                                                        </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </>
                                                )}
                                            </Popover>
                                            <Box>
                                                {f.pictureUrl ? (
                                                    <Box display={'inline-block'}>
                                                        <Image borderRadius='full' mr={5} boxSize='60px' src={f.pictureUrl}/>
                                                    </Box>
                                                ) : null}
                                                
                                                <Box display={'inline-block'}>
                                                    <Text fontSize={14} fontWeight={'bold'} color='gray.500'>{f.type}</Text>
                                                    <Heading size='md' mb={1}>{f.title}</Heading>
                                                    <Box fontSize={14} fontWeight={'semibold'} color='gray.500'>
                                                        <Text mr={2} display='inline'>{f.serving} serving</Text>
                                                        <Text mr={2} display='inline'>- {f.calories} calories</Text>
                                                        <Box display='inline-block' height='3' width='3' mr={1}borderRadius={4} bg='green.400'/>
                                                        <Text mr={2} display='inline'>{f.protein}g Protein</Text>
                                                        <Box display='inline-block' height='3' width='3' mr={1}borderRadius={4} bg='orange.200'/>
                                                        <Text mr={2} display='inline'>{f.carbs}g Carbs</Text>
                                                        <Box display='inline-block' height='3' width='3' mr={1}borderRadius={4} bg='red.400'/>
                                                        <Text display='inline'>{f.fat}g Fat</Text>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        )
                    }
                </Box>
            </Wrapper>
        </Container>
    );
}

export default withApollo({ssr: true})(Food);