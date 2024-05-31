import { deleteStore } from "@/fetching/store";
import ModalUpdate from "@/components/store/ModalUpdate";
import { useState } from "react";

export default function StoreTable({ stores }) {
  const [modal, setModal] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteStore(id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full px-10 mt-3">
        <div className="overflow-x-auto border">
          <table className="table text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Bank name</th>
                <th>Bank account</th>
                <th>Phone number</th>
                <th>Street address</th>
                <th>Province</th>
                <th>Postal code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store, i) => (
                <tr key={store.id}>
                  <td>{i + 1}</td>
                  <td>{store.name}</td>
                  <td>{store.bank_name}</td>
                  <td>{store.bank_account}</td>
                  <td>{store.phone_number}</td>
                  <td>{store.street_address}</td>
                  <td>{store.province}</td>
                  <td>{store.postal_code}</td>
                  <td>
                    <div className="tooltip" data-tip="Update">
                      <button className="btn btn-primary mr-2 btn-sm" onClick={() => setModal(true)}>
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
                      </button>
                    </div>
                    {modal && (
                      <ModalUpdate storeId={store.id} setModal={setModal} />
                    )}
                    <div className="tooltip" data-tip="Delete">
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => document.getElementById("my_modal_5").showModal()}
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                      <div className="modal-box">
                        <h3 className="font-bold text-xl text-left">
                          Confirm delete!
                        </h3>
                        <p className="py-4 text-left text-lg">
                          Are you sure you want to delete this store?
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button onClick={() => handleDelete(store.id)} className="btn btn-error mr-2">
                              Delete
                            </button>
                            <button className="btn btn-default">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
