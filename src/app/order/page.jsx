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
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

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

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchId(value);
  };

  const handleSearch = () => {
    if (!searchId) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      const newPath = `?q=id ${searchId}`;

      window.history.pushState(null, "", newPath);
      window.location.reload();
    }
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

  const handleReset = () => {
    window.history.pushState(null, "", "/order");
    window.location.reload();
  };

  return (
    <div>
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
          <span>Error! ID cannot be empty</span>
        </div>
      )}
      {loading ? (
        <div className="flex h-[500px] items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <TableOrder
          orders={listOrders}
          filterStatus={filterStatus}
          time={time}
          searchId={searchId}
          handleFilterChange={handleFilterChange}
          handleTimeChange={handleTimeChange}
          handleSortOrders={handleSortOrders}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
          handleReset={handleReset}
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
