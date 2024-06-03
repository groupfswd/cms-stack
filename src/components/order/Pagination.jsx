'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ currentPage, totalPages }) {
   const searchParams = useSearchParams();
   const pathName = usePathname();
   const router = useRouter();

   const createPageURL = (pageNumber) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', pageNumber.toString());
      const newUrl = `${pathName}?${params.toString()}`;
      router.replace(newUrl);
   };

   const generatePagination = () => {
      const pageNumbers = [];
      const maxPageNumbersToShow = 3;
      const sidePages = 2;

      if (totalPages <= maxPageNumbersToShow) {
         for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
         }
      } else {
         let startPage = Math.max(2, currentPage - sidePages);
         let endPage = Math.min(totalPages - 1, currentPage + sidePages);

         if (currentPage <= sidePages + 2) {
            startPage = 2;
            endPage = 5;
         }

         if (currentPage >= totalPages - sidePages - 1) {
            startPage = totalPages - 4;
            endPage = totalPages - 1;
         }

         pageNumbers.push(1);

         if (startPage > 2) {
            pageNumbers.push('...');
         }

         for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
         }

         if (endPage < totalPages - 1) {
            pageNumbers.push('...');
         }

         pageNumbers.push(totalPages);
      }
      return pageNumbers;
   }

   return (
      <div>
         <div className="join flex justify-center my-10">
            <button
               onClick={() => createPageURL(+currentPage - 1)}
               disabled={+currentPage <= 1}
               className="join-item btn w-auto px-3 mr-1"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
               </svg>
            </button>
            {generatePagination().map((page) => (
               page === '...' ? (
                  <button
                     className='join-item btn w-auto px-4 mr-1'
                     disabled
                     key={page}
                  >
                     ...
                  </button>
               ) : (
                  <button
                     className={`join-item btn w-auto mr-1 ${+currentPage === page ? 'bg-sky-300' : ''}`}
                     key={page}
                     onClick={() => createPageURL(page)}
                  >
                     {page}
                  </button>
               )
            ))}
            <button
               onClick={() => createPageURL(+currentPage + 1)}
               disabled={+currentPage >= totalPages}
               className="join-item btn w-auto px-3"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
               </svg>
            </button>
         </div>
      </div>
   );
}
