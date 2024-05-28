"use client";
import { getOrderById } from "@/fetching/order";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import OrderDetail from "@/components/order/OrderDetail";

export default function Page() {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams(true);

  useEffect(() => {
    const getById = async () => {
      const data = await getOrderById(id);
      setOrder(data);
      setStatus(data.status);
      setLoading(false);
    };
    getById(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <OrderDetail
        order={order}
        id={id}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
}
