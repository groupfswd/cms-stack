"use client";
import { getOrderById } from "@/fetching/order";
import { useState, useEffect } from "react";
import DetailOrder from "@/components/DetailOrder";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getById = async () => {
      try {
        const data = await getOrderById(id);

        setOrder(data);
      } catch (err) {
        data;
        console.log(err);
      }
    };
    getById();
  }, [id]);

  return (
    <div>
      <DetailOrder order={order} />
    </div>
  );
}
