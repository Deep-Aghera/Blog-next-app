import React, { useEffect, useState } from 'react';
import TableReads from '@/components/TableReads';
import { initIndexedDB, updatePostsWithReadStatus, updateReadStatus } from '../../components/utils/indexedDB';

const Test = () => {
  const [posts, setPosts] = useState([]);

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
    <>
      <TableReads data={posts} onReadChange={handleOnReadChange} />
    </>
  );
};

export default Test;
