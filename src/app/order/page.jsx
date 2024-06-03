import ListOrders from "@/components/order/ListOrders";
import BASE_URL from "@/lib/baseUrl";
import FilterStatus from "@/components/order/FilterStatus";
import FilterTime from "@/components/order/FilterTime";
import FilterSearch from "@/components/order/filterSearch";
import FilterReset from "@/components/order/FilterReset";
import { accessToken } from "@/lib/serverToken";
import { Suspense } from "react";

async function getOrders(query) {
	try {
		let params = {
			limit: query?.limit || 5,
			page: query?.page || 1,
			filter_status: query?.filter_status || '',
			sort_by: query?.sort_by || '',
			q: query?.q || ''
		};

		let queryParams = Object.keys(params)
			.map((query) => encodeURIComponent(query) + "=" + encodeURIComponent(params[query]))
			.join("&");

		const res = await fetch(`${BASE_URL}/cms/orders?${queryParams}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${accessToken}`,
			},
			cache: "no-store",
		});

		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	}
}

export default async function OrderPage({ searchParams }) {
	const query = searchParams?.query || '';
	const currentPage = searchParams?.page || 1;

	const orders = await getOrders(searchParams);

	return (
		<div>
			<h1 className="text-xl font-bold py-5 text-center">List Orders</h1>
			<div className="flex flex-row justify-between mx-10">
				<div className="flex flex-row">
					<FilterStatus />
					<FilterTime />
					<FilterReset />
				</div>
				<FilterSearch />
			</div>
			<ListOrders orders={orders} currentPage={currentPage} />
		</div>
	);
}
