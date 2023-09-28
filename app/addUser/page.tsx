'use client';

import registerUser from '@/lib/registerUser';
import { useRouter } from 'next/navigation';
import RegisterForm from '../components/RegisterForm';

const AddUser = () => {
  const router = useRouter();

  const submitHandler = async (formInputsData: { role: string; name: string; email: string; password: string }) => {
    const { name, email, password, role } = formInputsData;
    let userData = null;
    if (name && email && password) userData = await registerUser(name, email, password, role);
    if (!userData.user) return;
    router.push('/userManagment');
  };

  const formState: FormInputsData = {
    state: 'addUser',
    title: 'Add User Page',
    func: submitHandler,
  };

  return <RegisterForm formData={formState} />;
};

export default AddUser;
