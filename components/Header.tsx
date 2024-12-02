import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const Header = () => {
  return (
    <section className="w-full px-2 pt-2 flex justify-between">
      <Link href={"/"}>
        <h1 className="md:text-xl lg:text-2xl">Dan's movies</h1>
      </Link>
      <Link href={"/favorites"}>
        <FaHeart size={30} className="text-red-500" />
      </Link>
    </section>
  );
};

export default Header;
