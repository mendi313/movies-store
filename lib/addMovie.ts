import axios from 'axios';

export default async function addMovie(movie: Movie): Promise<Movie[]> {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}movies`, movie);
  return res.data;
}
