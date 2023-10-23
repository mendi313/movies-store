'use client';
import Movies from '@/app/components/Movies'; // Correct casing for import
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import getAllSubscriptions from '@/lib/getAllSubscriptions';
import { ContextValue } from '@/app/context/Context';

export default function MoviesManagment() {
  const [searchkey, setSearchkey] = useState('');
  const { subscriptions, setSubscriptions } = ContextValue();
  const { data: session } = useSession();

  useEffect(() => {
    async function getSubscriptions() {
      if (session?.user?.id) {
        const subscriptions = await getAllSubscriptions(session?.user?.id);
        setSubscriptions(subscriptions);
      }
    }
    if (!subscriptions?.length) getSubscriptions();
  }, [ session, setSubscriptions, subscriptions?.length]);

  return (
    <main className="flex text-center items-center flex-col gap-4 p-24">
      {session?.user?.role === 'admin' ? (
        <Link href="/addMovie">
          <span className="bg-blue-800 p-3 py-3 rounded-md text-white hover:bg-blue-900">Add Movie</span>
        </Link>
      ) : null}
      <input
        className="p-1 ml-[70%] rounded-md border"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchkey(e.target.value.toLowerCase())}
      />
      <Movies searchkey={searchkey} user={session?.user} managment={true} />
    </main>
  );
}
