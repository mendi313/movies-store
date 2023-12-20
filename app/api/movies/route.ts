import { connectDB } from '@/connect/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Movies from '@/backend/models/movies';
import Cors from 'cors';

// Database connection setup
connectDB();

// Initialize CORS middleware
const cors = Cors({
  origin: 'https://movies-store-4c30jvdxv-mendi313.vercel.app/', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Helper function to apply CORS middleware to Next.js API route
function applyCors(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  // Apply CORS middleware to the request
  try {
    await applyCors(request, response);
  } catch (error) {
    response.status(500).json({ error: 'Unable to apply CORS' });
    return;
  }

  // Handle different HTTP methods (GET, POST, PUT, DELETE)
  if (request.method === 'GET') {
    try {
      const id = request.query.id; // Use request.query for query parameters
      if (id) {
        const movie = await Movies.findById(id);
        if (movie) {
          response.status(200).json(movie);
          return;
        }
      }
      const movies = await Movies.find();
      response.status(200).json(movies);
    } catch (error) {
      response.status(500).json({ error: 'An unknown error occurred' });
    }
  } else if (request.method === 'POST') {
    try {
      const newMovie = await request.body;
      // Validate and create logic
      const createdMovie = await Movies.create(newMovie);
      const movies = await Movies.find();
      response.status(201).json(movies);
    } catch (error) {
      response.status(500).json({ error: 'An unknown error occurred' });
    }
  } else if (request.method === 'PUT') {
    try {
      const { id, ...updatedMovie } = await request.body;
      const updated = await Movies.findByIdAndUpdate(id, updatedMovie, { new: true });
      response.status(200).json(updated);
    } catch (error) {
      response.status(500).json({ error: 'An unknown error occurred' });
    }
  } else if (request.method === 'DELETE') {
    try {
      const { id } = await request.body;
      await Movies.findByIdAndDelete(id);
      const movies = await Movies.find();
      response.status(200).json(movies);
    } catch (error) {
      response.status(500).json({ error: 'An unknown error occurred' });
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
}
