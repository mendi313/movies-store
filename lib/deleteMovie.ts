import axios, { AxiosResponse } from 'axios';

export default async function deleteMovie(movieId: string): Promise<Movie[]> {
  if (!movieId) return [];

  try {
    const res: AxiosResponse<Movie[]> = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}movies?id=` + movieId);
    return res.data; // Extract data from the Axios response
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error; // You might want to throw the error again for handling elsewhere
  }
}
