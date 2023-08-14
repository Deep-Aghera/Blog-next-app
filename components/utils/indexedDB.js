import { openDB } from 'idb';

export async function initIndexedDB() {
  const db = await openDB('myIndexedDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('readingList')) {
        db.createObjectStore('readingList', { keyPath: 'id' });
      }
    },
  });

  return db;
}

export async function updatePostsWithReadStatus(db, data) {
  const tx = db.transaction('readingList', 'readonly');
  const store = tx.objectStore('readingList');

  const updatedPosts = await Promise.all(data.map(async (post) => {
    const readStatus = await store.get(post._id);
    return { ...post, inRead: readStatus ? readStatus.inRead : false };
  }));

  return updatedPosts;
}

export async function fetchPostById(db, id) {
  const tx = db.transaction('readingList', 'readonly');
  const store = tx.objectStore('readingList');

  const post = await store.get(id);
  return post;
}

export async function updateReadStatus(db, id, inRead) {
  const tx = db.transaction('readingList', 'readwrite');
  const store = tx.objectStore('readingList');

  await store.put({ id, inRead });

  return inRead;
}
