import BASE_URL from "@/lib/baseUrl";
import { cookies } from "next/headers";


export const getAllProducts = async () => {
    try {
        const getCookie = async (name) => {
            return cookies().get(name)?.value ?? '';
        }
        const cookie = await getCookie('accessToken');
        const status = "?status=active"
        const response = await fetch(`${BASE_URL}/cms/products`+status, {
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