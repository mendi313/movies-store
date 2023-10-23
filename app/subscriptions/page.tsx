'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Movies from '../components/Movies';
import { ContextValue } from '../context/Context';
import getAllMovies from '@/lib/getAllMovies';
import getAllSubscriptions from '@/lib/getAllSubscriptions';

export default function Subscriptions() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchkey, setSearchkey] = useState('');
  const { movies, setMovies, subscriptions, setSubscriptions } = ContextValue();
 

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/subscriptions');
    },
  });
  useEffect(() => {
    async function getMovies() {
      const movies = await getAllMovies();
      setMovies(movies);
      setIsLoading(false);
    }
    async function getSubscriptions() {
      if (session?.user?.id) {
        const subscriptions = await getAllSubscriptions(session?.user?.id);
        setSubscriptions(subscriptions);
      }
    }
    if (!movies?.length) getMovies();
    if (!subscriptions?.length) getSubscriptions();
  }, [movies.length, session, setMovies, setSubscriptions, subscriptions?.length]);
  return (
    <main className="mt-6 flex text-center items-center flex-col min-h-screen gap-4 p-24">
      <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
      <Movies user={session?.user} filtersubScriptions={true} subscriptions={subscriptions} />
    </main>
  );
}
