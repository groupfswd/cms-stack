'use client';
import { useState } from "react";
import BASE_URL from "@/lib/baseUrl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

const accessToken = Cookies.get("accessToken")

const notifySuccessCreate = () => toast.success("Category created successfully")

export default function addCategory() {
    const [category, setCategory] = useState("")
    const [modal, setModal] = useState(false);
    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault();

        await fetch(`${BASE_URL}/cms/categories`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: category
            })
        });
        setCategory("");
        notifySuccessCreate();
        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }
  return (
    <div>
        <Toaster/>
        <button className='btn btn-primary btn-sm text-white' onClick={handleChange}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>Add New
        </button>
        <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle' />
        <div className="modal">
            <div className="modal-box">
                <h2 className="font-bold text-lg mb-8">Add New Category Name</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label font-bold">Category Name</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="input w-full input-bordered" placeholder='Enter Category Name' required/>
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
