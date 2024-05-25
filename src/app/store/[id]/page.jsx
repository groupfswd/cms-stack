"use client";
import { getStoreById, updateStore, getCities } from "@/fetching/store";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdateStore() {
  const [city_id, setCityId] = useState("");
  const [name, setName] = useState("");
  const [bank_name, setBankName] = useState("");
  const [bank_account, setBankAccount] = useState("");
  const [street_address, setStreetAddress] = useState("");
  const [province, setProvince] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [cities, setCities] = useState([]);

  const { id } = useParams(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStoresById = async () => {
      const store = await getStoreById(id);

      setCityId(store.city_id);
      setName(store.name);
      setBankName(store.bank_name);
      setBankAccount(store.bank_account);
      setStreetAddress(store.street_address);
      setProvince(store.province);
      setPostalCode(store.postal_code);
    };

    fetchStoresById(id);
  }, [id]);

  const handleIdCity = (e) => {
    setCityId(e.target.value);
  };

  useEffect(() => {
    const fetchCities = async () => {
      const data = await getCities();
      setCities(data);
    };

    fetchCities();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await updateStore(id, {
        city_id: +city_id,
        name: name,
        bank_name: bank_name,
        bank_account: bank_account,
        street_address: street_address,
        province: province,
        postal_code: postal_code,
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setSuccess(false);
        router.push('/store')
      }, 1000);
    }
  };

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
          <span>Store Updated Successfully!</span>
        </div>
      )}
      <div className="w-[460px] border rounded-md justify-center flex mx-auto mt-20">
        <div className="flex flex-col">
          <div>
            <h1 className="text-xl font-bold text-center py-5">Update Store</h1>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="form-control flex flex-row justify-between">
              <label className="label">
                <span className="label-text">City id</span>
              </label>
              <select
                className="select select-bordered w-72"
                onChange={(e) => handleIdCity(e)}
                required
              >
                <option value="city">{city_id}</option>
                {cities.map((index) => (
                  <option key={index.id} value={index.id}>
                    {index.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control flex flex-row justify-between">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered mt-4 ml-3 w-72"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control flex flex-row justify-between">
              <label className="label">
                <span className="label-text">Bank name</span>
              </label>
              <input
                type="text"
                className="input input-bordered mt-4 ml-3 w-72"
                required
                value={bank_name}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="form-control flex flex-row justify-between">
              <label className="label">
                <span className="label-text">Bank account</span>
              </label>
              <input
                type="text"
                className="input input-bordered mt-4 ml-3 w-72"
                required
                value={bank_account}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
            <div className="form-control flex flex-row justify-between">
              <label className="label">
                <span className="label-text">Street address</span>
              </label>
              <input
                type="text"
                className="input input-bordered mt-4 ml-3 w-72"
                required
                value={street_address}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>
            <div className="form-control flex flex-row justify-between">
              <label className="label">
                <span className="label-text">Province</span>
              </label>
              <input
                type="text"
                className="input input-bordered mt-4 ml-3 w-72"
                required
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div className="form-control flex flex-row justify-between">
              <label className="label">
                <span className="label-text">Postal code</span>
              </label>
              <input
                type="number"
                className="input input-bordered mt-4 ml-3 w-72"
                required
                value={postal_code}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <button className="btn btn-primary w-auto my-5 flex mx-auto">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
