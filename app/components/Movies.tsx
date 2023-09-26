import MovieItem from './MovieItem';

function Movies({ movies }: { movies: Movie[] }) {
  return (
    <div className="flex justify-center flex-wrap gap-3">
      {movies?.map((movie, index) => (
        <MovieItem movie={movie} key={movie.id || index} />
      ))}
    </div>
  );
}

export default Movies;
