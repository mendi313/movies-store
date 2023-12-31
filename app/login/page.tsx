'use client';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseCallbackUrl } from '@/app/helpers/helpers';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get('callbackUrl');

  const submitHandler = async (formInputsData: { name: string; email: string; password: string }) => {
    const { email, password } = formInputsData;
    if (!email || !password) return;
    const data = await signIn('credentials', {
      email,
      password,
      callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : '/',
    });
    if (data?.error) {
      toast.error('Registration failed. Try again.');
    }

    if (data?.ok) {
      toast.success('Registration successful');
      router.push('/');
    }
  };

  const formState: FormInputsData = {
    state: 'login',
    title: 'Login Page',
    func: submitHandler,
  };

  return <RegisterForm formData={formState} />;
};

export default Login;
