import BASE_URL from "@/lib/baseUrl";
import { cookies } from "next/headers";

export const getAllProducts = async (query) => {
    try {
        let params = {
            "search": query.search,
            "min_price": query.min_price,
            "max_price": query.max_price,
            "page": query.currentPage,
            "limit": query.limit
        };

        let queryParams = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');

        const getCookie = async (name) => {
            return cookies().get(name)?.value ?? '';
        }
        const cookie = await getCookie('accessToken');
        const response = await fetch(`${BASE_URL}/cms/products?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookie}`
            },
        })
        return response.json();
    } catch (error) {
        console.log(error);
    }
}