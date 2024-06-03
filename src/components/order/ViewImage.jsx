'use client'
import Image from "next/image";
import { useState } from "react";

export default function ViewImage({ receiptImage }) {
   const [modal, setModal] = useState(false);

   return (
      <div>
         {receiptImage ? (
            <div className="tooltip" data-tip="View">
               <button onClick={() => setModal(true)} className="btn btn-warning btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
               </button>
            </div>
         ) : (<button disabled className="btn btn-sm btn-warning">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
         </button>)}
         {modal && (
            <div className="fixed left-0 right-0 top-0 bottom-0 items-center justify-center flex z-20 shadow-xl">
               <div className="modal-bottom sm:modal-middle">
                  <div className="modal-box" >
                     <h3 className="font-bold text-lg">Payment receipt</h3>
                     {receiptImage && (
                        <Image src={receiptImage} alt="payment receipt" width={600} height={700} />
                     )}
                     <div className="modal-action">
                        <button onClick={() => setModal(false)} className="btn">Close!</button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
