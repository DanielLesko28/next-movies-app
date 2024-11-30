"use client";
import { useSearchParams } from "next/navigation";
import MoviesList from "@/components/MoviesList";

export default function Home() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Hello Daniel</h1>
      {searchQuery ? (
        <p>No results found for "{searchQuery}"</p>
      ) : (
        <MoviesList />
      )}
    </div>
  );
}
