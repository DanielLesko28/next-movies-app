"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MovieProps } from "@/utils/types";

// You can replace this with your API fetch function for a single movie.
const fetchMovieById = async (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const Page = () => {
  const { id } = useParams<{ id: string }>(); // Get the movie ID from the URL params
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovieData = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors if any
      try {
        const data = await fetchMovieById(id); // Fetch movie data using the movie ID
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getMovieData();
    }
  }, [id]); // Re-run the effect if the `id` changes

  if (isLoading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  // You can structure the movie data display here
  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <p>{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
      {/* Add more movie details as needed */}
    </div>
  );
};

export default Page;
