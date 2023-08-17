// import React from "react";
// import PropTypes from "prop-types";
// import imageUrlBuilder from '@sanity/image-url'
// import { client} from '@/sanityClientConfig/sanity'
// import { GoIssueClosed } from 'react-icons/go';

// function urlFor(source : any) {
//   const builder = imageUrlBuilder(client)
//   return builder.image(source)
// }

// function handleClick() {
//   console.log()
// }

// const TableComponent = ({ data  } : any) => {
  
//   return (
//     <Card>
//     <Box mt="4">
//       <Table variant="striped" colorScheme="purple">
//         <Thead>
//           <Tr>
//             <Th>Title</Th>
//             <Th>Body</Th>
//             <Th>Image</Th>
//             <Th>Author</Th>
//             <Th>Link</Th>
//             <Th>In Reading</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {data.map((item : any) => {
//             const imageUrl = urlFor(item.mainImage.asset._ref).url();
//             return (
//               <Tr key={item._id}>
//               <Td>{item.title}</Td>
//               <Td>
//                 { item.body[0].children[0].text.slice(0,40) + '...'}
//               </Td>
//               <Td>
//                 <img src={imageUrl} alt={item.title} style={{ maxWidth: "65px" }} />
//               </Td>
//               <Td>{item.author.name}</Td>
//               <Td>
//               <Button><Link href={`/blogs/${item.slug.current}`}>Read More</Link></Button>  
//               </Td>
//               <Td><Button onClick={handleClick}><GoIssueClosed /></Button></Td>
//             </Tr>
//             )
            
//                 })}
//         </Tbody>
//       </Table>
//     </Box>
//     </Card>
//   );
// };



// export default TableComponent;
