import BASE_URL from "@/lib/baseUrl";
import { cookies } from "next/headers";

export const getAllProducts = async (query, min_price, currentPage) => {
    try {
        let searchName;
        // let searchMinPrice;
        if(query){
            searchName = `?search=${query}`
        }else{
            searchName = "";
        }

        // if (min_price) {
        //     searchMinPrice = `min_price=${min_price}`
        // }else{
        //     searchMinPrice = "";
        // }

        const getCookie = async (name) => {
            return cookies().get(name)?.value ?? '';
        }
        const cookie = await getCookie('accessToken');
        const response = await fetch(`${BASE_URL}/cms/products${searchName}`, {
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