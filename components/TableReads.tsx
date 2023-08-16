import React from "react";
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import imageUrlBuilder from '@sanity/image-url'
import { client} from '@/sanityClientConfig/sanity'


function urlFor(source : any) {
  const builder = imageUrlBuilder(client)
  return builder.image(source)
}

function handleClick() {
  console.log('hello')
}

const TableReads = ({ data, onReadChange }) => {
  console.log("data in tabelReads", data);

  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-purple-500">
          <thead className="bg-purple-100">
            <tr className="border-b border-purple-500">
              <th className="py-2 px-3 font-semibold text-left">Title</th>
              <th className="py-2 px-3 font-semibold text-left">Body</th>
              <th className="py-2 px-3 font-semibold text-left">Image</th>
              <th className="py-2 px-3 font-semibold text-left">Author</th>
              <th className="py-2 px-3 font-semibold text-left">Link</th>
              <th className="py-2 px-3 font-semibold text-left">In Reading</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const imageUrl = urlFor(item.mainImage.asset._ref).url();
              return (
                <tr key={item._id} className="border-b border-purple-500">
                  <td className="py-2 px-3 bg-blue-300">{item.title}</td>
                  <td className="py-2 px-3">
                    {item.body[0].children[0].text.slice(0, 40) + '...'}
                  </td>
                  <td className="py-2 px-3">
                    <div className="">

                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="max-h-20 "
                    />
                    </div>
                  </td>
                  <td className="py-2 px-3 bg-blue-300">{item.author.name}</td>
                  <td className="py-2 px-3">
                    <button className="text-back-500 hover:underline focus:outline-none">
                      <a href={`/blogs/${item.slug.current}`}>Read More</a>
                    </button>
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => onReadChange(item._id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      {item.inRead ? <GoIssueClosed size={50} /> : <AiOutlineCloseCircle size={50} />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableReads;
