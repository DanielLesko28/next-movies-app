"use client";
import { useEffect, useState } from "react";
import { fetchMovies } from "@/utils/actions";
import { MovieProps, MoviesListProps } from "@/utils/types";

const MoviesList = ({ searchQuery }: MoviesListProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovies();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (filteredMovies.length === 0) {
    return <p>No results found for "{searchQuery}".</p>;
  }

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  //   console.log("movies", movies);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  w-full max-w-7xl">
        {filteredMovies.map((movie: MovieProps) => (
          <div key={movie.id} className="p-2">
            <p>{movie.title}</p>
            <img
              src={`${imageBaseURL}${movie.poster_path}`}
              alt={movie.title}
              className="w-[300px] h-[500px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
