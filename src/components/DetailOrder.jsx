import React from "react";

export default function DetailOrder({ order }) {
  return (
    <div>
      <div className="w-full">
        <h1 className="text-xl font-bold text-center pt-5">Detail Order</h1>
        <div className="flex justify-center items-center pt-10">
          <div className="flex flex-col mx-10 border">
            <div className="flex justify-center">
              <h3 className="font-bold text-lg mb-3">Order</h3>
            </div>
            <div className="flex">
              <table className="table border">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Shipping cost</td>
                    <td>{order.shipping_cost}</td>
                  </tr>
                  <tr>
                    <td>Shipping method</td>
                    <td>{order.shipping_method}</td>
                  </tr>
                  <tr>
                    <td>Payment receipt</td>
                    <td>
                      {order.payment_receipt ? order.payment_receipt : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td>Paid at</td>
                    <td>{order.paid_at ? order.paid_at : "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Total Weight</td>
                    <td>{order.total_weight}</td>
                  </tr>
                  <tr>
                    <td>Total Price</td>
                    <td>{order.total_price}</td>
                  </tr>
                  <tr>
                    <td>Courier</td>
                    <td>{order.courier}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{order.status}</td>
                  </tr>
                  <tr>
                    <td>Delivered at</td>
                    <td>{order.delivered_at ? order.delivered_at : "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Invoice</td>
                    <td>{order.invoice ? order.invoice : "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col mx-10 border">
            <div className="flex justify-center">
              <h3 className="font-bold text-lg mb-3">Order Items</h3>
            </div>
            <div>
              <table className="table border">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items && Array.isArray(order.order_items) ? (
                    order.order_items.map((item) => (
                      <React.Fragment key={item.id}>
                        <tr>
                          <td>Quantity</td>
                          <td>{item.quantity}</td>
                        </tr>
                        <tr>
                          <td>Price</td>
                          <td>{item.price}</td>
                        </tr>
                        <tr>
                          <td>Is reviewed</td>
                          <td>{item.is_reviewed ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <td>Product Status</td>
                          <td>{item.product.status}</td>
                        </tr>
                        <tr>
                          <td>Product slug</td>
                          <td>{item.product.slug}</td>
                        </tr>
                        <tr>
                          <td>Product name</td>
                          <td>{item.product.name}</td>
                        </tr>
                        <tr>
                          <td>Product SKU</td>
                          <td>{item.product.sku}</td>
                        </tr>
                        <tr>
                          <td>Product stock</td>
                          <td>{item.product.stock}</td>
                        </tr>
                        <tr>
                          <td>Product price</td>
                          <td>{item.product.price}</td>
                        </tr>
                        <tr>
                          <td>Product weight</td>
                          <td>{item.product.weight}</td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No order items available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
