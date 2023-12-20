import axios from 'axios';

export default async function getAllMovies(): Promise<Movie[]> {
  const res = await await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}movies`);
  return res.data;
}
