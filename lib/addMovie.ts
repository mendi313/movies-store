import axios from 'axios';

export default async function addMovie(movie: Movie): Promise<Movie[]> {
  const res = await axios.post('http://localhost:3000/api/movies', movie);
  return res.data;
}
