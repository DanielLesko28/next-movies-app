"use client";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchMovies } from "@/utils/actions";
import { MovieProps, MoviesListProps } from "@/utils/types";
import Loader from "./Loader";
import MovieListContainer from "./MovieListContainer";

let favoriteMovies: MovieProps[] = [];

const MoviesList = ({ searchQuery }: MoviesListProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<MovieProps[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteMovies");
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites) as MovieProps[];
      favoriteMovies = parsedFavorites;
      setFavorites(parsedFavorites);
    }
  }, []);

  //   console.log("favorites", favorites);

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
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    favoriteMovies = updatedFavorites;

    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));

    // console.log("Updated Favorites:", updatedFavorites);
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
    <MovieListContainer
      movies={movies}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      handlePageClick={handlePageClick}
      totalPages={totalPages}
      currentPage={currentPage}
      isVisible={isVisible}
    />
  );
};

export default MoviesList;
