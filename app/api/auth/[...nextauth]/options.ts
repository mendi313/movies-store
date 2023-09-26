import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/backend/models/user';
import dbConnect from '@/backend/config/dbConnect';

interface Credentials {
  email: string;
  password: string;
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
          placeholder: 'Enter Email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'Your password',
        },
      },
      async authorize(credentials: Credentials | undefined, req) {
        if (!credentials) {
          throw new Error('Credentials not provided');
        }

        dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          throw new Error('Invalid Username or Password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error('Invalid Username or Password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
}
