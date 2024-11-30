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
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border-2 border-red-700 w-full max-w-7xl">
        {movies.results.map((movie: any) => (
          <div key={movie.title} className="p-2">
            <p>{movie.title}</p>
            <img
              src={`${imageBaseURL}${movie.poster_path}`}
              alt={movie.title}
              className="w-[300px] h-[500px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
