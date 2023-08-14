import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Button, Flex, Card, Avatar } from '@chakra-ui/react';
import {signOut, useSession } from 'next-auth/react'
const Profile = (props : any) => {
  const { status, data} = useSession()
  
  return (
   
      <Card height={300} p='6'>
        <Box display='flex' alignItems='center' justifyContent='center' mb='4'>
          <Avatar size='xl' name={data?.user?.name || ""} src={data?.user?.image || ''} />
        </Box>
        <Text fontSize='lg' fontWeight='bold'>
          Name: {data?.user?.name}
        </Text>
        <Text fontSize='md' >
          Email: {data?.user?.email}
        </Text>
        <Flex justifyContent='center' mt='4'>
          <Button colorScheme='red' onClick={e => {
            e.preventDefault()
            signOut({ callbackUrl: 'http://localhost:3000/' })
           
          }}>Sign Out</Button>
        </Flex>
      </Card>
    
  );
};

Profile.propTypes = {};

export default Profile;
