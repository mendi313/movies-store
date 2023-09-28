import axios from 'axios';

export default async function registerUser(name: string, email: string, password: string, role: string) {
  const res = await axios.post('http://localhost:3000/api/users', {
    name,
    permissionRole: role,
    email,
    password,
  });
  return res.data;
}
