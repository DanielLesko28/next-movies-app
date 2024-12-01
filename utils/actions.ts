"use server";

export async function fetchMovies(page: number = 1) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`;
  let response = await fetch(url);
  let data = await response.json();

  return data;
}
