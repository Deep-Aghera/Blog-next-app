import React from 'react';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url'
import { Card, CardHeader, CardBody, Stack, Box, Heading, StackDivider, Text, Center } from '@chakra-ui/react';
import Image from 'next/image';
import { client, getPosts } from '@/sanityClientConfig/sanity'
import Head from 'next/head';
import {PortableText} from '@portabletext/react'
import RichTextComponents from '@/components/utils/RichTextComponents';
function urlFor(source : any) {
  const builder = imageUrlBuilder(client)
  return builder.image(source)
}


const Blog = ({ post } : any) => {
 
  const  {title } = post[0];
  const body = post[0].body
  const author = post[0].author.name;
  const blogImageURL = urlFor(post[0].mainImage.asset._ref).url();
  //const avatarImageUrl = urlFor(post.author.image.asset._ref).url();
//  const blogImageURL = 'https://images.unsplash.com/photo-1691036562132-56a310d4b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80';
 
  const blogAuthorName = 'Mikhai nami';

  return (
    <>
    <Head>
        <title>{title} Blog</title>
        {/* <meta name="description" content={body.substring(0, 150)} />  */}
        <meta property="og:title" content={title} />
        {/* <meta property="og:description" content={body.substring(0, 150)} /> */}
      </Head>
   
      <Card maxW='xl' width='100%' p='6' boxShadow='xl' minH='80vh' minW='120vh' >
        <CardHeader borderBottomWidth='1px'>
          <Heading size='lg' fontWeight='bold'>
            {title}
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider borderColor='gray.200' />} spacing='4'>
            <Center>
              <Box  borderRadius='4px'>
                <Image src={blogImageURL} width={700} height={600} alt='Blog Image' />
              </Box>
            </Center>
            <Box>
              <Text pt='4' fontSize='lg' lineHeight='1.5'>
              <PortableText value={body} components={RichTextComponents}/>
              </Text>
            </Box>
            <Box>
              <Heading size='sm' textTransform='uppercase'>
                {author}
              </Heading>
              <Text pt='2' fontSize='md'>
               Author
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    
    </>
    
  );
};

export async function getStaticPaths() {

  const data = await getPosts()
  const paths = data.map((post : any) => {
    return {
      params : {
        blogId : `${post.slug.current}`
      }
    }
  })
  return {
    paths,
    fallback : false
  }
}


export async function getStaticProps(context : any) {
  const { params } = context;
  const query = `*[_type == "post" && slug.current == "${params.blogId}"]{
    ...,
    "posterImage": {"alt": posterImage.alt, "url": posterImage.asset->.url},
    "author": author->{
      ...,
      "profileImage": {"alt": profileImage.alt, "url":profileImage.asset->.url}
    },
  
    body[]{
      ...,
      asset->{
        ...,
        "_key": _id
      }
    }
  }`;
  const data = await client.fetch(query);
 
  return {
    props: {
      post: data,
    },
  };
}


Blog.propTypes = {};

export default Blog;
