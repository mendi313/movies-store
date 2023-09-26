import Movies from '@/moviesSchema/movies';
import MoviesData from '../data/movies.json';

// export default async function createMoviesFromData() {
//   try {
//     const moviesArray = MoviesData as Movie[]; // Assuming the structure of MoviesData is compatible with IMovie

//     for (const movieData of moviesArray) {
//       const {
//         name,
//         genres,
//         image,
//         premiered,
//         ended,
//         summary,
//         language,
//         status,
//         runtime,
//         averageRuntime,
//         officialSite,
//         schedule,
//         rating,
//         weight,
//         network,
//         webChannel,
//         dvdCountry,
//         externals,
//         updated,
//         _links,
//       } = movieData;

//       const newMovie = new Movies({
//         name,
//         genres,
//         image,
//         premiered,
//         ended,
//         summary,
//         language,
//         status,
//         runtime,
//         averageRuntime,
//         officialSite,
//         schedule,
//         rating,
//         weight,
//         network,
//         webChannel,
//         dvdCountry,
//         externals,
//         updated,
//         _links,
//       });

//       await newMovie.save();
//       console.log(`Created movie: ${name}`);
//     }

//     console.log('All movies created successfully.');
//   } catch (error) {
//     console.error('Error creating movies:', error);
//   }
// }

// Call the function to create movies from the provided data
