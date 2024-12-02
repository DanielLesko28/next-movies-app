"use client";

const page = () => {
  const savedFavorites = localStorage.getItem("favoriteMovies");

  console.log("movies from Favorite store", savedFavorites);
  return <div>page</div>;
};

export default page;
