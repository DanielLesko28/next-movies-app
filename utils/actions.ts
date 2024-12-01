"use server";

export async function fetchMovies(page: number = 1, query: string = "") {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&page=${page}`
    : `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`;
  let response = await fetch(url);
  let data = await response.json();

  return data;
}
