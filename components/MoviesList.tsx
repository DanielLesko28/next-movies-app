"use client";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchMovies } from "@/utils/actions";
import { MovieProps, MoviesListProps } from "@/utils/types";
import Link from "next/link";
import Pagination from "./Pagination";
import { formatDate } from "@/utils/helperFunctions";
import { imageBaseURL } from "@/utils/constants";
import Loader from "./Loader";
import { FaRegHeart, FaHeart } from "react-icons/fa";

let favoriteMovies: MovieProps[] = []; // Global favorites array

const MoviesList = ({ searchQuery }: MoviesListProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<MovieProps[]>([]); // Local state for reactivity

  // Load favorites from local storage when component mounts
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteMovies");
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites) as MovieProps[];
      favoriteMovies = parsedFavorites; // Sync global state
      setFavorites(parsedFavorites);
    }
  }, []);

  const fetchMovieData = useDebouncedCallback(
    async (query: string, page: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovies(page, query);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 5);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    },
    300
  );

  useEffect(() => {
    fetchMovieData(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFavorite = (movie: MovieProps) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);

    let updatedFavorites: MovieProps[];

    if (isAlreadyFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    favoriteMovies = updatedFavorites; // Sync global state

    // Save updated favorites to local storage
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));

    console.log("Updated Favorites:", updatedFavorites);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (searchQuery && movies.length === 0) {
    return <h1 className="text-lg">No results found for "{searchQuery}".</h1>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {movies.map((movie: MovieProps) => {
          const isFavorite = favorites.some((fav) => fav.id === movie.id);

          return (
            <div
              key={movie.id}
              className="p-2 mb-2 flex justify-center relative"
            >
              <Link
                href={`/movie/${movie.id}`}
                className="flex flex-col items-center"
              >
                <p className="text-center mb-2">{movie.title}</p>
                <img
                  src={`${imageBaseURL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[300px] object-contain"
                />
                <p className="pt-2">({formatDate(movie.release_date)})</p>
              </Link>
              <button
                className="z-10"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  e.stopPropagation(); // Stop bubbling to Link
                  toggleFavorite(movie); // Toggle favorite
                }}
              >
                {isFavorite ? (
                  <FaHeart
                    size={30}
                    className="absolute right-4 top-12 sm:right-2 text-red-500"
                  />
                ) : (
                  <FaRegHeart
                    size={30}
                    className="absolute right-4 top-12 sm:right-2"
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <Pagination
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default MoviesList;
