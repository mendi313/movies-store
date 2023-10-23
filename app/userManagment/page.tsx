'use client';
import React, { useEffect, useState } from 'react';
import getAllUsers from '@/lib/getAllUsers';
import UserCard from '../components/UserCard';
import deleteUser from '@/lib/deleteUser';
import Link from 'next/link';
import { ContextValue } from '../context/Context';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function MoviesManagment() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const { setEditedUser } = ContextValue();

  useEffect(() => {
    getAllUsers().then((usersResult) => {
      setUsers(usersResult);
    });
  }, []);

  const handleDeleteUser = async (userId?: string) => {
    if (userId) {
      // Delete the user and get the updated users
      const updatedUsers: User[] = await deleteUser(userId);

      // Update the state with only the updated users
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    }
  };

  const handleEditUser = async (user: User) => {
    if (user) {
      setEditedUser(user);
      router.push('/editUser');
    }
  };

  return (
    <main className="mt-6 text-center p-24">
      <h1 className="text-3xl font-bold text-white">User Management</h1>
      <button className="text-white bg-blue-800 rounded-md underline mb-4 p-2 mt-2">
        <Link href="/addUser">Create Another User</Link>
      </button>
      <div className="flex justify-center flex-wrap gap-3">
        {users?.map((user) => (
          <UserCard
            showDeleteButton={user._id !== session?.user?.id.toString()}
            key={user.email}
            name={user.name}
            email={user.email}
            role={user.role}
            onEdit={() => handleEditUser(user)}
            onDelete={() => handleDeleteUser(user._id)}
          />
        ))}
      </div>
    </main>
  );
}
