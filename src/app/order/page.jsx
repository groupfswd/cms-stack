"use client";
import { useEffect, useState } from "react";
import BASE_URL from "@/lib/baseUrl";
import Cookies from "js-cookie";
import TableOrder from "@/components/Order";
import { useSearchParams } from "next/navigation";

export default function OrderPage() {
  const [listOrders, setListOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cms/orders?${params}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();

        setLoading(true);
        setListOrders(data.data);
        setCurrentPage(data.currentPage);
        setTotalPage(data.totalPages);
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
          current={currentPage}
          total={totalPage}
        />
      )}
    </div>
  );
}
