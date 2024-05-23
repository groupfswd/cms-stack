import { updateOrder } from "@/fetching/order";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TableOrder({
  orders,
  handleTimeChange,
  handleFilterChange,
  handleSortOrders,
  filterStatus,
  time,
}) {

  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter()

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchId(value);
  };

  const handleSearch = () => {
    const newPath = `?q=id ${searchId}`;

    window.history.pushState(null, "", newPath);
    window.location.reload();
  };

  const handleChangeStatus = (e, order) => {
    const updatedOrders = orders.map((index) => {
      if (index.id === order.id) {
        return { ...index, status: e.target.value };
      }
      return index;
    });

    setStatus(e.target.value);
    setOrderId(order.id);
  };

  const handleUpdate = async () => {
    try {
      const res = await updateOrder(orderId, { status });

      if (res === undefined) {
        setError(true);
      } else {
        router.push('/order');
        window.location.reload();
        setSuccess(true);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
    }
  };

  const convertDate = (orderDate) => {
    const createdAt = new Date(orderDate);
    const createdDate = createdAt.toLocaleDateString("id-ID");
    return createdDate;
  };

  const handleSelect = (e) => {
    if (e === "cancelled") {
      value(cancelled);
    } else if (e === "approved") {
      value(approved);
    } else if (e === "shipping") {
      value(shipping);
    } else if (e === "delivered") {
      value(delivered);
    } else if (e === "completed") {
      value(completed);
    }
  };

  const statusColors = {
    waiting_payment: "border border-yellow-500 text-yellow-500",
    waiting_approval: "border border-yellow-500 text-yellow-500",
    cancelled: "border border-red-500 text-red-500",
    approved: "border border-purple-500 text-purple-500",
    shipping: "border border-sky-500 text-sky-500",
    delivered: "border border-blue-500 text-blue-500",
    completed: "border border-green-500 text-green-500",
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
          <span>Order Updated Successfully!</span>
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="alert alert-error flex fixed z-10 w-80 right-0"
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Failed to update order</span>
        </div>
      )}
      <h1 className="text-xl font-bold pt-5 pb-2 text-center">List Orders</h1>
      <div className="mb-3 flex px-10 justify-between">
        <div className="flex gap-2">
          <div className="flex">
            <details className="dropdown">
              <summary className="btn">
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
              <summary className="btn">
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
            <button className="btn btn-primary" onClick={handleSortOrders}>
              Filter
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
            <button onClick={handleSearch} className="btn btn-info">
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
                  <div>
                    <select
                      className={`select w-full ${statusColors[order.status]}`}
                      name="status"
                      defaultValue={order.status}
                      onChange={(e) => handleChangeStatus(e, order)}
                    >
                      <option disabled>{order.status}</option>
                      <option
                        value="cancelled"
                        onChange={(e) => handleSelect(e)}
                        className="text-black"
                      >
                        cancelled
                      </option>
                      <option value="approved" className="text-black">
                        approved
                      </option>
                      <option value="shipping" className="text-black">
                        shipping
                      </option>
                      <option value="delivered" className="text-black">
                        delivered
                      </option>
                      <option value="completed" className="text-black">
                        completed
                      </option>
                    </select>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="tooltip" data-tip="Update">
                      <button
                        onClick={() => handleUpdate()}
                        className="btn btn-success mr-2"
                      >
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
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="tooltip" data-tip="detail">
                      <Link href={`/order/${order.id}`}>
                        <button className="btn btn-info">
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
                        </button>
                      </Link>
                    </div>
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
