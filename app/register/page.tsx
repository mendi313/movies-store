'use client';

import registerUser from '@/lib/registerUser';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { parseCallbackUrl } from '@/app/helpers/helpers';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const params = useSearchParams();
  const callBackUrl = params.get('callbackUrl');

  const submitHandler = async (formInputsData: { name: string; email: string; password: string }) => {
    const { name, email, password } = formInputsData;
    let userData = null;
    if (name && email && password) userData = await registerUser(name, email, password);
    if (!userData.user) return;

    await signIn('credentials', {
      email,
      password,
      callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : '/',
    });
  };

  const formState: FormInputsData = {
    state: 'register',
    title: 'Register Page',
    func: submitHandler,
  };

  return <RegisterForm formData={formState} />;
};

export default Register;
