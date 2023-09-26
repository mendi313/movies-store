'use client';
import Movies from '@/app/components/Movies'; // Correct casing for import
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import getAllSubscriptions from '@/lib/getAllSubscriptions';
import getAllMovies from '@/lib/getAllMovies';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchkey, setSearchkey] = useState('');
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const filterdMovies = movies.filter((movie) => movie.name.toLowerCase().includes(searchkey));
  const { data: session } = useSession();

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
    getMovies();
    getSubscriptions();
  }, [session]);
  return (
    !isLoading && (
      <main className="mt-6 flex text-center items-center flex-col min-h-screen gap-4 p-24">
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
        <Movies movies={!searchkey.length ? movies : filterdMovies} user={session?.user} subscriptions={subscriptions} />
      </main>
    )
  );
}
