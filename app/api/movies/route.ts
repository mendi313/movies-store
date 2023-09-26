import { connectDB } from '@/connect/connect';
import { NextRequest, NextResponse } from 'next/server';
import Movies from '@/backend/models/movies';

connectDB();

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (id) {
      const movie = await Movies.findById(id);
      if (movie) {
        return NextResponse.json(movie);
      }
    }
    const res = await Movies.find();
    return NextResponse.json(res);
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
    const newMovie: Movie = await request.json();

    // Validate input data
    if (!newMovie.name) {
      return NextResponse.json('Name is required', { status: 400 });
    }

    if (!newMovie.genres || newMovie.genres.length === 0) {
      return NextResponse.json('Genres is required', { status: 400 });
    }

    if (!newMovie.image || !newMovie.image.medium || !newMovie.image.original) {
      return NextResponse.json('Image is required with medium and original URLs', { status: 400 });
    }

    if (!newMovie.premiered) {
      return NextResponse.json('Premiered is required', { status: 400 });
    }

    const response = await Movies.create(newMovie);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  try {
    const res = await Movies.findByIdAndDelete(id);
    return NextResponse.json(res);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  const { name, genres, image, premiered }: Movie = await request.json();
  try {
    const res = await Movies.findByIdAndUpdate(id, { name, genres, image, premiered });
    return NextResponse.json(res);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
