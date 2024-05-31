'use client';
import { useState } from "react";
import BASE_URL from "@/lib/baseUrl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken")

export default function updateCategory(category) {
    const [name, setName] = useState(category.name);
    const [modal, setModal] = useState(false);
    const router = useRouter();

    async function handleUpdate(e){
        e.preventDefault();
        await fetch(`${BASE_URL}/cms/categories/${category.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: name
            })
        });
        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }
  return (
    <div>
        <button className='btn btn-info btn-sm text-white' onClick={handleChange}>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
            </svg>
        </button>
        <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle' />
        <div className="modal">
            <div className="modal-box">
                <h2 className="font-bold text-lg mb-8 text-black">Update Category Name</h2>
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label font-bold">Category Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input w-full input-bordered" placeholder='Enter Category Name' />
                    </div>
                    <div className="modal-action">
                        <button type="button" className='btn' onClick={handleChange}>Close</button>
                        <button type="submit" className='btn btn-primary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
