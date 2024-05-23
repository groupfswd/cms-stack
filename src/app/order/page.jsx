"use client";
import { useEffect, useState } from "react";
import BASE_URL from "@/lib/baseUrl";
import TableOrder from "@/components/Order";
import { useSearchParams } from "next/navigation";
import PaginationOrder from "@/components/PaginationOrder";
import { accessToken } from "@/lib/getToken";

export default function OrderPage() {
  const [listOrders, setListOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filterStatus, setFilterStatus] = useState("");
  const [time, setTime] = useState("");

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilterStatus(value);
  };

  const handleTimeChange = (e) => {
    const { value } = e.target;
    setTime(value);
  };

  const handleSortOrders = (page) => {
    setCurrentPage(page);
    const params = {};

    if (filterStatus) {
      params.filter_status = filterStatus;
    }

    if (time) {
      params.sort_by = time;
    }

    const searchParams = new URLSearchParams(params);

    const newUrl = `&${searchParams.toString()}`;

    window.history.pushState(null, "", `/order?page=${page}${newUrl}`);
  };

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

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
        setLoading(false);
        setPagination({
          currentPage: data.currentPage,
          totalPages: data.totalPages
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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
          handleFilterChange={handleFilterChange}
          handleTimeChange={handleTimeChange}
          handleSortOrders={handleSortOrders}
          filterStatus={filterStatus}
          time={time}
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
