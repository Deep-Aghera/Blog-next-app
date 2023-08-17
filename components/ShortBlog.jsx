import React, { useState, useEffect } from "react";
import { AiOutlineRead } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import {
  initIndexedDB,
  updatePostsWithReadStatus,
  updateReadStatus,
  fetchPostById
} from "../components/utils/indexedDB";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ShortBlog = ({
  id,
  title,
  blogImageUrl,
  slug,
  author,
  avatarImageUrl,
  bio,
  subBody,
}) => {
  const [posts, setPosts] = useState([]);
  const [isInRead, setIsInRead] = useState(false)
  const { status, ...rest } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();

      const db = await initIndexedDB();
      const updatedPosts = await updatePostsWithReadStatus(db, data);

      const inRead = await fetchPostById(db,id)
      console.log("inread",inRead)
      setIsInRead(inRead?.inRead)
      setPosts(updatedPosts);
    };

    fetchPost();
  }, []);

  function isLogin() {
    if (status === "unauthenticated" || status === "loading") {
      return false
    }
    return true
  }

  async function handleOnReadChange(id) {
    if (!isLogin()) {
      router.push("/login");
      return;
    }
    const db = await initIndexedDB();
    const post = posts.find((item) => item._id === id);
    const newInRead = !post.inRead;
    try {
      await updateReadStatus(db, id, newInRead);
      
    } catch (error) {
      alert(error.message)
      return
    }


    setPosts((prevPosts) =>
      prevPosts.map((item) =>
        item._id === id ? { ...item, inRead: newInRead } : item
      )
    );
    setIsInRead((prev) => !prev)
    console.log("from the update", posts);
  }

  return (
    <div className="m-5 max-w-md max-h-650 ">
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <div className="flex items-center space-x-4 p-2">
          <h1 className="text-lg font-bold text-blue-700">{title}</h1>
        </div>
        <div className="w-full p-4 m-1 ">
          <Image
            layout="responsive"
            width={720}
            height={200}
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
          <p
            class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
          >
            <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span
              onClick={() => handleOnReadChange(id)}
              class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
            >
             
              {!isLogin() && <AiOutlineRead  size={30} />}  
              {isLogin() && isInRead && <AiOutlineRead color={'yellow'} size={30} />}  
              {isLogin() && !isInRead && <AiOutlineRead  size={30} />} 
            </span>
          </p>

        </div>
        <div className="flex justify-center mt-2">
          <button>
            <Link href={`/blogs/${slug}`} passHref>
              <p class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500  shadow-md group">
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Read This Blog Now
                </span>
                <span class="relative invisible"> Read This Blog Now</span>
              </p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortBlog;
