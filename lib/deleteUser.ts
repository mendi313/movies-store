import axios, { AxiosResponse } from 'axios';

export default async function deleteUser(userId: string): Promise<User[]> {
  if (!userId) return [];

  try {
    const res: AxiosResponse<User[]> = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}users?id=` + userId);
    return res.data; // Extract data from the Axios response
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; // You might want to throw the error again for handling elsewhere
  }
}
