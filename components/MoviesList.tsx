"use client";
import { useEffect, useState } from "react";
import { fetchMovies } from "@/utils/actions";
import { MovieProps, MoviesListProps } from "@/utils/types";
import Link from "next/link";

const MoviesList = ({ searchQuery }: MoviesListProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10); // Fixed number of pages since API doesn't provide `total_pages`

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovies(currentPage); // Fetch movies for the current page
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [currentPage]); // Refetch when the currentPage changes

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page); // Update the current page only if within valid range
    }
  };

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (filteredMovies.length === 0) {
    return <p>No results found for "{searchQuery}".</p>;
  }

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {filteredMovies.map((movie: MovieProps) => (
          <div key={movie.id} className="p-2 mb-2">
            <Link href={`/movie/${movie.id}`}>
              <p className="text-center">{movie.title}</p>
              <img
                src={`${imageBaseURL}${movie.poster_path}`}
                alt={movie.title}
                className="w-[300px] h-[500px]"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? "bg-blue-700 text-white" : "bg-blue-400"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MoviesList;
