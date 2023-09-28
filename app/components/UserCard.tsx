import React from 'react';

type UserProps = {
  email?: string;
  role: string;
  name?: string;
  showDeleteButton?: boolean;
  onDelete: () => void;
  onEdit: () => void;
};

const UserCard = ({ email, role, name, showDeleteButton, onDelete, onEdit }: UserProps) => {
  return (
    <div className="bg-gray-800 w-72 p-6 m-4 rounded-lg shadow-lg flex flex-col ">
      {name && (
        <div className="mb-2">
          <div className="text-md text-gray-400 font-semibold">Name:</div>
          <div className="text-white">{name}</div>
        </div>
      )}
      <div className="mb-2">
        <div className="text-md text-gray-400 font-semibold">Email:</div>
        <div className="text-white">{email}</div>
      </div>
      <div className="mb-4">
        <div className="text-md text-gray-400 font-semibold">Role:</div>
        <div className="text-white font-semibold">{role}</div>
      </div>
      <div className="flex gap-2 w-full justify-center">
        <button className="bg-yellow-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded" onClick={onEdit}>
          Edit
        </button>
        {showDeleteButton && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
