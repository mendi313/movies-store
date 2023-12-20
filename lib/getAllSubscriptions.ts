import axios from 'axios';

export default async function getAllSubscriptions(id: string): Promise<string[]> {
  if (!id) throw new Error('id is required');
  else {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}subscriptions?id=` + id);
    return res.data?.movies;
  }
}
