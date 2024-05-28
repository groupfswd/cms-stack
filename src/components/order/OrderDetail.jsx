import React, { useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import { updateOrder } from "@/fetching/order";
import { currencyFormat } from "@/lib/currencyFormat";
import DownloadInvoice from '@/components/order/DownloadInvoice'

export default function OrderForm({ order, id, status, setStatus }) {
  const [resError, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    try {
      const res = await updateOrder(id, { status: status });

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
      }, 3000);
    }
  };

  const statusColors = {
    waiting_payment: "border-yellow-500 text-yellow-500",
    waiting_approval: "border-yellow-500 text-yellow-500",
    cancelled: "border-red-500 text-red-500",
    approved: "border-purple-500 text-purple-500",
    shipping: "border-sky-500 text-sky-500",
    delivered: "border-blue-500 text-blue-500",
    completed: "border-green-500 text-green-500",
  };

  return (
    <div>
      {success && (
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
          <span>Order Updated Successfully!</span>
        </div>
      )}
      {resError && (
        <div role="alert" className="alert alert-error flex fixed z-10 w-80 right-0">
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
      <div className="w-full">
        <h1 className="text-xl font-bold text-center py-5">Detail Order</h1>
        <div className="flex py-5 rounded-md border border-slate-300 w-[800px] mx-auto mb-5 justify-between">
          <div className="flex flex-col mx-5 rounded-md">
            <div className="flex">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Delivered at</td>
                    <td>{order.delivered_at ? order.delivered_at : "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Courier</td>
                    <td>{order.courier}</td>
                  </tr>
                  <tr>
                    <td>Shipping method</td>
                    <td>{order.shipping_method}</td>
                  </tr>
                  <tr>
                    <td>Paid at</td>
                    <td>{order.paid_at ? order.paid_at : "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Payment receipt</td>
                    <td>
                      {order.payment_receipt ? (
                        <button className="btn btn-info btn-sm" onClick={() => document.getElementById('my_modal_1').showModal()}>
                          Show
                        </button>
                      ) : (
                        <button className="btn btn-info btn-sm" disabled>N/A</button>
                      )}
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                          <Image
                            src={order.payment_receipt}
                            width={1300}
                            height={1300}
                            alt="payment receipt"
                          />
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn btn-sm">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      <div>
                        <select
                          className={`select w-full border ${statusColors[order.status]}`}
                          name="status"
                          value={order.status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option disabled>{order.status}</option>
                          <option value="cancelled" className="text-black">
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
                      <div>
                        <button
                          onClick={() => handleUpdate()}
                          type="submit"
                          className="btn btn-primary mt-2 btn-sm"
                        >
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
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Shipping cost</td>
                    <td>{currencyFormat(order.shipping_cost)}</td>
                  </tr>
                  <tr>
                    <td>Total price product</td>
                    <td>{currencyFormat(order.total_price)}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Total payment</td>
                    <td className="font-bold">{currencyFormat(order.total_price + order.shipping_cost)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col h-auto mr-5">
            <div className="flex">
              <h3 className="font-bold text-md my-2 ml-4">Order items</h3>
            </div>
            <div>
              <table className="table">
                <tbody>
                  {Array.isArray(order.order_items) &&
                    order.order_items.map((item) => (
                      <React.Fragment key={item.id}>
                        <tr>
                          <td>Product name</td>
                          <td>{item.product.name}</td>
                        </tr>
                        <tr>
                          <td>Quantity</td>
                          <td>{item.quantity}</td>
                        </tr>
                        <tr>
                          <td>Price</td>
                          <td>{currencyFormat(item.price)}</td>
                        </tr>
                        <tr>
                          <td>Product weight</td>
                          <td>{item.product.weight}</td>
                        </tr>
                        <tr>
                          <td>Product Status</td>
                          <td>{item.product.status}</td>
                        </tr>
                        <tr>
                          <td>Product SKU</td>
                          <td>{item.product.sku}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col mx-3">
            <div className="flex justify-end mb-3">
              <Link href="/order">
                <button className="btn btn-error btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  Back
                </button>
              </Link>
            </div>
            <DownloadInvoice order={order} />
          </div>
        </div>
      </div>
    </div>
  )
}
