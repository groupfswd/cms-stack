import { currencyFormat } from "@/lib/currencyFormat";
import { convertDate } from "@/lib/convertDate";
import Image from "next/image";
import Link from "next/link";
import Pagination from '@/components/order/Pagination'
import ViewImage from "@/components/order/ViewImage";

export default function TableOrder({ orders, currentPage }) {

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
                  {orders.data.map((order, i) => (
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
                              <div className="flex justify-center">
                                 <Image
                                    src={order.payment_receipt}
                                    width={50}
                                    height={50}
                                    alt="payment receipt"
                                 />
                              </div>
                           ) : (
                              <p>N/A</p>
                           )}
                        </td>
                        <td>{convertDate(order.created_at)}</td>
                        <td>
                           <div className={`p-4 text-white badge ${statusColors[order.status]}`}>
                              {order.status}
                           </div>
                        </td>
                        <td>
                           <div className="flex flex-row">
                              <ViewImage key={order.id} receiptImage={order.payment_receipt} />
                              <div className="tooltip" data-tip="Detail">
                                 <Link href={`/order/${order.id}`} className="btn btn-info btn-sm ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"   >
                                       <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                 </Link>
                              </div>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <Pagination currentPage={currentPage} totalPages={orders.totalPages} />
      </div>
   );
}
