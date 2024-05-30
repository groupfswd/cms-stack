import Link from "next/link";
import { currencyFormat } from "@/lib/currencyFormat";
import Image from "next/image";
import Filter from "@/components/order/Filter";
import SearchId from "@/components/order/SearchId";
import { convertDate } from "@/lib/convertDate";
import { useState } from "react";

export default function TableOrder({
  orders,
  filterStatus,
  filterTime,
  setFilterStatus,
  setFilterTime,
  handleSortOrders,
}) {
  const [modal, setModal] = useState(false);

  const statusColors = {
    waiting_payment: "bg-yellow-500",
    waiting_approval: "bg-yellow-500",
    cancelled: "bg-red-500",
    approved: "bg-purple-500",
    shipping: "bg-sky-500",
    delivered: "bg-blue-500",
    completed: "bg-green-500",
  };

  return (
    <div>
      <h1 className="text-xl font-bold pt-5 pb-2 text-center">List Orders</h1>
      <div className="mb-3 flex px-10 justify-between">
        <Filter
          filterStatus={filterStatus}
          filterTime={filterTime}
          setFilterStatus={setFilterStatus}
          setFilterTime={setFilterTime}
          handleSortOrders={handleSortOrders}
        />
        <SearchId />
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
                <td>{currencyFormat(order.shipping_cost)}</td>
                <td>{currencyFormat(order.total_price)}</td>
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
                  {order.payment_receipt ? (
                    <button className="btn btn-info btn-sm" onClick={() => setModal(true)}>Show</button>
                  ) : (
                    <button className="btn btn-info btn-sm" disabled>N/A</button>
                  )}
                  {modal && order.payment_receipt && (
                    <div className="flex fixed items-center justify-center mx-auto left-0 right-0 top-0 bottom-0 p-5">
                      <div className="modal-box w-[400px]">
                        <p className='font-bold text-left'>Payment receipt</p>
                        <div className='flex justify-center'>
                          <Image
                            src={order.payment_receipt}
                            className='w-auto h-auto'
                            width={500}
                            height={700}
                            alt="payment receipt"
                          />
                        </div>
                        <div className="flex justify-end my-2">
                          <div className="modal-action">
                            <button onClick={() => setModal(false)} className="btn btn-active btn-sm">
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
                <td>{convertDate(order.created_at)}</td>
                <td>
                  <div className={`p-4 text-white badge ${statusColors[order.status]}`}>
                    {order.status}
                  </div>
                </td>
                <td>
                  <div className="tooltip" data-tip="detail">
                    <Link href={`/order/${order.id}`}>
                      <button className="btn btn-info btn-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
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
