import { SearchbarProps } from "@/utils/types";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

const Searchbar = ({ search, setSearch, handleSearch }: SearchbarProps) => {
  const router = useRouter();

  const debounceHandleSearch = useDebouncedCallback((value: string) => {
    handleSearch(value);
  }, 500);

  const clearSearch = () => {
    setSearch("");
    router.push("/");
  };

  return (
    <section className=" w-full flex justify-center items-center mb-8">
      <input
        type="text"
        placeholder="Find movie..."
        className="max-w-md bg-black p-2  border-2 mr-2 border-white rounded-md"
        onChange={(e) => {
          setSearch(e.target.value);
          debounceHandleSearch(e.target.value);
        }}
        value={search}
      />
      {search !== "" && (
        <button className="bg-orange-400 p-2 rounded-md" onClick={clearSearch}>
          Clear search
        </button>
      )}
    </section>
  );
};

export default Searchbar;
