import axios from 'axios';

export default async function addSubscription(userId: string, movieId: string, action: boolean) {
  const res = await axios.get('http://localhost:3000/api/subscriptions?id=' + userId);
  if (!res.data) {
    return axios.post('http://localhost:3000/api/subscriptions', {
      userId,
      movies: [movieId],
    });
  } else {
    return axios.put('http://localhost:3000/api/subscriptions', {
      userId,
      movies: [movieId],
      action,
    });
  }
}
