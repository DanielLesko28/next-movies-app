import { fetchMovies } from "@/utils/actions";

const MoviesList = async () => {
  let movies = await fetchMovies();

  // Check if there are any movies and then map over the `results` array to display each one
  if (!movies.results) {
    return <p>No movies found.</p>;
  }

  console.log("movies", movies);

  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      {movies.results.map((movie: any) => (
        <div key={movie.title}>
          <p>{movie.title}</p>
          <img
            src={`${imageBaseURL}${movie.poster_path}`}
            alt={movie.title}
            className="w-[300px] h-[500px]"
          />
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
