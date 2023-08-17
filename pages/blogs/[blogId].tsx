import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client, getPosts } from "@/sanityClientConfig/sanity";
import Head from "next/head";
import { PortableText } from "@portabletext/react";
import RichTextComponents from "@/components/utils/RichTextComponents";
import { AiOutlineRead } from "react-icons/ai";
import { initIndexedDB, updateReadStatus, fetchPostById} from '../../components/utils/indexedDB';
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/router";
function urlFor(source: any) {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}

const Blog = ({ post }: any) => {
  const { title } = post[0];
  const body = post[0].body;
  const author = post[0].author.name;
  const blogImageURL = urlFor(post[0].mainImage.asset._ref).url();
  //const avatarImageUrl = urlFor(post.author.image.asset._ref).url();
  //  const blogImageURL = 'https://images.unsplash.com/photo-1691036562132-56a310d4b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80';
  // const blogAuthorName = "Mikhai nami";
  
  const { status, ...rest} = useSession()
  const router = useRouter()
  async function handleOnReadChange(id : any) {
    
    if((status === 'unauthenticated')||(status === 'loading')) {
      router.push('/login')
      return
    }
    const db = await initIndexedDB();
    const fetchRead = await fetchPostById(db,id)
    const newInRead = !fetchRead.inRead
    try {
      await updateReadStatus(db, id, newInRead);
      
    } catch (error : any) {
      alert(error.message)
      return
    }


    
  }


  return (
    <>
      <Head>
        <title>{title} Blog</title>
        {/* <meta name="description" content={body.substring(0, 150)} />  */}
        <meta property="og:title" content={title} />
        {/* <meta property="og:description" content={body.substring(0, 150)} /> */}
      </Head>
      <div className="m-10  max-h-650">
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h1>{title}</h1>

          <hr />

          <Image src={blogImageURL} width={700} height={600} alt="Blog Image" />
          <button
            onClick={() => handleOnReadChange(post[0]._id)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            <AiOutlineRead size={30} />
          </button>
          <PortableText value={body} components={RichTextComponents} />

          {author}

          <p>Author</p>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const data = await getPosts();
  const paths = data.map((post: any) => {
    return {
      params: {
        blogId: `${post.slug.current}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
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
    revalidate: 10, 
  };
}

Blog.propTypes = {};

export default Blog;
