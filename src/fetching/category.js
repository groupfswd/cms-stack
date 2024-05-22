import BASE_URL from "@/lib/baseUrl";
import { cookies } from "next/headers";

export const getCategory = async () => {
    try {
        const getCookie = async (name) => {
            return cookies().get(name)?.value?? '';
        }
        const cookie = await getCookie('accessToken');
        const response = await fetch(`${BASE_URL}/cms/categories`, {
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