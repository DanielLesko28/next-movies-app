"use client";
import { useState, useEffect } from "react";
import MoviesList from "@/components/MoviesList";
import Navbar from "@/components/Navbar";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Navbar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <MoviesList searchQuery={search} />
    </div>
  );
}
