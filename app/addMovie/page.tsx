'use client';
import axios from 'axios';
import addMovie from '@/lib/addMovie';
import updateMovie from '@/lib/updateMovie';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { ContextValue } from '../context/Context';

const genres = [
  'action',
  'adventure',
  'comedy',
  'drama',
  'fantasy',
  'horror',
  'science-fiction',
  'romance',
  'thriller',
  'animation',
  'documentary',
  'crime',
  'family',
];

export default function AddMoviePage() {
  const animatedComponents = makeAnimated();
  const { editedMovie, setEditedMovie, setMovies } = ContextValue();

  const router = useRouter();
  const [formData, setFormData] = useState<Movie>({
    name: editedMovie?.name || '',
    genres: editedMovie?.genres || [],
    url: editedMovie?.image?.original || '',
    premiered: editedMovie?.premiered || '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};

    if (!formData.name) {
      errors.name = 'Please enter a name.';
    }
    if (formData.genres.length === 0) {
      errors.genres = 'Please select at least one genre.';
    }
    if (!formData.url) {
      errors.image = 'Please enter an image URL.';
    }
    if (!formData.premiered) {
      errors.premiered = 'Please enter an premiered.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    if (editedMovie) {
      editedMovie.name = formData.name;
      editedMovie.genres = formData.genres;
      editedMovie.premiered = formData.premiered;
      if (editedMovie && editedMovie.image) {
        // Check if editedMovie and editedMovie.image are not undefined
        editedMovie.image.original = formData.url;
      }

      await updateMovie(editedMovie);
      setEditedMovie(null);
    } else {
     const movies = await addMovie(formData);   
     setMovies(movies);
    }
    router.push('/moviesManagment');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'premiered') {
      // Convert the date to 'yyyy-MM-dd' format
      const date = new Date(value);
      newValue = date.toISOString().split('T')[0];
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // Convert genres to an array of objects for Select component
  const genreOptions = genres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  return (
    <div className="mx-auto max-w-lg w-[30rem] p-5">
      <h2 className="pb-7 text-2xl">Contact Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="movieName">Name:</label>
          <input
            id="movieName"
            className="rounded-md flex-1"
            type="text"
            placeholder="Movie Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        {formErrors.name && <div className="text-red-600">{formErrors.name}</div>}
        <div className="flex justify-between items-center">
          <label htmlFor="genre">Genres:</label>
          <Select
          className='w-4/5'
            id={`genre-select-${Date.now()}`}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={genreOptions} // Use genreOptions for the options
            value={genreOptions.filter((genre) => formData.genres.some((selectedGenre) => selectedGenre.toLowerCase() === genre.value.toLowerCase()))} // Perform case-insensitive matching
            onChange={(selectedGenres) => {
              setFormData((prevData) => ({
                ...prevData,
                genres: selectedGenres.map((genre) => genre.value),
              }));
            }}
          />
        </div>
        {formErrors.genres && <div className="text-red-600">{formErrors.genres}</div>}
        <div className="flex justify-between items-center">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            id="imageUrl"
            className="rounded-md flex-1"
            type="text"
            placeholder="Image URL"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
          />
        </div>
        {formErrors.image && <div className="text-red-600">{formErrors.image}</div>}
        <div className="flex justify-between items-center">
          <label htmlFor="premiered">Premiered:</label>
          <input id="premiered" className="rounded-md" type="date" name="premiered" value={formData.premiered} onChange={handleInputChange} />
        </div>
        {formErrors.premiered && <div className="text-red-600">{formErrors.premiered}</div>}
        <button className="bg-blue-600 p-3 py-2 rounded-md" type="submit" onClick={handleSubmit}>
          {editedMovie ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
