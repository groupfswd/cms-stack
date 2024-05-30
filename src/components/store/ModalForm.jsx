import { createStore } from '@/fetching/store'
import { useState } from 'react'

export default function ModalForm({ cities, setModal }) {
  const [city_id, setCityId] = useState("");
  const [name, setName] = useState("");
  const [bank_name, setBankName] = useState("");
  const [bank_account, setBankAccount] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [street_address, setStreetAddress] = useState("");
  const [province, setProvince] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [success, setSuccess] = useState(false);

  const handleIdCity = (e) => {
    setCityId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStore({
        city_id: +city_id,
        name: name,
        bank_name: bank_name,
        bank_account: bank_account,
        phone_number: phone_number,
        street_address: street_address,
        province: province,
        postal_code: postal_code
      });

      setSuccess(true);
      window.location.reload()
      setModal(false)
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  if (success) {
    <div role="alert" className="alert alert-success flex fixed z-10 w-80 right-0">
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
  }

  return (
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
              <span className="label-text">Phone number</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-72"
              required
              placeholder="Phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
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
  )
}
