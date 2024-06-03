import BASE_URL from "@/lib/baseUrl";
import { accessToken } from "@/lib/getToken";

export async function getOrderById(params) {
  try {
    const res = await fetch(`${BASE_URL}/cms/orders/${params}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
