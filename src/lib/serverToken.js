import { cookies } from "next/headers";

const cookieStore = cookies();

export const accessToken = cookieStore.get("accessToken").value;
