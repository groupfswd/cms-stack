import TableUser from "@/components/user/User";
import BASE_URL from "@/lib/baseUrl";
import { cookies } from "next/headers";

async function getData() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  try {
    const res = await fetch(`${BASE_URL}/cms/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

export default async function UserPage() {
  const listUsers = await getData();

  return (
    <div>
      <TableUser users={listUsers} />
    </div>
  );
}
