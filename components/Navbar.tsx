"use client";

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (value: string) => void;
}

const Navbar = ({ search, setSearch, handleSearch }: NavbarProps) => {
  return (
    <input
      type="text"
      placeholder="Find movie..."
      className="max-w-xs bg-black p-2 border-2 mb-4 border-white rounded-md"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default Navbar;
