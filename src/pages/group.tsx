import { Heading } from '@chakra-ui/react';
import { dataAttr } from '@chakra-ui/utils';
import React from 'react'
import { Container } from '../components/container'
import { InGroup } from '../components/group/inGroup';
import { NotInGroup } from '../components/group/notInGroup';
import { NavBar } from '../components/navBar';
import { Wrapper } from '../components/wrapper';
import { useCheckIfInGroupQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const Group: React.FC<{}> = ({}) => {

    const {data: checkData, loading: checkLoading, error: checkError} = useCheckIfInGroupQuery()

    let body = null
    if (!checkData?.checkIfInGroup){
        body = <NotInGroup/>
    }
    else {
        body = <InGroup/>
    }

    return (
        body
    );
}

export default withApollo({ssr: true})(Group)