import React, { useState, useEffect } from "react";
import { AiOutlineRead } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { initIndexedDB, updatePostsWithReadStatus, updateReadStatus } from '../components/utils/indexedDB';
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/router";

const ShortBlog = ({
  id,
  title,
  body,
  blogImageUrl,
  slug,
  readingList,
  author,
  avatarImageUrl,
  bio,
  subBody
}) => {
  const [posts, setPosts] = useState([]);
    const { status, ...rest} = useSession()
  const router = useRouter()
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();

      const db = await initIndexedDB();
      const updatedPosts = await updatePostsWithReadStatus(db, data);
      console.log(updatedPosts);
      setPosts(updatedPosts);
    };

    fetchPost();
  }, []);

  async function handleOnReadChange(id) {
    if((status === 'unauthenticated')||(status === 'loading')) {
      router.push('/login')
      return
    }
    const db = await initIndexedDB();
    const post = posts.find(item => item._id === id);
    const newInRead = !post.inRead;
    await updateReadStatus(db, id, newInRead);

    setPosts(prevPosts =>
      prevPosts.map(item => (item._id === id ? { ...item, inRead: newInRead } : item))
    );

    console.log('from the update', posts);
  }

  return (
    <div className="m-5 max-w-md max-h-650 ">
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <div className="flex items-center space-x-4 p-2">
          <h1 className="text-lg font-bold text-blue-700">{title}</h1>
        </div>
        <div className="w-full h-60 overflow-hidden p-4 m-1 " >
          <Image
            layout="responsive"
            width={720}
            height={600}
            objectFit="cover"
            src={blogImageUrl}
            alt="blog content image"
          />
        </div>
        <div className="max-h-140 overflow-hidden p-3">
          <div className="flex items-center space-x-4 m-3">
            <div className="w-10 h-10 rounded-full overflow-hidden rounded-lg">
              <Image
                width={40}
                height={40}
                src={avatarImageUrl}
                alt="author-image"
                quality={10}
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-purple-700">{author}</h2>
              <p className="text-sm text-gray-600">{bio}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-2">{subBody}</p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handleOnReadChange(id)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            <AiOutlineRead size={30} />
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            <Link href={`/blogs/${slug}`} passHref>
              Read This Blog Now
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortBlog;
