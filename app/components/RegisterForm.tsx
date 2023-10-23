'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from 'next-auth/react';
import Roles from '@/data/Roels.json';

const RegisterForm = ({ formData, userData }: { formData: FormInputsData; userData?: User }) => {
  const { data: session } = useSession();
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [role, setRole] = useState(userData?.role || '');
  const [password, setPassword] = useState(userData?.password || '');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail.trim() === '') {
      setEmailError('Email is required');
    } else if (!validateEmail(newEmail)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError) {
      return; // Do not submit if there's an email error
    }
    if (userData) formData.func({ name, email, password, role });
    else formData.func({ name, email, password, role });
  };

  const buutonText =
    formData.state === 'login' ? (
      <p className="text-center mt-5">
        Dont have an account?{' '}
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    ) : (
      <p className="text-center mt-5">
        Already have an account?
        <Link href="/login" className="text-blue-500">
          Sign in
        </Link>
      </p>
    );

  return (
    <div style={{ maxWidth: '480px' }} className="mt-[7rem] mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">{formData.title}</h2>

        {formData.state !== 'login' && (
          <div className="mb-4">
            <label className="block mb-1"> Full Name </label>
            <input className="input" type="text" placeholder="Type your name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}

        {formData.state !== 'editUser' && (
          <div className="mb-4">
            <label className="block mb-1"> Email </label>
            <input
              className={`input ${emailError ? 'border-red-500' : ''}`}
              type="text"
              placeholder="Type your email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email" // Enable email auto-complete
              required
            />
            {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
          </div>
        )}

        {formData.state !== 'editUser' && (
          <div className="mb-4">
            <label className="block mb-1"> Password </label>
            <input
              className="input"
              type="password"
              placeholder="Type your password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}

        {(formData.state === 'addUser' || formData.state === 'editUser') && (
          <div className="mb-4">
            <label className="block mb-1"> Role </label>
            <div className="bg-slate-50">
              <Select value={role} disabled={userData?._id === session?.user?.id.toString()} onValueChange={(value) => setRole(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="bg-slate-50">
                    {/* <SelectLabel>User</SelectLabel> */}
                    {Roles?.map((role, index) => {
                      return (
                        <SelectItem key={index} value={role}>
                          {role}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {formData.state === 'login' ? 'login' : formData.state === 'editUser' ? 'Save' : 'Register'}
        </button>

        {formData.state !== 'addUser' && formData.state !== 'editUser' && <hr className="mt-4" /> && buutonText}
      </form>
    </div>
  );
};

export default RegisterForm;
