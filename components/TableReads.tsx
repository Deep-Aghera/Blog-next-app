import React from "react";
import PropTypes from "prop-types";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Link, Card, Button } from "@chakra-ui/react";
import imageUrlBuilder from '@sanity/image-url'
import { client} from '@/sanityClientConfig/sanity'
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineCloseCircle } from 'react-icons/ai'
function urlFor(source : any) {
  const builder = imageUrlBuilder(client)
  return builder.image(source)
}

function handleClick() {
  console.log('hello')
}

const TableReads = ({ data,onReadChange } : any) => {
  console.log("data in tabelReads", data)
  return (
    <Card>
    <Box mt="4">
      <Table variant="striped" colorScheme="purple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Body</Th>
            <Th>Image</Th>
            <Th>Author</Th>
            <Th>Link</Th>
            <Th>In Reading</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item : any) => {
            const imageUrl = urlFor(item.mainImage.asset._ref).url();
            return (
              <Tr key={item._id}>
              <Td>{item.title}</Td>
              <Td>
                { item.body[0].children[0].text.slice(0,40) + '...'}
              </Td>
              <Td>
                <img src={imageUrl} alt={item.title} style={{ maxWidth: "65px" }} />
              </Td>
              <Td>{item.author.name}</Td>
              <Td>
              <Button><Link href={`/blogs/${item.slug.current}`}>Read More</Link></Button>  
              </Td>
              <Td><Button onClick={() => onReadChange(item._id)}>{item.inRead ? <GoIssueClosed /> : <AiOutlineCloseCircle />} </Button></Td>
            </Tr>
            )
            
                })}
        </Tbody>
      </Table>
    </Box>
    </Card>
  );
};



export default TableReads;
