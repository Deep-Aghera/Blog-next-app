import React from 'react';
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanityClientConfig/sanity';
import Image from 'next/image';

function urlFor(source : string) {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}

const TableReads = ({ data, onReadChange } : any) => {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse border rounded-lg">
        <thead className="bg-purple-700 text-white">
          <tr>
            <th className="py-3 px-4 font-semibold text-left">Title</th>
            <th className="py-3 px-4 font-semibold text-left">Body</th>
            <th className="py-3 px-4 font-semibold text-left">Image</th>
            <th className="py-3 px-4 font-semibold text-left">Author</th>
            <th className="py-3 px-4 font-semibold text-left">Link</th>
            <th className="py-3 px-4 font-semibold text-left">In Reading</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item : any) => {
            const imageUrl = urlFor(item.mainImage.asset._ref).url();
            const rowBackground = item.inRead ? 'bg-blue-100' : 'bg-red-100';
            return (
              <tr key={item._id} className={rowBackground + ' border-b border-gray-300'}>
                <td className="py-4 px-4">{item.title}</td>
                <td className="py-4 px-4">
                  {item.body[0].children[0].text.slice(0, 40) + '...'}
                </td>
                <td className="py-4 px-4">
                  <Image
                    height={100}
                    width={100}
                    src={imageUrl}
                    alt={item.title}
                    className="object-cover rounded"
                  />
                </td>
                <td className="py-4 px-4">{item.author.name}</td>
                <td className="py-4 px-4">
                  <a
                    href={`/blogs/${item.slug.current}`}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    Read More
                  </a>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => onReadChange(item._id)}
                    className={`text-${item.inRead ? 'green' : 'red'}-500 hover:text-${item.inRead ? 'green' : 'red'}-700 focus:outline-none`}
                  >
                    {item.inRead ? <GoIssueClosed size={29} /> : <AiOutlineCloseCircle size={29} />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableReads;
