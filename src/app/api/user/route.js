import BASE_URL from "@/lib/baseUrl";
import Cookies from "js-cookie";
import { NextResponse } from "next/server";

const accessToken = Cookies.get("accessToken")

export async function GET() {
  const response = await fetch(`${BASE_URL}/cms/users`,)
  const data = await response.json()
  console.log('DATA', data)
  return NextResponse(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
