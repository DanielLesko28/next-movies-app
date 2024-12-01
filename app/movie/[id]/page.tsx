"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MovieProps } from "@/utils/types";
import { fetchMovieById } from "@/utils/actions";
import MovieDetail from "@/components/MovieDetail";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovieData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovieById(id);
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
  }, [id]);

  if (isLoading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return <MovieDetail movie={movie} />;
};

export default Page;
