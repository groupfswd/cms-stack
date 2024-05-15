'use client'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/login");
  }
  return (
    <div>
      <button className="bg-red-500 p-2" onClick={handleLogout}>Logout</button>
      <h1>this is dashboard page</h1>
    </div>
  );
}
