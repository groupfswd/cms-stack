"use client";
import { getStores, createStore, deleteStore, getCities } from "@/fetching/store";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function StorePage() {
  const [stores, setStores] = useState([]);
  const [success, setSuccess] = useState(false);
  const [city_id, setCityId] = useState("");
  const [name, setName] = useState("");
  const [bank_name, setBankName] = useState("");
  const [bank_account, setBankAccount] = useState("");
  const [street_address, setStreetAddress] = useState("");
  const [province, setProvince] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [modal, setModal] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const data = await getStores();
      setStores(data);
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      const data = await getCities();
      setCities(data);
    }

    fetchCities();
  }, [])

  const handleIdCity = (e) => {
    setCityId(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await createStore({
        city_id: +city_id,
        name,
        bank_name,
        bank_account,
        street_address,
        province,
        postal_code,
      });

      setSuccess(true);
      setModal(false)
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStore(id);
      setStores(stores.filter((store) => store.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleModal = () => {
    setModal(true)
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
      <div className="flex flex-col justify-center">
        <div className="flex justify-center py-5">
          <h1 className="text-xl font-bold">Stores</h1>
        </div>
        <div className="flex mx-20">
          <button
            onClick={() => handleModal()}
            className="btn btn-info p-2">
            + Add store
          </button>
        </div>
        {modal && (
          <div className="flex fixed z-10 items-center justify-center mx-auto left-0 right-0 top-0 bottom-0">
            <div className="modal-box w-[450px]">
              <h3 className="font-bold text-lg mb-2">Add Store</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-control flex flex-row justify-between mt-3">
                  <label className="label">
                    <span className="label-text">City id</span>
                  </label>
                  <select className="select select-bordered w-72" onChange={(e) => handleIdCity(e)} required>
                    <option value="city">Select city</option>
                    {cities.map((index) => (
                      <option key={index.id} value={index.id} >
                        {index.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control flex flex-row justify-between mt-3">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-72"
                    required
                    placeholder="Name"
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
                    placeholder="Bank name"
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                <div className="form-control flex flex-row justify-between mt-3">
                  <label className="label">
                    <span className="label-text">Bank account</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-72"
                    required
                    placeholder="Bank account"
                    onChange={(e) => setBankAccount(e.target.value)}
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
                    placeholder="Street address"
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
                    placeholder="Province"
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
                    placeholder="Postal code"
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="flex justify-end my-2">
                  <div className="modal-action mr-2">
                    <button className="btn btn-success">Submit</button>
                  </div>
                  <div className="modal-action">
                    <button onClick={() => setModal(false)} className="btn btn-active">
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="w-full px-20 mt-3">
          <div className="overflow-x-auto border">
            <table className="table text-center">
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
                        <div className="tooltip" data-tip="Update">
                          <button className="btn btn-primary mr-2 p-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                        </div>
                      </Link>
                      <div className="tooltip" data-tip="Delete">
                        <button
                          className="btn btn-error p-3"
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-xl text-left">
                            Confirm delete!
                          </h3>
                          <p className="py-4 text-left text-lg">
                            Are you sure you want to delete this store?
                          </p>
                          <div className="modal-action">
                            <form method="dialog">
                              <button
                                onClick={() => handleDelete(store.id)}
                                className="btn btn-error mr-2"
                              >
                                Delete
                              </button>
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
  );
}
