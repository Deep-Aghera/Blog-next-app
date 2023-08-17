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

export async function updatePostsWithReadStatus(db:any, data:any) {
  const tx = db.transaction('readingList', 'readonly');
  const store = tx.objectStore('readingList');

  const updatedPosts = await Promise.all(data.map(async (post:any) => {
    const readStatus = await store.get(post._id);
    return { ...post, inRead: readStatus ? readStatus.inRead : false };
  }));

  return updatedPosts;
}

export async function fetchPostById(db:any, id:string) {
  const tx = db.transaction('readingList', 'readonly');
  const store = tx.objectStore('readingList');

  const post = await store.get(id);
  return post;
}

export async function updateReadStatus(db:any, id:string, inRead:boolean) {

  const count = await countInReads()
  if(count >= 5 && inRead === true) {
    throw new Error('More Than 5 Bookmark not acceptable');
  }
  const tx = db.transaction('readingList', 'readwrite');
  const store = tx.objectStore('readingList');

  await store.put({ id, inRead });

  return inRead;
}

async function countInReads() {
  let count = 0
   const db = await initIndexedDB();
   const tx = db.transaction('readingList', 'readonly');
   const store = tx.objectStore('readingList');
   const data = await store.getAll()
   data.map((item) => {
    if(item.inRead === true) {
      count++
    }
   })
   console.log(data,count);
   return count
}