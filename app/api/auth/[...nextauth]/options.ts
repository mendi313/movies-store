import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/backend/models/user';
import Permission from '@/backend/models/permissions';
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

        const user: User = await User.findOne({ email }).select('+password');
        const permission: Permission | null = await Permission.findOne({ userId: user._id });
        if (permission?.role) user.role = permission?.role;

        if (!user) {
          throw new Error('Invalid Email');
        }

        if (!permission) {
          throw new Error('Permission not found for this user');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error('Invalid Password');
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
      if (!session?.user?.id) {
        const email = token.email; // Assuming token.email holds the email you want to search for
        try {
          const user = await User.findOne({ email }).select('+password');
          if (session?.user) session.user.id = user?._id;
        } catch (error) {
          console.error('Error finding user:', error);
        }
      }

      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};
