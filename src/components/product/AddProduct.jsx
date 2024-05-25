'use client';
import { useState } from "react";
import BASE_URL from "@/lib/baseUrl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken")

const upload = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/cms/products/upload`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        })
        const data = await response.json();
        return data.image;
    } catch (error) {
        console.log(error);
    }
}

export default function AddProduct ({...dataCategories}) {
    const [category_id, setCategoryId] = useState("")
    const [name, setName] = useState("")
    const [sku, setSku] = useState("")
    const [stock, setStock] = useState("")
    const [price, setPrice] = useState("")
    const [weight, setWeight] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [modal, setModal] = useState(false);
    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault();
        if(!image){
            alert('Image Required')
            return
        }
        const formData = new FormData(e.target);
        
        const dataUpload = await upload(formData);

        await fetch(`${BASE_URL}/cms/products`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                category_id: category_id,
                name: name,
                sku: sku,
                stock: stock,
                price: price,
                weight: weight,
                description: description,
                image: dataUpload
            })
        });
        setCategoryId("");
        setName("");
        setSku("");
        setStock("");
        setPrice("");
        setWeight("");
        setDescription("");
        setImage("");
        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }
    return (
        <div>
            <button className='btn btn-primary btn-sm text-white' onClick={handleChange}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>Add New
            </button>
            <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h2 className="font-bold text-lg mb-8">Add New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Category Name</label>
                            <select className="select select-bordered" value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                                <option value="" disabled selected>-- Select Categories Name --</option>
                                {dataCategories.category.data.map((dataCategory) => (
                                    <option value={dataCategory.id} key={dataCategory.id}>{dataCategory.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input w-full input-bordered" placeholder='Enter Product Name' required/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">SKU</label>
                            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="input w-full input-bordered" placeholder='Enter SKU Product' required/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Stock</label>
                            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="input w-full input-bordered" placeholder='Enter Stock Product' required/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder='Enter Product Price' required/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Weight (gram)</label>
                            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input w-full input-bordered" placeholder='Enter Weight Product' required/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Description</label>
                            <textarea className="input w-full input-bordered" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description Product' required></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Image</label>
                            <input type="file" className="input w-full input-bordered" id="image" name="image" accept="image/" onChange={(e) => setImage(e.target.files[0])} />
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