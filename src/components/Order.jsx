import { updateOrder } from "@/fetching/order";
import { useState } from "react";
import Link from "next/link";

export default function TableOrder({ orders, current, total }) {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [sortPage, setSortPage] = useState("");
  const [orderPage, setOrderPage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const paginate = (page) => {
    setOrderPage(page);
    const newPath = `?page=${page}`;
    window.history.replaceState(null, "", newPath);
    setOrderPage(newPath);
    window.location.reload();
  };

  const sortOrder = (sortData) => {
    const newPath = `?sort_by=${sortData}`;
    window.history.replaceState(null, "", newPath);
    setSortPage(newPath);
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
        setSuccess(true);
        window.location.reload();
      }
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 5000);
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

  const convertDate = (orderDate) => {
    const createdAt = new Date(orderDate);
    const createdDate = createdAt.toLocaleDateString("id-ID");
    return createdDate;
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
      <h1 className="text-xl font-bold pt-10 pb-2 text-center">List Orders</h1>
      <div className="pb-5 justify-between flex px-10 ">
        <div className="flex">
          <details className="dropdown">
            <summary className="m-1 btn">
              Sort By
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
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[10] bg-base-100 rounded-box w-52 border">
              <li>
                <button
                  onClick={() => sortOrder("created_at desc")}
                  className="visited:text-purple-600"
                >
                  Created at descending
                </button>
              </li>
              <li>
                <button
                  onClick={() => sortOrder("created_at asc")}
                  className="visited:text-purple-600"
                >
                  Created at ascending
                </button>
              </li>
              <li>
                <button
                  onClick={() => sortOrder("updated_at desc")}
                  className="visited:text-purple-600"
                >
                  Updated at descending
                </button>
              </li>
              <li>
                <button
                  onClick={() => sortOrder("updated_at asc")}
                  className="visited:text-purple-600"
                >
                  Updated at ascending
                </button>
              </li>
            </ul>
          </details>
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
                <td>
                  {order.payment_receipt
                    ? order.payment_receipt
                    : "Not uploaded"}
                </td>
                <td>{convertDate(order.created_at)}</td>
                <td>
                  <div>
                    <select
                      className={`select w-42 ${statusColors[order.status]}`}
                      name="status"
                      value={order.status}
                      onChange={(e) => handleChangeStatus(e, order)}
                    >
                      <option disabled>{order.status}</option>
                      <option value="cancelled" className="text-black">
                        canceled
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
                  <button
                    onClick={() => handleUpdate()}
                    className="btn btn-success mr-2"
                  >
                    update
                  </button>
                  <Link href={`/order/${order.id}`}>
                    <button className="btn btn-info">detail</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-center mt-5">
        <button
          disabled={+current === 1}
          onClick={() => paginate(current - 1)}
          className="join-item btn px-4 py-2 bg-gray-300 disabled:bg-gray-200"
        >
          &lt;&lt;Previous
        </button>
        <span className="join-item px-4 py-2 text-black bg-gray-300 disabled:bg-gray-200">
          Page {current} of {total}
        </span>
        <button
          disabled={+orderPage >= total || +current === total}
          onClick={() => paginate(current + 1)}
          className="join-item btn px-4 py-2 bg-gray-300 disabled:bg-gray-200"
        >
          Next&gt;&gt;
        </button>
      </div>
    </div>
  );
}
