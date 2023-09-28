import axios from 'axios';

export default async function getFilterdSubscriptions(id: string): Promise<string[]> {
  if (!id) throw new Error('id is required');
  else {
    const res = await axios.get('http://localhost:3000/api/subscriptions?id=' + id);
    return res.data?.movies;
  }
}
