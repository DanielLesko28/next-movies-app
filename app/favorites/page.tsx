"use client";
import { useEffect, useState } from "react";
import { MovieProps } from "@/utils/types";
import FavoritesList from "@/components/FavoritesList";

const Page = () => {
  const [savedFavorites, setSavedFavorites] = useState<MovieProps[] | null>(
    null
  );

  useEffect(() => {
    const savedFavoritesString = localStorage.getItem("favoriteMovies");
    if (savedFavoritesString) {
      const parsedFavorites: MovieProps[] = JSON.parse(savedFavoritesString);
      setSavedFavorites(parsedFavorites);
    } else {
      setSavedFavorites(null);
    }
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <FavoritesList savedFavorites={savedFavorites} />
    </div>
  );
};

export default Page;
