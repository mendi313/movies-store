import axios from 'axios';

export default async function getAllMovies(): Promise<Movie[]> {
  const res = await await axios.get('http://localhost:3000/api/movies');
  return res.data;
}
