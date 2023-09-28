import axios, { AxiosResponse } from 'axios';

export default async function updateUser(user?: User): Promise<any> {
  if (!user) return null;  
  try {
    const res: AxiosResponse<User[]> = await axios.put('http://localhost:3000/api/users', user);
    return res.data; // Extract data from the Axios response
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; // You might want to throw the error again for handling elsewhere
  }
}
