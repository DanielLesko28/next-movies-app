"use server";

export async function fetchMovies(page: number = 1, query: string = "") {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&page=${page}`
    : `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch movies: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data || !data.results) {
      throw new Error("Invalid response structure from the API.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

export const fetchMovieById = async (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
