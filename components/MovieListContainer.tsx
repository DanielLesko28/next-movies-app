import { MovieProps } from "@/utils/types";
import Link from "next/link";
import Pagination from "./Pagination";
import { formatDate, trimTitle } from "@/utils/helperFunctions";
import { imageBaseURL } from "@/utils/constants";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ScrollToTop from "./ScrollToTop";

interface MovieListContainerProps {
  movies: MovieProps[];
  favorites: MovieProps[];
  toggleFavorite: (movie: MovieProps) => void;
  handlePageClick: (page: number) => void;
  totalPages: number;
  currentPage: number;
  isVisible: boolean;
}

const MovieListContainer = ({
  movies,
  favorites,
  toggleFavorite,
  handlePageClick,
  totalPages,
  currentPage,
  isVisible,
}: MovieListContainerProps) => {
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
                <p className="text-center mb-2">{trimTitle(movie.title)}</p>
                <img
                  src={`${imageBaseURL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[300px] object-contain"
                />
                <p className="pt-2">({formatDate(movie.release_date)})</p>
              </Link>
              <button
                className="z-10"
                onClick={() => {
                  toggleFavorite(movie);
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

      {isVisible && <ScrollToTop />}
    </div>
  );
};

export default MovieListContainer;
