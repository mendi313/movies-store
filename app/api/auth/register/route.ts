import dbConnect from '@/backend/config/dbConnect';
import User from '@/backend/models/user';
import Permission from '@/backend/models/permissions';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextResponse) {
  try {
    await dbConnect();
    const body = await req.json();
    // Create a new User based on the provided body
    const user = await User.create({
      email: body.email,
      password: body.password,
      createdAt: new Date(),
    });
    // Create a new Permission based on the provided body
    const permission = await Permission.create({
      role: body.permissionRole,
      userId: user._id, // Assuming userId is a reference to the User's ObjectId
    });

    return NextResponse.json(
      {
        message: 'User Created successfully!',
        user,
        permission,
      },
      {
        status: 201,
      }
    );
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
