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

  // When the search query or currentPage changes, fetch new data
  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovies(currentPage, searchQuery); // Fetch movies with the query
        console.log("Fetched Movies:", data); // Log the API response for inspection
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 10); // Set total pages if available
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [currentPage, searchQuery]); // Trigger re-fetch when searchQuery or currentPage changes

  const handlePageClick = (page: number) => {
    setCurrentPage(page); // Update currentPage state
  };

  // Reset pagination to the first page whenever searchQuery changes
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page on search query change
  }, [searchQuery]);

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (searchQuery && movies.length === 0) {
    return <p>No results found for "{searchQuery}".</p>;
  }

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {movies.map((movie: MovieProps) => (
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
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300"
        >
          &lt;
        </button>

        {Array.from(
          { length: 10 },
          (_, index) => index + 1 + Math.floor((currentPage - 1) / 10) * 10
        )
          .filter((page) => page <= totalPages)
          .map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? "bg-blue-700 text-white" : "bg-blue-400"
              }`}
            >
              {page}
            </button>
          ))}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MoviesList;
