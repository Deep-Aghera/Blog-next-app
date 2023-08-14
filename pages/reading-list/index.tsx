import React from "react";
import PropTypes from "prop-types";
import { client } from "@/sanityClientConfig/sanity";
import TableComponent from "@/components/TableComponent";

const ReadingList = ({ posts } : any) => {

 
  return (
    
      <TableComponent data={posts} />
    
  );
};


export async function getStaticProps() {
  const query = `*[_type == "post" && readingList == true]{
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
      posts: data,
    },
  };
}

export default ReadingList;
