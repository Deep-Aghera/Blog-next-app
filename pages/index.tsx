import React from 'react';
import Head from 'next/head';
import imageUrlBuilder from '@sanity/image-url';
import ShortBlog from '@/components/ShortBlog';
import { client, getPosts } from '@/sanityClientConfig/sanity';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function urlFor( source : any) {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}

function Home({ posts } : any) {
  const memoizedUrlFor = React.useMemo(() => urlFor, []);

  return (
    <>
      <Head>
        <title>MyBlog - Home</title>
        <meta name="description" content="Welcome to your blog web app. Explore various articles and posts." />
        <meta property="og:title" content="MyBlog - Home" />
        <meta property="og:description" content="Welcome to your blog web app. Explore various articles and posts." />
        <meta property="og:url" content="http://localhost:3000/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            "url": "http://localhost:3000/",
            "name": "MyBlog",
            "description": "Welcome to your blog web app. Explore various articles and posts."
          })}
        </script>
      </Head>
      {posts.map((post : any) => {
        const { name, bio, image } = post.author;
        const imageUrl = memoizedUrlFor(post.mainImage.asset._ref).width(240).height(240).url();
        const avatarImageUrl = memoizedUrlFor(image.asset._ref).width(240).height(240).url();

        return (
          <ShortBlog
            subBody = {post.subBody}
            key={post._id}
            bio={bio[0].children[0].text}
            author={name}
            avatarImageUrl={avatarImageUrl}
            id={post._id}
           
            blogImageUrl={imageUrl}
            title={post.title}
           
            slug={post.slug.current}
          />
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
    revalidate: 10, 
  };
}

export default Home;
