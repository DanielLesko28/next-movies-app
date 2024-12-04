import { MovieDetails } from "@/utils/types";
import { formatDate, roundToOneDecimalPlace } from "@/utils/helperFunctions";
import BackBtn from "./BackBtn";

interface MovieDetailProps {
  movie: MovieDetails;
}

const MovieDetail = ({ movie }: MovieDetailProps) => {
  return (
    <main className="w-full flex justify-center">
      <div className="flex flex-col items-center max-w-[1000px]">
        <div className="w-full my-4">
          <BackBtn />
        </div>
        <h1 className="font-bold text-xl lg:text-3xl">{movie.title}</h1>
        <p className="text-left px-2 mb-8">{movie.overview}</p>

        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="px-2 mt-2"
        />
        <section className="flex flex-col items-start px-4 pt-2 w-full">
          <div className="flex">
            <p>Genres:</p>
            {movie?.genres !== undefined &&
              movie.genres.length > 0 &&
              movie.genres.map((genre, index) => (
                <p key={index} className="mr-2">
                  {genre.name}
                  {movie.genres !== undefined &&
                    index !== movie.genres.length - 1 &&
                    " -"}{" "}
                </p>
              ))}
          </div>
          <p className="text-left">
            <strong>Release Date:</strong> {formatDate(movie.release_date)}
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            {roundToOneDecimalPlace(movie.vote_average)} / 10
          </p>
          <p>
            Is this movie kids friendly: {movie.adult === true ? "NO" : "YES"}{" "}
          </p>
        </section>
      </div>
    </main>
  );
};

export default MovieDetail;
