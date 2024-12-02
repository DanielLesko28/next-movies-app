import { FavoritesListProps, MovieProps } from "@/utils/types";
import Link from "next/link";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { imageBaseURL } from "@/utils/constants";
import { formatDate } from "@/utils/helperFunctions";

const FavoritesList = ({ savedFavorites }: FavoritesListProps) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {savedFavorites && savedFavorites.length > 0 ? (
          savedFavorites.map((movie: MovieProps) => {
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
                    // toggleFavorite(movie);
                    console.log(movie.id);
                  }}
                >
                  <FaHeart
                    size={30}
                    className="absolute right-4 top-12 sm:right-2 text-red-500"
                  />
                </button>
              </div>
            );
          })
        ) : (
          <p>No Movies to show</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
