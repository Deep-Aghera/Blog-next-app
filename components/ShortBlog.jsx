import React, { useMemo } from "react";
import { AiOutlineRead } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

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
}) => {
  const readIconColor = useMemo(
    () => (readingList ? "text-yellow-500" : ""),
    [readingList]
  );

  return (
    <div className="m-10 max-w-md max-h-650">
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <div className="flex space-x-4 items-center p-3">
          <h1 className="text-lg font-bold">{title}</h1>
        </div>
        <div className="w-full max-h-200 overflow-hidden p-3">
          <Image
          
            layout="responsive"
            width={720}
            height={300}
            objectFit="cover"
            src={blogImageUrl}
            alt="blog content image"
            
          />
        </div>
        <div className="max-h-140 overflow-hidden p-3">
          <div className="flex space-x-4 items-center">
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
              <h2>{author}</h2>
              <p className="text-sm">{bio}</p>
            </div>
          </div>
          <p className="text-sm">{body}</p>
        </div>
        <div className="flex justify-center">
          <AiOutlineRead className={readIconColor} size={30} />
        </div>
        <div className="flex justify-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
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
