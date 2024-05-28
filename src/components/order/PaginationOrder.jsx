export default function Pagination({ currentPage, totalPages, handleSortOrders }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <div className="join flex justify-center my-5">
        {currentPage > 1 && (
          <button
            onClick={() => handleSortOrders(currentPage - 1)}
            className="join-item btn btn-square w-auto px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
        )}
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handleSortOrders(pageNum)}
            className={`join-item btn btn-square ${currentPage === pageNum ? "bg-sky-500 text-white" : ""
              }`}
          >
            {pageNum}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => handleSortOrders(currentPage + 1)}
            className="join-item btn btn-square px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
