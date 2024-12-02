import { useEffect, useState } from "react";
import { FavoritesListProps, MovieProps } from "@/utils/types";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { imageBaseURL } from "@/utils/constants";
import { formatDate } from "@/utils/helperFunctions";

const FavoritesList = ({ savedFavorites }: FavoritesListProps) => {
  const [favorites, setFavorites] = useState<MovieProps[]>(
    savedFavorites || []
  );

  useEffect(() => {
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, [savedFavorites]);

  const toggleFavorite = (movie: MovieProps) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);

    let updatedFavorites: MovieProps[];

    if (isAlreadyFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));

    if (savedFavorites) {
      savedFavorites = updatedFavorites;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {favorites &&
          favorites.length > 0 &&
          favorites.map((movie: MovieProps) => {
            return (
              <div
                key={movie.id}
                className="p-2 mb-2 flex justify-center relative w-full"
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
                <button className="z-10" onClick={() => toggleFavorite(movie)}>
                  <FaHeart
                    size={30}
                    className="absolute right-4 top-12 sm:right-2 text-red-500"
                  />
                </button>
              </div>
            );
          })}
      </div>

      {favorites.length == 0 && (
        <div className="w-full flex justify-center items-center">
          <p className="text-center">No Movies to show</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
