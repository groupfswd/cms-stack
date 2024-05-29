"use client";
import { useState, useEffect } from "react";
import BASE_URL from "@/lib/baseUrl";
import { accessToken } from "@/lib/getToken";
import TableStore from '@/components/store/StoreTable';

export default function StorePage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cms/stores`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch stores");
        }

        const { data } = await res.json();

        setStores(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStores();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex h-[500px] items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <TableStore stores={stores} />
      )}
    </div>
  );
}
