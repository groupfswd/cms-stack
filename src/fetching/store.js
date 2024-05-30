import BASE_URL from "@/lib/baseUrl";
import { accessToken } from "@/lib/getToken";

export async function getStoreById(params) {
  try {
    const res = await fetch(`${BASE_URL}/cms/stores/${params}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch store");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createStore(params) {
  try {
    const res = await fetch(`${BASE_URL}/cms/stores`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      throw new Error("Failed to create store");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateStore(id, params) {
  try {
    const res = await fetch(`${BASE_URL}/cms/stores/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error("Failed to update store");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteStore(params) {
  try {
    const res = await fetch(`${BASE_URL}/cms/stores/${params}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete store");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getCities() {
  try {
    const res = await fetch(`${BASE_URL}/cities`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch cities");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
