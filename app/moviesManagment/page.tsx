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
  }, [session, setSubscriptions, subscriptions?.length]);

  return (
    <main className="mt-[7rem] w-full min-h-screen">
      <div className="p-4 md:p-0 mx-auto flex flex-col md:flex-row items-center justify-center">
        {session?.user?.role === 'admin' || session?.user?.role === 'superAdmin' ? (
          <Link href="/addMovie">
            <span className="bg-blue-800 p-3 rounded-md text-white hover:bg-blue-900 mb-4 md:mb-0 md:mr-4">Add Movie</span>
          </Link>
        ) : null}
        <input
          className="p-3 max-[770px]:mt-7 rounded-md border w-full md:w-3/6"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchkey(e.target.value.toLowerCase())}
        />
      </div>
      <div className="mt-6 text-center">
        <Movies searchkey={searchkey} user={session?.user} managment={true} />
      </div>
    </main>
  );
}
