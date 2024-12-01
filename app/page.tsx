"use client";
import { useState } from "react";
import MoviesList from "@/components/MoviesList";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Navbar search={search} setSearch={setSearch} />
      <MoviesList searchQuery={search} />
    </div>
  );
}
