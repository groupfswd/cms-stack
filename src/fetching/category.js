import BASE_URL from '@/lib/baseUrl';
import { cookies } from 'next/headers';

export async function getCategory() {
    const getCookie = async (name) => {
        return cookies().get(name)?.value ?? '';
    }
    const cookie = await getCookie('accessToken');

    const categories = await fetch(`${BASE_URL}/cms/categories`, {
        headers: {
            'Authorization': `Bearer ${cookie}`
        },
        cache: 'no-cache'
    });
    return await categories.json();
}