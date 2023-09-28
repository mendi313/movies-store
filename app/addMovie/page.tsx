'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const genres = [
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'horror', label: 'Horror' },
  { value: 'science_fiction', label: 'Science Fiction' },
  { value: 'romance', label: 'Romance' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'animation', label: 'Animation' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'crime', label: 'Crime' },
  { value: 'family', label: 'Family' },
] as { value: string; label: string }[];

export default function AddMoviePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Movie>({
    name: '',
    genres: [],
    url: '',
    premiered: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};

    // Check required fields and set errors
    if (!formData.name) {
      errors.name = 'Please enter a name.';
    }
    if (formData.genres.length === 0) {
      errors.genres = 'Please select at least one genre.';
    }
    if (!formData.url) {
      errors.image = 'Please enter an image URL.';
    }

    // Update form errors state
    setFormErrors(errors);

    // If there are errors, stop form submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    await axios.post('http://localhost:3000/api/movies', formData).then((res) => {
      router.push('/');
    });
    // Add logic to handle form submission (e.g., sending data to server)
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);

    setFormData((prevData) => ({
      ...prevData,
      genres: selectedOptions,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // For the date input, convert the value to a Date object
    const newValue = name === 'premiered' ? new Date(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
    <div className="mx-auto max-w-md p-5">
      <h2 className="pb-7 text-2xl">Contact Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="movieName">Name:</label>
          <input
            id="movieName"
            className="rounded-md flex-1"
            type="text"
            placeholder="Movie Name"
            name="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        {formErrors.name && <div className="text-red-600">{formErrors.name}</div>}
        <div className="flex justify-between items-center">
          <label htmlFor="genre">Genres:</label>
          <select
            id="genre"
            name="Genre"
            className="w-3/5 px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:ring focus:ring-blue-300"
            value={formData.genres} // Update the value attribute to be an array of genre values
            onChange={handleGenreChange}
            multiple // Enable multiple selections
          >
            {genres.map((genre) => (
              <option key={genre.label} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </select>
        </div>
        {formErrors.genres && <div className="text-red-600">{formErrors.genres}</div>}
        <div className="flex justify-between items-center">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            id="imageUrl"
            className="rounded-md flex-1"
            type="text"
            placeholder="Image URL"
            name="Image"
            value={formData.url}
            onChange={handleInputChange}
          />
        </div>
        {formErrors.image && <div className="text-red-600">{formErrors.image}</div>}
        <div className="flex justify-between items-center">
          <label htmlFor="premiered">Premiered:</label>
          <input id="premiered" className="rounded-md" type="date" name="premiered" value={formData.premiered} onChange={handleInputChange} />
        </div>

        <button className="bg-blue-600 p-3 py-2 rounded-md" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
