'use client'
import { getStores, createStore, deleteStore } from '@/fetching/store'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StorePage() {
  const [stores, setStores] = useState([])
  const [success, setSuccess] = useState(false)
  const [city_id, setCityId] = useState("");
  const [name, setName] = useState("");
  const [bank_name, setBankName] = useState("");
  const [street_address, setStreetAddress] = useState("");
  const [province, setProvince] = useState("");
  const [postal_code, setPostalCode] = useState("");

  const router = useRouter()

  useEffect(() => {
    const fetchStores = async () => {
      const data = await getStores();
      setStores(data)
    }

    fetchStores()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const store = await createStore({
        city_id: +city_id,
        name,
        bank_name,
        street_address,
        province,
        postal_code,
      })

      setSuccess(true)
      router.push('/store')
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        window.location.reload()
        setSuccess(false)
      }, 500)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteStore(id)
      setStores(stores.filter(store => store.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {success && (
        <div
          role="alert"
          className="alert alert-success flex fixed z-10 w-80 right-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Add Store Successfully!</span>
        </div>
      )}
      <div className='flex flex-col justify-center'>
        <div className='flex justify-center py-5'>
          <h1 className='text-xl font-bold'>Stores</h1>
        </div>
        <div className='flex justify-end mr-20'>
          <a href="#my_modal_8" className="btn btn-info">+ Add store</a>
        </div>
        <div className="modal" role="dialog" id="my_modal_8">
          <div className="modal-box w-[450px]">
            <h3 className="font-bold text-lg mb-2">Add Store</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control flex flex-row justify-between mt-3">
                <label className="label">
                  <span className="label-text">City id</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-72"
                  required
                  placeholder='City id'
                  onChange={(e) => setCityId(e.target.value)}
                />
              </div>
              <div className="form-control flex flex-row justify-between mt-3">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-72"
                  required
                  placeholder='Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control flex flex-row justify-between mt-3">
                <label className="label">
                  <span className="label-text">Bank name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-72"
                  required
                  placeholder='Bank name'
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
              <div className="form-control flex flex-row justify-between mt-3">
                <label className="label">
                  <span className="label-text">Street address</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-72"
                  required
                  placeholder='Street address'
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </div>
              <div className="form-control flex flex-row justify-between mt-3">
                <label className="label">
                  <span className="label-text">Province</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-72"
                  required
                  placeholder='Province'
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
              <div className="form-control flex flex-row justify-between mt-3">
                <label className="label">
                  <span className="label-text">Postal code</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-72"
                  required
                  placeholder='Postal code'
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="flex justify-end my-2">
                <div className="modal-action mr-2">
                  <button className="btn btn-success">Submit</button>
                </div>
                <div className="modal-action">
                  <a href="#" className="btn btn-active">Close</a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='w-full px-20 mt-3'>
          <div className='overflow-x-auto border'>
            <table className='table text-center'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Bank name</th>
                  <th>Bank account</th>
                  <th>Street address</th>
                  <th>Province</th>
                  <th>Postal code</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, i) => (
                  <tr key={store.id}>
                    <td>{i + 1}</td>
                    <td>{store.name}</td>
                    <td>{store.bank_name}</td>
                    <td>{store.bank_account}</td>
                    <td>{store.street_address}</td>
                    <td>{store.province}</td>
                    <td>{store.postal_code}</td>
                    <td>
                      <Link href={`/store/${store.id}`}>
                        <button className='btn btn-primary mr-2'>Update</button>
                      </Link>
                      {/* modal delete  */}
                      <button className="btn btn-error" onClick={() => document.getElementById('my_modal_5').showModal()}>Delete</button>
                      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                          <h3 className="font-bold text-xl text-left">Confirm delete!</h3>
                          <p className="py-4 text-left text-lg">Are you sure you want to delete this store?</p>
                          <div className="modal-action">
                            <form method="dialog">
                              <button onClick={() => handleDelete(store.id)} className="btn btn-error mr-2">Delete</button>
                              <button className="btn btn-default">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
