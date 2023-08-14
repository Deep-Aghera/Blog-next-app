// sanity.js
import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: 'nfxa2gk1',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-08-04', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
  const posts = await client.fetch(`*[_type=="post"] {
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
  }`)
  return posts
}

export async function createPost(post) {
  const result = client.create(post)
  return result
}

export async function updateDocumentTitle(_id, title) {
  const result = client.patch(_id).set({title}).commit()
  return result
}