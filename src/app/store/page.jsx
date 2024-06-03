"use client";
import { useState, useEffect } from "react";
import TableStore from '@/components/store/StoreTable';
import ModalAdd from "@/components/store/ModalAdd";
import { getStores } from "@/fetching/store";

export default function StorePage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      const data = await getStores();
      setStores(data);
      setLoading(false);
    }

    fetchStores();

    const intervalId = setInterval(fetchStores, 1000); // Fetch every 1 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex h-[500px] items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div>
          <div className="flex justify-center py-5">
            <h1 className="text-xl font-bold">Stores</h1>
          </div>
            <ModalAdd />
          <TableStore stores={stores} />
        </div>
      )}
    </div>
  );
}
