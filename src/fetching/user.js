import BASE_URL from "@/lib/baseUrl";
import { accessToken } from "@/lib/getToken";

export async function getUserById(params) {
  try {
    const res = await fetch(`${BASE_URL}/users/${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!res.ok) {
      throw new Error('Failed to fetch user')
    }

    const { data } = await res.json()

    return data
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(params) {
  try {
    const res = await fetch(`${BASE_URL}/cms/users/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      throw new Error('Failed to update user')
    }

    const data = await res.json()

    return data;
  } catch (err) {
    console.log(err)
  }
}
