"use server";

export async function fetchMovies() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`;
  let response = await fetch(url);
  let data = await response.json();

  return data;
}
