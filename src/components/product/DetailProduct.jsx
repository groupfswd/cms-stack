'use client';
import { useState } from "react";


export default function DetailProduct ({...product}) {
    const [category_id, setCategoryId] = useState(product.product.category_id)
    const [name, setName] = useState(product.product.name)
    const [sku, setSku] = useState(product.product.sku)
    const [stock, setStock] = useState(product.product.stock)
    const [price, setPrice] = useState(product.product.price)
    const [weight, setWeight] = useState(product.product.weight)
    const [description, setDescription] = useState(product.product.description)
    const [image, setImage] = useState(product.product.image)
    const [modal, setModal] = useState(false);

    function handleChange(){
        setModal(!modal);
    }
    return (
        <div>
            <button className='btn btn-warning btn-sm text-white' onClick={handleChange}>
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
            </button>
            <input type="checkbox" checked={modal} onChange={handleChange} className='modal-toggle' />
            <div className="modal">
                <div className="modal-box">
                    <h2 className="font-bold text-lg mb-8">Detail Product</h2>
                    <form>
                        <div className="form-control">
                            <label className="label font-bold">Category Name</label>
                            <select className="select select-bordered" value={category_id} onChange={(e) => setCategoryId(e.target.value)} disabled>
                                {product.category.data.map((dataCategory) => (
                                    <option value={dataCategory.id} key={dataCategory.id}>{dataCategory.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input w-full input-bordered" placeholder='Enter Product Name' required disabled/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">SKU</label>
                            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="input w-full input-bordered" placeholder='Enter SKU Product' required disabled/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Stock</label>
                            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="input w-full input-bordered" placeholder='Enter Stock Product' required disabled/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder='Enter Product Price' required disabled/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Weight (gram)</label>
                            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="input w-full input-bordered" placeholder='Enter Weight Product' required disabled/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Description</label>
                            <textarea className="input w-full input-bordered" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description Product' required disabled></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Image</label>
                            <img src={image} className="border-4" width={500} height={500} alt="Photo Product" />
                        </div>
                        <div className="modal-action">
                            <button type="button" className='btn' onClick={handleChange}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}