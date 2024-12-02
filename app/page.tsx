"use client";

import { useState, useEffect } from "react";
import MoviesList from "@/components/MoviesList";
import Searchbar from "@/components/Searchbar";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Home() {
  const { replace } = useRouter();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearch(params.get("search") || "");
  }, []);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`);
  }, 500);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Searchbar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <MoviesList searchQuery={search} />
    </div>
  );
}
