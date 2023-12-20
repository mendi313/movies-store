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
      async authorize(credentials: Credentials | undefined, req: any) {
        if (!credentials) {
          throw new Error('Credentials not provided');
        }

        dbConnect();

        const { email, password } = credentials;

        const userDocument = await User.findOne({ email }).select('+password');
        if (!userDocument) {
          throw new Error('Invalid Email');
        }

        const user: User = userDocument.toObject();

        if (!user || !user.password) {
          throw new Error('Invalid Email or Password');
        }

        const isPasswordMatched = await bcrypt.compare(credentials?.password || '', user.password);

        if (!isPasswordMatched) {
          throw new Error('Invalid Password');
        }

        const permission: Permission | null = await Permission.findOne({ userId: user._id });
        if (!permission) {
          throw new Error('Permission not found for this user');
        }

        // Assign the role property to the user from permission
        user.role = permission.role;

        // Ensure the user object matches the User type (with 'id' property)
        return { ...user, id: user._id } as User;
      },
    }),
  ],
  callbacks: {
    // ... other callback functions as needed
  },
  pages: {
    signIn: '/login',
  },
};

export default options;
