import dbConnect from '@/backend/config/dbConnect';
import User from '@/backend/models/user';
import Permission from '@/backend/models/permissions';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (id) {
      const user = await User.findById(id);
      const userpermission = await User.findById(id);
      if (userpermission) {
        return NextResponse.json({ ...user, ...userpermission });
      }
    }
    const userResult = await User.find();
    const permissionResult = await Permission.find();
    return NextResponse.json({ userResult, permissionResult });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    const deleteUser = await User.findByIdAndDelete(id);
    const deletePermission = await Permission.findOneAndDelete({ userId: id });
    const userResult = await User.find();
    return NextResponse.json(userResult);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
export async function POST(req: Request, res: NextResponse) {
  try {
    const body = await req.json();
    // Create a new User based on the provided body
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      createdAt: new Date(),
    });
    // Create a new Permission based on the provided body
    const permission = await Permission.create({
      role: body.permissionRole?.length ? body.permissionRole : 'user',
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

export async function PUT(req: NextRequest) {
  try {
    const { _id, name, role } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(_id, { $set: { name: name } }, { new: true });
    const updatedPermission = await Permission.findOneAndUpdate({ userId: _id }, { $set: { role: role } }, { new: true });
    return NextResponse.json(
      {
        message: 'User updated successfully!',
        updatedUser,
        updatedPermission,
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
