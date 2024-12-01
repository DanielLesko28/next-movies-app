import { NavbarProps } from "@/utils/types";
import { useDebouncedCallback } from "use-debounce";

const Navbar = ({ search, setSearch, handleSearch }: NavbarProps) => {
  const debounceHandleSearch = useDebouncedCallback((value: string) => {
    handleSearch(value);
  }, 500);

  return (
    <input
      type="text"
      placeholder="Find movie..."
      className="max-w-md bg-black p-2  border-2 mb-4 border-white rounded-md"
      onChange={(e) => {
        setSearch(e.target.value);
        debounceHandleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default Navbar;
