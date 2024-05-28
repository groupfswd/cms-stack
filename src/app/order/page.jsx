"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BASE_URL from "@/lib/baseUrl";
import { accessToken } from "@/lib/getToken";
import TableOrder from "@/components/order/Order";
import PaginationOrder from "@/components/order/PaginationOrder";

export default function OrderPage() {
  const [listOrders, setListOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const handleSortOrders = (page) => {
    setCurrentPage(page);

    const params = {};

    if (filterStatus) {
      params.filter_status = filterStatus;
    }

    if (filterTime) {
      params.sort_by = filterTime;
    }

    const searchParams = new URLSearchParams(params);
    const newUrl = `&${searchParams.toString()}`;

    window.history.pushState(null, "", `/order?page=${page}${newUrl}`);
  };

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cms/orders?${params}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();

        setListOrders(data.data);
        setCurrentPage(data.currentPage);
        setTotalPage(data.totalPages);
        setPagination({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllOrders(currentPage);
  }, [currentPage]);

  return (
    <div>
      {loading ? (
        <div className="flex h-[500px] items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <TableOrder
          orders={listOrders}
          filterStatus={filterStatus}
          filterTime={filterTime}
          setFilterStatus={setFilterStatus}
          setFilterTime={setFilterTime}
          handleSortOrders={handleSortOrders}
        />
      )}

      {totalPage === currentPage && currentPage === 1 ? null : (
        <PaginationOrder
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          handleSortOrders={handleSortOrders}
        />
      )}
    </div>
  );
}
