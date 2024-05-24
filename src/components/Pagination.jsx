export const InitPagination = () => {
    const pageNumbers = [];
    for (let i = 0; i < jobList.totalPages; i++) {
      pageNumbers.push(i + 1);
    }

    return (
      <div className="container flex justify-center mx-auto">
        <ul className="flex">
          {pageNumbers.map((el, idx) => {
            return (
              <li key={idx}>
                {page === +el ? (
                  <button
                    onClick={(e) => handleChangePage(el)}
                    className="h-10 px-5 text-white bg-black border border-r-0 border-gray-600 rounded-tl-full rounded-bl-full "
                  >
                    {el}
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleChangePage(el)}
                    className="h-10 px-5 text-black bg-white border border-r-0 border-gray-600 rounded-tl-full rounded-bl-full "
                  >
                    {el}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };