"use client";
import { getOrderById } from "@/fetching/order";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import OrderDetail from "@/components/order/OrderDetail";

export default function Page() {
	const [order, setOrder] = useState([]);
	const [status, setStatus] = useState("");
	const [no_resi, setNoResi] = useState("");
	const [loading, setLoading] = useState(true);
	const { id } = useParams(true);

	useEffect(() => {
		const getById = async () => {
			const data = await getOrderById(id);
			setOrder(data);
			setStatus(data.status);
			setNoResi(data.no_resi);
			setLoading(false);
		};
		getById(id);

		const intervalId = setInterval(getById, 1000); // Fetch every 1 seconds

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
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
			<OrderDetail order={order} status={status} no_resi={no_resi} />
		</div>
	);
}
