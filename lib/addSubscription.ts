import axios from 'axios';

export default async function addSubscription(userId: string, movieId: string, action: boolean) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}subscriptions?id=` + userId);
  if (!res.data) {
    return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}subscriptions`, {
      userId,
      movies: [movieId],
    });
  } else {
    return axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}subscriptions`, {
      userId,
      movies: [movieId],
      action,
    });
  }
}
