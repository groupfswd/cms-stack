import { useState } from 'react'

export default function SearchId() {
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState(false);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchId(value);
  };

  const handleSearch = () => {
    if (!searchId) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      const newPath = `?q=${searchId}`;

      window.history.pushState(null, "", newPath);
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <span className="text-red-500 items-center mr-2">{error && 'ID empty!'}</span>
      <div className="w-44 mr-2">
        <input
          type="text"
          value={searchId}
          onChange={handleSearchChange}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder='Id order or user_id'
          required
        />
      </div>
      <div>
        <button onClick={handleSearch} className="btn btn-primary btn-sm">
          Search
        </button>
      </div>
    </div>
  )
}