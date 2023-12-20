import axios from 'axios';

export default async function registerUser(name: string, email: string, password: string, role?: string) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}users`, {
    name,
    permissionRole: role,
    email,
    password,
  });
  return res.data;
}
