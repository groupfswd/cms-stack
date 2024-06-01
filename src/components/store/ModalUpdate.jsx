import { getCities, getStoreById, updateStore } from "@/fetching/store";
import { useState, useEffect } from "react";

export default function ModalForm({ storeId, setModal }) {
  const [city_id, setCityId] = useState('');
  const [name, setName] = useState('');
  const [bank_name, setBankName] = useState('');
  const [bank_account, setBankAccount] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [street_address, setStreetAddress] = useState('');
  const [province, setProvince] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchStoresById = async () => {
      const store = await getStoreById(storeId);

      setCityId(store.city_id);
      setName(store.name);
      setBankName(store.bank_name);
      setBankAccount(store.bank_account);
      setPhoneNumber(store.phone_number);
      setStreetAddress(store.street_address);
      setProvince(store.province);
      setPostalCode(store.postal_code);
    };

    fetchStoresById(storeId);
  }, [storeId]);

  useEffect(() => {
    const fetchCities = async () => {
      const data = await getCities();
      setCities(data);
    }

    fetchCities();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault()
    await updateStore(storeId, {
      city_id: +city_id,
      name: name,
      bank_name: bank_name,
      bank_account: bank_account,
      phone_number: phone_number,
      street_address: street_address,
      province: province,
      postal_code: postal_code,
    });

    setModal(false)
    window.location.reload()
  }

  const handleIdCity = (e) => {
    setCityId(e.target.value);
  };

  return (
    <div className="flex fixed z-10 items-center justify-center mx-auto left-0 right-0 top-0 bottom-0">
      <div className="modal-box w-[500px]">
        <h3 className="font-bold text-lg mb-2 text-left">Update Store</h3>
        <form onSubmit={handleUpdate}>
          <div className="form-control flex flex-row justify-between mt-3">
            <label className="label">
              <span className="label-text">City id</span>
            </label>
            <select className="select select-bordered w-72" onChange={(e) => handleIdCity(e)} required>
              <option value="city">{city_id}</option>
              {cities.map((index) => (
                <option key={index.id} value={index.id}>
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
              value={name}
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
              value={bank_name}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>
          <div className="form-control flex flex-row justify-between mt-3">
            <label className="label">
              <span className="label-text">Bank account</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-72"
              required
              placeholder="Bank account"
              value={bank_account}
              onChange={(e) => setBankAccount(e.target.value)}
            />
          </div>
          <div className="form-control flex flex-row justify-between mt-3">
            <label className="label">
              <span className="label-text">Phone number</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-72"
              required
              placeholder="Phone number"
              value={phone_number}
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
              value={street_address}
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
              value={province}
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
              value={postal_code}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="flex justify-end my-2">
            <div className="modal-action mr-2">
              <button className="btn btn-success">Update</button>
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
