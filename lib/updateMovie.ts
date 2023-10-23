import axios, { AxiosResponse } from 'axios';

export default async function updateMovie(movie: Movie): Promise<any> {
  if (!movie) return null;
  try {
    const res: AxiosResponse<Movie> = await axios.put('http://localhost:3000/api/movies', movie);
    return res.data; // Extract data from the Axios response
  } catch (error) {
    console.error('Error update movie:', error);
    throw error; // You might want to throw the error again for handling elsewhere
  }
}
