import { PaginationProps } from "@/utils/types";

const Pagination = ({
  handlePageClick,
  currentPage,
  totalPages,
}: PaginationProps) => {
  const pagesToShow = 5;
  const startPage =
    Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;

  return (
    <section className="mt-4 flex items-center gap-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300"
      >
        &lt;
      </button>

      {Array.from({ length: pagesToShow }, (_, index) => startPage + index)
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
