'use client';
import { useState } from "react";
import BASE_URL from "@/lib/baseUrl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken")

export default function deleteCategory(category) {
    const [modal, setModal] = useState(false);
    const router = useRouter();

    async function handleDelete(categoryId){
        await fetch(`${BASE_URL}/cms/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }
  return (
    <div>
        <button className='btn btn-error btn-sm text-white' onClick={handleChange}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>
        </button>
        <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle' />
        <div className="modal">
            <div className="modal-box">
                <h2 className="font-bold text-lg mb-8">Are You Sure Delete Data?</h2>
                <div className="modal-action flex justify-center">
                    <button type="button" className='btn' onClick={handleChange}>Close</button>
                    <button type="button" className='btn btn-error' onClick={() => handleDelete(category.id)}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
