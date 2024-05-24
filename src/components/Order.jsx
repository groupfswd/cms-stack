import Link from "next/link";

export default function TableOrder({
  orders,
  filterStatus,
  time,
  searchId,
  handleTimeChange,
  handleFilterChange,
  handleSortOrders,
  handleSearchChange,
  handleSearch,
  handleReset,
}) {
  const convertDate = (orderDate) => {
    const createdAt = new Date(orderDate);
    const createdDate = createdAt.toLocaleDateString("id-ID");
    return createdDate;
  };

  const statusColors = {
    waiting_payment: "bg-yellow-500",
    waiting_approval: "bg-yellow-500",
    cancelled: "bg-red-500",
    approved: "bg-purple-500",
    shipping: "bg-sky-500",
    delivered: "bg-blue-500",
    completed: "bg-green-500"
  };

  return (
    <div>
      <h1 className="text-xl font-bold pt-5 pb-2 text-center">List Orders</h1>
      <div className="mb-3 flex px-10 justify-between">
        <div className="flex gap-2">
          <div className="flex">
            <details className="dropdown">
              <summary className="btn btn-ghost">
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
              </summary>
              <ul className="shadow menu dropdown-content z-[10] bg-base-100 rounded-box w-52 border">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Cancelled</span>
                    <input
                      type="checkbox"
                      name="filter"
                      value="cancelled"
                      checked={filterStatus === "cancelled"}
                      onChange={handleFilterChange}
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
                      onChange={handleFilterChange}
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
                      onChange={handleFilterChange}
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
                      onChange={handleFilterChange}
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
                      onChange={handleFilterChange}
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
                      onChange={handleFilterChange}
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
                      onChange={handleFilterChange}
                      className="radio checked:bg-blue-500"
                    />
                  </label>
                </div>
              </ul>
            </details>
          </div>
          <div className="flex">
            <details className="dropdown">
              <summary className="btn btn-ghost">
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
              </summary>
              <ul className="shadow menu dropdown-content z-[10] bg-base-100 rounded-box w-52 border">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Created at descending</span>
                    <input
                      type="checkbox"
                      name="filter"
                      value="created_at desc"
                      checked={time === "created_at desc"}
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
                      checked={time === "created_at asc"}
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
                      checked={time === "updated_at desc"}
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
                      checked={time === "updated_at asc"}
                      onChange={handleTimeChange}
                      className="radio checked:bg-blue-500"
                    />
                  </label>
                </div>
              </ul>
            </details>
          </div>
          <div>
            <button className="btn btn-default" onClick={handleSortOrders}>
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
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
              Filter
            </button>
          </div>
          <div>
            <button className="btn btn-default" onClick={handleReset}>
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
        <div className="flex justify-end">
          <div className="w-44 mr-2">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="number"
                value={searchId}
                onChange={handleSearchChange}
                className="grow"
                placeholder="ID order"
                required
              />
            </label>
          </div>
          <div>
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto px-10">
        <table className="table table-zebra border-spacing-20 text-center mx-auto border">
          <thead>
            <tr>
              <th>No</th>
              <th>User order</th>
              <th>Courier</th>
              <th>Shipping method</th>
              <th>Shipping cost</th>
              <th>Total price</th>
              <th>Product name</th>
              <th>Quantity</th>
              <th>Payment receipt</th>
              <th>Order date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order.id}>
                <th>{i + 1}</th>
                <td>{order.user.fullname}</td>
                <td>{order.courier}</td>
                <td>{order.shipping_method}</td>
                <td>{order.shipping_cost}</td>
                <td>{order.total_price}</td>
                <td>
                  {order.order_items.map((item) => (
                    <p key={item.id}>{item.product.name}</p>
                  ))}
                </td>
                <td>
                  {order.order_items.map((item) => (
                    <p key={item.id}>{item.quantity}</p>
                  ))}
                </td>
                <td>{order.payment_receipt ? order.payment_receipt : "N/A"}</td>
                <td>{convertDate(order.created_at)}</td>
                <td>
                  <div
                    className={`p-4 text-white badge ${statusColors[order.status]
                      }`}
                  >
                    {order.status}
                  </div>
                </td>
                <td>
                  <div className="tooltip" data-tip="detail">
                    <Link href={`/order/${order.id}`}>
                      <button className="btn btn-info p-2">
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
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                          />
                        </svg>
                        Detail
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
