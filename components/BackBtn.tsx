import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const BackBtn = () => {
  const router = useRouter();

  return (
    <div className=" px-4 pt-2">
      <button
        className="bg-blue-600 px-2 py-1 rounded-md flex items-center gap-2"
        onClick={() => router.back()}
      >
        <FaArrowLeft />
        Go Back
      </button>
    </div>
  );
};

export default BackBtn;
