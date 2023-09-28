import { DefaultSession } from 'next-auth';
import MovieItem from './MovieItem';

type movieProps = {
  movies: Movie[];
  user: ({ id: string; role: string } & DefaultSession) | undefined;
  subscriptions: string[];
};

function Movies({ movies, user, subscriptions }: movieProps) {    
  return (
    <div className="flex justify-center flex-wrap gap-3">
      {movies?.map((movie, index) => {
        const isSubscribed = subscriptions?.some((sub) => sub === movie._id + '');
        return <MovieItem movie={movie} key={movie._id || index} user={user} isSubscribed={isSubscribed} />;
      })}
    </div>
  );
}

export default Movies;
