"use client";
import { useState, useEffect } from "react";
import { fetchMovies } from "@/utils/actions";
import { MovieProps, MoviesListProps } from "@/utils/types";
import Link from "next/link";

const MoviesList = ({ searchQuery }: MoviesListProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovies(currentPage, searchQuery); // Fetch movies with the query
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 10); // Set the total number of pages if provided
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [currentPage, searchQuery]); // Refetch when currentPage or searchQuery changes

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  // Handle the case when no movies are found for the current search
  if (searchQuery && filteredMovies.length === 0) {
    return <p>No results found for "{searchQuery}".</p>;
  }

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="flex flex-col items-center min-h-screen">
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
                page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
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
