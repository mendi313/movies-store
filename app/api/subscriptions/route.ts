import { connectDB } from '@/connect/connect';
import { NextRequest, NextResponse } from 'next/server';
import Subscription from '@/backend/models/subscription';

connectDB();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (id) {
      const subscription = await Subscription.findOne({ userId: id });
      if (subscription) {
        return NextResponse.json(subscription);
      } else {
        return NextResponse.json({ message: 'Subscription not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ message: 'ID parameter is missing' }, { status: 400 });
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, movies }: Subscription = await request.json();
    // Validate input data
    if (!userId) {
      return NextResponse.json('userId is required', { status: 400 });
    }
    const response = await Subscription.create({ userId, movies: [...movies] });
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function PUT(request: NextRequest) {
  const { userId, movies, action } = await request.json();

  if (action === true) {
    try {
      const subscription = await Subscription.findOneAndUpdate(
        { userId },
        { $pullAll: { movies } }, // Remove movies from the array
        { new: true }
      );
      return NextResponse.json(subscription);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  } else {
    try {
      const subscription = await Subscription.findOneAndUpdate(
        { userId },
        { $push: { movies: { $each: movies } } }, // Concatenate the new movies array
        { new: true }
      );
      return NextResponse.json(subscription);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}
