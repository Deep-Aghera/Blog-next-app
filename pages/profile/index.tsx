import React from 'react';
import { signOut, useSession } from 'next-auth/react';

const Profile = () => {
  const { status, data } = useSession();

  return (
    <div className="bg-white max-h-64	 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-center mb-4">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`}
          alt={data?.user?.name || ''}
        />
      </div>
      <p className="text-lg font-semibold text-center">{data?.user?.name}</p>
      <p className="text-md text-center">{data?.user?.email}</p>
      <div className="flex justify-center mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: 'http://localhost:3000/' });
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
