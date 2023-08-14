import React, { useEffect, useState } from "react";
import { Button, Card } from "@chakra-ui/react";
import { openDB } from 'idb';
import TableComponent from "@/components/TableComponent";
import TableReads from '@/components/TableReads';
const Test = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();

      const db = await initIndexedDB();
      const updatedPosts = await updatePostsWithReadStatus(db, data);
      console.log(updatedPosts)
      setPosts(updatedPosts);
    };

    fetchPost();
  }, []);

  async function initIndexedDB() {
    const db = await openDB('myIndexedDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('readingList')) {
          db.createObjectStore('readingList', { keyPath: 'id' });
        }
      },
    });

    return db;
  }

  async function updatePostsWithReadStatus(db, data) {
    const tx = db.transaction('readingList', 'readonly');
    const store = tx.objectStore('readingList');

    const updatedPosts = await Promise.all(data.map(async (post) => {
      const readStatus = await store.get(post._id);
      return { ...post, inRead: readStatus ? readStatus.inRead : false };
    }));

    return updatedPosts;
  }

  async function fetchPostById(id) {
    const db = await initIndexedDB();
    const tx = db.transaction('readingList', 'readonly');
    const store = tx.objectStore('readingList');
    
    const post = await store.get(id);
    return post;
  }

  async function handleOnReadChange(id) {
    const db = await initIndexedDB();
    const tx = db.transaction('readingList', 'readwrite');
    const store = tx.objectStore('readingList');
    
    const post = posts.find(item => item._id === id);
    post.inRead = !post.inRead;
    store.put({ id, inRead: post.inRead });
    
    setPosts([...posts]);
    console.log("from the update",posts)
  }

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-10">
        <TableReads data={posts} onReadChange={handleOnReadChange}/>
      {/* <div>
        {posts.map((item) => (
          <PostOne key={item._id} post={item} onReadChange={handleOnReadChange} />
        ))}
      </div> */}
    </div>
  );
};

// function PostOne({ post, onReadChange }) {
//   const { _id, inRead } = post;

//   return (
//     <>
//       <div>{_id}</div>
//       <div>
//         <button onClick={() => onReadChange(_id)}>
//           {inRead ? 'Mark Unread' : 'Mark Read'}
//         </button>
//         {inRead.toString()}
//       </div>
//     </>
//   );
// }

export default Test;
