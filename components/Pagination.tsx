import { PaginationProps } from "@/utils/types";

const Pagination = ({
  handlePageClick,
  currentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <section className="mt-4 flex items-center gap-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300"
      >
        &lt;
      </button>

      {Array.from(
        { length: 10 },
        (_, index) => index + 1 + Math.floor((currentPage - 1) / 10) * 10
      )
        .filter((page) => page <= totalPages)
        .map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage ? "bg-blue-700 text-white" : "bg-blue-400"
            }`}
          >
            {page}
          </button>
        ))}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300"
      >
        &gt;
      </button>
    </section>
  );
};

export default Pagination;
