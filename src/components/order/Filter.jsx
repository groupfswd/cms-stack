export default function Filter({
  filterStatus,
  filterTime,
  setFilterStatus,
  setFilterTime,
  handleSortOrders,
}) {

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFilterStatus(value);
  };

  const handleTimeChange = (e) => {
    const { value } = e.target;
    setFilterTime(value);
  };

  const handleReset = () => {
    window.history.pushState(null, "", "/order");
    window.location.reload();
  };

  return (
    <div className="flex gap-2">
      <div className="flex">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
            Status
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Cancelled</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="cancelled"
                  checked={filterStatus === "cancelled"}
                  onChange={handleStatusChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Approved</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="approved"
                  checked={filterStatus === "approved"}
                  onChange={handleStatusChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Shipping</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="shipping"
                  checked={filterStatus === "shipping"}
                  onChange={handleStatusChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Delivered</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="delivered"
                  checked={filterStatus === "delivered"}
                  onChange={handleStatusChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Completed</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="completed"
                  checked={filterStatus === "completed"}
                  onChange={handleStatusChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Waiting payment</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="waiting_payment"
                  checked={filterStatus === "waiting_payment"}
                  onChange={handleStatusChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Waiting approval</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="waiting_approval"
                  checked={filterStatus === "waiting_approval"}
                  onChange={handleStatusChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
          </ul>
        </div>
      </div>
      <div className="flex">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
            Time
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Created at descending</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="created_at desc"
                  checked={filterTime === "created_at desc"}
                  onChange={handleTimeChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Created at ascending</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="created_at asc"
                  checked={filterTime === "created_at asc"}
                  onChange={handleTimeChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Updated at descending</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="updated_at desc"
                  checked={filterTime === "updated_at desc"}
                  onChange={handleTimeChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Updated at ascending</span>
                <input
                  type="checkbox"
                  name="filter"
                  value="updated_at asc"
                  checked={filterTime === "updated_at asc"}
                  onChange={handleTimeChange}
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
          </ul>
        </div>
      </div>
      <div>
        <button className="btn btn-default btn-sm" onClick={handleSortOrders}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
          Filter
        </button>
      </div>
      <div>
        <button className="btn btn-default btn-sm" onClick={handleReset}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
