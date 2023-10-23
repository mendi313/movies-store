import { useState, useEffect, useCallback } from 'react';
import { ContextValue } from '@/app/context/Context';
import getAllMovies from '@/lib/getAllMovies';
import { DefaultSession } from 'next-auth';
import MovieItem from './MovieItem';

// Rest of your imports...

type MovieProps = {
  user: ({ id: string; role: string } & DefaultSession) | undefined;
  subscriptions?: string[];
  searchkey?: string;
  managment?: boolean;
  filtersubScriptions?: boolean;
};

function Movies({ searchkey, user, subscriptions, filtersubScriptions, managment }: MovieProps) {
  const { movies, setMovies } = ContextValue();
  const [visibleMovies, setVisibleMovies] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  let filterdMovies = movies;
  if (searchkey) filterdMovies = movies?.filter((movie) => movie.name.toLowerCase().includes(searchkey));
  else if (filtersubScriptions) filterdMovies = movies?.filter((m) => m._id && subscriptions?.includes(m._id.toString()));

  const loadMoreMovies = useCallback(() => {
    setIsLoading(true);
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 20);
    setIsLoading(false);
  }, [setIsLoading, setVisibleMovies]);

  useEffect(() => {
    async function getMovies() {
      const movies = await getAllMovies();
      setMovies(movies);
      setIsLoading(false);
    }
    if (!movies.length) {
      getMovies();
    } else setIsLoading(false);

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isLoading) {
        // User has scrolled close to the bottom and not currently loading
        loadMoreMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, loadMoreMovies, movies?.length, setMovies]); // Include handleScroll dependencies

  return (
    <div className="flex justify-center flex-wrap gap-3">
      {filterdMovies?.slice(0, visibleMovies).map((movie, index) => {
        const isSubscribed = subscriptions?.some((sub) => sub === movie._id + '');
        return <MovieItem movie={movie} key={movie._id || index} user={user} managment={managment} isSubscribed={isSubscribed || false} />;
      })}
      {isLoading && <p>Loading more movies...</p>}
    </div>
  );
}

export default Movies;
